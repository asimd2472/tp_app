import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../../components/Header';

const BASE_URL = 'https://praveshinventory.online/api';

export default function Enquiry() {
      const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');
  const [model, setModel] = useState('');
  const [design, setDesign] = useState('');
  const [size, setSize] = useState('');
  const [colour, setColour] = useState('');
  const [orientation, setOrientation] = useState('');
  const [feature, setFeature] = useState('');

  const [types, setTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [designs, setDesigns] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colours, setColours] = useState([]);
  const [orientations, setOrientations] = useState([]);
  const [features, setFeatures] = useState([]);
  const router = useRouter();

  // 🔥 Load Types (initial)

  const [token, setToken] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('token').then(setToken);
    // console.log('token', token)
  }, []);

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/inventory/types`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data) {
          setTypes(response.data);
        }
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTypes();
  }, [token]);

  // 🔥 TYPE → MODEL
  const handleType = (value) => {
    setType(value);
    setModel('');
    setDesign('');
    setSize('');
    setColour('');
    setOrientation('');
    setFeature('');

    const fetchModels = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/inventory/models`,
          { type: value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setModels(response.data);
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchModels();
  };

  // 🔥 MODEL → DESIGN
  const handleModel = (value) => {
    setModel(value);

    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/inventory/designs`,
          { type, model: value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setDesigns(response.data.designs);
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchDesigns();
  };

  // 🔥 DESIGN → SIZE
  const handleDesign = (value) => {
    setDesign(value);

    const fetchSizes = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/inventory/dimention`,
          { type, model, design: value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setSizes(response.data);
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchSizes();
  };

  // 🔥 SIZE → COLOUR
  const handleSize = (value) => {
    setSize(value);

    const fetchColours = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/inventory/colour`,
          { type, model, design, dimention: value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setColours(response.data);
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchColours();
  };

  // 🔥 COLOUR → ORIENTATION
  const handleColour = (value) => {
    setColour(value);

    const fetchOrientations = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/inventory/orientation`,
          { type, model, design, dimention: size, colour: value },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setOrientations(response.data);
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchOrientations();
  };

  // 🔥 ORIENTATION → FEATURE
  const handleOrientation = (value) => {
    setOrientation(value);

    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/inventory/special_feature`,
          {
            type,
            model,
            design,
            dimention: size,
            colour,
            orientation: value
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setFeatures(response.data);
      } catch (err) {
        if (err.response) {
          console.log('error status', err.response.status);
          console.log('error data', err.response.data);
        } else {
          console.log('error', err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchFeatures();
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      {loading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.2)', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Loading...</Text>
        </View>
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <Text style={styles.title}>Tata Pravesh Inventory</Text>
        {/* TYPE */}
        <Text style={styles.label}>Product Type</Text>
        <Picker selectedValue={type} onValueChange={handleType} style={styles.input}>
          <Picker.Item label="Select Product Type" value="" />
          {types.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        {/* MODEL */}
        <Text style={styles.label}>Model</Text>
        <Picker selectedValue={model} onValueChange={handleModel} style={styles.input}>
          <Picker.Item label="Select Model" value="" />
          {models.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        {/* DESIGN */}
        <Text style={styles.label}>Design</Text>
        <Picker selectedValue={design} onValueChange={handleDesign} style={styles.input}>
          <Picker.Item label="Select Design" value="" />
          {designs.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        {/* SIZE */}
        <Text style={styles.label}>Size</Text>
        <Picker selectedValue={size} onValueChange={handleSize} style={styles.input}>
          <Picker.Item label="Select Size" value="" />
          {sizes.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        {/* COLOUR */}
        <Text style={styles.label}>Colour</Text>
        <Picker selectedValue={colour} onValueChange={handleColour} style={styles.input}>
          <Picker.Item label="Select Colour" value="" />
          {colours.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        {/* ORIENTATION */}
        <Text style={styles.label}>Orientation</Text>
        <Picker selectedValue={orientation} onValueChange={handleOrientation} style={styles.input}>
          <Picker.Item label="Select Orientation" value="" />
          {orientations.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        {/* FEATURE */}
        <Text style={styles.label}>Special Feature</Text>
        <Picker selectedValue={feature} onValueChange={setFeature} style={styles.input}>
          <Picker.Item label="Select Special Feature" value="" />
          {features.map((item, i) => (
            <Picker.Item key={i} label={item} value={item} />
          ))}
        </Picker>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={async () => {
            setLoading(true);
            try {
              const payload = {
                type,
                model,
                design,
                dimention: size,
                colour,
                orientation,
                special_feature: feature || 'No Special Features',
              };
              const response = await axios.post(
                `${BASE_URL}/inventory/stock`,
                payload,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                }
              );
              console.log('API response:', response.data);
              if (response.data) {
                // navigation.navigate('enquiry-result', {
                //   hyderabad: response.data.hyderabad,
                //   ncr: response.data.ncr,
                // });
                router.push({
                  pathname: '/(tabs)/enquiry-result',
                  params: {
                    hyderabad: response.data.hyderabad,
                    ncr: response.data.ncr,
                  },
                });
              }
            } catch (err) {
              console.log('API error:', err);
              alert('Something went wrong. Please try again.');
            } finally {
              setLoading(false);
            }
          }}
        >
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e6f9f',
    padding: 20
  },

  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },

  label: {
    color: '#fff',
    marginTop: 10
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10
  },

  nextBtn: {
    backgroundColor: '#003049',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 0,
    minWidth: 80,
    width: 'auto',
  },

  nextText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

