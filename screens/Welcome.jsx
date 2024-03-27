import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation();
    return (
        <View className="flex-1 bg-white">

            <View className="flex-1 flex justify-around my-4">
                <Text className="font-bold text-4xl text-center">Reserva ahora!</Text>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/images/imagen-welcome.png")} style={{ width: 300, height: 300 }} />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text className="text-xl font-bold text-center text-gray-700">
                            Regístrate                        
                            </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="font-semibold">¿Ya tienes una cuenta? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-yellow-400">Inicia Sesión</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </View>
    )
}