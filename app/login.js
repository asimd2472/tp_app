import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔥 TIMER STATE
  const [timer, setTimer] = useState(0); // seconds
  const [canResend, setCanResend] = useState(false);

  // ⏱️ TIMER EFFECT
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // 🔥 SEND OTP
  const sendOtp = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text2: 'Please enter email',
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('https://praveshinventory.online/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.status === 1) {
        setShowOtp(true);

        // ✅ START 5 MIN TIMER (300 sec)
        setTimer(300);
        setCanResend(false);

        Toast.show({ type: 'success', text2: data.msg });
      } else {
        Toast.show({ type: 'error', text2: data.msg });
      }

    } catch (error) {
      Toast.show({ type: 'error', text2: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RESEND OTP
  const resendOtp = async () => {
    if (!canResend) return;

    try {
      setLoading(true);

      const res = await fetch('https://praveshinventory.online/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.status === 1) {
        // ✅ RESET TIMER
        setTimer(300);
        setCanResend(false);

        Toast.show({ type: 'success', text2: 'OTP Resent' });
      } else {
        Toast.show({ type: 'error', text2: data.msg });
      }

    } catch (error) {
      Toast.show({ type: 'error', text2: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  // 🔥 VERIFY OTP
  const verifyOtp = async () => {
    if (!otp) {
      Toast.show({
        type: 'error',
        text2: 'Please enter OTP',
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch('https://praveshinventory.online/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });

      const data = await res.json();

      if (data.status === 1) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user_details));

        Toast.show({ type: 'success', text2: data.msg });

        router.replace('/(tabs)/inventory');

      } else {
        Toast.show({ type: 'error', text2: data.msg });
      }

    } catch (error) {
      Toast.show({ type: 'error', text2: 'Network error' });
    } finally {
      setLoading(false);
    }
  };

  // ⏱️ FORMAT TIMER MM:SS
  const formatTime = () => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ImageBackground
        source={require('../assets/why-pravesh.jpeg')}
        style={styles.bg}
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
              />

              <TouchableOpacity style={styles.button} onPress={sendOtp}>
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

              {/* ⏱️ TIMER */}
              {!canResend ? (
                <Text style={styles.timerText}>
                  Resend OTP in {formatTime()}
                </Text>
              ) : (
                <TouchableOpacity onPress={resendOtp}>
                  <Text style={styles.resendText}>Resend OTP</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnText}>VERIFY</Text>
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
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  timerText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  },
  resendText: {
    color: '#0077b6',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold'
  }
});