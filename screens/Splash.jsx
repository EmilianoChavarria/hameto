import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native"
import LottieView from 'lottie-react-native';


const Splash = () => {

    const navigation = useNavigation();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigation.replace('Welcome')
        }, 3000)
        return () => clearTimeout(timeoutId);
    }, [navigation])
    return (
        <View style={style.container}>
            {/* <Image source={require('../assets/images/logo.svg')} style={style.loadingAnimation} /> */}
            <LottieView source={require('../assets/images/Hotel Animation.json')} autoPlay={true} loop={true} style={style.loadingAnimation} />

            <Text style={{ marginTop: 20, fontSize: 32, fontWeight: 'bold', color: '#000' }}>Hotel Ameto</Text>
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white'
    },
    loadingAnimation: {
        width: 300,
        height: 300,
        resizeMode: 'contain'
    }

})

export default Splash;