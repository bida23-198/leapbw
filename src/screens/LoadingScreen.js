import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const LoadingScreen = () => {
  return (
    <LinearGradient
      colors={['#ADD8E6', '#203A43', '#0F2027']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>LEAP Botswana</Text>
        <Text style={styles.subtitle}>Loading...</Text>
        <ActivityIndicator size="large" color="#ADD8E6" style={styles.spinner} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#dcdcdc',
    marginBottom: 20,
  },
  spinner: {
    marginTop: 20,
  },
});

export default LoadingScreen;