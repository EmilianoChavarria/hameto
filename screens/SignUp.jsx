import React, { useState } from 'react';
import { View, Text, Image, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFormatedDate } from 'react-native-modern-datepicker';
import { RadioButton } from 'react-native-paper';
import moment from 'moment';
import { URL } from './ip';


export default function SignUp() {
  const navigation = useNavigation();
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [surnameValue, setSurnameValue] = useState('');
  const [curpValue, setCurpValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState('hombre'); // Estado para almacenar el género seleccionado


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };


  const handleSignUp = async () => {
    if (!emailValue || !passwordValue || !nameValue || !lastNameValue || !surnameValue || !curpValue) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const userData = {
      email: emailValue,
      password: passwordValue,
      rol: { rolName: 'USER_ROLE' },
      people: {
        name: nameValue,
        lastname: lastNameValue,
        surname: surnameValue,
        birthday: formattedDate,
        curp: curpValue,
        sex: gender
      }
    };

    console.log(userData);
    try {
      const response = await fetch(URL + 'api/user/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        Alert.alert('Registro exitoso', 'Usuario registrado exitosamente', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]); console.log('Usuario registrado exitosamente');
      } else {
        console.error('Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };






  return (
    <View className="flex-1">
      <View className="flex">


        <View className="justify-center items-center h-52 relative">
          <Image className="opacity-75" source={require("../assets/images/hotel-1.jpg")} style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50, width: '100%', height: '100%', resizeMode: 'cover' }} />
          <View className="absolute inset-0 flex flex-row justify-center items-center">
            <Image className="mr-4" source={require("../assets/images/hotel.png")} style={{ width: 65, height: 70 }} />
            <Text className="text-white text-4xl font-bold text-center">Hotel Ameto</Text>
          </View>
        </View>
      </View>

      {/* cuadrito del formulario */}
      <View className="flex-1 bg-white px-8 pt-8 shadow-2xl" style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: -20 }}>
        <View className="flex flex-row">
          <TouchableOpacity className="bg-yellow-400 p-2 rounded-full ml-4 w-10 mr-4 h-10"
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="black" />
          </TouchableOpacity>

          <Text className=" text-3xl font-bold mb-4">
            Registrarse
          </Text>

        </View>
        <View className="form space-y-2 px-0">
          <TextInput placeholder="Nombre" className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-12" style={{ borderBottomWidth: 2, borderColor: '#4181E1', padding: 10 }} value={nameValue}
            onChangeText={setNameValue} />
          <View style={{ flexDirection: 'row' }}>
            <TextInput value={lastNameValue}
              onChangeText={setLastNameValue} className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-12 mr-2" placeholder="Primer Apellido" style={{ flex: 1, borderBottomWidth: 2, borderColor: '#4181E1' }} />
            <TextInput value={surnameValue}
              onChangeText={setSurnameValue} className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-12" placeholder="Segundo Apellido" style={{ flex: 1, borderBottomWidth: 2, borderColor: '#4181E1' }} />
          </View>
          <TextInput value={curpValue}
            onChangeText={setCurpValue} placeholder="CURP" className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-12" style={{ borderBottomWidth: 2, borderColor: '#4181E1', padding: 10 }} />

          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-12 " placeholder="Correo Electrónico" style={{ borderBottomWidth: 2, borderColor: '#4181E1', }} value={emailValue}
            onChangeText={setEmailValue} />
          <TextInput className="p-4 bg-gray-100 text-gray-700 rounded-lg  h-12" placeholder="Contraseña" secureTextEntry style={{ borderBottomWidth: 2, borderColor: '#4181E1' }} value={passwordValue}
            onChangeText={setPasswordValue} />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginRight: 10 }}>Sexo:</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="hombre"
                status={gender === 'hombre' ? 'checked' : 'unchecked'}
                onPress={() => setGender('hombre')}
              />
              <Text style={{ marginRight: 20 }}>Hombre</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <RadioButton
                value="mujer"
                status={gender === 'mujer' ? 'checked' : 'unchecked'}
                onPress={() => setGender('mujer')}
              />
              <Text>Mujer</Text>
            </View>
          </View>

          <TouchableOpacity onPress={showDatePicker} className="p-3 bg-gray-100 text-gray-700 rounded-lg  h-12" style={{ borderBottomWidth: 2, borderColor: '#4181E1', padding: 10 }}>
            <Text>{selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : 'Selecciona una fecha'}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={handleSignUp}>
            <Text className="font-xl font-bold text-center text-gray-700">
              Regístrate
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center ">
          <Text className="font-semibold">¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="font-semibold text-yellow-400">Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}
