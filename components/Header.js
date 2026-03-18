import { Image, StyleSheet, View } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/tatasteel-logo-blue.png')}
        style={styles.leftLogo}
        resizeMode="contain"
      />

      <Image
        source={require('../assets/logo.jpeg')}
        style={styles.rightLogo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // elevation: 4,
    zIndex: 10
  },

  leftLogo: {
    width: 75,
    height: 40
  },

  rightLogo: {
    width: 150,
    height: 40
  }
});