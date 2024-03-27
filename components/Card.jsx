//glugluglu glugluglu gl
import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Card() {
    return (
        <View style={{ flex: 1 , flexDirection: 'row', gap: 20}}>
            {/* diseño por card */}
            <View style={{ width: 300, borderWidth: 1, borderColor: 'lightgray', height: 200, borderRadius: 20 }}>
                <Image source={require('../assets/images/cardImage.jpg')} style={{ width: '100%', height: '60%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} />
                <View style={{ padding: 16 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Hotel asdo</Text>
                    <Text style={{ color: 'gray', fontSize: 14 }}>Calle 123, Colonia X, CDMX</Text>
                </View>
            </View>
            {/* diseño por card */}
            
        </View>
    )
}
