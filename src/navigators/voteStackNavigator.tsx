import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Add from "../components/vote/add";
import Detail from "../components/vote/detail";
import List from "../components/vote/list";

const Stack = createStackNavigator();
export default () => (
    <Stack.Navigator>
        <Stack.Screen name="list" component={List} options={() => ({title:"VOTE LIST"})}/>
        <Stack.Screen name="detail" component={Detail} options={() => ({title:"VOTE"})}/>
        <Stack.Screen name="add" component={Add} options={() => ({title:"ADD"})}/>
    </Stack.Navigator>
)
