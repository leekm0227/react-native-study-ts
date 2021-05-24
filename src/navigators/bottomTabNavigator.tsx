import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import VoteStackNavigator from './voteStackNavigator';
import HomeStackNavigator from './homeStackNavigator';
import axios from 'axios';
import asyncStorage from '@react-native-community/async-storage';
import config from '../config'
import {userUpdate} from '../redux/reducer'
import {useDispatch} from 'react-redux';


export default () => {
    const Tab = createBottomTabNavigator();
    const dispatch = useDispatch()

    // axios setting
    axios.defaults.baseURL = config.BASE_URL
    axios.interceptors.response.use((res: { data: any; }) => res.data, (err: any) => {
        console.log(err)
        return Promise.reject(err)
    })

    // valid token
    asyncStorage.getItem(config.KEY_AUTH_TOKEN).then((token: any) => {
        if (!token) return
        axios.get(`/auth/info`, {headers: {Authorization: token}}).then((res: { data: any; }) => {
            dispatch({type: userUpdate, payload: res.data})
            axios.defaults.headers.common['Authorization'] = token
        }).catch(() => console.log("invalid token"))
    })

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({color, size}) => (config.icon(route.name, color, size))
            })}
            tabBarOptions={{
                activeTintColor: 'black',
                inactiveTintColor: 'gray',
                style: {
                    backgroundColor: 'white',
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeStackNavigator}/>
            <Tab.Screen name="Vote" component={VoteStackNavigator}/>
        </Tab.Navigator>
    )
}
