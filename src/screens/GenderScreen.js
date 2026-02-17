import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../utils/AuthContext';

const GenderScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Campaigns');

  const tabs = ['Campaigns', 'Support Services', 'Resources'];

  const campaigns = [
    {
      id: '1',
      title: 'Women in Leadership Program',
      category: 'Leadership',
      supporters: 456,
      impact: 'High',
      description: 'Empowering women to take leadership roles in business and community',
      gradient: ['#9b59b6', '#8e44ad']
    },
    {
      id: '2',
      title: 'Gender-Based Violence Prevention',
      category: 'Safety',
      supporters: 789,
      impact: 'Critical',
      description: 'Creating safe spaces and support systems for survivors',
      gradient: ['#e74c3c', '#c0392b']
    },
    {
      id: '3',
      title: 'Girls in STEM Initiative',
      category: 'Education',
      supporters: 312,
      impact: 'High',
      description: 'Encouraging young girls to pursue careers in science and technology',
      gradient: ['#3498db', '#2980b9']
    }
  ];

  const supportServices = [
    {
      id: '1',
      title: 'Counseling Services',
      type: 'Mental Health',
      availability: '24/7 Hotline',
      description: 'Professional counseling for gender-based issues'
    },
    {
      id: '2',
      title: 'Legal Assistance',
      type: 'Legal Aid',
      availability: 'Mon-Fri, 9AM-5PM',
      description: 'Free legal support for discrimination cases'
    },
    {
      id: '3',
      title: 'Career Mentorship',
      type: 'Professional',
      availability: 'By Appointment',
      description: 'Mentorship programs for career advancement'
    }
  ];

  const resources = [
    {
      id: '1',
      title: 'Gender Equality Guide',
      type: 'PDF Resource',
      downloads: '1.2K',
      description: 'Comprehensive guide to gender equality principles'
    },
    {
      id: '2',
      title: 'Women Rights Handbook',
      type: 'E-book',
      downloads: '856',
      description: 'Know your rights and legal protections'
    },
    {
      id: '3',
      title: 'Inclusion Toolkit',
      type: 'Toolkit',
      downloads: '623',
      description: 'Tools for creating inclusive environments'
    }
  ];

  const renderCampaignCard = ({ item }) => (
    <View style={styles.campaignCard}>
      <LinearGradient
        colors={item.gradient}
        style={styles.campaignHeader}
      >
        <Text style={styles.campaignTitle}>{item.title}</Text>
      </LinearGradient>
      
      <View style={styles.campaignContent}>
        <View style={styles.campaignMeta}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <View style={styles.impactBadge}>
            <Text style={styles.impactText}>{item.impact} Impact</Text>
          </View>
        </View>
        
        <Text style={styles.supportersText}>
          {item.supporters.toLocaleString()} supporters
        </Text>
        
        <Text style={styles.campaignDescription}>
          {item.description}
        </Text>
        
        <View style={styles.campaignActions}>
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Support Campaign</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderServiceCard = ({ item }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{item.title}</Text>
        <View style={styles.serviceTypeBadge}>
          <Text style={styles.serviceTypeText}>{item.type}</Text>
        </View>
      </View>
      
      <Text style={styles.serviceDescription}>{item.description}</Text>
      
      <View style={styles.serviceMeta}>
        <Text style={styles.availabilityText}>Available: {item.availability}</Text>
      </View>
      
      <TouchableOpacity style={styles.accessButton}>
        <Text style={styles.accessButtonText}>Access Service</Text>
      </TouchableOpacity>
    </View>
  );

  const renderResourceCard = ({ item }) => (
    <View style={styles.resourceCard}>
      <View style={styles.resourceHeader}>
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <View style={styles.resourceTypeBadge}>
          <Text style={styles.resourceTypeText}>{item.type}</Text>
        </View>
      </View>
      
      <Text style={styles.resourceDescription}>{item.description}</Text>
      
      <View style={styles.resourceMeta}>
        <Text style={styles.downloadsText}>{item.downloads} downloads</Text>
      </View>
      
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>Download</Text>
      </TouchableOpacity>
    </View>
  );

  const getActiveData = () => {
    switch (activeTab) {
      case 'Campaigns':
        return campaigns;
      case 'Support Services':
        return supportServices;
      case 'Resources':
        return resources;
      default:
        return campaigns;
    }
  };

  const renderActiveContent = () => {
    const data = getActiveData();
    
    switch (activeTab) {
      case 'Campaigns':
        return (
          <FlatList
            data={data}
            renderItem={renderCampaignCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Support Services':
        return (
          <FlatList
            data={data}
            renderItem={renderServiceCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'Resources':
        return (
          <FlatList
            data={data}
            renderItem={renderResourceCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.listContent}
          />
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
              <Text style={styles.title}>Gender & Equality</Text>
              <Text style={styles.subtitle}>Advocacy, resources & women empowerment</Text>
            </View>
          </View>
        </View>

        {/* Impact Stats */}
        <LinearGradient
          colors={['#9b59b6', '#e74c3c']}
          style={styles.impactCard}
        >
          <Text style={styles.impactTitle}>Gender Equality Impact</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.2K</Text>
              <Text style={styles.statLabel}>Women Reached</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>45</Text>
              <Text style={styles.statLabel}>Active Campaigns</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>92%</Text>
              <Text style={styles.statLabel}>Satisfaction</Text>
            </View>
          </View>
        </LinearGradient>

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
          {renderActiveContent()}
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
  impactCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  impactTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 16,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
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
    borderBottomColor: '#9b59b6',
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
  listContent: {
    gap: 16,
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
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
  campaignHeader: {
    padding: 16,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  campaignContent: {
    padding: 16,
  },
  campaignMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#F4ECF7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#9b59b6',
    fontWeight: '600',
  },
  impactBadge: {
    backgroundColor: '#E8F6F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  impactText: {
    fontSize: 12,
    color: '#27ae60',
    fontWeight: '600',
  },
  supportersText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 16,
  },
  campaignActions: {
    flexDirection: 'row',
    gap: 12,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#9b59b6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shareButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: '#2C3E50',
    fontSize: 14,
    fontWeight: '600',
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 20,
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
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 12,
  },
  serviceTypeBadge: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  serviceTypeText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceMeta: {
    marginBottom: 16,
  },
  availabilityText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  accessButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accessButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  resourceCard: {
    backgroundColor: '#fff',
    padding: 20,
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
  resourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginRight: 12,
  },
  resourceTypeBadge: {
    backgroundColor: '#FEF9E7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  resourceTypeText: {
    fontSize: 12,
    color: '#f39c12',
    fontWeight: '600',
  },
  resourceDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 12,
  },
  resourceMeta: {
    marginBottom: 16,
  },
  downloadsText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  downloadButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default GenderScreen;