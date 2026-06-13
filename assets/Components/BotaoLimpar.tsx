import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BotaoLimpar = () => {
  return (
    <TouchableOpacity style={styles.botao}>
        <Text style={styles.texto}>🧹Limpar</Text>
    </TouchableOpacity>
  )
}

export default BotaoLimpar

const styles = StyleSheet.create({
    botao:{
        backgroundColor: 'red',
        color: 'white',
        width: 250,
        height: 50,
        borderRadius: 30,
    },
    texto:{
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'white'
    }
})