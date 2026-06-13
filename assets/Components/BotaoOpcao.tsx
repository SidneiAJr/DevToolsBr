import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const BotaoOpcao = ({ onPress, titulo, cor = '#f7931a', icon = '📌' }) => {
  return (
    <TouchableOpacity 
      style={[styles.botao, { backgroundColor: cor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  )
}

export default BotaoOpcao

const styles = StyleSheet.create({
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7931a',
    width: 280,
    height: 55,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: 'white',
  },
  texto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
})