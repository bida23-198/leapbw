import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../utils/AuthContext';

const DashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    district: '',
    age: '',
    omang: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        district: user.district || '',
        age: user.age || '',
        omang: user.omang || ''
      });
    }
  }, [user]);

  const enrolledPrograms = [
    {
      id: '1',
      title: 'Digital Skills Bootcamp',
      progress: 65,
      status: 'In Progress',
      category: 'Technology',
      startDate: '2024-11-01',
      endDate: '2024-12-15',
      instructor: 'Dr. Sarah Johnson',
      modulesCompleted: 13,
      totalModules: 20
    },
    {
      id: '2',
      title: 'Leadership Academy',
      progress: 30,
      status: 'In Progress',
      category: 'Leadership',
      startDate: '2024-11-10',
      endDate: '2025-01-20',
      instructor: 'Mr. David Smith',
      modulesCompleted: 6,
      totalModules: 20
    },
    {
      id: '3',
      title: 'Entrepreneurship Fundamentals',
      progress: 100,
      status: 'Completed',
      category: 'Business',
      startDate: '2024-10-01',
      endDate: '2024-10-30',
      instructor: 'Ms. Amanda Brown',
      modulesCompleted: 15,
      totalModules: 15
    }
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Digital Skills Workshop',
      date: '2024-11-15',
      time: '14:00',
      type: 'Workshop',
      location: 'Gaborone Innovation Hub',
      attendees: 45
    },
    {
      id: '2',
      title: 'Career Fair 2025',
      date: '2024-11-22',
      time: '09:00',
      type: 'Career Fair',
      location: 'University of Botswana',
      attendees: 200
    },
    {
      id: '3',
      title: 'Youth Entrepreneurship Summit',
      date: '2024-12-05',
      time: '10:00',
      type: 'Conference',
      location: 'Botswana Conference Centre',
      attendees: 150
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Course Completed',
      icon: '🎓',
      description: 'Completed Entrepreneurship Fundamentals',
      date: '2024-10-30',
      points: 100
    },
    {
      id: '2',
      title: 'Top Contributor',
      icon: '⭐',
      description: 'Active participation in forums',
      date: '2024-11-08',
      points: 50
    },
    {
      id: '3',
      title: 'Perfect Attendance',
      icon: '🏆',
      description: 'Attended all scheduled sessions',
      date: '2024-11-12',
      points: 75
    },
    {
      id: '4',
      title: 'Early Bird',
      icon: '⏰',
      description: 'Consistently early to sessions',
      date: '2024-11-10',
      points: 25
    }
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Advanced Web Development',
      category: 'Technology',
      level: 'Intermediate',
      duration: '8 weeks',
      match: 95
    },
    {
      id: '2',
      title: 'Entrepreneurship Workshop',
      category: 'Business',
      level: 'Beginner',
      duration: '2 days',
      match: 88
    },
    {
      id: '3',
      title: 'Data Analytics Fundamentals',
      category: 'Technology',
      level: 'Beginner',
      duration: '6 weeks',
      match: 82
    }
  ];

  const stats = {
    programs: enrolledPrograms.length,
    events: upcomingEvents.length,
    certificates: achievements.filter(a => a.title.includes('Completed')).length,
    points: achievements.reduce((total, a) => total + a.points, 0)
  };

  const handleUpdateProfile = () => {
    Alert.alert('Success', 'Profile updated successfully!');
    setShowEditProfile(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const renderProgramCard = ({ item }) => (
    <View style={styles.programCard}>
      <View style={styles.programHeader}>
        <View style={styles.programInfo}>
          <Text style={styles.programTitle}>{item.title}</Text>
          <Text style={styles.programCategory}>{item.category}</Text>
        </View>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Completed' ? '#27ae60' : '#3498db' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercent}>{item.progress}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${item.progress}%`,
                backgroundColor: item.status === 'Completed' ? '#27ae60' : '#3498db'
              }
            ]} 
          />
        </View>
        <Text style={styles.modulesText}>
          {item.modulesCompleted}/{item.totalModules} modules completed
        </Text>
      </View>
      
      <View style={styles.programMeta}>
        <Text style={styles.instructorText}>Instructor: {item.instructor}</Text>
        <Text style={styles.datesText}>
          {formatDate(item.startDate)} - {formatDate(item.endDate)}
        </Text>
      </View>
      
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>
          {item.status === 'Completed' ? 'View Certificate' : 'Continue Learning'}
        </Text>
        <Text style={styles.continueArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEventCard = ({ item }) => (
    <TouchableOpacity style={styles.eventCard}>
      <View style={styles.eventContent}>
        <View style={styles.eventDate}>
          <Text style={styles.eventDay}>{formatDate(item.date)}</Text>
          <Text style={styles.eventTime}>{item.time}</Text>
        </View>
        <View style={styles.eventDetails}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventType}>{item.type}</Text>
          <Text style={styles.eventLocation}>{item.location}</Text>
          <Text style={styles.eventAttendees}>{item.attendees} attendees</Text>
        </View>
      </View>
      <Text style={styles.eventArrow}>→</Text>
    </TouchableOpacity>
  );

  const renderAchievementCard = ({ item }) => (
    <View style={styles.achievementCard}>
      <Text style={styles.achievementIcon}>{item.icon}</Text>
      <Text style={styles.achievementTitle}>{item.title}</Text>
      <Text style={styles.achievementDescription}>{item.description}</Text>
      <View style={styles.achievementFooter}>
        <Text style={styles.achievementDate}>{formatDate(item.date)}</Text>
        <Text style={styles.achievementPoints}>+{item.points} pts</Text>
      </View>
    </View>
  );

  const renderRecommendationCard = ({ item }) => (
    <TouchableOpacity style={styles.recommendationCard}>
      <View style={styles.recommendationHeader}>
        <Text style={styles.recommendationTitle}>{item.title}</Text>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{item.match}% match</Text>
        </View>
      </View>
      <Text style={styles.recommendationCategory}>{item.category}</Text>
      <View style={styles.recommendationMeta}>
        <Text style={styles.recommendationLevel}>{item.level}</Text>
        <Text style={styles.recommendationDuration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#ADD8E6', '#203A43', '#0F2027']}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.menuIcon}
              onPress={() => navigation.openDrawer()}
            >
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>My Dashboard</Text>
              <Text style={styles.subtitle}>Track your progress & activities</Text>
            </View>
          </View>
        </View>

        {/* Profile Summary */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={['#3498db', '#9b59b6']}
            style={styles.profileGradient}
          >
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </Text>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>
                  {user?.firstName} {user?.lastName}
                </Text>
                <Text style={styles.profileEmail}>{user?.email}</Text>
                <Text style={styles.profileLocation}>
                  {user?.district} • Age {user?.age}
                </Text>
              </View>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.programs}</Text>
                <Text style={styles.statLabel}>Programs</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.events}</Text>
                <Text style={styles.statLabel}>Events</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.certificates}</Text>
                <Text style={styles.statLabel}>Certificates</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{stats.points}</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Enrolled Programs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Enrolled Programs</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={enrolledPrograms}
            renderItem={renderProgramCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.programsList}
          />
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingEvents}
            renderItem={renderEventCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.eventsList}
          />
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={achievements}
            renderItem={renderAchievementCard}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.achievementsGrid}
          />
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.recommendationSubtitle}>
            Based on your interests and progress
          </Text>
          <FlatList
            data={recommendations}
            renderItem={renderRecommendationCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.recommendationsList}
          />
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditProfile(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.editForm}>
              <View style={styles.formRow}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="First Name"
                  value={profileData.firstName}
                  onChangeText={text => setProfileData(prev => ({...prev, firstName: text}))}
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Last Name"
                  value={profileData.lastName}
                  onChangeText={text => setProfileData(prev => ({...prev, lastName: text}))}
                />
              </View>
              
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={profileData.email}
                onChangeText={text => setProfileData(prev => ({...prev, email: text}))}
                keyboardType="email-address"
              />
              
              <TextInput
                style={styles.input}
                placeholder="District"
                value={profileData.district}
                onChangeText={text => setProfileData(prev => ({...prev, district: text}))}
              />
              
              <View style={styles.formRow}>
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Age"
                  value={profileData.age}
                  onChangeText={text => setProfileData(prev => ({...prev, age: text}))}
                  keyboardType="numeric"
                />
                <TextInput
                  style={[styles.input, styles.halfInput]}
                  placeholder="Omang Number"
                  value={profileData.omang}
                  onChangeText={text => setProfileData(prev => ({...prev, omang: text}))}
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  menuIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 20,
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: '#dcdcdc',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  profileCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 20,
    borderRadius: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  profileLocation: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewAllText: {
    color: '#ADD8E6',
    fontSize: 14,
    fontWeight: '600',
  },
  programsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  programCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  programInfo: {
    flex: 1,
  },
  programTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  programCategory: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  progressSection: {
    marginBottom: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  modulesText: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  programMeta: {
    marginBottom: 12,
  },
  instructorText: {
    fontSize: 12,
    color: '#2C3E50',
    marginBottom: 2,
  },
  datesText: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3498db',
  },
  continueArrow: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: 'bold',
  },
  eventsList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  eventDate: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  eventDay: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  eventDetails: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  eventType: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 11,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  eventAttendees: {
    fontSize: 10,
    color: '#bdc3c7',
  },
  eventArrow: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  achievementsGrid: {
    paddingHorizontal: 20,
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 12,
  },
  achievementFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  achievementDate: {
    fontSize: 9,
    color: '#bdc3c7',
  },
  achievementPoints: {
    fontSize: 9,
    color: '#27ae60',
    fontWeight: 'bold',
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: '#dcdcdc',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  recommendationsList: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  recommendationCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 8,
  },
  matchBadge: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  matchText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  recommendationCategory: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
    marginBottom: 6,
  },
  recommendationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationLevel: {
    fontSize: 11,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  recommendationDuration: {
    fontSize: 11,
    color: '#7f8c8d',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  closeButton: {
    fontSize: 20,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  editForm: {
    flex: 1,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 12,
    borderRadius: 8,
    fontSize: 14,
  },
  halfInput: {
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;