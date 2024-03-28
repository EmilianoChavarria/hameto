import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, ImageBackground, Animated, useWindowDimensions, StyleSheet, Text, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export default function Hotel() {
    const [hotel, setHotel] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);

    //esto es del carrusel
    const images = [
        'https://foodandtravel.mx/wp-content/uploads/2020/06/Reapertura-hoteles-por.jpg',
        'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
        'https://cdn.forbes.com.mx/2020/07/hoteles-Grand-Velas-Resorts-e1596047698604.jpg',
    ];
    const scrollX = useRef(new Animated.Value(0)).current;
    const { width: windowWidth } = useWindowDimensions();
    //------------------------------------------------------------------------------------------------
    const navigation = useNavigation();
    const route = useRoute();
    const { hotelId } = route.params;

    useEffect(() => {
        fetch(`http://192.168.100.28:8080/api/hotel/findOne/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setHotel(data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', data.mensaje);
                }
            })
            .catch(error => console.error('Error al obtener los datos del hotel:', error));

        fetch(`http://192.168.100.28:8080/api/room/getByHotel/${hotelId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setHabitaciones(data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', data.mensaje);
                }
            })
            .catch(error => console.error('Error al obtener los datos de las habitaciones:', error));

    }, [hotelId]);

    const [showRoomsButton, setShowRoomsButton] = useState(true);
    const onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const isScrolledDown = currentOffset > 0;
        setShowRoomsButton(!isScrolledDown);
    };

    const scrollViewRef = useRef();

    const scrollToContent = () => {
        scrollViewRef.current.scrollTo({ y: 600, animated: true });
    };

    const goToRoom = (roomId) => {
        navigation.navigate('Room', { roomId: roomId });
    };

    return (
        <View style={{ flex: 1 }}>
            <View className="flex flex-row p-8 pb-0 items-center mt-6 mb-4">
                <TouchableOpacity className="bg-yellow-400 p-2  rounded-full  w-10 mr-4"
                    onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">
                    {hotel.hotelName}
                </Text>
            </View>
            <ScrollView ref={scrollViewRef} onScroll={onScroll} scrollEventThrottle={16}>
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
                <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <Text style={{ fontSize: 18, color: '#395886', marginTop: 16 }}>
                        {hotel.address}
                    </Text>
                    <Text className="mb-4 h-24" style={{ fontSize: 16, marginTop: 8 }}>
                        {hotel.description}
                    </Text>
                    <View style={{ marginTop: 16 }}>
                        <Text style={{ fontSize: 18, color: '#395886', marginBottom: 8 }}>
                            Servicios Principales
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View className=" flex flex-row mt-4">
                                <View style={{ width: '50%' }}>
                                    <ServiceItem icon={require('../assets/images/terraza.png')} text="Terraza" />
                                    <ServiceItem icon={require('../assets/images/jacuzzi.png')} text="Jacuzzi" />
                                </View>
                                <View style={{ width: '50%' }}>
                                    <ServiceItem icon={require('../assets/images/bano-publico.png')} text="Baño completo" />
                                    <ServiceItem icon={require('../assets/images/room-service.png')} text="Servicio al cuarto" />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
                        Habitaciones disponibles
                    </Text>
                    {habitaciones.map(habitacion => (
                        
                        <TouchableOpacity key={habitacion.roomId} onPress={() => goToRoom(habitacion.roomId)}>
                            {/* card por habitación */}
                            <View className="bg-white mb-4" style={{ width: '100%', borderRadius: 20 }}>
                                <Image source={require('../assets/images/cuarto.jpg')} style={{ width: '%90', height: 150, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                <View className="p-4">
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{habitacion.roomName}</Text>
                                    <Text>{habitacion.description}</Text>
                                    <View className="flex flex-row items-center ">
                                        <Image source={require('../assets/images/persona.png')} style={{ width: 18, height: 18 }} />
                                        <Text style={{ fontSize: 16 }}> {habitacion.peopleQuantity} personas</Text>
                                    </View>
                                    <View className="flex flex-row items-center ">
                                        <Image source={require('../assets/images/wi-fi.png')} style={{ width: 18, height: 18 }} />
                                        <Text style={{ fontSize: 16 }}> Wifi gratis</Text>
                                    </View>
                                    <View className="flex flex-row items-center ">
                                        <Image source={require('../assets/images/cama.png')} style={{ width: 18, height: 18 }} />
                                        <Text style={{ fontSize: 16 }}> Cama Matrimonial</Text>
                                    </View>


                                </View>
                                <View className="border-t border-gray-300 w-full py-4">
                                    <Text className="px-4 pb-4 font-bold text-2xl"> MXN $1,234</Text>
                                    <TouchableOpacity className="flex items-center">
                                        <Text className="text-center text-black bg-yellow-400 p-2 rounded-xl w-11/12">
                                            Reservar
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            {showRoomsButton && (
                <View className="flex justify-end fixed">
                    <TouchableOpacity className="bg-yellow-400 p-2 rounded-xl w-full " onPress={scrollToContent}>
                        <Text className="text-black text-center text-lg">
                            Ver Habitaciones
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const ServiceItem = ({ icon, text }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Image source={icon} style={{ width: 30, height: 30, marginRight: 8 }} />
        <Text>{text}</Text>
    </View>
);

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
