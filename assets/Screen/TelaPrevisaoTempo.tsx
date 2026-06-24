import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FundoEconomico from '../Components/FundoEconomico'
import * as Notifications from 'expo-notifications'

interface DiaClima {
  data: string
  tempMax: number
  tempMin: number
  codigo: number
}

interface ClimaData {
  temperatura: number
  vento: number
  codigo: number
  previsao: DiaClima[]
}

const TelaPrevisaoTempo = () => {
  const [clima, setClima] = useState<ClimaData | null>(null)
  const [loading, setLoading] = useState(false)
  const [notificacaoEnviada, setNotificacaoEnviada] = useState(false)

  const enviarNotificacao = async (titulo: string, corpo: string) => {
    await Notifications.scheduleNotificationAsync({
      content: { title: titulo, body: corpo, sound: 'default' },
      trigger: null,
    })
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

  const getDiaSemana = (dataStr: string) => {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
    const data = new Date(dataStr + 'T12:00:00')
    return dias[data.getDay()]
  }

  const buscarClima = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=-29.7600&longitude=-51.1470&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America/Sao_Paulo'
      )
      const data = await response.json()

      const previsao: DiaClima[] = data.daily.time.map((dataStr: string, i: number) => ({
    data: dataStr,
    tempMax: Math.round(data.daily.temperature_2m_max[i]),
    tempMin: Math.round(data.daily.temperature_2m_min[i]),
    codigo: data.daily.weathercode[i],
}))

      setClima({
        temperatura: Math.round(data.current_weather.temperature),
        vento: data.current_weather.windspeed,
        codigo: data.current_weather.weathercode,
        previsao,
      })

      await enviarNotificacao(
        '🌤️ Previsão do Tempo - São Leopoldo',
        `Agora: ${Math.round(data.current_weather.temperature)}°C ${getWeatherDescription(data.current_weather.weathercode)}\n💨 Vento: ${data.current_weather.windspeed} km/h`
      )
      setNotificacaoEnviada(true)
      setTimeout(() => setNotificacaoEnviada(false), 10000)

    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao buscar clima')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarClima()
    const interval = setInterval(() => buscarClima(), 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <FundoEconomico>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.t1}>☁️ Previsão do Tempo</Text>
        <Text style={styles.t2}>São Leopoldo - RS</Text>

        <TouchableOpacity style={styles.botao} onPress={buscarClima} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Atualizar</Text>}
        </TouchableOpacity>

        {/* Card atual */}
        {clima && (
          <View style={styles.card}>
            <Text style={styles.icone}>{getWeatherIcon(clima.codigo)}</Text>
            <Text style={styles.temperatura}>{clima.temperatura}°C</Text>
            <Text style={styles.descricao}>{getWeatherDescription(clima.codigo)}</Text>
            <Text style={styles.vento}>💨 Vento: {clima.vento} km/h</Text>
          </View>
        )}

        {/* Previsão 7 dias */}
        {clima && (
          <View style={styles.semanaContainer}>
            <Text style={styles.semanaTitle}>📅 Próximos 7 dias</Text>
            {clima.previsao.map((dia, index) => (
              <View key={index} style={styles.diaRow}>
                <Text style={styles.diaNome}>{index === 0 ? 'Hoje' : getDiaSemana(dia.data)}</Text>
                <Text style={styles.diaIcone}>{getWeatherIcon(dia.codigo)}</Text>
                <Text style={styles.diaDesc}>{getWeatherDescription(dia.codigo)}</Text>
                <View style={styles.diaTemps}>
                  <Text style={styles.tempMax}>{dia.tempMax}°</Text>
                  <Text style={styles.tempMin}>{dia.tempMin}°</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {notificacaoEnviada && (
          <View style={styles.notificacaoStatus}>
            <Text style={styles.notificacaoTexto}>🔔 Notificação enviada!</Text>
          </View>
        )}

        <Text style={styles.dica}>🔔 Atualização automática a cada 15 minutos</Text>
      </ScrollView>
    </FundoEconomico>
  )
}

export default TelaPrevisaoTempo

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  t1: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    margin: 5,
  },
  t2: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#94a3b8',
  },
  botao: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 20,
    minWidth: 150,
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgba(23, 149, 207, 0.54)',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
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
  semanaContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  semanaTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  diaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  diaNome: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    width: 45,
  },
  diaIcone: {
    fontSize: 22,
  },
  diaDesc: {
    color: '#94a3b8',
    fontSize: 12,
    flex: 1,
    marginLeft: 8,
  },
  diaTemps: {
    flexDirection: 'row',
    gap: 8,
  },
  tempMax: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tempMin: {
    color: '#60a5fa',
    fontSize: 14,
  },
  notificacaoStatus: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 15,
  },
  notificacaoTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dica: {
    color: '#475569',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 20,
  },
})