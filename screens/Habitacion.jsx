import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Habitacion() {
    const [habitaciones, setHabitaciones] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { hotelId } = route.params;

    useEffect(() => {
        fetch(`http://192.168.100.28:8080/api/room/getByHotel/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setHabitaciones(data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', data.mensaje);
                }
            })
            .catch(error => console.error('Error al obtener los datos del hotel:', error));
    }, [hotelId]);

    return (
        <View>
            <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center', marginTop: 6, marginBottom: 2 }}>
                <TouchableOpacity style={{ backgroundColor: 'yellow', padding: 4, borderRadius: 20, width: 40, marginRight: 4 }}
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                    Habitaciones disponibles
                </Text>
            </View>
            <ScrollView>
                {habitaciones.map(habitacion => (
                    <View key={habitacion.roomId} style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{habitacion.roomName}</Text>
                        <Text style={{ fontSize: 16 }}>Capacidad: {habitacion.peopleQuantity} personas</Text>
                        <Text>{habitacion.description}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
