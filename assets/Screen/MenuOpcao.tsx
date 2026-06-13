import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TelaSimularFII from './TelaSimularFII'
import { useNavigation } from '@react-navigation/native';
import BotaoRepro from '../Components/BotaoRepro';

const MenuOpcao = ({ onPressFII }) => {
   const navigation = useNavigation()
   const aoClicarApi = () => {
    navigation.navigate('cotafii');
  }
  const aoRio = () => {
    navigation.navigate('TelaMonitorRio');
  }
  const aoTelaValorHora = () => {
    navigation.navigate('TelaValorHora');
  }
  const aoTelaConversorTempo = () => {
    navigation.navigate('TelaConversorTempo');
  }
  const aoTelaJurosCompostos = () => {
    navigation.navigate('TelaJurosCompostos');
  }
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>📊Menu Opção:</Text>
      
      <TouchableOpacity 
        style={styles.botaoFII} 
        onPress={aoClicarApi}
        activeOpacity={0.7}
      >
        <Text style={styles.texto}>Simular Proventos FII</Text>
        <Text style={styles.seta}>→</Text>
      </TouchableOpacity>
      <BotaoRepro onPress={aoRio} titulo="🌊 Monitor do Rio" />
<BotaoRepro onPress={aoTelaConversorTempo} titulo="⏱️ Conversor de Tempo" />
<BotaoRepro onPress={aoTelaValorHora} titulo="💰 Valor por Hora" />
<BotaoRepro onPress={aoTelaJurosCompostos} titulo="📈 Juros Compostos" />
    </View>
  )
}

export default MenuOpcao

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  titulo: {
    color: '#94a3b8',
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  botaoFII: {
    flexDirection: 'row',
     width: 300,
    height: 75,
    alignItems: 'center',
    backgroundColor: '#f7931a',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  botaoAcao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontSize: 22,
    marginRight: 12,
    color: 'white',
  },
  texto: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  seta: {
    fontSize: 18,
    color: 'white',
    opacity: 0.7,
  }
})