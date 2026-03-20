import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EnquiryResult() {
  const route = useRoute();
  const navigation = useNavigation();

  // Safe destructure with fallback
  const { hyderabad, ncr } = route.params || {};

  return (
    <View style={styles.container}>
      
      {/* Title */}
      <Text style={styles.title}>
        Tata Pravesh Inventory
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Available Stock
      </Text>

      {/* Stock Row */}
      <View style={styles.stockRow}>

        {/* Hyderabad */}
        <View style={[styles.stockBox, { backgroundColor: '#ff9800' }]}>
          <Text style={styles.stockLabel}>
            Hyderabad
          </Text>
          <Text style={styles.stockValue}>
            {String(hyderabad ?? 0)}
          </Text>
        </View>

        {/* NCR */}
        <View style={[styles.stockBox, { backgroundColor: '#388e3c' }]}>
          <Text style={styles.stockLabel}>
            NCR
          </Text>
          <Text style={styles.stockValue}>
            {String(ncr ?? 0)}
          </Text>
        </View>

      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.prevBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.prevText}>
          PREVIOUS
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e6f9f',
    borderRadius: 16,
    // margin: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  subtitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },

  stockRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },

  stockBox: {
    flex: 1,
    borderRadius: 12,
    marginHorizontal: 8,
    paddingVertical: 24,
    alignItems: 'center',
  },

  stockLabel: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
    fontWeight: 'bold',
  },

  stockValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },

  prevBtn: {
    backgroundColor: '#003049',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },

  prevText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});