import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FundoEconomico from '../Components/FundoEconomico'

interface SelicData {
  valor: string
  data: string
}

const TelaBCB = () => {
  const [selic, setSelic] = useState<SelicData | null>(null)
  const [loading, setLoading] = useState(false)

  const buscarSelic = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json')
      const data = await response.json()
      
      if (data && data[0]) {
        setSelic({
          valor: data[0].valor,
          data: data[0].data
        })
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao buscar Selic')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <FundoEconomico>  
      <View style={styles.container}>
        <Text style={styles.t1}>🏦 Taxa Selic</Text>
        
        <TouchableOpacity style={styles.botao} onPress={buscarSelic}>
          <Text style={styles.botaoTexto}>Consultar Selic</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#f7931a" />}

        {selic && (
          <View style={styles.card}>
            <Text style={styles.valor}>{selic.valor}%</Text>
            <Text style={styles.data}>Atualizado em {selic.data}</Text>
            <Text style={styles.obs}>Meta definida pelo Copom</Text>
          </View>
        )}
      </View>
    </FundoEconomico>
  )
}

export default TelaBCB

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
    margin: 5,
    marginBottom: 20
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
    backgroundColor: 'rgba(247, 147, 26, 0.54)',
    borderRadius: 16,
    padding: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  valor: {
    fontSize: 48,
    fontWeight: 900,
    color: 'red',
  },
  data: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  obs: {
    fontSize: 12,
    color: 'black',
    marginTop: 8,
  }
})