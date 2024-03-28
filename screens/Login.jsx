import { View, Text, Image } from 'react-native';
import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const navigation = useNavigation();



    
    return (
        <View className="flex-1 ">
            <View className="flex">
                <View className="flex-row justify-center">
                    {/* <TouchableOpacity className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                        onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="black" />
                    </TouchableOpacity> */}
                </View>
                <View className="justify-center items-center h-72 relative">
                    <Image className="opacity-75" source={require("../assets/images/hotel.jpg")} style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50, width: '100%', height: '100%', resizeMode: 'cover' }} />
                    <View className="absolute inset-0 flex flex-row justify-center items-center">
                        <Image className="mr-4" source={require("../assets/images/hotel.png")} style={{ width: 65, height: 70 }} />
                        <Text className="text-white text-4xl font-bold text-center">Hotel Ameto</Text>
                    </View>
                </View>
            </View>
            {/* cuadrito del formulario */}
            <View className="flex-1 bg-white px-8 pt-8 shadow-2xl" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -20 }}>
                <View className="flex flex-row">
                    <TouchableOpacity className="bg-yellow-400 p-2  rounded-full ml-4 w-10 mr-4"
                        onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="black" />
                    </TouchableOpacity>

                    <Text className=" text-3xl font-bold mb-8">
                        Iniciar Sesión
                    </Text>

                </View>
                <View className="form space-y-2">
                    <Text className="text-gray-700 ml-4">Email</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" placeholder="ejemplo@gmail.com" />
                    <Text className="text-gray-700 ml-4">Contraseña</Text>
                    <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-2xl" secureTextEntry placeholder="Contraseña" />
                    <TouchableOpacity className="flex items-end mb-5">
                        <Text className="text-gray-500">
                            ¿Olvidaste tu contraseña?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={()=>navigation.navigate('Bottomtab')}>
                        <Text className="font-xl font-bold text-center text-gray-700">
                            Iniciar Sesión
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="flex-row justify-center mt-7">
                    <Text className="font-semibold">¿No tienes una cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text className="font-semibold text-yellow-400">Regístrate</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    )
}
