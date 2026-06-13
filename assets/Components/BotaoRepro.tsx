import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BotaoRepro = ({ onPress, titulo = "Simuladores" }) => {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  )
}

export default BotaoRepro

const styles = StyleSheet.create({
  botao: {
    backgroundColor: '#ff7300',
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