import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './screens/Splash';
import Welcome from './screens/Welcome';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Login from './screens/Login';
import BottomTab from './screens/BottomTab';
import Buscar from './screens/Buscar';
import Reservaciones from './screens/Reservaciones';
import Pagos from './screens/Pagos';
import Hoteles from './screens/Hoteles';
import Hotel from './screens/Hotel';
import Habitacion from './screens/Habitacion';
import Ejemplo from './screens/ejemplo';
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Welcome" component={Welcome} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="SignUp" component={SignUp} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Bottomtab" component={BottomTab} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Hoteles" component={Hoteles} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Hotel" component={Hotel} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Rooms" component={Habitacion} screenOptions={{headerShown: false}}/>
        <Stack.Screen name="Ej" component={Ejemplo} screenOptions={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}


