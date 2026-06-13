import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import FundoEconomico from '../Components/FundoEconomico'
import * as Notifications from 'expo-notifications'

// Configurar comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

const TelaBTC = () => {
  const [preco, setPreco] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState<string>('')
  const [ultimoPreco, setUltimoPreco] = useState<number | null>(null)
  const [notificacaoEnviada, setNotificacaoEnviada] = useState(false)

  // Solicitar permissão ao abrir a tela
  useEffect(() => {
    solicitarPermissaoNotificacao()
  }, [])

  const solicitarPermissaoNotificacao = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      console.log('Permissão de notificação negada')
    }
  }

  const enviarNotificacao = async (titulo: string, corpo: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: corpo,
        sound: 'default',
      },
      trigger: null, // envia imediatamente
    })
  }

  const buscarPrecoBTC = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl'
      )
      const data = await response.json()
      const novoPreco = data.bitcoin.brl
      setPreco(novoPreco)
      
      // Formata a data/hora da atualização
      const agora = new Date()
      setUltimaAtualizacao(agora.toLocaleTimeString('pt-BR'))
      
      // Verificar se precisa enviar notificação
      if (ultimoPreco !== null) {
        const variacao = ((novoPreco - ultimoPreco) / ultimoPreco) * 100
        
        // Se variou mais de 3%, envia notificação
        if (Math.abs(variacao) >= 3) {
          const direcao = variacao > 0 ? '🚀 subiu' : '📉 desceu'
          await enviarNotificacao(
            `💰 Bitcoin ${direcao} ${variacao.toFixed(1)}%`,
            `BTC: R$ ${novoPreco.toLocaleString('pt-BR')}\nVariação: ${variacao.toFixed(1)}%`
          )
          setNotificacaoEnviada(true)
          
          // Resetar após 10 segundos
          setTimeout(() => setNotificacaoEnviada(false), 10000)
        }
      }
      
      setUltimoPreco(novoPreco)
      
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao buscar preço do BTC')
    } finally {
      setLoading(false)
    }
  }

  // Busca automática a cada 30 segundos (opcional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        buscarPrecoBTC()
      }
    }, 30000) // a cada 30 segundos
    
    return () => clearInterval(interval)
  }, [loading, ultimoPreco])

  return (
    <FundoEconomico>  
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>₿</Text>
          <Text style={styles.titulo}>Bitcoin</Text>
          <Text style={styles.subtitulo}>Cotação em tempo real</Text>
        </View>

        {/* Botão */}
        <TouchableOpacity 
          style={[styles.botao, loading && styles.botaoDisabled]} 
          onPress={buscarPrecoBTC}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.botaoTexto}>Consultar cotação</Text>
          )}
        </TouchableOpacity>

        {/* Resultado */}
        {preco !== null && (
          <View style={styles.card}>
            <Text style={styles.preco}>
              R$ {preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
            <Text style={styles.atualizacao}>
              📅 Última atualização: {ultimaAtualizacao}
            </Text>
            
            {/* Mostra variação se houver */}
            {ultimoPreco && preco !== ultimoPreco && (
              <Text style={[
                styles.variacao,
                preco > ultimoPreco ? styles.variacaoPositiva : styles.variacaoNegativa
              ]}>
                {preco > ultimoPreco ? '▲' : '▼'} 
                {((preco - ultimoPreco) / ultimoPreco * 100).toFixed(2)}%
              </Text>
            )}
          </View>
        )}

        {/* Status da notificação */}
        {notificacaoEnviada && (
          <View style={styles.notificacaoStatus}>
            <Text style={styles.notificacaoTexto}>
              🔔 Notificação enviada!
            </Text>
          </View>
        )}

        {/* Dicas */}
        <Text style={styles.dica}>
          💡 Dica: O app notifica quando Bitcoin varia mais de 3%
        </Text>
        <Text style={styles.dicaPequena}>
          🔔 Busca automática a cada 30 segundos
        </Text>
        
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
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  titulo: {
    color: '#f7931a',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitulo: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  botao: {
    backgroundColor: '#f7931a',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 30,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  botaoDisabled: {
    opacity: 0.6,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  preco: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f7931a',
  },
  atualizacao: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 10,
  },
  variacao: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  variacaoPositiva: {
    color: '#10b981',
  },
  variacaoNegativa: {
    color: '#ef4444',
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
    marginTop: 30,
  },
  dicaPequena: {
    color: '#475569',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  }
})