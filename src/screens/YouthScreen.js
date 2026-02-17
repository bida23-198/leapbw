import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../utils/AuthContext';

const YouthScreen = ({ navigation }) => {  // Make sure to include navigation prop
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Programs');

  const categories = [
    'All Programs',
    'Leadership',
    'Technology',
    'Arts & Culture',
    'Sports',
    'Entrepreneurship'
  ];

  const programs = [
    {
      id: '1',
      title: 'Youth Leadership Academy',
      enrolled: 156,
      duration: '12 weeks',
      status: 'Open',
      progress: null,
      category: 'Leadership',
      description: 'Develop essential leadership skills and community engagement',
      image: require('../../assets/images/program.jpg'),
      gradient: ['#3498db', '#2980b9']
    },
    {
      id: '2',
      title: 'Digital Skills Training',
      enrolled: 89,
      duration: '8 weeks',
      status: 'Ongoing',
      progress: 65,
      category: 'Technology',
      description: 'Master digital literacy and technology skills',
      image: require('../../assets/images/program.jpg'),
      gradient: ['#9b59b6', '#8e44ad']
    },
    {
      id: '3',
      title: 'Entrepreneurship Mentorship',
      enrolled: 234,
      duration: '16 weeks',
      status: 'Open',
      progress: null,
      category: 'Entrepreneurship',
      description: 'Learn business fundamentals and startup strategies',
      image: require('../../assets/images/program.jpg'),
      gradient: ['#e74c3c', '#c0392b']
    },
    {
      id: '4',
      title: 'Cultural Arts Program',
      enrolled: 78,
      duration: '10 weeks',
      status: 'Open',
      progress: null,
      category: 'Arts & Culture',
      description: 'Explore traditional and contemporary arts',
      image: require('../../assets/images/program.jpg'),
      gradient: ['#27ae60', '#229954']
    },
    {
      id: '5',
      title: 'Sports Development',
      enrolled: 312,
      duration: '14 weeks',
      status: 'Ongoing',
      progress: 30,
      category: 'Sports',
      description: 'Sports training and physical development',
      image: require('../../assets/images/program.jpg'),
      gradient: ['#f39c12', '#e67e22']
    }
  ];

  const filteredPrograms = selectedCategory === 'All Programs' 
    ? programs 
    : programs.filter(program => program.category === selectedCategory);

  const handleEnroll = (program) => {
    Alert.alert(
      'Enroll in Program',
      `Are you sure you want to enroll in "${program.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Enroll', 
          onPress: () => {
            Alert.alert('Success', `You have successfully enrolled in ${program.title}!`);
          }
        }
      ]
    );
  };

  const handleContinue = (program) => {
    Alert.alert('Continue Program', `Continue your progress in ${program.title}`);
  };

  const renderProgramCard = ({ item }) => (
    <View style={styles.programCard}>
      <LinearGradient
        colors={item.gradient}
        style={styles.programImage}
      >
        <View style={styles.enrolledBadge}>
          <Text style={styles.enrolledText}>{item.enrolled} enrolled</Text>
        </View>
      </LinearGradient>
      
      <View style={styles.programContent}>
        <View style={styles.programHeader}>
          <Text style={styles.programTitle}>{item.title}</Text>
          <View style={[
            styles.statusBadge,
            item.status === 'Open' ? styles.statusOpen : styles.statusOngoing
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <Text style={styles.programDescription}>{item.description}</Text>
        
        <View style={styles.programMeta}>
          <Text style={styles.metaText}>{item.duration} duration</Text>
          <Text style={styles.metaText}>•</Text>
          <Text style={styles.metaText}>{item.category}</Text>
        </View>

        {item.progress && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Your Progress</Text>
              <Text style={styles.progressPercent}>{item.progress}%</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${item.progress}%` }
                ]} 
              />
            </View>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => item.progress ? handleContinue(item) : handleEnroll(item)}
          >
            <Text style={styles.primaryButtonText}>
              {item.progress ? 'Continue' : 'Enroll Now'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.secondaryButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>↗️</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={['#ADD8E6', '#203A43', '#0F2027']}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container}>
        {/* Header - Now with working drawer menu */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.menuIcon}
              onPress={() => navigation.openDrawer()} // This should work now!
            >
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Youth Programs</Text>
              <Text style={styles.subtitle}>Browse & enroll in vetted programs</Text>
            </View>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Program Cards */}
        <View style={styles.programsContainer}>
          <FlatList
            data={filteredPrograms}
            renderItem={renderProgramCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.programsList}
          />
        </View>
      </ScrollView>
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
    gap: 16,
  },
  notificationIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    color: '#fff',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
  },
  filterContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  filterContent: {
    paddingRight: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: '#ADD8E6',
    borderColor: '#ADD8E6',
  },
  filterText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  programsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  programsList: {
    gap: 16,
  },
  programCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  programImage: {
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 12,
  },
  enrolledBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  enrolledText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
  },
  programContent: {
    padding: 20,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusOpen: {
    backgroundColor: '#E8F6F3',
  },
  statusOngoing: {
    backgroundColor: '#EBF5FB',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  programDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
    lineHeight: 20,
  },
  programMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3498db',
    borderRadius: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
});

export default YouthScreen;