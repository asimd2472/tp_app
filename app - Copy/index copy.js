import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Header from '../components/Header';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

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
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => setShowOtp(true)}
              >
                <Text style={styles.btnText}>SEND OTP</Text>
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
                onPress={() => router.push('/enquiry')}
              >
                <Text style={styles.btnText}>LOGIN</Text>
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