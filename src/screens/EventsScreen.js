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

const EventsScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All Events');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const categories = ['All Events', 'Workshops', 'Seminars', 'Networking', 'Training'];

  const events = [
    {
      id: '1',
      title: 'Digital Skills Workshop',
      date: '15 Nov',
      fullDate: '2025-11-15',
      time: '14:00 - 16:00',
      attendees: 45,
      maxAttendees: 50,
      location: 'Virtual',
      type: 'Workshops',
      description: 'Learn essential digital skills including Microsoft Office, email communication, and basic online tools. Perfect for beginners looking to enhance their digital literacy.',
      speaker: 'Ms. Tshepo Maphanga',
      category: 'Technology',
      registered: false,
      attended: false,
      gradient: ['#e67e22', '#d35400']
    },
    {
      id: '2',
      title: 'Women in Business Summit',
      date: '18 Nov',
      fullDate: '2025-11-18',
      time: '10:00 - 16:00',
      attendees: 120,
      maxAttendees: 150,
      location: 'Gaborone International Convention Centre',
      type: 'Seminars',
      description: 'Annual summit bringing together successful women entrepreneurs to share insights, network, and discuss challenges in the business world.',
      speaker: 'Dr. Sarah Molapo & Panel',
      category: 'Business',
      registered: true,
      attended: false,
      gradient: ['#9b59b6', '#8e44ad']
    },
    {
      id: '3',
      title: 'Youth Employment Fair',
      date: '22 Nov',
      fullDate: '2025-11-22',
      time: '09:00 - 17:00',
      attendees: 300,
      maxAttendees: 400,
      location: 'CBD Main Mall',
      type: 'Networking',
      description: 'Connect with top employers, learn about job opportunities, and attend career development sessions. Bring your CV!',
      speaker: 'Multiple Employers',
      category: 'Career',
      registered: false,
      attended: false,
      gradient: ['#3498db', '#2980b9']
    },
    {
      id: '4',
      title: 'Financial Literacy Training',
      date: '25 Nov',
      fullDate: '2025-11-25',
      time: '13:00 - 15:00',
      attendees: 28,
      maxAttendees: 35,
      location: 'Virtual',
      type: 'Training',
      description: 'Learn budgeting, saving, and investment strategies tailored for young professionals and entrepreneurs.',
      speaker: 'Mr. Kabelo Dintwe',
      category: 'Finance',
      registered: false,
      attended: false,
      gradient: ['#27ae60', '#229954']
    },
    {
      id: '5',
      title: 'Tech Entrepreneurship Meetup',
      date: '28 Nov',
      fullDate: '2025-11-28',
      time: '17:00 - 19:00',
      attendees: 65,
      maxAttendees: 80,
      location: 'Botswana Innovation Hub',
      type: 'Networking',
      description: 'Monthly meetup for tech entrepreneurs to share ideas, find co-founders, and discuss the startup ecosystem.',
      speaker: 'Various Tech Founders',
      category: 'Technology',
      registered: true,
      attended: false,
      gradient: ['#e74c3c', '#c0392b']
    }
  ];

  const pastEvents = [
    {
      id: '6',
      title: 'Career Development Workshop',
      date: '5 Nov',
      fullDate: '2025-11-05',
      time: '10:00 - 12:00',
      attendees: 38,
      location: 'University of Botswana',
      type: 'Workshops',
      description: 'CV writing and interview skills workshop for recent graduates.',
      registered: true,
      attended: true,
      canGiveFeedback: true
    }
  ];

  const filteredEvents = selectedCategory === 'All Events' 
    ? events 
    : events.filter(event => event.type === selectedCategory);

  const calendarDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDates = Array.from({ length: 28 }, (_, i) => i + 1);
  const eventDates = [9, 15, 18, 22, 25, 28]; // Dates with events

  const handleRegister = (event) => {
    Alert.alert(
      'Register for Event',
      `Register for "${event.title}" on ${event.date}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Register', 
          onPress: () => {
            Alert.alert('Success', `You have successfully registered for ${event.title}!`);
            // In a real app, you would update the event registration status here
          }
        }
      ]
    );
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }
    
    Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');
    setShowFeedbackModal(false);
    setFeedback('');
    setRating(0);
  };

  const renderEventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{item.date.split(' ')[0]}</Text>
          <Text style={styles.dateMonth}>{item.date.split(' ')[1]}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventMeta}>
            {item.time} • {item.attendees} registered • {item.location}
          </Text>
          <View style={styles.eventType}>
            <Text style={styles.eventTypeText}>{item.type}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.eventDescription}>{item.description}</Text>
      
      <View style={styles.attendeeProgress}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(item.attendees / item.maxAttendees) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.attendeeCount}>
          {item.attendees}/{item.maxAttendees} spots filled
        </Text>
      </View>
      
      <View style={styles.eventActions}>
        <TouchableOpacity 
          style={[
            styles.primaryButton,
            item.registered && styles.registeredButton
          ]}
          onPress={() => item.registered ? null : handleRegister(item)}
        >
          <Text style={styles.primaryButtonText}>
            {item.registered ? 'Registered ✓' : 'Register Now'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => handleViewDetails(item)}
        >
          <Text style={styles.secondaryButtonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderPastEventCard = ({ item }) => (
    <View style={styles.pastEventCard}>
      <View style={styles.eventHeader}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{item.date.split(' ')[0]}</Text>
          <Text style={styles.dateMonth}>{item.date.split(' ')[1]}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventMeta}>
            {item.time} • {item.attendees} attended • {item.location}
          </Text>
          <View style={styles.attendedBadge}>
            <Text style={styles.attendedText}>Attended ✓</Text>
          </View>
        </View>
      </View>
      
      {item.canGiveFeedback && (
        <TouchableOpacity 
          style={styles.feedbackButton}
          onPress={() => setShowFeedbackModal(true)}
        >
          <Text style={styles.feedbackButtonText}>Share Feedback</Text>
        </TouchableOpacity>
      )}
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
              <Text style={styles.title}>Events & Workshops</Text>
              <Text style={styles.subtitle}>Register for upcoming activities</Text>
            </View>
          </View>
        </View>

        {/* Event Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Calendar Preview */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>November 2025</Text>
            <TouchableOpacity>
              <Text style={styles.viewCalendarText}>View Calendar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.calendarGrid}>
            {calendarDays.map(day => (
              <Text key={day} style={styles.calendarDayHeader}>
                {day}
              </Text>
            ))}
            {calendarDates.map(date => (
              <View
                key={date}
                style={[
                  styles.calendarDate,
                  eventDates.includes(date) && styles.calendarDateWithEvent
                ]}
              >
                <Text style={[
                  styles.calendarDateText,
                  eventDates.includes(date) && styles.calendarDateTextWithEvent
                ]}>
                  {date}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          <FlatList
            data={filteredEvents}
            renderItem={renderEventCard}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.eventsList}
          />
        </View>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <View style={styles.eventsSection}>
            <Text style={styles.sectionTitle}>Past Events</Text>
            <FlatList
              data={pastEvents}
              renderItem={renderPastEventCard}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              contentContainerStyle={styles.eventsList}
            />
          </View>
        )}

        {/* Event Feedback CTA */}
        <View style={styles.feedbackCTA}>
          <Text style={styles.ctaTitle}>Attended an event?</Text>
          <Text style={styles.ctaDescription}>
            Share your feedback to help us improve
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => setShowFeedbackModal(true)}
          >
            <Text style={styles.ctaButtonText}>Submit Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Event Details Modal */}
      <Modal
        visible={!!selectedEvent}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                  <TouchableOpacity onPress={() => setSelectedEvent(null)}>
                    <Text style={styles.closeButton}>✕</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.eventDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date & Time:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.date} • {selectedEvent.time}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Location:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Speaker:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.speaker}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Category:</Text>
                    <Text style={styles.detailValue}>{selectedEvent.category}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Attendees:</Text>
                    <Text style={styles.detailValue}>
                      {selectedEvent.attendees}/{selectedEvent.maxAttendees} registered
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.eventDescription}>{selectedEvent.description}</Text>
                
                <TouchableOpacity 
                  style={styles.registerModalButton}
                  onPress={() => {
                    handleRegister(selectedEvent);
                    setSelectedEvent(null);
                  }}
                >
                  <Text style={styles.registerModalButtonText}>
                    {selectedEvent.registered ? 'Already Registered' : 'Register for Event'}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Feedback Modal */}
      <Modal
        visible={showFeedbackModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Event Feedback</Text>
              <TouchableOpacity onPress={() => setShowFeedbackModal(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.feedbackLabel}>How would you rate this event?</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setRating(star)}
                >
                  <Text style={[
                    styles.star,
                    star <= rating && styles.starActive
                  ]}>
                    {star <= rating ? '⭐' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <Text style={styles.feedbackLabel}>Your feedback:</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="What did you like? How can we improve?"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <TouchableOpacity 
              style={styles.submitFeedbackButton}
              onPress={handleSubmitFeedback}
            >
              <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
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
  categoriesContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: 'transparent',
  },
  categoryChipActive: {
    backgroundColor: '#e67e22',
    borderColor: '#e67e22',
  },
  categoryText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  calendarCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  viewCalendarText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayHeader: {
    width: '14.28%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#7f8c8d',
    paddingVertical: 4,
  },
  calendarDate: {
    width: '14.28%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ECF0F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDateWithEvent: {
    backgroundColor: '#FDEDE9',
  },
  calendarDateText: {
    fontSize: 12,
    color: '#2C3E50',
  },
  calendarDateTextWithEvent: {
    fontWeight: 'bold',
    color: '#e67e22',
  },
  eventsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  eventsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  eventCard: {
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
  pastEventCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  dateBadge: {
    width: 56,
    height: 56,
    backgroundColor: '#FDEDE9',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  dateMonth: {
    fontSize: 12,
    color: '#e67e22',
    fontWeight: '600',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 6,
  },
  eventType: {
    alignSelf: 'flex-start',
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  eventTypeText: {
    fontSize: 10,
    color: '#3498db',
    fontWeight: '600',
  },
  attendedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F6F3',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  attendedText: {
    fontSize: 10,
    color: '#27ae60',
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 12,
  },
  attendeeProgress: {
    marginBottom: 12,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#ECF0F1',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e67e22',
    borderRadius: 3,
  },
  attendeeCount: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  eventActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#e67e22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registeredButton: {
    backgroundColor: '#27ae60',
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
  feedbackButton: {
    backgroundColor: '#34495E',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  feedbackCTA: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  ctaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  ctaDescription: {
    fontSize: 14,
    color: '#dcdcdc',
    marginBottom: 16,
    lineHeight: 20,
  },
  ctaButton: {
    backgroundColor: '#34495E',
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
    flex: 1,
  },
  closeButton: {
    fontSize: 20,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  eventDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    width: '30%',
  },
  detailValue: {
    fontSize: 14,
    color: '#7f8c8d',
    width: '70%',
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  registerModalButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 8,
  },
  star: {
    fontSize: 32,
    color: '#f39c12',
  },
  starActive: {
    color: '#f39c12',
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 16,
    minHeight: 100,
  },
  submitFeedbackButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitFeedbackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EventsScreen;