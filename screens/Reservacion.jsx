import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './ip';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
};

const DatePickerExample = () => {
    const route = useRoute();
    const { roomId } = route.params;
    const navigation = useNavigation();

    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [showCheckinPicker, setShowCheckinPicker] = useState(false);
    const [showCheckoutPicker, setShowCheckoutPicker] = useState(false);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const showCheckinDatePicker = () => {
        setShowCheckinPicker(true);
    };

    const hideCheckinDatePicker = () => {
        setShowCheckinPicker(false);
    };

    const handleCheckinConfirm = (date) => {
        setCheckin(date);
        hideCheckinDatePicker();
    };

    const showCheckoutDatePicker = () => {
        setShowCheckoutPicker(true);
    };

    const hideCheckoutDatePicker = () => {
        setShowCheckoutPicker(false);
    };

    const handleCheckoutConfirm = (date) => {
        if (checkin && date <= checkin) {
            Alert.alert('La fecha de salida debe ser posterior a la fecha de ingreso');
            setShowCheckoutPicker(false);
        } else {
            setCheckout(date);
            hideCheckoutDatePicker();
        }
    };

    const isDateDisabled = (date) => {
        return date < today;
    };

    const datePickerContainerStyleIOS = {
        backgroundColor: 'white', // Color de fondo del datepicker en iOS
    };

    const customStyles = {
        dateText: {
            color: 'black',
        },
        disabledDateText: {
            color: 'gray',
        },
    };

    const getHotelAndRoomNames = async () => {
        try {
            const hotelName = await AsyncStorage.getItem('hotelName');
            const roomName = await AsyncStorage.getItem('roomName');
            return { hotelName, roomName };
        } catch (error) {
            console.error('Error al obtener los nombres del hotel y la habitación:', error);
            return { hotelName: null, roomName: null };
        }
    };

    const [hotelName, setHotelName] = useState(null);
    const [roomName, setRoomName] = useState(null);

    useEffect(() => {
        const fetchHotelAndRoomNames = async () => {
            const { hotelName, roomName } = await getHotelAndRoomNames();
            setHotelName(hotelName);
            setRoomName(roomName);
        };
        fetchHotelAndRoomNames();
    }, []);

    const saveReservation = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const { peopleId } = JSON.parse(userData).people;

        const reservationData = {
            reservationId: 0,
            checkin: formatDate(checkin),
            checkout: formatDate(checkout),
            discountQuantity: 0,
            discount: 0,
            person: {
                peopleId: peopleId
            },
            hotel: {
                hotelId: 2
            },
            room: {
                roomId: roomId
            }
        };

        const token = JSON.parse(userData).token;

        fetch(URL + 'api/reservation/save', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })

            .then(response => {
                if (response.ok) {
                    console.log(response.data); // Imprime la data si la respuesta es exitosa
                    alert('Reservación guardada exitosamente');
                    navigation.goBack();
                } else {
                    response.json().then(data => {
                        const error = data.mensaje

                        console.error('Error al guardar la reservación: ', data.mensaje);
                        Alert.alert('Error al guardar la reservación', `${error}`); 
                    });
                }
            })
            .catch(error => {
                console.error('Error saving reservation: ', error);
            });
    };


    return (
        <View className="flex-1">
            <View className="flex flex-row p-8 pb-0 items-center mt-6 mb-4">
                <TouchableOpacity className="bg-yellow-400 p-2  rounded-full  w-10 mr-4"
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">
                    Haz tu reservación ya!
                </Text>
            </View>
            <View className="flex flex-col items-center">
                <View className="border-2 rounded-2xl p-4 border-gray-300 w-full mb-4"
                >
                    <Text className="text-xl font-bold mb-4">• Reservación en {hotelName ? hotelName : ' '}</Text>
                    <Text className="text-xl font-bold mb-4">• Habitación: {roomName ? roomName : ' '}</Text>
                </View>

                <Text className="text-xl font-bold mb-4">Selecciona las fechas de tu reserva</Text>
                <View className="w-2/3 mb-4">
                    <Text className="font-bold">Fecha de Ingreso</Text>
                    <TouchableOpacity onPress={showCheckinDatePicker} className="border-2 border-gray-300 rounded-lg p-4 text-center">
                        <Text>{checkin ? formatDate(checkin) : ' '}</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-2/3">
                    <Text className="font-bold">Fecha de Salida</Text>
                    <TouchableOpacity onPress={showCheckoutDatePicker} className="border-2 border-gray-300 rounded-lg p-4 text-center">
                        <Text>{checkout ? formatDate(checkout) : ' '}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="flex items-center">
                <TouchableOpacity className="bg-yellow-400 rounded-lg w-5/6 h-10" onPress={saveReservation} style={{ marginTop: 20 }}>
                    <Text className="text-center text-lg font-bold mt-1">Guardar Reserva</Text>
                </TouchableOpacity>
            </View>


            <DateTimePickerModal
                isVisible={showCheckinPicker}
                mode="date"
                minimumDate={today}
                onConfirm={handleCheckinConfirm}
                onCancel={hideCheckinDatePicker}
                datePickerContainerStyleIOS={datePickerContainerStyleIOS}
                customStyles={customStyles}
                isDateDisabled={isDateDisabled}
            />

            <DateTimePickerModal
                isVisible={showCheckoutPicker}
                mode="date"
                minimumDate={today}
                onConfirm={handleCheckoutConfirm}
                onCancel={hideCheckoutDatePicker}
                datePickerContainerStyleIOS={datePickerContainerStyleIOS}
                customStyles={customStyles}
                isDateDisabled={isDateDisabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});

export default DatePickerExample;
