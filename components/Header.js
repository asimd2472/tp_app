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
    alignItems: 'flex-end',

    justifyContent: 'space-between',

    paddingLeft: 20,  
    paddingRight: 0, 

    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    // elevation: 5
  },

  leftLogo: {
    width: 70,
    height: 45
  },

  rightLogo: {
    width: 120,
    height: 45,
    // alignSelf: 'flex-end'
  }
});