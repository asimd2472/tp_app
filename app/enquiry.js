import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/Header';

const BASE_URL = 'https://praveshinventory.online/api';

export default function Enquiry() {
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

  // 🔥 Load Types (initial)
  useEffect(() => {
    fetch(`${BASE_URL}/user/inventory/types`)
      .then(res => res.json())
      .then(data => setTypes(data))
      .catch(err => console.log(err));
  }, []);

  // 🔥 TYPE → MODEL
  const handleType = (value) => {
    setType(value);
    setModel('');
    setDesign('');
    setSize('');
    setColour('');
    setOrientation('');
    setFeature('');

    fetch(`${BASE_URL}/user/inventory/models`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: value })
    })
      .then(res => res.json())
      .then(data => setModels(data))
      .catch(err => console.log(err));
  };

  // 🔥 MODEL → DESIGN
  const handleModel = (value) => {
    setModel(value);

    fetch(`${BASE_URL}/user/inventory/designs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, model: value })
    })
      .then(res => res.json())
      .then(data => setDesigns(data.designs))
      .catch(err => console.log(err));
  };

  // 🔥 DESIGN → SIZE
  const handleDesign = (value) => {
    setDesign(value);

    fetch(`${BASE_URL}/user/inventory/dimention`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, model, design: value })
    })
      .then(res => res.json())
      .then(data => setSizes(data))
      .catch(err => console.log(err));
  };

  // 🔥 SIZE → COLOUR
  const handleSize = (value) => {
    setSize(value);

    fetch(`${BASE_URL}/user/inventory/colour`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, model, design, dimention: value })
    })
      .then(res => res.json())
      .then(data => setColours(data))
      .catch(err => console.log(err));
  };

  // 🔥 COLOUR → ORIENTATION
  const handleColour = (value) => {
    setColour(value);

    fetch(`${BASE_URL}/user/inventory/orientation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, model, design, dimention: size, colour: value })
    })
      .then(res => res.json())
      .then(data => setOrientations(data))
      .catch(err => console.log(err));
  };

  // 🔥 ORIENTATION → FEATURE
  const handleOrientation = (value) => {
    setOrientation(value);

    fetch(`${BASE_URL}/user/inventory/special_feature`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        model,
        design,
        dimention: size,
        colour,
        orientation: value
      })
    })
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(err => console.log(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView style={styles.container}>
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

        <TouchableOpacity style={styles.nextBtn}>
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
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },

  nextText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});