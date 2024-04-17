import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from './ip';

export default function Hoteles() {
    const [hoteles, setHoteles] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const route = useRoute();
    const { city } = route.params;

    useEffect(() => {
        fetch(URL+`api/hotel/${city}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setHoteles(data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', data.mensaje);
                }
            })
            .catch(error => console.error('Error al obtener los datos:', error))
            .finally(() => setLoading(false));
    }, []);

    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    };

    const goToHotelDetail = async (hotelId) => {
        try {
            await AsyncStorage.setItem('selectedHotelId', hotelId.toString());
            navigation.navigate('Hotel', { hotelId: hotelId });
        } catch (error) {
            console.error('Error al guardar el hotelId en AsyncStorage:', error);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            <View className="flex flex-row p-8 pb-0 items-center mt-6 mb-2" style={{width: '95%'}}>
                <TouchableOpacity className="bg-yellow-400 p-2  rounded-full  w-10 mr-4"
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">
                    Hoteles en {city}
                </Text>
            </View>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: 6 }}>
                    {hoteles.map((hotel, index) => (
                        
                        <TouchableOpacity key={index} onPress={() => goToHotelDetail(hotel.hotelId)} style={{ marginBottom: 8 }}>
                        
                            <View  style={{ width: '95%', height: 'auto', borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3, flexDirection: 'row', backgroundColor: '#ffffff' }}>
                                <View style={{ paddingTop: 8, paddingLeft:8, paddingRight:8, paddingBottom:2 }}>
                                    <Image source={require('../assets/images/hotel-1.jpg')} style={{ borderRadius: 15, width: 110, height: 100 }} />
                                </View>
                                <View style={{ padding: 8, flex: 1 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{hotel.hotelName}</Text>
                                    <Text style={{ width: '90%' }}>{truncateDescription(hotel.description, 110)}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                    <View style={{ height: 20 }}></View>
                </View>
            </ScrollView>
        </View>
    )
}