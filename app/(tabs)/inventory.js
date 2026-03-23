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
  View,
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
  const [itemCount, setItemCount] = useState(0);
  const [designsDesc, setDesignsDesc] = useState('');
  
  const router = useRouter();
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token').then(setToken);
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
        inventoryItemCount(value, '', '', '', '', '', '');
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
        setDesignsDesc(response?.data?.description || '');
        inventoryItemCount(type, value, '', '', '', '', '');
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
        inventoryItemCount(type, model, value, '', '', '', '');
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
        inventoryItemCount(type, model, design, value, '', '', '');
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
        inventoryItemCount(type, model, design, size, value, '', '');
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
        inventoryItemCount(type, model, design, size, colour, value, '');
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
  
  const inventoryItemCount = async (selectedType, selectedModel, selectedDesign, selectedSize, selectedColour, selectedOrientation, selectedFeature) => {
      try {
        const payload = {
          type: selectedType,
          model: selectedModel,
          design: selectedDesign,
          dimention: selectedSize,
          colour: selectedColour,
          orientation: selectedOrientation,
          special_feature: selectedFeature,
        };
        console.log('inventoryItemCount payload:', payload);
        const response = await axios.post(`${BASE_URL}/inventory/inventory-item-check`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        console.log('inventoryItemCount response:', response.data.itemCount);
        setItemCount(response.data.itemCount);
      } catch (err) {
        if (err.response) {
          console.log('inventoryItemCount error status:', err.response.status);
          console.log('inventoryItemCount error data:', err.response.data);
        } else {
          console.log('inventoryItemCount error:', err.message);
        }
      }
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
        {itemCount !== 0 && (
          <Text style={styles.itemCount}>{itemCount} items selected</Text>
        )}
        {/* TYPE */}
        <Text style={styles.label}>Product Type</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={type} onValueChange={handleType} style={styles.picker} color="#000">
            <Picker.Item label="Select Product Type" value="" />
            {types.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* MODEL */}
        <Text style={styles.label}>Model</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={model} onValueChange={handleModel} style={styles.picker} color="#000">
            <Picker.Item label="Select Model" value="" />
            {models.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {designsDesc !== '' && (
          <Text style={styles.label}>{designsDesc}</Text>
        )}

        {/* DESIGN */}
        <Text style={styles.label}>Design</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={design} onValueChange={handleDesign} style={styles.picker} color="#000">
            <Picker.Item label="Select Design" value="" />
            {designs.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* SIZE */}
        <Text style={styles.label}>Size</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={size} onValueChange={handleSize} style={styles.picker} color="#000">
            <Picker.Item label="Select Size" value="" />
            {sizes.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* COLOUR */}
        <Text style={styles.label}>Colour</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={colour} onValueChange={handleColour} style={styles.picker} color="#000">
            <Picker.Item label="Select Colour" value="" />
            {colours.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* ORIENTATION */}
        <Text style={styles.label}>Orientation</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={orientation} onValueChange={handleOrientation} style={styles.picker} color="#000">
            <Picker.Item label="Select Orientation" value="" />
            {orientations.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

        {/* FEATURE */}
        <Text style={styles.label}>Special Feature</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={feature} onValueChange={setFeature} style={styles.picker} color="#000">
            <Picker.Item label="Select Special Feature" value="" />
            {features.map((item, i) => (
              <Picker.Item key={i} label={item} value={item} />
            ))}
          </Picker>
        </View>

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
                special_feature: feature,
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
              console.log('Stock API response:', response.data);
              if (response.data) {
                router.push({
                  pathname: '/(tabs)/enquiry-result',
                  params: {
                    hyderabad: response.data.hyderabad,
                    ncr: response.data.ncr,
                  },
                });
              }
            } catch (err) {
              console.log('Stock API error:', err);
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
    padding: 35
  },

  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold'
  },

  label: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },

  itemCount: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'right',
  },

  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 0,
    marginTop: 5,
  },

  picker: {
    backgroundColor: 'transparent',
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