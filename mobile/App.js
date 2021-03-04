import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './screens/LoginScreen';
import Routes from './screens/Routes';
import Products from './screens/Products';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        drawerStyle={{
          backgroundColor: '#FFF8F7'
        }}
        drawerContentOptions={{
          activeBackgroundColor: '#FFB8AA',
          activeTintColor: "#4F1711"
        }}
        initialRouteName="Home">
        <Drawer.Screen name="Home" component={Routes} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Products" component={Products} /> 
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

