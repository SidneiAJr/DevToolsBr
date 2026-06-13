import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FundoEconomico from '../Components/FundoEconomico'

const TelaBTC = () => {
  const [preco, setPreco] = useState(null)
  const [loading, setLoading] = useState(false)
  const buscarPrecoBTC = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl'
      )
      const data = await response.json()
      setPreco(data.bitcoin.brl)
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao buscar preço do BTC')
    } finally {
      setLoading(false)
    }
  }
  return (
    <FundoEconomico>  
      <View style={styles.container}>
        <Text style={styles.t1}>₿ Bem Vindo</Text>
        <Text style={styles.t2}>API BTC</Text>
        <TouchableOpacity style={styles.botao} onPress={buscarPrecoBTC}>
          <Text style={styles.botaoTexto}>Consultar API</Text>
          {loading && <ActivityIndicator size="large" color="#f7931a" />}
        </TouchableOpacity>
         {preco !== null && (
          <View style={styles.card}>
            <Text style={styles.preco}>R$ {preco.toLocaleString('pt-BR')}</Text>
            <Text style={styles.atualizacao}>Atualizado agora</Text>
          </View>
        )}
      </View>
    </FundoEconomico>
  )
}

export default TelaBTC

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  t1: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    margin: 5
  },
  t2: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    margin: 5
  },
  botao: {
    backgroundColor: '#f7931a',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  preco: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f7931a',
  },
  atualizacao: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
})