import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

type UserType = {
  id: any;
  name: any;
  email: any;
  user_access: any;
};

export default function TabLayout() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets(); // ✅ ADD THIS

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) return null;

  const canUpload = String(user?.user_access) === '2';

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#0077b6',
          tabBarStyle: {
            paddingBottom: insets.bottom,   // ✅ IMPORTANT
            height: 60 + insets.bottom,     // ✅ IMPORTANT
          },
        }}
      >
        <Tabs.Screen
          name="inventory"
          options={{
            title: 'Inventory',
            tabBarIcon: ({ color }) => (
              <Ionicons name="cube-outline" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="download"
          options={{
            title: 'Download',
            tabBarIcon: ({ color }) => (
              <Ionicons name="download-outline" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="upload"
          options={{
            title: 'Upload',
            href: canUpload ? undefined : null,
            tabBarIcon: ({ color }) => (
              <Ionicons name="cloud-upload-outline" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="setting"
          options={{
            title: 'Setting',
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings-outline" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="enquiry-result"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}