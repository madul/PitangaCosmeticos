import React, {useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';


const ProductCard = (props) =>{
  const produto = props.produto.item
  const [imageURL, setImageURL] = useState({})
 
 useEffect(()=>{
  setImageURL({image: produto.image});
 },[]) 

  return (
    <View style={styles.main_container} >
      {typeof imageURL.image !== undefined  &&
      <View style={styles.image_container}>
        {/* 
          Funcionando na web:
          <Image style={{width: 100, height: 100}}source={require(`../assets/produtos/${produto.image}`)} alt={produto.name}/> */}
        <Image style={{width: 100, height: 100}}source={require(`../assets/produtos/base_nude.jpg`)} alt={produto.name}/>
      </View> 
      }
      <View >
        <Text style={styles.name} >{produto.name}</Text>
        <Text style={styles.range} >{produto.range}</Text>
      </View>
      <View style={styles.price_container}>
          { produto.currentPrice !== produto.price
            ? <Text style={styles.price}>R$ {parseFloat(produto.price).toFixed(2)}</Text>
            : null
          }
          <Text style={styles.currentPrice}> R$ {parseFloat(produto.currentPrice).toFixed(2)}</Text>
      </View>
    </View>  
  )
}

export default ProductCard;

const styles = StyleSheet.create({

  main_container:{
    width: '50%',
    backgroundColor: '#FFE9E5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: "#BDBDBD",
    textAlign: 'center',
    marginBottom: 10,
    paddingTop: 5,
    paddingVertical:5

  },
  title:{
    color: '#4F1711',
    fontSize: 20,
  },
  name:{
    color: "#4F1711",
    fontWeight: 'bold',
    paddingHorizontal: 5,
    marginVertical: 10,
    textAlign: 'center'
  },
  price:{
    color:'gray',
    textDecorationLine: 'line-through',
    textAlign: 'center'
  },
  currentPrice:{
    color: "#638C35",
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  }
})


