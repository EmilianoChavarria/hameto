import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil({ navigation }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                console.log('userData:', userData);
                if (userData) {
                    setUserData(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Error al obtener datos de usuario:', error);
            }
        };
        fetchUserData();
    }, []);

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setUserData(null);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home', params: { userData: null } }],
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            Alert.alert('Error', 'Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo.');
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'start', alignItems: 'center' }}>
            <View className="flex flex-row pt-10 justify-center items-center bg-yellow-500 w-full">
                <Text className="ml-3 text-3xl font-bold">Hotel Hameto</Text>
            </View>
            {userData ? (
            <>
                <View className="flex flex-row bg-yellow-500 w-full py-4 items-center justify-center rounded-b-3xl">
                    <Image source={require('../assets/images/user.png')} style={{ width: 70, height: 70, borderRadius: 50 }} />
                    <View className="flex flex-col" style={{ marginLeft: 10 }}>
                        <View className="flex flex-row">
                            <Text className="text-2xl font-semibold">{userData.people.name} </Text>
                            <Text className="text-2xl font-semibold">{userData.people.lastname} </Text>
                        </View>

                        <Text className="text-2xl font-semibold">{userData.people.surname}</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={logout} style={{ marginTop: 20, backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </>
        ) : (
            <TouchableOpacity onPress={()=>navigation.navigate('Login')} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Iniciar sesión</Text>
            </TouchableOpacity>
        )}
            
        </View>
    );
}
