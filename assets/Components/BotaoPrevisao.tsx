// Components/BotaoPrevisao.tsx
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const BotaoPrevisao = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>☁️ Previsão do Tempo</Text>
    </TouchableOpacity>
  )
}

export default BotaoPrevisao

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#4CAF50',
    width: 300,
    height: 75,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  texto: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  }
})