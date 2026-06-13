import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const BotaoPequeno = ({ onPress, titulo = "Iniciar" }) => {
  return (
    <TouchableOpacity 
      style={styles.botao} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  )
}

export default BotaoPequeno

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#1b4239',  // preto suave (não 100% preto)
    width: 150,
    height: 75,
    borderRadius: 30,
    margin: 5,
    // Sombra iOS
    shadowColor: '',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    
    // Sombra Android
    elevation: 8,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 20,                // 25 é grande demais, 20 fica melhor
    color: 'white',
    textAlign: 'center',
  }
})