import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Botaodolar = ({ onPress, titulo = "💵Dolar" }) => {
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

export default Botaodolar

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#1a1a1a',  // preto suave (não 100% preto)
    width: 300,
    height: 75,
    borderRadius: 30,
    margin: 5,
    justifyContent: 'center',    // centraliza VERTICAL
    alignItems: 'center',        // centraliza HORIZONTAL
    
    // Sombra iOS
    shadowColor: '#000',
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