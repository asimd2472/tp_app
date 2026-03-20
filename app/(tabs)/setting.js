import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Header from '../../components/Header';

export default function Setting() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // ✅ Get user from storage
  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    getUser();
  }, []);

  // ✅ Logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');

    router.replace('/login');
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6fa' }}>
      
      {/* HEADER */}
      <Header />

      <View style={styles.container}>

        {/* TITLE */}
        <Text style={styles.title}>Settings</Text>

        {/* USER CARD */}
        <View style={styles.card}>
          <Text style={styles.label}>Logged in as</Text>
          <Text style={styles.email}>
            {user?.email || 'No Email Found'}
          </Text>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003049',
  },

  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },

  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  logoutBtn: {
    backgroundColor: '#d62828',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});