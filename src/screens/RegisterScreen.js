import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useAuth } from '../utils/AuthContext';

const RegisterScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    omang: '',
    age: '',
    
    // Step 2: Location
    district: '',
    village: '',
    ward: '',
    phoneNumber: '',
    
    // Step 3: Education
    educationLevel: '',
    institution: '',
    fieldOfStudy: '',
    graduationYear: '',
    
    // Step 4: Employment
    employmentStatus: '',
    currentEmployer: '',
    jobTitle: '',
    yearsOfExperience: '',
    
    // Step 5: Account
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.firstName || !formData.lastName || !formData.omang || !formData.age) {
          Alert.alert('Error', 'Please fill in all required personal information');
          return false;
        }
        if (formData.omang.length !== 9) {
          Alert.alert('Error', 'Omang number must be 9 digits');
          return false;
        }
        return true;
      
      case 2:
        if (!formData.district || !formData.village || !formData.phoneNumber) {
          Alert.alert('Error', 'Please fill in all required location information');
          return false;
        }
        return true;
      
      case 3:
        if (!formData.educationLevel) {
          Alert.alert('Error', 'Please select your education level');
          return false;
        }
        return true;
      
      case 4:
        if (!formData.employmentStatus) {
          Alert.alert('Error', 'Please select your employment status');
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };

  const handleRegister = async () => {
    const { firstName, lastName, omang, password, confirmPassword } = formData;

    if (!validateStep(5)) return;

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Registration Failed', result.error);
    }
  };

  const ageOptions = Array.from({ length: 23 }, (_, i) => ({
    label: `${13 + i} years`,
    value: `${13 + i}`,
  }));

  const districtOptions = [
    { label: 'Gaborone', value: 'Gaborone' },
    { label: 'Francistown', value: 'Francistown' },
    { label: 'Maun', value: 'Maun' },
    { label: 'Kasane', value: 'Kasane' },
    { label: 'Lobatse', value: 'Lobatse' },
    { label: 'Serowe', value: 'Serowe' },
    { label: 'Palapye', value: 'Palapye' },
    { label: 'Molepolole', value: 'Molepolole' },
    { label: 'Kanye', value: 'Kanye' },
    { label: 'Mochudi', value: 'Mochudi' },
    { label: 'Mahalapye', value: 'Mahalapye' },
    { label: 'Selibe Phikwe', value: 'Selibe Phikwe' },
  ];

  const educationOptions = [
    { label: 'Primary School', value: 'Primary School' },
    { label: 'Junior Secondary', value: 'Junior Secondary' },
    { label: 'Senior Secondary', value: 'Senior Secondary' },
    { label: 'Certificate', value: 'Certificate' },
    { label: 'Diploma', value: 'Diploma' },
    { label: 'Bachelor\'s Degree', value: 'Bachelor\'s Degree' },
    { label: 'Honours Degree', value: 'Honours Degree' },
    { label: 'Master\'s Degree', value: 'Master\'s Degree' },
    { label: 'PhD', value: 'PhD' },
    { label: 'Other', value: 'Other' },
  ];

  const employmentOptions = [
    { label: 'Student', value: 'Student' },
    { label: 'Unemployed', value: 'Unemployed' },
    { label: 'Employed Full-time', value: 'Employed Full-time' },
    { label: 'Employed Part-time', value: 'Employed Part-time' },
    { label: 'Self-Employed', value: 'Self-Employed' },
    { label: 'Freelancer', value: 'Freelancer' },
    { label: 'Looking for Work', value: 'Looking for Work' },
  ];

  const experienceOptions = Array.from({ length: 21 }, (_, i) => ({
    label: `${i} ${i === 1 ? 'year' : 'years'}`,
    value: `${i}`,
  }));

  const yearOptions = Array.from({ length: 30 }, (_, i) => ({
    label: `${new Date().getFullYear() - i}`,
    value: `${new Date().getFullYear() - i}`,
  }));

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4, 5].map(step => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step ? styles.stepCircleActive : styles.stepCircleInactive
          ]}>
            <Text style={[
              styles.stepText,
              currentStep >= step ? styles.stepTextActive : styles.stepTextInactive
            ]}>
              {step}
            </Text>
          </View>
          {step < 5 && <View style={[
            styles.stepLine,
            currentStep > step ? styles.stepLineActive : styles.stepLineInactive
          ]} />}
        </View>
      ))}
    </View>
  );

  const renderStepLabels = () => (
    <View style={styles.stepLabels}>
      <Text style={styles.stepLabel}>Personal</Text>
      <Text style={styles.stepLabel}>Location</Text>
      <Text style={styles.stepLabel}>Education</Text>
      <Text style={styles.stepLabel}>Employment</Text>
      <Text style={styles.stepLabel}>Account</Text>
    </View>
  );

  const renderStep1 = () => (
    <>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about yourself</Text>
      
      <View style={styles.nameRow}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="First Name *"
          value={formData.firstName}
          onChangeText={text => handleChange('firstName', text)}
          placeholderTextColor="#999"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Middle Name"
          value={formData.middleName}
          onChangeText={text => handleChange('middleName', text)}
          placeholderTextColor="#999"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Last Name *"
        value={formData.lastName}
        onChangeText={text => handleChange('lastName', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Omang Number *"
        value={formData.omang}
        onChangeText={text => handleChange('omang', text)}
        keyboardType="numeric"
        maxLength={9}
        placeholderTextColor="#999"
      />

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => handleChange('age', value)}
          items={ageOptions}
          placeholder={{ label: 'Select Age (13–35) *', value: null }}
          style={pickerSelectStyles}
          value={formData.age}
        />
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <Text style={styles.stepTitle}>Location Details</Text>
      <Text style={styles.stepSubtitle}>Where are you located?</Text>
      
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => handleChange('district', value)}
          items={districtOptions}
          placeholder={{ label: 'Select District *', value: null }}
          style={pickerSelectStyles}
          value={formData.district}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Village/Town *"
        value={formData.village}
        onChangeText={text => handleChange('village', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Ward (Optional)"
        value={formData.ward}
        onChangeText={text => handleChange('ward', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Phone Number *"
        value={formData.phoneNumber}
        onChangeText={text => handleChange('phoneNumber', text)}
        keyboardType="phone-pad"
        placeholderTextColor="#999"
      />
    </>
  );

  const renderStep3 = () => (
    <>
      <Text style={styles.stepTitle}>Education Background</Text>
      <Text style={styles.stepSubtitle}>Tell us about your education</Text>
      
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => handleChange('educationLevel', value)}
          items={educationOptions}
          placeholder={{ label: 'Highest Education Level *', value: null }}
          style={pickerSelectStyles}
          value={formData.educationLevel}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Institution/School (Optional)"
        value={formData.institution}
        onChangeText={text => handleChange('institution', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Field of Study (Optional)"
        value={formData.fieldOfStudy}
        onChangeText={text => handleChange('fieldOfStudy', text)}
        placeholderTextColor="#999"
      />

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => handleChange('graduationYear', value)}
          items={yearOptions}
          placeholder={{ label: 'Graduation Year (Optional)', value: null }}
          style={pickerSelectStyles}
          value={formData.graduationYear}
        />
      </View>
    </>
  );

  const renderStep4 = () => (
    <>
      <Text style={styles.stepTitle}>Employment Status</Text>
      <Text style={styles.stepSubtitle}>Tell us about your work experience</Text>
      
      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => handleChange('employmentStatus', value)}
          items={employmentOptions}
          placeholder={{ label: 'Employment Status *', value: null }}
          style={pickerSelectStyles}
          value={formData.employmentStatus}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Current Employer (Optional)"
        value={formData.currentEmployer}
        onChangeText={text => handleChange('currentEmployer', text)}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Job Title (Optional)"
        value={formData.jobTitle}
        onChangeText={text => handleChange('jobTitle', text)}
        placeholderTextColor="#999"
      />

      <View style={styles.dropdownContainer}>
        <RNPickerSelect
          onValueChange={value => handleChange('yearsOfExperience', value)}
          items={experienceOptions}
          placeholder={{ label: 'Years of Experience (Optional)', value: null }}
          style={pickerSelectStyles}
          value={formData.yearsOfExperience}
        />
      </View>
    </>
  );

  const renderStep5 = () => (
    <>
      <Text style={styles.stepTitle}>Create Account</Text>
      <Text style={styles.stepSubtitle}>Set up your login credentials</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Password *"
        value={formData.password}
        onChangeText={text => handleChange('password', text)}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password *"
        value={formData.confirmPassword}
        onChangeText={text => handleChange('confirmPassword', text)}
        secureTextEntry
        placeholderTextColor="#999"
      />

      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </Text>
      </View>
    </>
  );

  return (
    <LinearGradient
      colors={['#ADD8E6', '#203A43', '#0F2027']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/Bots_logo.png')}
              style={styles.logo}
            />
            <Text style={styles.title}>LEAP Botswana</Text>
            <Text style={styles.subtitle}>Empower • Connect • Grow</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>Create Your Account</Text>
            
            {renderStepIndicator()}
            {renderStepLabels()}

            <View style={styles.stepContent}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
            </View>

            <View style={styles.buttonContainer}>
              {currentStep > 1 && (
                <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                  <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
              )}
              
              {currentStep < 5 ? (
                <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.button, loading && styles.buttonDisabled]}
                  onPress={handleRegister}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? 'Creating Account...' : 'Complete Registration'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.linkText}>
                Already have an account? <Text style={styles.linkHighlight}>Sign in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#dcdcdc',
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: '#ADD8E6',
  },
  stepCircleInactive: {
    backgroundColor: '#ECF0F1',
    borderWidth: 2,
    borderColor: '#BDC3C7',
  },
  stepText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: '#fff',
  },
  stepTextInactive: {
    color: '#7F8C8D',
  },
  stepLine: {
    width: 40,
    height: 2,
    marginHorizontal: 2,
  },
  stepLineActive: {
    backgroundColor: '#ADD8E6',
  },
  stepLineInactive: {
    backgroundColor: '#ECF0F1',
  },
  stepLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  stepLabel: {
    fontSize: 10,
    color: '#7F8C8D',
    fontWeight: '500',
    textAlign: 'center',
    width: 60,
  },
  stepContent: {
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  halfInput: {
    width: '48%',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    justifyContent: 'center',
    height: 48,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#7F8C8D',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#95A5A6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 16,
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#555',
    fontSize: 14,
  },
  linkHighlight: {
    color: '#ADD8E6',
    fontWeight: '600',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#2C3E50',
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    color: '#2C3E50',
  },
  placeholder: {
    color: '#999',
  },
});

export default RegisterScreen;