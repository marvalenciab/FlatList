import AntDesign from '@expo/vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Personajes from './src/screens/personajes';

const TabNav = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name='Home' component={Home} />
      <HomeStack.Screen name='Personajes' component={Personajes} />
    </HomeStack.Navigator>
  );
}
function RoutingTabs() {
  return (
    <TabNav.Navigator initialRouteName='Home'>
      <TabNav.Screen
        name='Home'
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => <AntDesign name='retweet' size={24} color='black' />,
          headerShown: false,
        }}
      ></TabNav.Screen>
    </TabNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RoutingTabs />
    </NavigationContainer>
  );
}
