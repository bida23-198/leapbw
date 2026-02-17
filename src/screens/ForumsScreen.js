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

const ForumsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [selectedForum, setSelectedForum] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const forumCategories = [
    {
      id: '1',
      name: 'Youth Voices',
      posts: 234,
      description: 'Share your experiences and perspectives',
      icon: '🗣️',
      color: '#3498db',
      gradient: ['#EBF5FB', '#D6EAF8']
    },
    {
      id: '2',
      name: 'Gender Issues',
      posts: 189,
      description: 'Discussions on equality and empowerment',
      icon: '⚖️',
      color: '#9b59b6',
      gradient: ['#F4ECF7', '#E8DAEF']
    },
    {
      id: '3',
      name: 'Career Advice',
      posts: 156,
      description: 'Professional guidance and mentorship',
      icon: '💼',
      color: '#27ae60',
      gradient: ['#E9F7EF', '#D4EFDF']
    },
    {
      id: '4',
      name: 'Skills & Learning',
      posts: 212,
      description: 'Share knowledge and learning resources',
      icon: '📚',
      color: '#e67e22',
      gradient: ['#FEF9E7', '#FCF3CF']
    },
    {
      id: '5',
      name: 'Entrepreneurship',
      posts: 98,
      description: 'Startup discussions and business ideas',
      icon: '🚀',
      color: '#e74c3c',
      gradient: ['#FBEEE6', '#F6DDCC']
    },
    {
      id: '6',
      name: 'Mental Health',
      posts: 145,
      description: 'Support and wellness discussions',
      icon: '❤️',
      color: '#e84393',
      gradient: ['#FCE4EC', '#F8BBD0']
    }
  ];

  const trendingDiscussions = [
    {
      id: '1',
      title: 'How to break into tech industry in Botswana?',
      author: 'Thabo M.',
      authorInitials: 'TM',
      timeAgo: '3 hours ago',
      preview: 'Looking for advice from young professionals who successfully transitioned into tech. What skills are most in demand locally?',
      replies: 12,
      likes: 24,
      category: 'Career Advice',
      views: 156
    },
    {
      id: '2',
      title: 'Dealing with gender bias in the workplace',
      author: 'Amantle K.',
      authorInitials: 'AK',
      timeAgo: '5 hours ago',
      preview: 'Sharing my experience and looking for advice on handling subtle gender discrimination at work...',
      replies: 8,
      likes: 18,
      category: 'Gender Issues',
      views: 89
    },
    {
      id: '3',
      title: 'Best online courses for digital marketing',
      author: 'Kabelo P.',
      authorInitials: 'KP',
      timeAgo: '1 day ago',
      preview: 'Can anyone recommend affordable but effective digital marketing courses that helped them?',
      replies: 15,
      likes: 32,
      category: 'Skills & Learning',
      views: 234
    },
    {
      id: '4',
      title: 'Youth entrepreneurship challenges in Botswana',
      author: 'Tshepo D.',
      authorInitials: 'TD',
      timeAgo: '2 days ago',
      preview: 'Discussing the biggest challenges young entrepreneurs face and how we can overcome them together.',
      replies: 23,
      likes: 45,
      category: 'Entrepreneurship',
      views: 312
    },
    {
      id: '5',
      title: 'Managing stress as a young professional',
      author: 'Sarah M.',
      authorInitials: 'SM',
      timeAgo: '2 days ago',
      preview: 'What are your best strategies for managing work-related stress and maintaining mental wellness?',
      replies: 18,
      likes: 29,
      category: 'Mental Health',
      views: 178
    }
  ];

  const forumPosts = [
    {
      id: '1',
      title: 'Welcome to our Community Forums!',
      author: 'LEAP Team',
      authorInitials: 'LT',
      timeAgo: '1 week ago',
      content: 'Welcome to the LEAP Botswana community forums! This is your space to connect, share ideas, ask questions, and support each other. Please be respectful and kind in all your interactions.',
      replies: [
        {
          id: '1-1',
          author: 'Thabo M.',
          authorInitials: 'TM',
          timeAgo: '6 days ago',
          content: 'Great to have this platform! Looking forward to engaging with everyone.',
          likes: 8
        },
        {
          id: '1-2',
          author: 'Amantle K.',
          authorInitials: 'AK',
          timeAgo: '5 days ago',
          content: 'This is exactly what we needed. Thank you LEAP team!',
          likes: 12
        }
      ],
      likes: 45,
      views: 289
    }
  ];

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !selectedCategory) {
      Alert.alert('Error', 'Please fill in all fields and select a category');
      return;
    }

    Alert.alert('Success', 'Your post has been published!');
    setShowNewPostModal(false);
    setNewPostTitle('');
    setNewPostContent('');
    setSelectedCategory('');
  };

  const handleLikePost = (postId) => {
    Alert.alert('Liked', 'Post liked successfully!');
  };

  const handleViewForum = (forum) => {
    setSelectedForum(forum);
  };

  const renderForumCategory = ({ item }) => (
    <TouchableOpacity 
      style={styles.forumCard}
      onPress={() => handleViewForum(item)}
    >
      <LinearGradient
        colors={item.gradient}
        style={[styles.forumGradient, { borderColor: item.color + '40' }]}
      >
        <Text style={styles.forumIcon}>{item.icon}</Text>
        <Text style={[styles.forumName, { color: item.color }]}>{item.name}</Text>
        <Text style={[styles.forumStats, { color: item.color }]}>
          {item.posts} discussions
        </Text>
        <Text style={styles.forumDescription}>{item.description}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderDiscussionCard = ({ item }) => (
    <TouchableOpacity style={styles.discussionCard}>
      <View style={styles.discussionHeader}>
        <View style={styles.authorAvatar}>
          <Text style={styles.authorInitials}>{item.authorInitials}</Text>
        </View>
        <View style={styles.discussionInfo}>
          <Text style={styles.discussionTitle}>{item.title}</Text>
          <Text style={styles.discussionMeta}>
            Posted by {item.author} • {item.timeAgo}
          </Text>
        </View>
      </View>
      
      <Text style={styles.discussionPreview}>{item.preview}</Text>
      
      <View style={styles.discussionStats}>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>💬</Text>
          <Text style={styles.statCount}>{item.replies}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>❤️</Text>
          <Text style={styles.statCount}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statIcon}>👁️</Text>
          <Text style={styles.statCount}>{item.views}</Text>
        </View>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPostReply = ({ item }) => (
    <View style={styles.replyCard}>
      <View style={styles.replyHeader}>
        <View style={styles.replyAuthorAvatar}>
          <Text style={styles.replyAuthorInitials}>{item.authorInitials}</Text>
        </View>
        <View style={styles.replyInfo}>
          <Text style={styles.replyAuthor}>{item.author}</Text>
          <Text style={styles.replyTime}>{item.timeAgo}</Text>
        </View>
      </View>
      <Text style={styles.replyContent}>{item.content}</Text>
      <View style={styles.replyActions}>
        <TouchableOpacity style={styles.likeButton}>
          <Text style={styles.likeIcon}>❤️</Text>
          <Text style={styles.likeCount}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
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
              <Text style={styles.title}>Community Forums</Text>
              <Text style={styles.subtitle}>Engage with peers & share ideas</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.newPostButton}
              onPress={() => setShowNewPostModal(true)}
            >
              <Text style={styles.newPostButtonText}>+ New Post</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Forum Categories */}
        <Text style={styles.sectionTitle}>Forum Categories</Text>
        <FlatList
          data={forumCategories}
          renderItem={renderForumCategory}
          keyExtractor={item => item.id}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.forumsGrid}
        />

        {/* Trending Discussions */}
        <View style={styles.discussionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Discussions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trendingDiscussions}
            renderItem={renderDiscussionCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.discussionsList}
          />
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.activityText}>
            Join the conversation and share your thoughts with the community!
          </Text>
        </View>
      </ScrollView>

      {/* New Post Modal */}
      <Modal
        visible={showNewPostModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Create New Post</Text>
              <TouchableOpacity onPress={() => setShowNewPostModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Category</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.categoriesScroll}
              contentContainerStyle={styles.categoriesContent}
            >
              {forumCategories.map(category => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category.name && styles.categoryOptionSelected
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Text style={[
                    styles.categoryOptionText,
                    selectedCategory === category.name && styles.categoryOptionTextSelected
                  ]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <Text style={styles.inputLabel}>Post Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Enter your post title..."
              value={newPostTitle}
              onChangeText={setNewPostTitle}
            />
            
            <Text style={styles.inputLabel}>Post Content</Text>
            <TextInput
              style={styles.contentInput}
              placeholder="Share your thoughts, questions, or experiences..."
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
            
            <TouchableOpacity 
              style={styles.publishButton}
              onPress={handleCreatePost}
            >
              <Text style={styles.publishButtonText}>Publish Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Forum Detail Modal */}
      <Modal
        visible={!!selectedForum}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedForum && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedForum.name}</Text>
                  <TouchableOpacity onPress={() => setSelectedForum(null)}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <Text style={styles.forumDescription}>
                  {selectedForum.description}
                </Text>
                
                <Text style={styles.postsTitle}>Recent Posts</Text>
                <FlatList
                  data={forumPosts}
                  renderItem={renderDiscussionCard}
                  keyExtractor={item => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.postsList}
                />
                
                <TouchableOpacity 
                  style={styles.newPostForumButton}
                  onPress={() => {
                    setSelectedForum(null);
                    setShowNewPostModal(true);
                  }}
                >
                  <Text style={styles.newPostForumButtonText}>Start New Discussion</Text>
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
  newPostButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  newPostButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  forumsGrid: {
    paddingHorizontal: 20,
    gap: 12,
  },
  forumCard: {
    width: '48%',
  },
  forumGradient: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
  },
  forumIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  forumName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  forumStats: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  forumDescription: {
    fontSize: 10,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 14,
  },
  discussionsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  viewAllText: {
    color: '#ADD8E6',
    fontSize: 14,
    fontWeight: '600',
  },
  discussionsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  discussionCard: {
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
  discussionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  authorInitials: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  discussionInfo: {
    flex: 1,
  },
  discussionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  discussionMeta: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  discussionPreview: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 12,
  },
  discussionStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 14,
  },
  statCount: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  categoryTag: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  categoryText: {
    fontSize: 10,
    color: '#3498db',
    fontWeight: '600',
  },
  activitySection: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  activityText: {
    fontSize: 14,
    color: '#dcdcdc',
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
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  categoriesScroll: {
    marginBottom: 16,
  },
  categoriesContent: {
    gap: 8,
  },
  categoryOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 8,
  },
  categoryOptionSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  categoryOptionText: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
  },
  categoryOptionTextSelected: {
    color: '#fff',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
    minHeight: 120,
  },
  publishButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  publishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forumDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 16,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  postsList: {
    gap: 12,
  },
  newPostForumButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  newPostForumButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  replyCard: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  replyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  replyAuthorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#27ae60',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  replyAuthorInitials: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  replyInfo: {
    flex: 1,
  },
  replyAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  replyTime: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  replyContent: {
    fontSize: 14,
    color: '#2C3E50',
    lineHeight: 20,
    marginBottom: 8,
  },
  replyActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likeIcon: {
    fontSize: 14,
  },
  likeCount: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  replyButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 6,
  },
  replyButtonText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
});

export default ForumsScreen;