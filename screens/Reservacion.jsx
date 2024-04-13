import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './ip';

const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`;
};

const DatePickerExample = () => {
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
            alert('La fecha de salida debe ser posterior a la fecha de ingreso');
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

    const saveReservation = async () => {
        const userData = await AsyncStorage.getItem('userData');
        const { peopleId } = JSON.parse(userData).people;

        const reservationData = {
            reservationId: 0,
            checkin: formatDate(checkin),
            checkout: formatDate(checkout),
            discountQuantity: 10.1,
            discount: 0,
            person: {
                peopleId: peopleId
            },
            hotel: {
                hotelId: 2
            },
            room: {
                roomId: 5
            }
        };
        console.log(reservationData)
        const token = JSON.parse(userData).token;
        console.log('Token JWT:', token); // Aquí imprimes el token JWT

        fetch(URL + 'api/reservation/save', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(responseData => {
                if (responseData) {
                    const data = JSON.parse(responseData);
                    console.log(data);
                } else {
                    console.error('Empty response from server');
                }
            })
            .catch(error => {
                console.error('Error saving reservation: ', error);
            });

    };


    return (
        <View style={styles.container}>
            <View className="flex flex-row">
                <View className="w-1/2">
                    <Text className="font-bold">Fecha de Ingreso</Text>
                    <TouchableOpacity onPress={showCheckinDatePicker} className="border-2 border-gray-300 rounded-lg p-4 text-center">
                        <Text>{checkin ? formatDate(checkin) : ' '}</Text>
                    </TouchableOpacity>
                </View>
                <View className="w-1/2">
                    <Text className="font-bold">Fecha de Salida</Text>
                    <TouchableOpacity onPress={showCheckoutDatePicker} className="border-2 border-gray-300 rounded-lg p-4 text-center">
                        <Text>{checkout ? formatDate(checkout) : ' '}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={saveReservation} style={{ marginTop: 20 }}>
                <Text>Guardar Reserva</Text>
            </TouchableOpacity>

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
