import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from "./src/navigators/bottomTabNavigator"
import {Provider} from 'react-redux';
import {store} from "./src/redux";
import * as React from "react";

export default () => (
    <Provider store={store}>
        <NavigationContainer>
            <BottomTabNavigator/>
        </NavigationContainer>
    </Provider>
);
