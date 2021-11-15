import React from 'react';

// Library 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import vectorIcon from 'react-native-vector-icons/MaterialCommunityIcons'

// Screen 

import Home from '../Screen/Home';
import Splashscreen from '../Containers/Auth/Splashscreen';
import Splash from '../Containers/Auth/Splash'
import Profile from '../Screen/Profile';
import Ramen from '../Screen/Ramen';
import CustomDrawer from '../Containers/CustomDrawer';
import Register from '../Containers/Auth/Register';
import Login from '../Containers/Auth/Login';
import Null from '../Screen/Null';

const Stack = createNativeStackNavigator();
const Bot = createDrawerNavigator();
const Top = createBottomTabNavigator()


function Main() {
  return (
    <Stack.Navigator
    screenOptions={{headerShown: false}}
    >
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Null" component={Null} />
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
      <Stack.Screen name="Ramen" component={Ramen} />
    </Stack.Navigator>
  );
}

function Draw() {
  return (
    <Bot.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Bot.Screen name="Home" component={Home} />
      <Bot.Screen name="Profile" component={Profile} />
    </Bot.Navigator>
  );
}

function Toop() {
  return (
    <Top.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize : 15},
      tabBarStyle: {backgroundColor : 'yellow'},
      headerShown: false
    }}>
      <Top.Screen name="Home" component={Draw} options={{tabBarActiveTintColor: 'red',tabBarInactiveTintColor: 'skyblue' }}/>
      <Top.Screen name="Profile" component={Profile} options={{tabBarActiveTintColor: 'red',tabBarInactiveTintColor: 'skyblue'}}/>
    </Top.Navigator>
  )
}

export default Main;
