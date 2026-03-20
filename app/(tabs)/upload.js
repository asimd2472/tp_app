import { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Header from '../../components/Header';

const BASE_URL = 'https://praveshinventory.online/api';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const checkAccess = async () => {
    const storedUser = await AsyncStorage.getItem('user');

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // ❌ NOT ALLOWED
      if (user.user_access !== '2') {
        router.replace('/(tabs)/inventory'); // redirect
        return;
      }
    } else {
      router.replace('/login');
      return;
    }

    setLoading(false);
  };

  checkAccess();
}, []);

  // 📂 PICK FILE
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
      ],
    });

    if (result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };



const uploadFile = async () => {
  console.log('first');
  if (!file) {
    alert('Please select a file');
    return;
  }

  try {
    setLoading(true);

    // ✅ GET TOKEN
    const token = await AsyncStorage.getItem('token');

    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream',
    });

    const res = await axios.post(
      `${BASE_URL}/inventory/upload-excel`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // ✅ TOKEN ADDED
        },
      }
    );

    console.log('Upload response:', res.data);

    alert('File uploaded successfully ✅');

    setFile(null);

  } catch (error) {
    console.log('Upload error:', error?.response?.data || error.message);
    alert('Upload failed ❌');
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
        <Text style={styles.title}>Upload Excel File</Text>

        {/* FILE BOX */}
        <TouchableOpacity style={styles.fileBox} onPress={pickFile}>
          <Text style={styles.fileText}>
            {file ? file.name : 'Tap to select Excel file'}
          </Text>
        </TouchableOpacity>

        {/* FILE INFO */}
        {file && (
          <View style={styles.fileInfo}>
            <Text style={styles.fileName}>{file.name}</Text>
          </View>
        )}

        {/* UPLOAD BUTTON */}
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={uploadFile}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.uploadText}>UPLOAD</Text>
          )}
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

  fileBox: {
    borderWidth: 2,
    borderColor: '#0077b6',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  fileText: {
    color: '#0077b6',
    fontSize: 16,
    fontWeight: '500',
  },

  fileInfo: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },

  fileName: {
    color: '#333',
    fontWeight: 'bold',
  },

  uploadBtn: {
    marginTop: 30,
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});