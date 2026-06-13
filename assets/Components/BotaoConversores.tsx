import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const BotaoConversores = ({ onPress, titulo = "📚 Conversores" }) => {
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

export default BotaoConversores

const styles = StyleSheet.create({
  botao: {
    backgroundColor: 'blue',  // verde bonito
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
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
  }
})