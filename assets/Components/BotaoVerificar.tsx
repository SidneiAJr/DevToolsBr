import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const BotaoVerificar = () => {
  return (
    <TouchableOpacity style={styles.botao}>
        <Text style={styles.texto}>✔Verificar</Text>
    </TouchableOpacity>
  )
}

export default BotaoVerificar

const styles = StyleSheet.create({
    botao:{
        backgroundColor: 'green',
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