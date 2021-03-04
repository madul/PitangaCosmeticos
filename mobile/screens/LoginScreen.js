import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Alert, TouchableOpacity } from 'react-native';
import Navbar from '../components/Navbar';

export default function Login({navigation}) {
  const [email,setEmail] =  useState("Email")
  const [password, setPassword] = useState("Password")
  const [loginCorreto, setLoginCorreto] = useState(true)
  const [senhaCorreta, setSenhaCorreta] = useState(true)

  function handlePass(e){
    setPassword(e)
  }
  function handleEmail(e){
    setEmail(e)
  }
  function sumbitLogin(e){
    let pass = false;
    let mail = false;

    if (email === "" || email.indexOf('@') <0){
     setLoginCorreto(false)
   } else{
     setLoginCorreto(true)
     mail = true;
   }
   if (password === "" || password.length <6){
     setSenhaCorreta(false)
   } else{
     setSenhaCorreta(true)
     pass = true
   } 

   if(mail && pass){
     Alert.alert(
        "Área Pessoal",
        "Seja bem vinde de volta à Pitanga Cosméticos",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('HomeScreen')
          }
        ] 
     )
   }
  }

  return (
    
    <View style={styles.main_container}>
      <Navbar navigation={navigation} title="Login"/>
      <View style={styles.container}>
      <TextInput
        style={styles.input_text}
        value={email}
        onChangeText={handleEmail}  
        textContentType="emailAddress"    
      />
      {loginCorreto === false && 
        <Text style={styles.messageForm}>Login obrigatório</Text>
      }
      
      <TextInput
        style={styles.input_text}
        value={password}
        onChangeText={handlePass}
        autoCompleteType="password"  
        secureTextEntry={true}
      />
      {senhaCorreta === false && 
        <Text style={styles.messageForm}>Senha obrigatória</Text>
      }
      <TouchableOpacity 
          style={styles.button_login}
          onPress={sumbitLogin}
          accessibilityLabel="Login"
        >
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
    
      </View>
      
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
  container: {
    flex: 1,
    width:'100%',
    backgroundColor: '#FFF8F7',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input_text:{ 
    height: 40,
    width: "90%",
    borderColor: 'gray', 
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button_login:{
    backgroundColor: '#D43019',
    color: 'white',
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical:10,
  },
  login:{
    color: 'white',
  },
  messageForm:{
    color: 'red',
    fontSize:12,
    paddingBottom: 20
  }
});
