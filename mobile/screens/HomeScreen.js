import * as React from 'react';

import { StyleSheet, View, Text,  Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Navbar from '../components/Navbar';

const Stack = createStackNavigator();



export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.main_container}>
      <Navbar navigation={navigation} title=""/>
      <Image
        style={styles.image_cover}
        source={require('../assets/sale.png')}
      />
      <Text style={styles.title}>Bem vinde à Pitanga Cosméticos</Text>

     {/*  <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Produtos"
        onPress={() => navigation.navigate('Products')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({

  main_container:{
    flex:1,
    padding: 10, 
    marginTop: 20,
    backgroundColor: '#FFF8F7'

  },
  title:{
    color: '#4F1711',
    fontSize: 20, 
    textAlign: 'center',
    marginVertical: 24
  },
  image_cover: {
    width: '100%',
    height: 125,
  }
})