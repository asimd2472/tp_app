import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';

// ✅ ENV
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

console.log('BASE_URL', BASE_URL);

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 SEND OTP API
  const sendOtp = async () => {
    if (!email) {
      // Alert.alert('Error', 'Please enter email');
        Toast.show({
          type: 'error',
          text1: '',
          text2: 'Please enter email',
        });
      return;
    }

    try {
      setLoading(true);

    //   const res = await fetch(`${BASE_URL}/send-otp`, {
        const res = await fetch('https://praveshinventory.online/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.status === 1) {
        setShowOtp(true);
        // Alert.alert('Success', data.msg);
          Toast.show({
            type: 'success',
            text1: '',
            text2: data.msg,
          });
      } else {
        // Alert.alert('Error', data.msg);
        Toast.show({
          type: 'error',
          text1: '',
          text2: data.msg,
        });
      }

    } catch (error) {
      console.log(error);
        Toast.show({
          type: 'error',
          text1: '',
          text2: error,
        });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP API
  const verifyOtp = async () => {
    if (!otp) {
      Toast.show({
        type: 'error',
        text1: '',
        text2: 'Please enter OTP',
      });
      return;
    }

    try {
      setLoading(true);

    //   const res = await fetch(`${BASE_URL}/verify-otp`, {
        const res = await fetch('https://praveshinventory.online/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (data.status === 1) {
        // ✅ STORE TOKEN
        await AsyncStorage.setItem('token', data.token);

        // ✅ STORE USER
        await AsyncStorage.setItem(
          'user',
          JSON.stringify(data.user_details)
        );

        // const token = await AsyncStorage.getItem('token');
        // console.log("Token:", token);

        // Alert.alert('Success', data.msg);
          Toast.show({
            type: 'success',
            text1: '',
            text2: data.msg,
          });

        // router.replace('/enquiry'); // better than push
        router.replace('/(tabs)/inventory');
      } else {
       Toast.show({
          type: 'error',
          text1: '',
          text2: data.msg,
        });
      }

    } catch (error) {
      console.log(error);
      Toast.show({
          type: 'success',
          text1: '',
          text2: 'Network error',
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ImageBackground
        source={require('../assets/why-pravesh.jpeg')}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.card}>
          <Text style={styles.title}>Tata Pravesh Inventory</Text>

          {!showOtp ? (
            <>
              <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={sendOtp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Login</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Enter OTP"
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={verifyOtp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>LOGIN</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center'
  },

  card: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    elevation: 5
  },

  title: {
    fontSize: 20,
    marginBottom: 20,
    color: '#0077b6',
    fontWeight: 'bold'
  },

  input: {
    borderWidth: 1,
    borderColor: '#0077b6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#0077b6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },

  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});