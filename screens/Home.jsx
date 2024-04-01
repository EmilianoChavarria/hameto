import { View, ScrollView, Text, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { URL } from './ip';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Home() {
    //#1466C8
    const navigation = useNavigation();
    const route = useRoute();

    const [ciudades, setCiudades] = useState([]);
    const [nombreUsuario, setNombreUsuario] = useState('');

    useEffect(() => {
        const checkUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData !== null) {
                    // Usuario ya ha iniciado sesión anteriormente, puedes usar los datos de usuario guardados
                    setNombreUsuario(JSON.parse(userData).name); // o cualquier otra información que necesites
                }
            } catch (error) {
                console.log('Error al recuperar los datos de usuario:', error);
            }
        };

        checkUserData();


        fetch(URL + 'api/hotel/getCities')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'OK') {
                    setCiudades(data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', data.mensaje);
                }
            });
        const { name } = route.params?.userData || {};
        if (name) {
            setNombreUsuario(name);
        }

    }, []);




    const servicios = [
        {
            logo: require('../assets/images/restaurante.png'),
            nombre: "Restaurante"
        },
        {
            logo: require('../assets/images/piscina.png'),
            nombre: "Alberca"
        },
        {
            logo: require('../assets/images/loto.png'),
            nombre: "Spa"
        },
        {
            logo: require('../assets/images/pesa.png'),
            nombre: "Gimnasio"
        },
        {
            logo: require('../assets/images/wifi.png'),
            nombre: "Wifi gratis"
        },
        {

            logo: require('../assets/images/bar.png'),
            nombre: "Bar"
        },
    ]



    const goToHotels = (city) => {
        navigation.navigate('Hoteles', { city: city });
    };



    return (
        <View className="mt-20 px-2">


            {/* view de destinos */}
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>Hola, {nombreUsuario}</Text>

                <Text className="font-bold text-xl mb-4">Descubre hospedajes en destinos populares
                </Text>
                <ScrollView horizontal={true} className="" showsHorizontalScrollIndicator={false}>
                    <View className="flex flex-row">
                        {ciudades.map((ciudad, index) => (
                            <TouchableOpacity key={index} onPress={() => goToHotels(ciudad)}>
                                <View className="mr-4" style={{ width: 250, borderWidth: 1, borderColor: 'lightgray', height: 200, borderRadius: 20 }}>
                                    <Image source={require('../assets/images/hotel.jpg')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                                    <View style={{ padding: 16 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 24 }}>{ciudad}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        ))}

                    </View>
                </ScrollView>
            </View>


            <View className="mt-10 ">
                <Text className="font-bold text-xl mb-4">Contamos con servicios de primera
                </Text>
                <ScrollView horizontal={true} className="" showsHorizontalScrollIndicator={false}>
                    <View className="flex flex-row">
                        {servicios.map((servicio, index) => (
                            <View key={index} className="flex items-center mr-6">
                                <View className="bg-[#c7dff9] p-5 rounded-full">
                                    <Image source={servicio.logo} style={{ height: 35, width: 35 }} />
                                </View>
                                <Text >{servicio.nombre}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
