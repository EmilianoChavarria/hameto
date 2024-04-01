import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil({ navigation }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    setUserData(JSON.parse(userData));
                }
            } catch (error) {
                console.error('Error al obtener datos de usuario:', error);
            }
        };
        fetchUserData();
    }, []); // No incluyas userData en la dependencia

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setUserData(null); // Actualiza el estado para reflejar que el usuario se ha cerrado sesión
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {userData && (
                <>
                    <Text>{userData.name}</Text>
                    <Text>{userData.surname}</Text>
                    <Text>{userData.lastname}</Text>
                </>
            )}
            <TouchableOpacity onPress={logout} style={{ marginTop: 20, backgroundColor: 'red', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}
