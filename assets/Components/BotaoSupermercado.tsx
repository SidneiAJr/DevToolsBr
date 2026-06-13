import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const BotaoSupermecado = ({ onPress, titulo = "🛒 Supermercado" }) => {
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

export default BotaoSupermecado

const styles = StyleSheet.create({
  botao: {
    backgroundColor: 'grey',  // verde bonito
    width: 300,
    height: 75,
    borderRadius: 30,
    justifyContent: 'center',    // ← centraliza VERTICALMENTE o texto
    alignItems: 'center',        // ← centraliza HORIZONTALMENTE o texto
    
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    
    // Sombra para Android
    elevation: 8,
    margin: 5
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  }
})