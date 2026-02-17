import { createContext, useContext, useEffect, useState } from 'react';
import Storage from './Storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Checking user login status...');
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    try {
      console.log('AuthProvider: Getting user data from storage...');
      const userData = await Storage.getItem('user');
      console.log('AuthProvider: User data found:', userData);
      
      if (userData) {
        setUser(userData);
      } else {
        console.log('AuthProvider: No user data found');
      }
    } catch (error) {
      console.error('AuthProvider: Error checking authentication:', error);
    } finally {
      console.log('AuthProvider: Setting loading to false');
      setLoading(false);
    }
  };

  const login = async (omang, password) => {
    try {
      // Get all users from storage
      const users = await Storage.getItem('users') || [];
      
      // Find user by omang number
      const user = users.find(u => u.omang === omang && u.password === password);
      
      if (user) {
        // Remove password from user object before storing
        const { password, ...userWithoutPassword } = user;
        await Storage.setItem('user', userWithoutPassword);
        setUser(userWithoutPassword);
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Invalid Omang number or password' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const users = await Storage.getItem('users') || [];
      
      // Check if user already exists with this Omang number
      const existingUser = users.find(u => u.omang === userData.omang);
      if (existingUser) {
        return { success: false, error: 'User already exists with this Omang number' };
      }

      // Add new user
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        progress: {
          completedCourses: 0,
          enrolledPrograms: [],
          points: 0
        }
      };

      users.push(newUser);
      await Storage.setItem('users', users);

      // Auto-login after registration
      const { password, ...userWithoutPassword } = newUser;
      await Storage.setItem('user', userWithoutPassword);
      setUser(userWithoutPassword);

      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await Storage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await Storage.setItem('user', updatedUser);
      setUser(updatedUser);

      // Also update in users array
      const users = await Storage.getItem('users') || [];
      const userIndex = users.findIndex(u => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        await Storage.setItem('users', users);
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;