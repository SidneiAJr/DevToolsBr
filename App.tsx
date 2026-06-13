// App.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './assets/Screen/Home';
import TelaBTC from './assets/Screen/TelaBTC';
import TelaPrevisaoTempo from './assets/Screen/TelaPrevisaoTempo';
import TelaBCB from './assets/Screen/TelaBCB';
import TelaCota from './assets/Screen/TelaCota';
import MenuOpcao from './assets/Screen/MenuOpcao';
import TelaSimularFII from './assets/Screen/TelaSimularFII';
import Menu from './assets/Screen/Menu';
import TelaValorHora from './assets/Screen/TelaValorHora';
import TelaConversorTempo from './assets/Screen/TelaConversorTempo';
import TelaJurosCompostos from './assets/Screen/TelaJurosCompostos';
import TelaMonitorRio from './assets/Screen/TelaMonitorRio';
import TelaFontePC from './assets/Screen/TelaFontePC';

export type RootStackParamList = {
  Home: undefined;
  TelaBTC: undefined;
  TelaPrevisaoTempo: undefined
  BCB: undefined
  Cota: undefined
  submenu: undefined
  cotafii: undefined
  menu:undefined
  TelaValorHora:undefined
  TelaConversorTempo:undefined
  TelaJurosCompostos:undefined
  TelaMonitorRio:undefined
  Fonte:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TelaBTC" 
          component={TelaBTC} 
           options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="TelaPrevisaoTempo" 
          component={TelaPrevisaoTempo} 
           options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="BCB" 
          component={TelaBCB} 
           options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Cota" 
          component={TelaCota} 
           options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="submenu" 
          component={MenuOpcao} 
           options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="cotafii" 
          component={TelaSimularFII} 
           options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="menu" 
          component={Menu} 
           options={{ headerShown: false }} 
        />
<Stack.Screen name="TelaValorHora" component={TelaValorHora}  options={{ headerShown: false }}/>
<Stack.Screen name="TelaConversorTempo" component={TelaConversorTempo}  options={{ headerShown: false }}/>
<Stack.Screen name="TelaJurosCompostos" component={TelaJurosCompostos}  options={{ headerShown: false }}/>
<Stack.Screen name="TelaMonitorRio" component={TelaMonitorRio} options={{ headerShown: false }} />
<Stack.Screen name="TelaFontePC" component={TelaFontePC} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}