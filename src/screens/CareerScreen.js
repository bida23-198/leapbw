import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../utils/AuthContext';

const CareerScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Jobs');

  const tabs = ['Jobs', 'Mentorship', 'Resources'];

  const careerTools = [
    {
      id: '1',
      title: 'Job Listings',
      subtitle: '156 opportunities',
      icon: '💼',
      color: '#27ae60',
      gradient: ['#E9F7EF', '#D4EFDF'],
      borderColor: '#A9DFBF'
    },
    {
      id: '2',
      title: 'Mentorship',
      subtitle: 'Find a mentor',
      icon: '👥',
      color: '#3498db',
      gradient: ['#EBF5FB', '#D6EAF8'],
      borderColor: '#AED6F1'
    }
  ];

  const jobListings = [
    {
      id: '1',
      title: 'Junior Software Developer',
      company: 'Tech Corp BW',
      type: 'Full-time',
      posted: '2 days ago',
      location: 'Gaborone',
      salary: 'P8,000 - P12,000',
      description: 'Entry-level software development position focusing on web applications',
      applyUrl: 'https://techcorpbw.co.bw/careers/junior-developer',
      requirements: ['JavaScript', 'React', 'Node.js', 'Degree in CS or related field']
    },
    {
      id: '2',
      title: 'Marketing Coordinator',
      company: 'SME Solutions',
      type: 'Contract',
      posted: '5 days ago',
      location: 'Francistown',
      salary: 'P6,000 - P9,000',
      description: 'Coordinate marketing campaigns and social media presence',
      applyUrl: 'https://smesolutions.co.bw/jobs/marketing',
      requirements: ['Marketing degree', 'Social media management', 'Communication skills']
    },
    {
      id: '3',
      title: 'Data Analyst Intern',
      company: 'Gov Initiative',
      type: 'Internship',
      posted: '1 week ago',
      location: 'Remote',
      salary: 'P3,000 stipend',
      description: '6-month internship program in data analysis and visualization',
      applyUrl: 'https://govbw.gov/careers/internships',
      requirements: ['Excel', 'Python', 'Statistics', 'Recent graduate']
    },
    {
      id: '4',
      title: 'Customer Service Representative',
      company: 'Botswana Telecom',
      type: 'Full-time',
      posted: '3 days ago',
      location: 'Gaborone',
      salary: 'P5,500 - P7,500',
      description: 'Handle customer inquiries and provide technical support',
      applyUrl: 'https://btc.co.bw/careers/customer-service',
      requirements: ['Communication skills', 'Customer service experience', 'Computer literacy']
    }
  ];

  const mentors = [
    {
      id: '1',
      name: 'Dr. Sarah Molapo',
      role: 'Senior Software Engineer',
      company: 'Microsoft',
      experience: '8 years',
      specialization: 'Cloud Computing, AI',
      availability: '2 slots available',
      match: '95%',
      bio: 'Passionate about mentoring young developers in Botswana'
    },
    {
      id: '2',
      name: 'Mr. Tumi Kgotla',
      role: 'Marketing Director',
      company: 'Proctor & Gamble',
      experience: '12 years',
      specialization: 'Digital Marketing, Brand Strategy',
      availability: '1 slot available',
      match: '88%',
      bio: 'Helping young marketers build successful careers'
    },
    {
      id: '3',
      name: 'Ms. Amantle Brown',
      role: 'Data Scientist',
      company: 'Amazon Web Services',
      experience: '6 years',
      specialization: 'Machine Learning, Big Data',
      availability: '3 slots available',
      match: '92%',
      bio: 'Dedicated to increasing African representation in tech'
    }
  ];

  const careerResources = [
    {
      id: '1',
      title: 'CV Writing Guide',
      type: 'PDF Guide',
      description: 'How to create a professional CV for Botswana job market',
      icon: '📝'
    },
    {
      id: '2',
      title: 'Interview Preparation',
      type: 'Video Series',
      description: 'Common interview questions and best practices',
      icon: '🎥'
    },
    {
      id: '3',
      title: 'Career Assessment',
      type: 'Interactive Tool',
      description: 'Discover your career strengths and interests',
      icon: '🔍'
    }
  ];

  const handleApplyJob = async (job) => {
    Alert.alert(
      'Apply for Position',
      `Apply for "${job.title}" at ${job.company}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Apply Now', 
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(job.applyUrl);
              if (supported) {
                await Linking.openURL(job.applyUrl);
              } else {
                Alert.alert('Error', 'Cannot open application link');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to open application');
            }
          }
        }
      ]
    );
  };

  const handleConnectMentor = (mentor) => {
    Alert.alert(
      'Connect with Mentor',
      `Send connection request to ${mentor.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Request', 
          onPress: () => {
            Alert.alert('Success', `Connection request sent to ${mentor.name}!`);
          }
        }
      ]
    );
  };

  const renderJobCard = ({ item }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.jobCompany}>{item.company}</Text>
        </View>
        <View style={[styles.jobType, { backgroundColor: getJobTypeColor(item.type) }]}>
          <Text style={styles.jobTypeText}>{item.type}</Text>
        </View>
      </View>
      
      <View style={styles.jobMeta}>
        <Text style={styles.jobLocation}>📍 {item.location}</Text>
        <Text style={styles.jobSalary}>💰 {item.salary}</Text>
      </View>
      
      <Text style={styles.jobDescription}>{item.description}</Text>
      
      <View style={styles.jobRequirements}>
        <Text style={styles.requirementsTitle}>Requirements:</Text>
        <View style={styles.requirementsList}>
          {item.requirements.map((req, index) => (
            <View key={index} style={styles.requirementTag}>
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
        </View>
      </View>
      
      <Text style={styles.jobPosted}>Posted {item.posted}</Text>
      
      <View style={styles.jobActions}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={() => handleApplyJob(item)}
        >
          <Text style={styles.applyButtonText}>Apply Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>❤️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMentorCard = ({ item }) => (
    <View style={styles.mentorCard}>
      <View style={styles.mentorHeader}>
        <View style={styles.mentorAvatar}>
          <Text style={styles.mentorAvatarText}>
            {item.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        <View style={styles.mentorInfo}>
          <Text style={styles.mentorName}>{item.name}</Text>
          <Text style={styles.mentorRole}>{item.role} at {item.company}</Text>
        </View>
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{item.match} match</Text>
        </View>
      </View>
      
      <Text style={styles.mentorBio}>{item.bio}</Text>
      
      <View style={styles.mentorDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Experience</Text>
          <Text style={styles.detailValue}>{item.experience}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Specialization</Text>
          <Text style={styles.detailValue}>{item.specialization}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Availability</Text>
          <Text style={styles.detailValue}>{item.availability}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.connectButton}
        onPress={() => handleConnectMentor(item)}
      >
        <Text style={styles.connectButtonText}>Request Mentorship</Text>
      </TouchableOpacity>
    </View>
  );

  const renderResourceCard = ({ item }) => (
    <View style={styles.resourceCard}>
      <View style={styles.resourceHeader}>
        <Text style={styles.resourceIcon}>{item.icon}</Text>
        <View style={styles.resourceType}>
          <Text style={styles.resourceTypeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.resourceTitle}>{item.title}</Text>
      <Text style={styles.resourceDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.accessButton}>
        <Text style={styles.accessButtonText}>Access Resource</Text>
      </TouchableOpacity>
    </View>
  );

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-time': '#E8F6F3',
      'Contract': '#FEF9E7',
      'Internship': '#EBF5FB',
      'Part-time': '#F4ECF7'
    };
    return colors[type] || '#ECF0F1';
  };

  const getJobTypeTextColor = (type) => {
    const colors = {
      'Full-time': '#27ae60',
      'Contract': '#f39c12',
      'Internship': '#3498db',
      'Part-time': '#9b59b6'
    };
    return colors[type] || '#7f8c8d';
  };

  const getActiveData = () => {
    switch (activeTab) {
      case 'Jobs':
        return jobListings;
      case 'Mentorship':
        return mentors;
      case 'Resources':
        return careerResources;
      default:
        return jobListings;
    }
  };

  const renderActiveContent = () => {
    const data = getActiveData();
    
    switch (activeTab) {
      case 'Jobs':
        return (
          <FlatList
            data={data}
            renderItem={renderJobCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Mentorship':
        return (
          <FlatList
            data={data}
            renderItem={renderMentorCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Resources':
        return (
          <View style={styles.resourcesGrid}>
            {data.map(item => (
              <View key={item.id} style={styles.resourceCard}>
                <View style={styles.resourceHeader}>
                  <Text style={styles.resourceIcon}>{item.icon}</Text>
                  <View style={styles.resourceType}>
                    <Text style={styles.resourceTypeText}>{item.type}</Text>
                  </View>
                </View>
                <Text style={styles.resourceTitle}>{item.title}</Text>
                <Text style={styles.resourceDescription}>{item.description}</Text>
                <TouchableOpacity style={styles.accessButton}>
                  <Text style={styles.accessButtonText}>Access Resource</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

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
              <Text style={styles.title}>Career Advancement</Text>
              <Text style={styles.subtitle}>Jobs, mentorship & professional growth</Text>
            </View>
          </View>
        </View>

        {/* Career Tools */}
        <View style={styles.toolsContainer}>
          {careerTools.map((tool) => (
            <TouchableOpacity 
              key={tool.id}
              style={styles.toolCard}
              onPress={() => setActiveTab(tool.title === 'Job Listings' ? 'Jobs' : 'Mentorship')}
            >
              <LinearGradient
                colors={tool.gradient}
                style={[styles.toolGradient, { borderColor: tool.borderColor }]}
              >
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <Text style={[styles.toolTitle, { color: tool.color }]}>
                  {tool.title}
                </Text>
                <Text style={[styles.toolSubtitle, { color: tool.color }]}>
                  {tool.subtitle}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Active Content */}
        <View style={styles.contentSection}>
          {activeTab === 'Jobs' && (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Latest Opportunities</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
          )}
          {renderActiveContent()}
        </View>

        {/* Mentorship CTA */}
        {activeTab !== 'Mentorship' && (
          <View style={styles.mentorshipCTA}>
            <Text style={styles.ctaTitle}>Need Career Guidance?</Text>
            <Text style={styles.ctaDescription}>
              Connect with experienced mentors in your field
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => setActiveTab('Mentorship')}
            >
              <Text style={styles.ctaButtonText}>Find a Mentor</Text>
            </TouchableOpacity>
          </View>
        )}
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
  toolsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  toolCard: {
    flex: 1,
  },
  toolGradient: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  toolIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  toolSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#27ae60',
  },
  tabText: {
    fontSize: 14,
    color: '#dcdcdc',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  listContent: {
    gap: 16,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  jobType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  jobTypeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  jobLocation: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  jobSalary: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  jobDescription: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 12,
  },
  jobRequirements: {
    marginBottom: 8,
  },
  requirementsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 6,
  },
  requirementsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  requirementTag: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  requirementText: {
    fontSize: 10,
    color: '#3498db',
    fontWeight: '500',
  },
  jobPosted: {
    fontSize: 12,
    color: '#bdc3c7',
    marginBottom: 12,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 12,
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  saveButton: {
    width: 44,
    height: 44,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: 16,
  },
  mentorCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mentorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mentorAvatarText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 2,
  },
  mentorRole: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  matchBadge: {
    backgroundColor: '#E8F6F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  matchText: {
    fontSize: 10,
    color: '#27ae60',
    fontWeight: '600',
  },
  mentorBio: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 12,
  },
  mentorDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 12,
    color: '#2C3E50',
    fontWeight: '600',
  },
  connectButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resourcesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  resourceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIcon: {
    fontSize: 24,
  },
  resourceType: {
    backgroundColor: '#FEF9E7',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  resourceTypeText: {
    fontSize: 10,
    color: '#f39c12',
    fontWeight: '600',
  },
  resourceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  resourceDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
    marginBottom: 12,
  },
  accessButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  mentorshipCTA: {
    backgroundColor: '#EBF5FB',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#AED6F1',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CareerScreen;