import { LinearGradient } from 'expo-linear-gradient';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../utils/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleAvatarPress = () => {
    navigation.navigate('Dashboard');
  };

  const LEAPPillars = [
    {
      title: 'Learning',
      subtitle: 'Skills & Education',
      icon: '📚',
      color: '#3498db',
      gradient: ['#EBF5FB', '#D6EAF8'],
      borderColor: '#AED6F1',
      screen: 'Learning'
    },
    {
      title: 'Equality',
      subtitle: 'Gender Advocacy',
      icon: '⚖️',
      color: '#9b59b6',
      gradient: ['#F4ECF7', '#E8DAEF'],
      borderColor: '#D2B4DE',
      screen: 'Equality'
    },
    {
      title: 'Advancement',
      subtitle: 'Career Growth',
      icon: '🚀',
      color: '#27ae60',
      gradient: ['#E9F7EF', '#D4EFDF'],
      borderColor: '#A9DFBF',
      screen: 'Advancement'
    },
    {
      title: 'Programs',
      subtitle: 'Youth Initiatives',
      icon: '🌟',
      color: '#e67e22',
      gradient: ['#FEF9E7', '#FCF3CF'],
      borderColor: '#F7DC6F',
      screen: 'Programs'
    }
  ];

  const FeaturedOpportunities = [
    { 
      title: 'Digital Skills Bootcamp', 
      type: 'Learning', 
      spots: '12 spots left',
      gradient: ['#3498db', '#2980b9']
    },
    { 
      title: 'Women in Tech Initiative', 
      type: 'Equality', 
      spots: 'Enrolling now',
      gradient: ['#9b59b6', '#8e44ad']
    }
  ];

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
              onPress={() => navigation.openDrawer()}
            >
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.appTitle}>LEAP Botswana</Text>
              <Text style={styles.appSubtitle}>Learning • Equality • Advancement • Programs</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationIcon}>
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAvatarPress}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.firstName?.[0]}{user?.lastName?.[0]}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <TouchableOpacity style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>
            Search programs, events, jobs, resources...
          </Text>
        </TouchableOpacity>

        {/* Hero Section */}
        <LinearGradient
          colors={['#3498db', '#9b59b6']}
          style={styles.heroSection}
        >
          <Text style={styles.heroTitle}>Empowering Botswana's Youth</Text>
          <Text style={styles.heroSubtitle}>
            Digital platform for youth development & gender equality
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Youth')}
            >
              <Text style={styles.primaryButtonText}>Explore Programs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}
            onPress={() => navigation.navigate('Events')}>
              <Text style={styles.secondaryButtonText}>View Events</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* LEAP Pillars - Quick Access */}
        <Text style={styles.sectionTitle}>LEAP Pillars</Text>
        <View style={styles.pillarsContainer}>
          {LEAPPillars.map((pillar, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.pillarCard}
              onPress={() => navigation.navigate('Youth')}
            >
              <LinearGradient
                colors={pillar.gradient}
                style={[styles.pillarGradient, { borderColor: pillar.borderColor }]}
              >
                <Text style={styles.pillarIcon}>{pillar.icon}</Text>
                <Text style={[styles.pillarTitle, { color: pillar.color }]}>
                  {pillar.title}
                </Text>
                <Text style={[styles.pillarSubtitle, { color: pillar.color }]}>
                  {pillar.subtitle}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Overview */}
        <Text style={styles.sectionTitle}>Platform Overview</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#9b59b6' }]}>85</Text>
            <Text style={styles.statLabel}>Programs</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: '#27ae60' }]}>234</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>

        {/* Featured Opportunities */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Opportunities</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.opportunitiesList}>
            {FeaturedOpportunities.map((item, index) => (
              <TouchableOpacity key={index} style={styles.opportunityCard}>
                <LinearGradient
                  colors={item.gradient}
                  style={styles.opportunityImage}
                />
                <View style={styles.opportunityContent}>
                  <Text style={styles.opportunityType}>{item.type}</Text>
                  <Text style={styles.opportunityTitle}>{item.title}</Text>
                  <Text style={styles.opportunitySpots}>{item.spots}</Text>
                  <TouchableOpacity style={styles.enrollButton}>
                    <Text style={styles.enrollText}>
                      Enroll Now →
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
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
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  appSubtitle: {
    fontSize: 10,
    color: '#dcdcdc',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationIcon: {
    width: 20,
    height: 20,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
    color: '#999',
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#3498db',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#EBF5FB',
    marginBottom: 20,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 14,
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  pillarsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  pillarCard: {
    width: '48%',
    marginBottom: 12,
  },
  pillarGradient: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  pillarIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  pillarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  pillarSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  featuredSection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewAllText: {
    color: '#ADD8E6',
    fontSize: 14,
    fontWeight: '600',
  },
  opportunitiesList: {
    gap: 12,
  },
  opportunityCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 16,
  },
  opportunityImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  opportunityContent: {
    flex: 1,
  },
  opportunityType: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 4,
  },
  opportunityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  opportunitySpots: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  enrollButton: {
    alignSelf: 'flex-start',
  },
  enrollText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;