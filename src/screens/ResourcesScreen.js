import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
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

const ResourcesScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const resourceCategories = [
    {
      id: '1',
      name: 'Guides',
      count: 45,
      icon: '📖',
      color: '#3498db',
      gradient: ['#EBF5FB', '#D6EAF8']
    },
    {
      id: '2',
      name: 'Reports',
      count: 32,
      icon: '📊',
      color: '#9b59b6',
      gradient: ['#F4ECF7', '#E8DAEF']
    },
    {
      id: '3',
      name: 'Videos',
      count: 28,
      icon: '🎬',
      color: '#e74c3c',
      gradient: ['#FBEEE6', '#F6DDCC']
    },
    {
      id: '4',
      name: 'Toolkits',
      count: 19,
      icon: '🛠️',
      color: '#27ae60',
      gradient: ['#E9F7EF', '#D4EFDF']
    },
    {
      id: '5',
      name: 'Policies',
      count: 23,
      icon: '📜',
      color: '#e67e22',
      gradient: ['#FEF9E7', '#FCF3CF']
    },
    {
      id: '6',
      name: 'Forms',
      count: 15,
      icon: '📝',
      color: '#e84393',
      gradient: ['#FCE4EC', '#F8BBD0']
    }
  ];

  const featuredResources = [
    {
      id: '1',
      type: 'PDF',
      title: 'Youth Empowerment Guide 2025',
      description: 'Comprehensive guide for youth development programs',
      size: '2.4 MB',
      downloads: 456,
      category: 'Guides',
      author: 'LEAP Team',
      uploadDate: '2024-12-15',
      icon: '📄',
      color: '#3498db'
    },
    {
      id: '2',
      type: 'VIDEO',
      title: 'Gender Sensitization Training',
      description: 'Complete training module for gender awareness',
      size: '45 MB',
      downloads: 289,
      category: 'Videos',
      author: 'Gender Desk',
      uploadDate: '2024-12-10',
      icon: '🎥',
      color: '#e74c3c'
    },
    {
      id: '3',
      type: 'TOOLKIT',
      title: 'Community Engagement Toolkit',
      description: 'Tools and templates for community outreach',
      size: '1.8 MB',
      downloads: 534,
      category: 'Toolkits',
      author: 'Community Team',
      uploadDate: '2024-12-05',
      icon: '🛠️',
      color: '#27ae60'
    },
    {
      id: '4',
      type: 'PDF',
      title: 'Annual Impact Report 2024',
      description: 'Yearly progress and achievements report',
      size: '3.2 MB',
      downloads: 321,
      category: 'Reports',
      author: 'Research Team',
      uploadDate: '2024-11-28',
      icon: '📊',
      color: '#9b59b6'
    },
    {
      id: '5',
      type: 'DOC',
      title: 'Program Application Forms',
      description: 'All program application templates',
      size: '1.1 MB',
      downloads: 678,
      category: 'Forms',
      author: 'Admin Team',
      uploadDate: '2024-11-20',
      icon: '📝',
      color: '#e84393'
    },
    {
      id: '6',
      type: 'PDF',
      title: 'Organizational Policies',
      description: 'Complete policy documentation',
      size: '2.1 MB',
      downloads: 234,
      category: 'Policies',
      author: 'HR Team',
      uploadDate: '2024-11-15',
      icon: '📜',
      color: '#e67e22'
    }
  ];

  const handleDownload = (resource) => {
    Alert.alert(
      'Download Resource',
      `Do you want to download "${resource.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Download', 
          onPress: () => {
            Alert.alert('Success', 'Resource download started!');
          }
        }
      ]
    );
  };

  const handleViewResource = (resource) => {
    setSelectedResource(resource);
  };

  const filteredResources = featuredResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => setSelectedCategory(item.name)}
    >
      <LinearGradient
        colors={item.gradient}
        style={[styles.categoryGradient, { 
          borderColor: selectedCategory === item.name ? item.color : item.color + '40'
        }]}
      >
        <Text style={styles.categoryIcon}>{item.icon}</Text>
        <Text style={[styles.categoryName, { color: item.color }]}>{item.name}</Text>
        <Text style={[styles.categoryCount, { color: item.color }]}>
          {item.count} files
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderResourceCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.resourceCard}
      onPress={() => handleViewResource(item)}
    >
      <View style={styles.resourceHeader}>
        <View style={[styles.resourceIcon, { backgroundColor: item.color + '20' }]}>
          <Text style={[styles.resourceIconText, { color: item.color }]}>
            {item.icon}
          </Text>
        </View>
        <View style={styles.resourceInfo}>
          <Text style={styles.resourceTitle}>{item.title}</Text>
          <Text style={styles.resourceDescription}>{item.description}</Text>
          <Text style={styles.resourceMeta}>
            {item.type} • {item.size} • {item.downloads} downloads
          </Text>
        </View>
      </View>
      
      <View style={styles.resourceActions}>
        <View style={styles.resourceDetails}>
          <Text style={styles.resourceAuthor}>By {item.author}</Text>
          <Text style={styles.resourceDate}>
            {new Date(item.uploadDate).toLocaleDateString()}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => handleDownload(item)}
        >
          <Text style={styles.downloadIcon}>⬇️</Text>
        </TouchableOpacity>
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
              <Text style={styles.title}>Resources Library</Text>
              <Text style={styles.subtitle}>Learning materials, guides & documents</Text>
            </View>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search resources..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#7f8c8d"
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Resource Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={resourceCategories}
          renderItem={renderCategoryCard}
          keyExtractor={item => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.categoriesGrid}
        />

        {/* Featured Resources */}
        <View style={styles.resourcesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All' ? 'All Resources' : selectedCategory}
            </Text>
            <Text style={styles.resourceCount}>
              {filteredResources.length} items
            </Text>
          </View>
          
          {filteredResources.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📚</Text>
              <Text style={styles.emptyTitle}>No resources found</Text>
              <Text style={styles.emptyText}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredResources}
              renderItem={renderResourceCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.resourcesList}
            />
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Resources</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.filterLabel}>Resource Type</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
              contentContainerStyle={styles.filterContent}
            >
              <TouchableOpacity
                style={[
                  styles.filterOption,
                  selectedCategory === 'All' && styles.filterOptionSelected
                ]}
                onPress={() => setSelectedCategory('All')}
              >
                <Text style={[
                  styles.filterOptionText,
                  selectedCategory === 'All' && styles.filterOptionTextSelected
                ]}>
                  All
                </Text>
              </TouchableOpacity>
              {resourceCategories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.filterOption,
                    selectedCategory === category.name && styles.filterOptionSelected
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={[
                    styles.filterOptionText,
                    selectedCategory === category.name && styles.filterOptionTextSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.applyButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Resource Detail Modal */}
      <Modal
        visible={!!selectedResource}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedResource && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Resource Details</Text>
                  <TouchableOpacity onPress={() => setSelectedResource(null)}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.resourceDetailHeader}>
                  <View style={[styles.detailIcon, { backgroundColor: selectedResource.color + '20' }]}>
                    <Text style={[styles.detailIconText, { color: selectedResource.color }]}>
                      {selectedResource.icon}
                    </Text>
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailTitle}>{selectedResource.title}</Text>
                    <Text style={styles.detailDescription}>{selectedResource.description}</Text>
                  </View>
                </View>
                
                <View style={styles.detailMeta}>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Type</Text>
                    <Text style={styles.metaValue}>{selectedResource.type}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Size</Text>
                    <Text style={styles.metaValue}>{selectedResource.size}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Downloads</Text>
                    <Text style={styles.metaValue}>{selectedResource.downloads}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Category</Text>
                    <Text style={styles.metaValue}>{selectedResource.category}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Author</Text>
                    <Text style={styles.metaValue}>{selectedResource.author}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Text style={styles.metaLabel}>Upload Date</Text>
                    <Text style={styles.metaValue}>
                      {new Date(selectedResource.uploadDate).toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                
                <TouchableOpacity 
                  style={styles.downloadDetailButton}
                  onPress={() => {
                    handleDownload(selectedResource);
                    setSelectedResource(null);
                  }}
                >
                  <Text style={styles.downloadDetailButtonText}>Download Resource</Text>
                </TouchableOpacity>
              </>
            )}
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
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },
  filterText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#3498db',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoriesGrid: {
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  categoryCard: {
    width: '31%',
  },
  categoryGradient: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 10,
    fontWeight: '600',
  },
  resourcesSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  resourceCount: {
    fontSize: 14,
    color: '#dcdcdc',
    fontWeight: '600',
  },
  resourcesList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  resourceCard: {
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
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  resourceIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  resourceIconText: {
    fontSize: 20,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 18,
    marginBottom: 6,
  },
  resourceMeta: {
    fontSize: 12,
    color: '#bdc3c7',
    fontWeight: '500',
  },
  resourceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resourceDetails: {
    flex: 1,
  },
  resourceAuthor: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
    marginBottom: 2,
  },
  resourceDate: {
    fontSize: 11,
    color: '#bdc3c7',
  },
  downloadButton: {
    width: 44,
    height: 44,
    backgroundColor: '#3498db',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadIcon: {
    fontSize: 18,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 20,
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
    marginBottom: 16,
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
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  filterScroll: {
    marginBottom: 20,
  },
  filterContent: {
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  filterOptionSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#fff',
  },
  applyButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resourceDetailHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  detailIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailIconText: {
    fontSize: 24,
  },
  detailInfo: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 6,
  },
  detailDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  detailMeta: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  metaLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
  },
  downloadDetailButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadDetailButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ResourcesScreen;