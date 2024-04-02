import { View, Text, TouchableOpacity, ScrollView, Animated, useWindowDimensions, StyleSheet, ImageBackground, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation, useRoute } from '@react-navigation/native';
import { URL } from './ip';

export default function Habitacion() {
    const [habitaciones, setHabitaciones] = useState([]);
    const navigation = useNavigation();
    const route = useRoute();
    const { roomId } = route.params;
    const images = [
        'https://foodandtravel.mx/wp-content/uploads/2020/06/Reapertura-hoteles-por.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
        'https://cdn.forbes.com.mx/2020/07/hoteles-Grand-Velas-Resorts-e1596047698604.jpg',
    ];
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();


    useEffect(() => {
        fetch(URL+`api/room/findOneRoom/${roomId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setHabitaciones(data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', data.mensaje);
                }
            })
            .catch(error => console.error('Error al obtener los datos del hotel:', error));
    }, [roomId]);

    return (
        <View className="flex-1">
            <View className="flex flex-row py-8 px-4 pb-0 items-center mt-6 mb-4">
                <TouchableOpacity className="bg-yellow-400 p-2  rounded-full  w-9 mr-4"
                    onPress={() => navigation.goBack()}>
                    <Icon name="cross" size={20} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-bold">
                    Información de la habitación
                </Text>
            </View>
            <ScrollView>
                {/* esta view es del carrusel */}
                <View style={{ alignItems: 'center' }}>
                    <ScrollView
                        className="mb-2"
                        horizontal={true}
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                        scrollEventThrottle={1}>
                        {images.map((image, imageIndex) => {
                            return (
                                <View style={{ width: windowWidth, height: 250, overflow: 'hidden' }} key={imageIndex}>
                                    <ImageBackground source={{ uri: image }} style={[styles.card, { width: windowWidth }]} />
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.indicatorContainer}>
                        {images.map((_, imageIndex) => {
                            const width = scrollX.interpolate({
                                inputRange: [
                                    windowWidth * (imageIndex - 1),
                                    windowWidth * imageIndex,
                                    windowWidth * (imageIndex + 1),
                                ],
                                outputRange: [8, 16, 8],
                                extrapolate: 'clamp',
                            });
                            return <Animated.View key={imageIndex} style={[styles.normalDot, { width }]} />;
                        })}
                    </View>
                </View>
                <View style={{ paddingHorizontal: 14 }} className="mt-4">
                    <View key={habitaciones.roomId} style={{ padding: 5 }}>
                        <View className="gap-1 mb-3">
                            <Text className="text-2xl font-semibold">{habitaciones.roomName}</Text>
                            <Text>{habitaciones.description}</Text>
                        </View>

                        <View className="bg-[#eee8db] rounded-xl py-4 px-3 mb-4">
                            <View className="flex flex-row items-center mb-2">
                                <Image className="mr-1" source={require('../assets/images/estrellas.png')} style={{ width: 20, height: 20, }} />
                                <Text className="font-bold text-base">Aspectos destacados</Text>
                            </View>
                            <View className="flex flex-row mb-3">
                                <Text className="mr-3">Aire acondicionado</Text>
                                <Text>Televisión</Text>
                            </View>
                            <View className="flex flex-row mb-3">
                                <Text className="mr-3">Secadora de cabello</Text>
                                <Text>Baño Privado</Text>
                            </View>
                            <View className="flex flex-row mb-3">
                                <Text className="mr-3">Agua embotellada gratis</Text>
                                <Text>Canales por cable</Text>
                            </View>
                            <View className="flex flex-row ">
                                <Text className="mr-3">Escritorio</Text>
                                <Text>Servicios de limpieza diaria</Text>
                            </View>
                        </View>
                        <View className="px-2 gap-3">
                            <View className="flex flex-row items-center ">
                                <Image source={require('../assets/images/wi-fi.png')} style={{ width: 18, height: 18 }} />
                                <Text style={{ fontSize: 16 }}> Wifi gratis</Text>
                            </View>
                            <View className="flex flex-row items-center ">
                                <Image source={require('../assets/images/persona.png')} style={{ width: 18, height: 18 }} />
                                <Text style={{ fontSize: 16 }}> {habitaciones.peopleQuantity} personas</Text>
                            </View>

                            <View className="flex flex-row items-center ">
                                <Image source={require('../assets/images/cama.png')} style={{ width: 18, height: 18 }} />
                                <Text style={{ fontSize: 16 }}> Cama Matrimonial</Text>
                            </View>
                        </View>
                        <View className="px-2 mt-4">
                            <Text className="text-lg font-bold">Amenidades en la habitación</Text>
                            <View className="flex flex-row items-center mt-4">
                                <Image source={require('../assets/images/discapacitado.png')} style={{ width: 18, height: 18 }} />
                                <Text className="text-lg font-bold ml-2">Facilidades de acceso</Text>
                            </View>
                            <Text className="ml-7 mt-2">Piso de madera sólida en las habitaciones</Text>
                            <View className="flex flex-row items-center mt-4">
                                <Image source={require('../assets/images/ducha.png')} style={{ width: 18, height: 18 }} />
                                <Text className="text-lg font-bold ml-2">Baño</Text>
                            </View>
                            <Text className="ml-7 mt-2">Secadora de cabello</Text>
                            <Text className="ml-7 mt-2">Baño Privado</Text>
                            <Text className="ml-7 mt-2">Regadera</Text>
                            <Text className="ml-7 mt-2">Toallas</Text>
                            <View className="flex flex-row items-center mt-4">
                                <Image source={require('../assets/images/cama.png')} style={{ width: 18, height: 18 }} />
                                <Text className="text-lg font-bold ml-2">Habitación</Text>
                            </View>
                            <Text className="ml-7 mt-2">Aire acondicionado</Text>
                            <Text className="ml-7 mt-2">Ropa de cama</Text>
                            <View className="flex flex-row items-center mt-4">
                                <Image source={require('../assets/images/garrapata.png')} style={{ width: 18, height: 18 }} />
                                <Text className="text-lg font-bold ml-2">Entretenimiento</Text>
                            </View>
                            <Text className="ml-7 mt-2">Canales por cable</Text>
                            <Text className="ml-7 mt-2">Televisión</Text>
                            <View className="flex flex-row items-center mt-4">
                                <Image source={require('../assets/images/cubiertos.png')} style={{ width: 18, height: 18 }} />
                                <Text className="text-lg font-bold ml-2">Alimentos y bebidas</Text>
                            </View>
                            <Text className="ml-7 mt-2">Agua embotellada gratis</Text>
                            <Text className="ml-7 mt-2">Servicio a la habitación (horario limitado) </Text>
                        </View>
                        <View className="border rounded-lg mt-8 pt-4 flex flex-row " >
                            <Text className="px-4 pb-4 font-bold text-2xl"> MXN $1,234</Text>
                            <TouchableOpacity className="items-center bg-yellow-400 rounded-lg w-32 h-10" >
                                    <Text className="text-center text-lg font-bold mt-1">Reservar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        alignSelf: 'center',
        marginTop: 15,
        width: '90%',
    },
    card: {
        flex: 1,
        resizeMode: 'cover',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    normalDot: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal: 4,
    },
});