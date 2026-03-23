import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';

const BASE_URL = 'https://praveshinventory.online/api';

// Custom Picker component with Modal
const CustomPicker = ({
  label,
  selectedValue,
  onValueChange,
  options,
  placeholder = 'Select an option',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const selectedLabel =
    options.find((item) => item === selectedValue) || placeholder;

  return (
    <View>
      <TouchableOpacity
        style={styles.customPickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.customPickerText}>{selectedLabel}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

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
            Authorization: `Bearer ${token}`,
          },
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

  // TYPE → MODEL
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
        const response = await axios.post(
          `${BASE_URL}/inventory/models`,
          { type: value },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
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

  // MODEL → DESIGN
  const handleModel = (value) => {
    setModel(value);

    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/inventory/designs`,
          { type, model: value },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
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

  // DESIGN → SIZE
  const handleDesign = (value) => {
    setDesign(value);

    const fetchSizes = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/inventory/dimention`,
          { type, model, design: value },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
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

  // SIZE → COLOUR
  const handleSize = (value) => {
    setSize(value);

    const fetchColours = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/inventory/colour`,
          { type, model, design, dimention: value },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
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

  // COLOUR → ORIENTATION
  const handleColour = (value) => {
    setColour(value);

    const fetchOrientations = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/inventory/orientation`,
          { type, model, design, dimention: size, colour: value },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
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

  // ORIENTATION → FEATURE
  const handleOrientation = (value) => {
    setOrientation(value);

    const fetchFeatures = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/inventory/special_feature`,
          {
            type,
            model,
            design,
            dimention: size,
            colour,
            orientation: value,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
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

  const inventoryItemCount = async (
    selectedType,
    selectedModel,
    selectedDesign,
    selectedSize,
    selectedColour,
    selectedOrientation,
    selectedFeature
  ) => {
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
      const response = await axios.post(
        `${BASE_URL}/inventory/inventory-item-check`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
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
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.2)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Loading...
          </Text>
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
        <CustomPicker
          selectedValue={type}
          onValueChange={handleType}
          options={types}
          placeholder="Select Product Type"
        />

        {/* MODEL */}
        <Text style={styles.label}>Model</Text>
        <CustomPicker
          selectedValue={model}
          onValueChange={handleModel}
          options={models}
          placeholder="Select Model"
        />

        {designsDesc !== '' && <Text style={styles.label}>{designsDesc}</Text>}

        {/* DESIGN */}
        <Text style={styles.label}>Design</Text>
        <CustomPicker
          selectedValue={design}
          onValueChange={handleDesign}
          options={designs}
          placeholder="Select Design"
        />

        {/* SIZE */}
        <Text style={styles.label}>Size</Text>
        <CustomPicker
          selectedValue={size}
          onValueChange={handleSize}
          options={sizes}
          placeholder="Select Size"
        />

        {/* COLOUR */}
        <Text style={styles.label}>Colour</Text>
        <CustomPicker
          selectedValue={colour}
          onValueChange={handleColour}
          options={colours}
          placeholder="Select Colour"
        />

        {/* ORIENTATION */}
        <Text style={styles.label}>Orientation</Text>
        <CustomPicker
          selectedValue={orientation}
          onValueChange={handleOrientation}
          options={orientations}
          placeholder="Select Orientation"
        />

        {/* FEATURE */}
        <Text style={styles.label}>Special Feature</Text>
        <CustomPicker
          selectedValue={feature}
          onValueChange={setFeature}
          options={features}
          placeholder="Select Special Feature"
        />

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
                    Authorization: `Bearer ${token}`,
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
    padding: 35,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
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
  customPickerButton: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  customPickerText: {
    color: '#000',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',
    maxHeight: '70%',
    padding: 10,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalItemText: {
    color: '#000',
    fontSize: 16,
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
    fontWeight: 'bold',
  },
});