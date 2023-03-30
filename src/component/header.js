import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({title, onBack}) => {
  return (
    <View style={styles.container}>
      {title!=='Main' &&<Text onPress={()=>onBack()} style={styles.link}>Back</Text>}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10%',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
  },
  link: {
    fontSize: 16,
    marginLeft: 20,
    position: 'absolute',
    left: 10,
  },
});
