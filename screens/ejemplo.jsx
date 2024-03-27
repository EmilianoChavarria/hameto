import React, { useRef } from 'react';
import { ScrollView, Button, View, Text } from 'react-native';

const Ejemplo = () => {
  const scrollViewRef = useRef();

  const scrollToContent = () => {
    scrollViewRef.current.scrollTo({ y: 100, animated: true });
  };

  return (
    <ScrollView ref={scrollViewRef}>
      <View style={{ height: 200, backgroundColor: 'gray', marginTop:20 }}>
        <Text>Contenido superior</Text>
      </View>
      <Button title="Ir al contenido" onPress={scrollToContent} />
      <View style={{ height: 800, backgroundColor: 'lightgray' }}>
        <Text>Contenido inferior</Text>
      </View>
    </ScrollView>
  );
};

export default Ejemplo;
