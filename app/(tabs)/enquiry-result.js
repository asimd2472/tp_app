import { useLocalSearchParams, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header';

export default function EnquiryResult() {
  const router = useRouter();
  const { hyderabad, ncr } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ HEADER */}
      <Header />

      {/* ✅ MAIN CONTENT */}
      <View style={styles.container}>
        <Text style={styles.title}>
          Tata Pravesh Inventory
        </Text>

        <Text style={styles.subtitle}>
          Available Stock
        </Text>

        {/* ✅ STOCK BOX */}
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

        {/* ✅ BACK BUTTON */}
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => router.back()}
        >
          <Text style={styles.prevText}>
            PREVIOUS
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e6f9f',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
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
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  prevText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});