// MainStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/dashboardScreen';
import DetailScreen from '../screens/DetailScreen';
const Stack = createNativeStackNavigator();

export function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  );
}
export function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetalleMovie" component={DetailScreen} />
    </Stack.Navigator>
  );
}
