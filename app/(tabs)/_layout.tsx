import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';

type UserType = {
  id: any;
  name: any;
  email: any;
  user_access: any;
};

export default function TabLayout() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

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

  // ✅ check access
  const canUpload = String(user?.user_access) === '2';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0077b6',
        tabBarStyle: {
          paddingBottom: 10,
          height: 55,
        },
      }}
    >
      {/* INVENTORY */}
      <Tabs.Screen
        name="inventory"
        options={{
          title: 'Inventory',
          tabBarIcon: ({ color }) => (
            <Ionicons name="cube-outline" size={24} color={color} />
          ),
        }}
      />

      {/* DOWNLOAD */}
      <Tabs.Screen
        name="download"
        options={{
          title: 'Download',
          tabBarIcon: ({ color }) => (
            <Ionicons name="download-outline" size={24} color={color} />
          ),
        }}
      />

      {/* ✅ UPLOAD (HIDE USING href) */}
      <Tabs.Screen
        name="upload"
        options={{
          title: 'Upload',
          href: canUpload ? undefined : null, // 🔥 THIS IS THE FIX
          tabBarIcon: ({ color }) => (
            <Ionicons name="cloud-upload-outline" size={24} color={color} />
          ),
        }}
      />

      {/* SETTING */}
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />

      {/* HIDDEN PAGE */}
      <Tabs.Screen
        name="enquiry-result"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}