import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../components/home/home';
import Join from '../components/home/join';
import Login from '../components/home/login';

const Stack = createStackNavigator();
export default () => (
    <Stack.Navigator>
        <Stack.Screen name="home" component={Home} options={() => ({title: "HOME"})}/>
        <Stack.Screen name="join" component={Join} options={() => ({title: "JOIN"})}/>
        <Stack.Screen name="login" component={Login} options={() => ({title: "LOGIN"})}/>
    </Stack.Navigator>
)
