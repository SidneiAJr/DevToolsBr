import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FundoEconomico from '../Components/FundoEconomico'

interface DolarData {
  bid: string
  create_date: string
}

const TelaCota = () => {
  const [dolar, setDolar] = useState<DolarData | null>(null)
  const [loading, setLoading] = useState(false)

  const buscarDolar = async () => {
  setLoading(true)
  try {
    // ✅ API do BCB (sem limite, gratuita)
    const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/1?formato=json')
    const data = await response.json()
    
    if (data && data[0]) {
      setDolar({
        bid: data[0].valor,
        create_date: data[0].data
      })
    }
  } catch (error) {
    console.error('Erro:', error)
    alert('Erro ao buscar cotação')
  } finally {
    setLoading(false)
  }
}

  return (
        <FundoEconomico>  
      <View style={styles.container}>
        <Text style={styles.titulo}>💵 Cotação do Dólar</Text>
        
        {/* ✅ BOTÃO CORRETO */}
        <TouchableOpacity style={styles.botao} onPress={buscarDolar}>
          <Text style={styles.botaoTexto}>Consultar Dólar</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#f7931a" />}

        {dolar && (
          <View style={styles.card}>
            <Text style={styles.valor}>R$ {parseFloat(dolar.bid).toFixed(2)}</Text>
            <Text style={styles.data}>Atualizado em: {dolar.create_date}</Text>
          </View>
        )}
      </View>
    </FundoEconomico>
  )
}

export default TelaCota

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 30
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
    fontWeight: 'bold',
    color: '#f7931a',
  },
  data: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  }
})