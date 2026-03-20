import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Header from '../../components/Header';

const BASE_URL = 'https://praveshinventory.online/api';

export default function Download() {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

  // 🔑 Get Token + User
  useEffect(() => {
    const getData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');

      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
    };

    getData();
  }, []);

  const handleDownload = async () => {
  try {
    setLoading(true);
    setMessage('');

    const res = await axios.post(
      `${BASE_URL}/inventory/download-excel`,
      {}, // 👈 body required for POST
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Download response:', res.data);

    if (res.data.status === 1) {
      setMessage(res.data.msg);
    } else {
      setMessage('Something went wrong ❌');
    }

  } catch (error) {
    console.log('API error:', error?.response?.data || error.message);
    setMessage('Download failed ❌');
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f6fa' }}>

      {/* HEADER */}
      <Header />

      <View style={styles.container}>

        {/* TITLE */}
        <Text style={styles.title}>Download Inventory</Text>

        {/* USER EMAIL */}
        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.email}>
            {user?.email || 'No email found'}
          </Text>
        </View>

        {/* INFO BOX */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Click below button to download inventory. File will be sent to your registered email.
          </Text>
        </View>

        {/* DOWNLOAD BUTTON */}
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.downloadText}>DOWNLOAD</Text>
          )}
        </TouchableOpacity>

        {/* SUCCESS MESSAGE */}
        {message !== '' && (
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        )}

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
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },

  label: {
    fontSize: 14,
    color: '#888',
  },

  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },

  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
  },

  infoText: {
    color: '#0077b6',
    fontSize: 14,
  },

  downloadBtn: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  messageBox: {
    marginTop: 20,
    backgroundColor: '#d4edda',
    padding: 12,
    borderRadius: 8,
  },

  messageText: {
    color: '#155724',
    fontWeight: '500',
  },
});