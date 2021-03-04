import React, {useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Card from '../components/ProductCard'
import * as data from './products.json';
import Navbar from '../components/Navbar';

const Products = ({navigation}) =>{
  const [produtos, setProdutos] = useState([])
  useEffect(() => {
    if(data){
      setProdutos([...data.default.data])      
    }    
  },[])

  return (
    <View style={styles.main_container}>
      <Navbar navigation={navigation} title="Produtos"/>
      
      {produtos.length !== 0 &&
        
        <FlatList
          data={produtos}
          style={styles.flatlist}
          keyExtractor={(item,index) => index.toString()}
          renderItem = {(produto) => <Card produto={produto} />}
        />
      }
    </View>
  )
}

export default Products;

const styles = StyleSheet.create({
  main_container:{
    flex:1,
    flexDirection: 'column',
    width:'100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF8F7'
  },
  flatlist:{
    width:'100%',
    marginBottom: 20
  }
})


