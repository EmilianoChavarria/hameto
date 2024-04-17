import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { URL } from './ip';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reservaciones = () => {
    const [reservations, setReservations] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString) {
                    const userData = JSON.parse(userDataString);
                    const userId = userData.user.userId;
                    const response = await fetch(URL + `api/reservation/getByPerson/${userId}`);
                    const json = await response.json();
                    setReservations(json.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchReservations();
    }, []);

    return (
        <View className="flex-1">
            <View className="flex flex-row p-8 pb-0 items-center mt-6 mb-4">
                <TouchableOpacity className="bg-yellow-400 p-2  rounded-full  w-10 mr-4"
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">
                    Mis reservaciones
                </Text>
            </View>
            <ScrollView >
                {reservations.map((reservation) => (
                    <View className="flex flex-col items-center">
                        <View key={reservation.reservationId} className="flex items-center mb-2 w-11/12 rounded-2xl space-y-4 border border-gray-400 py-2">
                            <Text className="font-bold">Hotel: {reservation.hotel.hotelName}</Text>
                            <Text className="font-bold">Cuarto: {reservation.room.roomName}</Text>
                            <Text>Fecha de Entrada: {reservation.checkin}</Text>
                            <Text>Fecha de Salida: {reservation.checkout}</Text>
                        </View>
                    </View>

                ))}
            </ScrollView>
        </View>
    );
};

export default Reservaciones;
