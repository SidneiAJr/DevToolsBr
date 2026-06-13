import { StyleSheet, Text, View,TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import FundoEconomico from '../Components/FundoEconomico'

interface ClimaData {
  temperatura: number
  vento: number
  codigo: number
  cidade: string
}

const TelaPrevisaoTempo = () => {
  const [clima, setClima] = useState<ClimaData | null>(null)
  const [loading, setLoading] = useState(false)
  const buscarClima = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-29.7600&longitude=-51.1470&current_weather=true&timezone=America/Sao_Paulo')
    const data = await response.json()
      
      if (data.current_weather) {
        setClima({
          temperatura: Math.round(data.current_weather.temperature),
          vento: data.current_weather.windspeed,
          codigo: data.current_weather.weathercode,
          cidade: 'São Leopoldo' 
        })
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao buscar clima')
    } finally {
      setLoading(false)
    }
  }
    const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️'
    if (code <= 2) return '⛅'
    if (code === 3) return '☁️'
    if (code <= 48) return '🌫️'
    if (code <= 55) return '🌧️'
    if (code <= 65) return '☔'
    if (code <= 75) return '❄️'
    return '🌧️'
  }

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Céu limpo'
    if (code <= 2) return 'Parcialmente nublado'
    if (code === 3) return 'Nublado'
    if (code <= 48) return 'Nevoeiro'
    if (code <= 55) return 'Garoa'
    if (code <= 65) return 'Chuva'
    if (code <= 75) return 'Neve'
    return 'Chuva'
  }
  return (
    <FundoEconomico>  
      <View style={styles.container}>
        <Text style={styles.t1}>☁️ Previsão do Tempo</Text>
        <Text style={styles.t2}>São Leopoldo - RS</Text>
        
        <TouchableOpacity style={styles.botao} onPress={buscarClima}>
          <Text style={styles.botaoTexto}>Consultar Clima</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#4CAF50" />}

        {clima && (
          <View style={styles.card}>
            <Text style={styles.cidade}>{clima.cidade}</Text>
            <Text style={styles.icone}>{getWeatherIcon(clima.codigo)}</Text>
            <Text style={styles.temperatura}>{clima.temperatura}°C</Text>
            <Text style={styles.descricao}>{getWeatherDescription(clima.codigo)}</Text>
            <Text style={styles.vento}>💨 Vento: {clima.vento} km/h</Text>
            <Text style={styles.atualizacao}>Atualizado agora</Text>
          </View>
        )}
      </View>
    </FundoEconomico>
  )
}

export default TelaPrevisaoTempo

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
    backgroundColor: '#4CAF50',
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
    backgroundColor: 'rgba(23, 149, 207, 0.54)',
    borderRadius: 16,
    padding: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  icone: {
    fontSize: 60,
    marginBottom: 10,
  },
  temperatura: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  descricao: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
  vento: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  atualizacao: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },
   cidade: {
  fontSize: 24,
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 10,
}
})