import {Platform} from "react-native"
import Icon from "react-native-vector-icons/dist/Ionicons";
import * as React from "react";


const debug = false;
const localhost = Platform.OS === 'android' ? "http://10.0.2.2:8080" : "http://localhost:8080"
const icons = {
    Home: 'person-outline',
    Vote: 'clipboard-outline',
    Add: 'add-outline',
    Remove: 'remove-outline',
    Login: "log-in-outline",
    Logout: "log-out-outline",
};

export default {
    BASE_URL: debug ? localhost : "http://140.238.3.159:8080",
    DEFAULT_SIZE: 5,
    DEFAULT_PAGE: 1,
    KEY_AUTH_TOKEN: '@auth:token',
    icon: (name: string, color = "black", size = 25) => <Icon name={icons[name]} color={color} size={size}/>
}
