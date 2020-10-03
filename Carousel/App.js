/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CarouselView from './src/screens/CarouselView';




const AppNavigator = createStackNavigator({

  CarouselView: {
    screen: CarouselView
  },
}, 
{
  //Add this property to hide the navigation bar at top from all the screens 
  defaultNavigationOptions: {
    headerShown: false
  },
},
{
    initialRouteName: 'CarouselView',
});

export default createAppContainer(AppNavigator);
