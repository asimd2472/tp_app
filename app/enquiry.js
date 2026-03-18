import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Header from '../components/Header';

export default function Enquiry() {
  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Tata Pravesh Inventory</Text>

        {[
          'Product Type',
          'Model',
          'Design',
          'Size',
          'Colour',
          'Orientation',
          'Special Feature'
        ].map((item, index) => (
          <View key={index} style={styles.field}>
            <Text style={styles.label}>{item}</Text>
            <TextInput
              placeholder={`Select ${item}`}
              style={styles.input}
            />
          </View>
        ))}

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

  field: { marginBottom: 15 },

  label: {
    color: '#fff',
    marginBottom: 5
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12
  },

  nextBtn: {
    backgroundColor: '#003049',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },

  nextText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});