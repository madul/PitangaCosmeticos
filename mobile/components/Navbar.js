import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Navbar = ({ navigation, title }) =>{
  const goHome = () =>{
    navigation.navigate('HomeScreen')
  }
  
  return (
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.logo}
          onPress={goHome}
        >
          <Image style={{height:50, resizeMode: 'contain'}} source={require('../assets/pitanga2_logo_dark_menu.png')} alt="Pitanga"/>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
  )
}

export default Navbar;

const styles = StyleSheet.create({
  navbar:{
    width: '100%',
    padding:10,
    backgroundColor: '#FFB8AA',
    color: '#4F1711',
    fontWeight:'bold',
    alignItems:'center',
    justifyContent:'space-between',    
    flexDirection:'row',
    marginBottom: 20
  },
  logo:{
    width:'40%',
    alignItems:'center',
  },
  title:{
    color: '#4F1711',
    fontSize: 30,
    marginRight: 10
  },
})


