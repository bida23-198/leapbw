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

const LearningScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { name: 'All', courses: 69 },
    { name: 'Digital Skills', courses: 24, icon: '💻' },
    { name: 'Life Skills', courses: 18, icon: '🎯' },
    { name: 'Business', courses: 15, icon: '💼' },
    { name: 'Technical', courses: 12, icon: '⚙️' }
  ];

  const courses = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      level: 'Beginner',
      hours: 20,
      enrolled: 234,
      platform: 'Coursera',
      platformColor: '#0056D2',
      url: 'https://www.coursera.org/learn/web-development',
      description: 'Learn HTML, CSS, JavaScript and build your first website',
      icon: '💻'
    },
    {
      id: '2',
      title: 'Advanced Excel & Data Analysis',
      level: 'Intermediate',
      hours: 15,
      enrolled: 189,
      platform: 'Udemy',
      platformColor: '#A435F0',
      url: 'https://www.udemy.com/course/excel-data-analysis/',
      description: 'Master Excel formulas, pivot tables, and data visualization',
      icon: '📊'
    },
    {
      id: '3',
      title: 'Digital Marketing Specialization',
      level: 'Beginner',
      hours: 30,
      enrolled: 456,
      platform: 'Coursera',
      platformColor: '#0056D2',
      url: 'https://www.coursera.org/specializations/digital-marketing',
      description: 'SEO, social media marketing, and digital advertising',
      icon: '📱'
    },
    {
      id: '4',
      title: 'Python for Everybody',
      level: 'Beginner',
      hours: 25,
      enrolled: 321,
      platform: 'Orange Digital Academy',
      platformColor: '#FF6B00',
      url: 'https://orangedigitalacademy.org/courses/python',
      description: 'Learn Python programming from scratch',
      icon: '🐍'
    },
    {
      id: '5',
      title: 'Entrepreneurship Fundamentals',
      level: 'Intermediate',
      hours: 18,
      enrolled: 167,
      platform: 'Udemy',
      platformColor: '#A435F0',
      url: 'https://www.udemy.com/course/entrepreneurship-fundamentals/',
      description: 'Business planning, funding, and startup strategies',
      icon: '🚀'
    },
    {
      id: '6',
      title: 'Mobile App Development',
      level: 'Advanced',
      hours: 35,
      enrolled: 98,
      platform: 'Orange Digital Academy',
      platformColor: '#FF6B00',
      url: 'https://orangedigitalacademy.org/courses/mobile-development',
      description: 'Build cross-platform mobile applications',
      icon: '📱'
    }
  ];

  const externalPlatforms = [
    {
      name: 'Coursera',
      description: 'World-class courses from top universities',
      url: 'https://www.coursera.org',
      color: '#0056D2',
      icon: '🎓'
    },
    {
      name: 'Udemy',
      description: 'Practical courses for professional skills',
      url: 'https://www.udemy.com',
      color: '#A435F0',
      icon: '💼'
    },
    {
      name: 'Orange Digital Academy',
      description: 'Digital skills for African youth',
      url: 'https://orangedigitalacademy.org',
      color: '#FF6B00',
      icon: '🍊'
    },
    {
      name: 'edX',
      description: 'University courses and programs',
      url: 'https://www.edx.org',
      color: '#02262F',
      icon: '📚'
    }
  ];

  const filteredCourses = selectedCategory === 'All' 
    ? courses 
    : courses.filter(course => {
        const categoryMap = {
          'Digital Skills': ['💻', '📱', '📊'],
          'Life Skills': ['🎯', '🚀'],
          'Business': ['💼', '🚀'],
          'Technical': ['⚙️', '🐍', '📱']
        };
        return categoryMap[selectedCategory]?.includes(course.icon);
      });

  const handleCoursePress = async (course) => {
    Alert.alert(
      'Open External Course',
      `This will open "${course.title}" on ${course.platform}. Continue?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open', 
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(course.url);
              if (supported) {
                await Linking.openURL(course.url);
              } else {
                Alert.alert('Error', `Cannot open URL: ${course.url}`);
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to open course link');
            }
          }
        }
      ]
    );
  };

  const handlePlatformPress = async (platform) => {
    Alert.alert(
      'Visit Learning Platform',
      `Open ${platform.name} in your browser?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Open', 
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(platform.url);
              if (supported) {
                await Linking.openURL(platform.url);
              } else {
                Alert.alert('Error', `Cannot open URL: ${platform.url}`);
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to open platform website');
            }
          }
        }
      ]
    );
  };

  const renderCourseCard = ({ item }) => (
    <View style={styles.courseCard}>
      <View style={styles.courseHeader}>
        <View style={styles.courseIconContainer}>
          <Text style={styles.courseIcon}>{item.icon}</Text>
        </View>
        <View style={styles.courseInfo}>
          <Text style={styles.courseTitle}>{item.title}</Text>
          <View style={[styles.platformBadge, { backgroundColor: item.platformColor }]}>
            <Text style={styles.platformText}>{item.platform}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.courseDescription}>{item.description}</Text>
      
      <View style={styles.courseMeta}>
        <Text style={styles.metaText}>{item.level}</Text>
        <Text style={styles.metaText}>•</Text>
        <Text style={styles.metaText}>{item.hours} hours</Text>
        <Text style={styles.metaText}>•</Text>
        <Text style={styles.metaText}>{item.enrolled} enrolled</Text>
      </View>
      
      <View style={styles.courseActions}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => handleCoursePress(item)}
        >
          <Text style={styles.primaryButtonText}>Start Learning</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPlatformCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.platformCard}
      onPress={() => handlePlatformPress(item)}
    >
      <View style={styles.platformHeader}>
        <Text style={styles.platformIcon}>{item.icon}</Text>
        <View style={[styles.platformColor, { backgroundColor: item.color }]} />
      </View>
      <Text style={styles.platformName}>{item.name}</Text>
      <Text style={styles.platformDescription}>{item.description}</Text>
      <Text style={styles.visitText}>Visit Website →</Text>
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
              <Text style={styles.title}>Skills & Learning</Text>
              <Text style={styles.subtitle}>Educational programs & skills development</Text>
            </View>
          </View>
        </View>

        {/* Learning Progress */}
        <LinearGradient
          colors={['#3498db', '#1abc9c']}
          style={styles.progressCard}
        >
          <Text style={styles.progressTitle}>Your Learning Journey</Text>
          <View style={styles.progressContent}>
            <View>
              <Text style={styles.progressNumber}>3 of 5</Text>
              <Text style={styles.progressLabel}>Courses Completed</Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressPercent}>60%</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Course Categories */}
        <Text style={styles.sectionTitle}>Course Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category.name}
              style={[
                styles.categoryCard,
                selectedCategory === category.name && styles.categoryCardActive
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text style={styles.categoryIcon}>{category.icon || '📚'}</Text>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryCount}>{category.courses} courses</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Available Courses */}
        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={filteredCourses}
            renderItem={renderCourseCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.coursesList}
          />
        </View>

        {/* Learning Platforms */}
        <View style={styles.platformsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Platforms</Text>
            <Text style={styles.sectionSubtitle}>Access courses from top providers</Text>
          </View>
          <FlatList
            data={externalPlatforms}
            renderItem={renderPlatformCard}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.platformsList}
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
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  progressTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    fontWeight: '600',
  },
  progressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoriesContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 12,
    paddingRight: 20,
  },
  categoryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    minWidth: 100,
  },
  categoryCardActive: {
    backgroundColor: '#ADD8E6',
    borderColor: '#ADD8E6',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  coursesSection: {
    marginBottom: 30,
  },
  coursesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  courseCard: {
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
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#EBF5FB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  courseIcon: {
    fontSize: 20,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  platformBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  platformText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 12,
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
    flexWrap: 'wrap',
  },
  metaText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  courseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  secondaryButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#2C3E50',
    fontSize: 14,
    fontWeight: '600',
  },
  platformsSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#dcdcdc',
    marginTop: 4,
  },
  platformsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  platformCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    width: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  platformHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  platformIcon: {
    fontSize: 24,
  },
  platformColor: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  platformName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  platformDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    lineHeight: 16,
    marginBottom: 12,
  },
  visitText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
});

export default LearningScreen;