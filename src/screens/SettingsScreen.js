import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../utils/AuthContext';

const SettingsScreen = ({ navigation }) => {
  const { user, logout, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  // Non-personal data only (not from Omang)
  const [profileData, setProfileData] = useState({
    bio: user?.bio || 'Passionate about youth development and technology.',
    interests: Array.isArray(user?.interests) ? user.interests : ['Technology', 'Leadership', 'Entrepreneurship'],
    skills: Array.isArray(user?.skills) ? user.skills : ['Web Development', 'Public Speaking', 'Project Management'],
    careerGoals: user?.careerGoals || 'To become a software engineer and mentor young developers.',
    availability: user?.availability || 'Part-time',
    preferredContact: user?.preferredContact || 'Email',
    educationLevel: user?.educationLevel || '',
    fieldOfStudy: user?.fieldOfStudy || '',
    institution: user?.institution || '',
    graduationYear: user?.graduationYear || '',
    employmentStatus: user?.employmentStatus || '',
    currentEmployer: user?.currentEmployer || '',
    jobTitle: user?.jobTitle || '',
    yearsOfExperience: user?.yearsOfExperience || ''
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newsletter: true,
    eventReminders: true,
    programUpdates: true,
    learningProgress: true,
    communityUpdates: true,
    mentorshipAlerts: false,
    language: 'English',
    theme: 'Light'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    biometricLogin: false,
    sessionTimeout: '30 minutes'
  });

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'tn', name: 'Setswana' },
    { code: 'fr', name: 'French' },
    { code: 'pt', name: 'Portuguese' }
  ];

  const themes = [
    { name: 'Light', value: 'light' },
    { name: 'Dark', value: 'dark' },
    { name: 'Auto', value: 'auto' }
  ];

  const handleUpdateProfile = async () => {
    if (!profileData.bio.trim() || !profileData.careerGoals.trim()) {
      Alert.alert('Error', 'Please fill in required fields (Bio and Career Goals)');
      return;
    }

    try {
      await updateProfile(profileData);
      Alert.alert('Success', 'Profile updated successfully!');
      setShowEditModal(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete Account', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted successfully.');
            logout();
          }
        }
      ]
    );
  };

  const handleContactSupport = () => {
    Linking.openURL('mailto:support@leapbotswana.org?subject=LEAP%20App%20Support');
  };

  const handleGiveFeedback = () => {
    Linking.openURL('mailto:feedback@leapbotswana.org?subject=LEAP%20App%20Feedback');
  };

  const togglePreference = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const toggleSecuritySetting = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const renderProfileSection = () => (
    <View style={styles.section}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </Text>
          </View>
          <Text style={styles.memberCategory}>
            {user?.age ? `Youth (${user.age} years)` : 'LEAP Member'}
          </Text>
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={styles.profileLocation}>
            📍 {user?.district}, Botswana
          </Text>
          <View style={styles.engagementScore}>
            <Text style={styles.engagementText}>Engagement Score</Text>
            <View style={styles.scoreBar}>
              <View style={[styles.scoreFill, { width: `${Math.min((user?.progress?.points || 0), 100)}%` }]} />
            </View>
            <Text style={styles.scorePercentage}>{user?.progress?.points || 0} points</Text>
          </View>
        </View>
      </View>

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🎯</Text>
          <Text style={styles.infoTitle}>Programs</Text>
          <Text style={styles.infoValue}>{user?.progress?.enrolledPrograms?.length || 0}</Text>
          <Text style={styles.infoSubtext}>Enrolled</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📚</Text>
          <Text style={styles.infoTitle}>Courses</Text>
          <Text style={styles.infoValue}>{user?.progress?.completedCourses || 0}</Text>
          <Text style={styles.infoSubtext}>Completed</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>🏆</Text>
          <Text style={styles.infoTitle}>Points</Text>
          <Text style={styles.infoValue}>{user?.progress?.points || 0}</Text>
          <Text style={styles.infoSubtext}>Earned</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>⭐</Text>
          <Text style={styles.infoTitle}>Level</Text>
          <Text style={styles.infoValue}>{Math.floor((user?.progress?.points || 0) / 100) + 1}</Text>
          <Text style={styles.infoSubtext}>Achiever</Text>
        </View>
      </View>

      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>About Me</Text>
        <Text style={styles.summaryText}>{profileData.bio}</Text>
        
        <View style={styles.tagsContainer}>
          <Text style={styles.tagsTitle}>Interests & Skills</Text>
          <View style={styles.tagsRow}>
            {profileData.interests.slice(0, 4).map((interest, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{interest}</Text>
              </View>
            ))}
          </View>
          <View style={styles.tagsRow}>
            {profileData.skills.slice(0, 4).map((skill, index) => (
              <View key={index} style={[styles.tag, styles.skillTag]}>
                <Text style={styles.tagText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.goalSection}>
          <Text style={styles.goalTitle}>Career Goals</Text>
          <Text style={styles.goalText}>{profileData.careerGoals}</Text>
        </View>

        <View style={styles.educationSection}>
          <Text style={styles.sectionSubtitle}>Education & Career</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Education:</Text>
            <Text style={styles.detailValue}>{profileData.educationLevel || 'Not specified'}</Text>
          </View>
          {profileData.fieldOfStudy && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Field of Study:</Text>
              <Text style={styles.detailValue}>{profileData.fieldOfStudy}</Text>
            </View>
          )}
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Employment:</Text>
            <Text style={styles.detailValue}>{profileData.employmentStatus || 'Not specified'}</Text>
          </View>
          {profileData.jobTitle && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Position:</Text>
              <Text style={styles.detailValue}>{profileData.jobTitle}</Text>
            </View>
          )}
        </View>

        <View style={styles.availabilitySection}>
          <View style={styles.availabilityItem}>
            <Text style={styles.availabilityLabel}>Availability:</Text>
            <Text style={styles.availabilityValue}>{profileData.availability}</Text>
          </View>
          <View style={styles.availabilityItem}>
            <Text style={styles.availabilityLabel}>Contact Preference:</Text>
            <Text style={styles.availabilityValue}>{profileData.preferredContact}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => setShowEditModal(true)}
      >
        <Text style={styles.editButtonText}>Edit Public Profile</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPreferencesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      
      {[
        { key: 'programUpdates', label: 'Program Updates', description: 'New programs and opportunities' },
        { key: 'eventReminders', label: 'Event Reminders', description: 'Upcoming events and workshops' },
        { key: 'learningProgress', label: 'Learning Progress', description: 'Course updates and achievements' },
        { key: 'communityUpdates', label: 'Community Updates', description: 'Forum activity and discussions' },
        { key: 'mentorshipAlerts', label: 'Mentorship Alerts', description: 'Mentor matching and sessions' },
        { key: 'newsletter', label: 'Newsletter', description: 'Monthly updates and news' },
      ].map((item) => (
        <View key={item.key} style={styles.preferenceItem}>
          <View style={styles.preferenceInfo}>
            <Text style={styles.preferenceLabel}>{item.label}</Text>
            <Text style={styles.preferenceDescription}>{item.description}</Text>
          </View>
          <Switch
            value={preferences[item.key]}
            onValueChange={() => togglePreference(item.key)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={preferences[item.key] ? '#3498db' : '#f4f3f4'}
          />
        </View>
      ))}

      <Text style={styles.sectionTitle}>Appearance</Text>
      
      <TouchableOpacity 
        style={styles.preferenceItem}
        onPress={() => setShowLanguageModal(true)}
      >
        <View style={styles.preferenceInfo}>
          <Text style={styles.preferenceLabel}>Language</Text>
          <Text style={styles.preferenceDescription}>{preferences.language}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.preferenceItem}
        onPress={() => setShowThemeModal(true)}
      >
        <View style={styles.preferenceInfo}>
          <Text style={styles.preferenceLabel}>Theme</Text>
          <Text style={styles.preferenceDescription}>{preferences.theme}</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSecuritySection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Security & Privacy</Text>
      
      <View style={styles.preferenceItem}>
        <View style={styles.preferenceInfo}>
          <Text style={styles.preferenceLabel}>Two-Factor Authentication</Text>
          <Text style={styles.preferenceDescription}>Add extra security to your account</Text>
        </View>
        <Switch
          value={securitySettings.twoFactorAuth}
          onValueChange={() => toggleSecuritySetting('twoFactorAuth')}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={securitySettings.twoFactorAuth ? '#3498db' : '#f4f3f4'}
        />
      </View>

      <View style={styles.preferenceItem}>
        <View style={styles.preferenceInfo}>
          <Text style={styles.preferenceLabel}>Biometric Login</Text>
          <Text style={styles.preferenceDescription}>Use fingerprint or face ID</Text>
        </View>
        <Switch
          value={securitySettings.biometricLogin}
          onValueChange={() => toggleSecuritySetting('biometricLogin')}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={securitySettings.biometricLogin ? '#3498db' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>🔒</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Change Password</Text>
          <Text style={styles.menuDescription}>Update your login password</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>👁️</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Privacy Settings</Text>
          <Text style={styles.menuDescription}>Control your data and visibility</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>📊</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Data & Storage</Text>
          <Text style={styles.menuDescription}>Manage cache and stored data</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSupportSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Help & Support</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>❓</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Help Center</Text>
          <Text style={styles.menuDescription}>FAQs and tutorials</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleContactSupport}>
        <Text style={styles.menuIcon}>📞</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Contact Support</Text>
          <Text style={styles.menuDescription}>Get help from our team</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={handleGiveFeedback}>
        <Text style={styles.menuIcon}>💬</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Send Feedback</Text>
          <Text style={styles.menuDescription}>Share your suggestions</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>ℹ️</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>About LEAP</Text>
          <Text style={styles.menuDescription}>Version 1.0.0</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuIcon}>📝</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Terms & Privacy</Text>
          <Text style={styles.menuDescription}>Legal information</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAccountSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Account Actions</Text>
      
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Text style={styles.menuIcon}>🚪</Text>
        <View style={styles.menuInfo}>
          <Text style={styles.menuLabel}>Logout</Text>
          <Text style={styles.menuDescription}>Sign out of your account</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.menuItem, styles.deleteItem]}
        onPress={handleDeleteAccount}
      >
        <Text style={styles.menuIcon}>🗑️</Text>
        <View style={styles.menuInfo}>
          <Text style={[styles.menuLabel, styles.deleteText]}>Delete Account</Text>
          <Text style={styles.menuDescription}>Permanently remove your account</Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </TouchableOpacity>

      <View style={styles.accountInfo}>
        <Text style={styles.accountInfoTitle}>Account Information</Text>
        <View style={styles.accountDetail}>
          <Text style={styles.accountLabel}>Member Since:</Text>
          <Text style={styles.accountValue}>{new Date(user?.createdAt).toLocaleDateString()}</Text>
        </View>
        <View style={styles.accountDetail}>
          <Text style={styles.accountLabel}>User ID:</Text>
          <Text style={styles.accountValue}>{user?.id?.substring(0, 8)}...</Text>
        </View>
        <View style={styles.accountDetail}>
          <Text style={styles.accountLabel}>Last Updated:</Text>
          <Text style={styles.accountValue}>{new Date().toLocaleDateString()}</Text>
        </View>
      </View>
    </View>
  );

  const renderEditModal = () => (
    <Modal visible={showEditModal} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Public Profile</Text>
            <TouchableOpacity onPress={() => setShowEditModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.editForm} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>Personal Summary</Text>
            <Text style={styles.inputLabel}>Bio *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Tell us about yourself, your passions and aspirations..."
              value={profileData.bio}
              onChangeText={text => setProfileData(prev => ({...prev, bio: text}))}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            
            <Text style={styles.inputLabel}>Career Goals *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What are your career aspirations and professional goals?"
              value={profileData.careerGoals}
              onChangeText={text => setProfileData(prev => ({...prev, careerGoals: text}))}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />

            <Text style={styles.sectionLabel}>Interests & Skills</Text>
            <Text style={styles.inputLabel}>Interests (comma separated)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Technology, Leadership, Entrepreneurship, Sports"
              value={profileData.interests.join(', ')}
              onChangeText={text => setProfileData(prev => ({
                ...prev, 
                interests: text.split(',').map(item => item.trim()).filter(item => item)
              }))}
            />
            
            <Text style={styles.inputLabel}>Skills (comma separated)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Web Development, Public Speaking, Project Management"
              value={profileData.skills.join(', ')}
              onChangeText={text => setProfileData(prev => ({
                ...prev, 
                skills: text.split(',').map(item => item.trim()).filter(item => item)
              }))}
            />

            <Text style={styles.sectionLabel}>Education Background</Text>
            <Text style={styles.inputLabel}>Highest Education Level</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Bachelor's Degree, Diploma, Certificate"
              value={profileData.educationLevel}
              onChangeText={text => setProfileData(prev => ({...prev, educationLevel: text}))}
            />
            
            <Text style={styles.inputLabel}>Field of Study</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Computer Science, Business Administration"
              value={profileData.fieldOfStudy}
              onChangeText={text => setProfileData(prev => ({...prev, fieldOfStudy: text}))}
            />
            
            <Text style={styles.inputLabel}>Institution</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., University of Botswana, Botho University"
              value={profileData.institution}
              onChangeText={text => setProfileData(prev => ({...prev, institution: text}))}
            />
            
            <Text style={styles.inputLabel}>Graduation Year</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2023"
              value={profileData.graduationYear}
              onChangeText={text => setProfileData(prev => ({...prev, graduationYear: text}))}
              keyboardType="numeric"
            />

            <Text style={styles.sectionLabel}>Professional Information</Text>
            <Text style={styles.inputLabel}>Employment Status</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Employed, Student, Looking for work"
              value={profileData.employmentStatus}
              onChangeText={text => setProfileData(prev => ({...prev, employmentStatus: text}))}
            />
            
            <Text style={styles.inputLabel}>Current Employer</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Company Name or Self-Employed"
              value={profileData.currentEmployer}
              onChangeText={text => setProfileData(prev => ({...prev, currentEmployer: text}))}
            />
            
            <Text style={styles.inputLabel}>Job Title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Software Developer, Marketing Manager"
              value={profileData.jobTitle}
              onChangeText={text => setProfileData(prev => ({...prev, jobTitle: text}))}
            />
            
            <Text style={styles.inputLabel}>Years of Experience</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 2"
              value={profileData.yearsOfExperience}
              onChangeText={text => setProfileData(prev => ({...prev, yearsOfExperience: text}))}
              keyboardType="numeric"
            />

            <Text style={styles.sectionLabel}>Availability</Text>
            <Text style={styles.inputLabel}>Availability for Opportunities</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Part-time, Full-time, Weekends, Remote"
              value={profileData.availability}
              onChangeText={text => setProfileData(prev => ({...prev, availability: text}))}
            />
            
            <Text style={styles.inputLabel}>Preferred Contact Method</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Email, Phone, In-app messaging"
              value={profileData.preferredContact}
              onChangeText={text => setProfileData(prev => ({...prev, preferredContact: text}))}
            />
            
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>
                * Note: Personal information from Omang (name, age, ID, location) cannot be edited here for security reasons.
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={handleUpdateProfile}
            >
              <Text style={styles.saveButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const renderLanguageModal = () => (
    <Modal visible={showLanguageModal} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Language</Text>
            <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          {languages.map((language) => (
            <TouchableOpacity
              key={language.code}
              style={styles.optionItem}
              onPress={() => {
                setPreferences(prev => ({ ...prev, language: language.name }));
                setShowLanguageModal(false);
              }}
            >
              <Text style={styles.optionText}>{language.name}</Text>
              {preferences.language === language.name && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const renderThemeModal = () => (
    <Modal visible={showThemeModal} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Theme</Text>
            <TouchableOpacity onPress={() => setShowThemeModal(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>
          {themes.map((theme) => (
            <TouchableOpacity
              key={theme.value}
              style={styles.optionItem}
              onPress={() => {
                setPreferences(prev => ({ ...prev, theme: theme.name }));
                setShowThemeModal(false);
              }}
            >
              <Text style={styles.optionText}>{theme.name}</Text>
              {preferences.theme === theme.name && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <LinearGradient colors={['#ADD8E6', '#203A43', '#0F2027']} style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity 
              style={styles.menuIcon}
              onPress={() => navigation.openDrawer()}
            >
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Settings</Text>
              <Text style={styles.subtitle}>Manage your account preferences</Text>
            </View>
          </View>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {[
            { key: 'profile', label: 'Profile' },
            { key: 'preferences', label: 'Preferences' },
            { key: 'security', label: 'Security' },
            { key: 'support', label: 'Support' },
            { key: 'account', label: 'Account' }
          ].map(section => (
            <TouchableOpacity
              key={section.key}
              style={[styles.tab, activeSection === section.key && styles.tabActive]}
              onPress={() => setActiveSection(section.key)}
            >
              <Text style={[styles.tabText, activeSection === section.key && styles.tabTextActive]}>
                {section.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>
          {activeSection === 'profile' && renderProfileSection()}
          {activeSection === 'preferences' && renderPreferencesSection()}
          {activeSection === 'security' && renderSecuritySection()}
          {activeSection === 'support' && renderSupportSection()}
          {activeSection === 'account' && renderAccountSection()}
        </View>
      </ScrollView>

      {renderEditModal()}
      {renderLanguageModal()}
      {renderThemeModal()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    width: 32, height: 32, justifyContent: 'center', alignItems: 'center',
  },
  menuText: { fontSize: 20, color: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 10, color: '#dcdcdc' },
  tabsContainer: { marginBottom: 20 },
  tabsContent: { paddingHorizontal: 20, gap: 10 },
  tab: {
    paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabActive: { backgroundColor: '#3498db' },
  tabText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  tabTextActive: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 20, paddingBottom: 30 },
  section: {
    backgroundColor: '#fff', borderRadius: 16, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5,
  },
  profileHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
  avatarContainer: { alignItems: 'center', marginRight: 20 },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: '#3498db',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  avatarText: { fontSize: 24, fontWeight: 'bold', color: '#fff' },
  memberCategory: { fontSize: 12, color: '#3498db', fontWeight: '600', textAlign: 'center' },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50', marginBottom: 4 },
  profileLocation: { fontSize: 14, color: '#7f8c8d', marginBottom: 12 },
  engagementScore: { backgroundColor: '#F8F9FA', padding: 12, borderRadius: 8 },
  engagementText: { fontSize: 12, color: '#7f8c8d', marginBottom: 6 },
  scoreBar: { height: 6, backgroundColor: '#ECF0F1', borderRadius: 3, marginBottom: 4 },
  scoreFill: { height: '100%', backgroundColor: '#27ae60', borderRadius: 3 },
  scorePercentage: { fontSize: 11, color: '#27ae60', fontWeight: 'bold', textAlign: 'right' },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 20, gap: 10 },
  infoCard: { width: '48%', backgroundColor: '#F8F9FA', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  infoIcon: { fontSize: 20, marginBottom: 6 },
  infoTitle: { fontSize: 12, fontWeight: 'bold', color: '#2C3E50', marginBottom: 2, textAlign: 'center' },
  infoValue: { fontSize: 14, fontWeight: 'bold', color: '#3498db', marginBottom: 2 },
  infoSubtext: { fontSize: 10, color: '#7f8c8d', textAlign: 'center' },
  summarySection: { marginBottom: 20 },
  summaryTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 8 },
  summaryText: { fontSize: 14, color: '#7f8c8d', lineHeight: 20, marginBottom: 16 },
  sectionSubtitle: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 12, marginTop: 16 },
  tagsContainer: { marginBottom: 16 },
  tagsTitle: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 8 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 6 },
  tag: { backgroundColor: '#EBF5FB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  skillTag: { backgroundColor: '#E9F7EF' },
  tagText: { fontSize: 12, color: '#3498db', fontWeight: '500' },
  goalSection: { marginBottom: 16 },
  goalTitle: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 6 },
  goalText: { fontSize: 14, color: '#7f8c8d', lineHeight: 20, fontStyle: 'italic' },
  educationSection: { marginBottom: 16 },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  detailLabel: { fontSize: 12, color: '#7f8c8d', fontWeight: '500' },
  detailValue: { fontSize: 12, color: '#2C3E50', fontWeight: '600' },
  availabilitySection: { backgroundColor: '#F8F9FA', padding: 12, borderRadius: 8 },
  availabilityItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  availabilityLabel: { fontSize: 12, color: '#7f8c8d', fontWeight: '500' },
  availabilityValue: { fontSize: 12, color: '#2C3E50', fontWeight: '600' },
  editButton: { backgroundColor: '#3498db', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  editButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginBottom: 16 },
  preferenceItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ECF0F1' },
  preferenceInfo: { flex: 1 },
  preferenceLabel: { fontSize: 16, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  preferenceDescription: { fontSize: 14, color: '#7f8c8d' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ECF0F1' },
  menuIcon: { fontSize: 20, marginRight: 12, width: 24 },
  menuInfo: { flex: 1 },
  menuLabel: { fontSize: 16, fontWeight: '600', color: '#2C3E50', marginBottom: 4 },
  menuDescription: { fontSize: 14, color: '#7f8c8d' },
  chevron: { fontSize: 18, color: '#bdc3c7', fontWeight: 'bold' },
  deleteItem: { borderBottomWidth: 0 },
  deleteText: { color: '#e74c3c' },
  accountInfo: { backgroundColor: '#F8F9FA', padding: 16, borderRadius: 8, marginTop: 16 },
  accountInfoTitle: { fontSize: 14, fontWeight: 'bold', color: '#2C3E50', marginBottom: 12 },
  accountDetail: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  accountLabel: { fontSize: 12, color: '#7f8c8d' },
  accountValue: { fontSize: 12, color: '#2C3E50', fontWeight: '500' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', margin: 20, borderRadius: 16, padding: 20, maxHeight: '85%', width: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#2C3E50' },
  closeButton: { fontSize: 20, color: '#7f8c8d', fontWeight: 'bold' },
  editForm: { flex: 1 },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 15, marginTop: 10, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: '#ECF0F1' },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#2C3E50', marginBottom: 6 },
  input: { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#E5E5E5', padding: 12, borderRadius: 8, fontSize: 14, marginBottom: 15 },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#3498db', paddingVertical: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 10, marginBottom: 20 },
  saveButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  noteContainer: { backgroundColor: '#FFF3CD', padding: 12, borderRadius: 8, marginBottom: 15 },
  noteText: { fontSize: 12, color: '#856404', textAlign: 'center', lineHeight: 16 },
  optionItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#ECF0F1' },
  optionText: { fontSize: 16, color: '#2C3E50' },
  checkmark: { fontSize: 18, color: '#3498db', fontWeight: 'bold' },
});

export default SettingsScreen;