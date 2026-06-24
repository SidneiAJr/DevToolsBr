import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import FundoEconomico from '../Components/FundoEconomico'
import React, { useState, useEffect } from 'react'
import * as Notifications from 'expo-notifications'

interface MoedaData {
  valor: string
  data: string
}

interface MoedasState {
  dolar: MoedaData | null
  euro: MoedaData | null
  libra: MoedaData | null
}

const TelaCota = () => {
  const [moedas, setMoedas] = useState<MoedasState>({ dolar: null, euro: null, libra: null })
  const [loading, setLoading] = useState(false)
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('')
  const [notificacaoEnviada, setNotificacaoEnviada] = useState(false)

  const enviarNotificacao = async (titulo: string, corpo: string) => {
    await Notifications.scheduleNotificationAsync({
      content: { title: titulo, body: corpo, sound: 'default' },
      trigger: null,
    })
  }

  const buscarMoedas = async () => {
    setLoading(true)
    try {
      const [dolar, euro, libra] = await Promise.all([
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.1/dados/ultimos/1?formato=json').then(r => r.json()),
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.21619/dados/ultimos/1?formato=json').then(r => r.json()),
        fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.21623/dados/ultimos/1?formato=json').then(r => r.json()),
      ])

      setMoedas({
        dolar: dolar[0] || null,
        euro: euro[0] || null,
        libra: libra[0] || null,
      })

      const agora = new Date()
      setUltimaAtualizacao(agora.toLocaleTimeString('pt-BR'))

      await enviarNotificacao(
        '💱 Atualização de Moedas',
        `💵 USD: R$ ${parseFloat(dolar[0].valor).toFixed(2)}\n💶 EUR: R$ ${parseFloat(euro[0].valor).toFixed(2)}\n💷 GBP: R$ ${parseFloat(libra[0].valor).toFixed(2)}`
      )
      setNotificacaoEnviada(true)
      setTimeout(() => setNotificacaoEnviada(false), 10000)

    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao buscar cotações')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    buscarMoedas()
    const interval = setInterval(() => buscarMoedas(), 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <FundoEconomico>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.titulo}>💱 Cotação de Moedas</Text>
        <Text style={styles.subtitulo}>Fonte: Banco Central do Brasil</Text>

        <TouchableOpacity style={styles.botao} onPress={buscarMoedas} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Atualizar</Text>}
        </TouchableOpacity>

        {/* Dólar */}
        {moedas.dolar && (
          <View style={[styles.card, { borderColor: '#85bb65' }]}>
            <Text style={styles.cardEmoji}>💵</Text>
            <Text style={styles.cardTitulo}>Dólar Americano</Text>
            <Text style={[styles.valor, { color: '#85bb65' }]}>
              R$ {parseFloat(moedas.dolar.valor).toFixed(2)}
            </Text>
            <Text style={styles.data}>Ref: {moedas.dolar.data}</Text>
          </View>
        )}

        {/* Euro */}
        {moedas.euro && (
          <View style={[styles.card, { borderColor: '#4169e1' }]}>
            <Text style={styles.cardEmoji}>💶</Text>
            <Text style={styles.cardTitulo}>Euro</Text>
            <Text style={[styles.valor, { color: '#4169e1' }]}>
              R$ {parseFloat(moedas.euro.valor).toFixed(2)}
            </Text>
            <Text style={styles.data}>Ref: {moedas.euro.data}</Text>
          </View>
        )}

        {/* Libra */}
        {moedas.libra && (
          <View style={[styles.card, { borderColor: '#c41e3a' }]}>
            <Text style={styles.cardEmoji}>💷</Text>
            <Text style={styles.cardTitulo}>Libra Esterlina</Text>
            <Text style={[styles.valor, { color: '#c41e3a' }]}>
              R$ {parseFloat(moedas.libra.valor).toFixed(2)}
            </Text>
            <Text style={styles.data}>Ref: {moedas.libra.data}</Text>
          </View>
        )}

        {notificacaoEnviada && (
          <View style={styles.notificacaoStatus}>
            <Text style={styles.notificacaoTexto}>🔔 Notificação enviada!</Text>
          </View>
        )}

        <Text style={styles.dica}>🔔 Atualização automática a cada 15 minutos</Text>
        {ultimaAtualizacao ? <Text style={styles.dica}>⏱ Última atualização: {ultimaAtualizacao}</Text> : null}

      </ScrollView>
    </FundoEconomico>
  )
}

export default TelaCota

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  titulo: {
    color: 'white',
    fontSize: 25,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitulo: {
    color: '#475569',
    fontSize: 11,
    marginBottom: 25,
  },
  botao: {
    backgroundColor: '#f7931a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
  },
  cardEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  cardTitulo: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 8,
  },
  valor: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 11,
    color: '#475569',
    marginTop: 6,
  },
  notificacaoStatus: {
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginTop: 10,
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
    marginTop: 10,
  }
})