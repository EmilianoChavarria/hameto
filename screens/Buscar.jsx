import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Buscar() {
  const navigation = useNavigation();
  const [hoteles, setHoteles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.100.28:8080/api/hotel/')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          setHoteles(data.data);
          setFilteredData(data.data);
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

  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = hoteles.filter(hotel =>
      hotel.hotelName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setFilteredData(hoteles);
  };

  const goToHotelDetail = (hotelId) => {
    navigation.navigate('Hotel', { hotelId: hotelId });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View>
      <View className="px-6 mt-8 flex flex-row items-center mb-2">
        <Icon name="search" size={20} color="#555" style={{ marginRight: 10 }} />
        <TextInput className="p-4 bg-gray-300 text-gray-700 rounded-2xl w-10/12" placeholder="Buscar Hotel" value={searchTerm}
          onChangeText={handleSearch} />
        {searchTerm !== '' && (
          <TouchableOpacity onPress={clearSearch} style={{ paddingHorizontal: 10 }}>
            <Icon name="times" size={20} color="#555" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View style={{ alignItems: 'center', marginTop: 6 }}>
          {filteredData.length === 0 ? (
            <View className="flex items-center">
              <Text className="mt-10" style={{ fontSize: 22, fontWeight: 'bold', color: '#555' }}>No se han encontrado hoteles</Text>
              <Image source={require('../assets/images/errorHotel.png')} style={{ borderRadius: 15, width: 110, height: 300, width: 300 }} />
            </View>
          ) : (
            filteredData.map((hotel, index) => (
              <TouchableOpacity key={index} onPress={() => goToHotelDetail(hotel.hotelId)} style={{ marginBottom: 8 }}>
                <View style={{ width: 335, height: 106, borderRadius: 20, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3, flexDirection: 'row', backgroundColor: '#ffffff' }}>
                  <View style={{ padding: 8 }}>
                    <Image source={require('../assets/images/hotel.jpg')} style={{ borderRadius: 15, width: 110, height: 90 }} />
                  </View>
                  <View style={{ padding: 8, flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{hotel.hotelName}</Text>
                    <Text style={{ width: 200 }}>{truncateDescription(hotel.description, 110)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
          <View style={{ height: 20 }}></View>
        </View>
      </ScrollView>
    </View>
  )
}
