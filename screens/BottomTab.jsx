import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import Buscar from './Buscar';
import Reservaciones from './Reservaciones';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iconss from 'react-native-vector-icons/MaterialIcons';
import Perfil from './Perfil';

const Tab = createBottomTabNavigator();
const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        background: '#fff',
        height: 60,
    }
}

export default function BottomTab() {
    return (

        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                            <Icon name="home" size={20} color="black" style={{ color: focused ? '#e32f45' : '#748c94'}}/>
                            <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Home</Text>
                        </View>
                    )
                }} />
            <Tab.Screen name="Buscar" component={Buscar} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Icon name="search1" size={20} color="black" style={{ color: focused ? '#e32f45' : '#748c94'}} />
                        <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Buscar</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Reservaciones" component={Reservaciones} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Icons name="hotel" size={20} color="black" style={{ color: focused ? '#e32f45' : '#748c94'}}/>
                        <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Reservaciones</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Perfil" component={Perfil} options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
                        <Iconss name="face" size={20} color="black" style={{ color: focused ? '#e32f45' : '#748c94'}}/>
                        <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 12 }}>Perfil</Text>
                    </View>
                )
            }} />
        </Tab.Navigator>

    )
}