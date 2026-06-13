import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import BotaoIniciar from '../Components/BotaoIniciar'

const { width, height } = Dimensions.get('window')

const Home = () => {
  const navigation = useNavigation()
  const [saudacao, setSaudacao] = useState('')
  const [horaAtual, setHoraAtual] = useState('')

  useEffect(() => {
    const atualizarHora = () => {
      const now = new Date()
      const horas = now.getHours()
      const minutos = now.getMinutes().toString().padStart(2, '0')
      setHoraAtual(`${horas}:${minutos}`)

      if (horas < 12) setSaudacao('Bom dia 🌅')
      else if (horas < 18) setSaudacao('Boa tarde ☀️')
      else setSaudacao('Boa noite 🌙')
    }

    atualizarHora()
    const interval = setInterval(atualizarHora, 60000) // atualiza a cada minuto

    return () => clearInterval(interval)
  }, [])

  const aoClicarMenu = () => {
    navigation.navigate('menu')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View style={styles.fundo}>
        
        {/* Header com gradiente visual */}
        <View style={styles.header}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>🚀</Text>
          </View>
          <Text style={styles.titulo}>Albertool Tools</Text>
          <Text style={styles.subtitulo}>Ferramentas profissionais</Text>
          
          <View style={styles.divider} />
          
          {/* Saudação e hora */}
          <View style={styles.infoContainer}>
            <Text style={styles.saudacao}>{saudacao}</Text>
            <Text style={styles.hora}>{horaAtual}</Text>
          </View>
        </View>

        {/* Card de estatísticas rápidas */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Rápido acesso</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>11</Text>
              <Text style={styles.statLabel}>Ferramentas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>APIs</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Disponível</Text>
            </View>
          </View>
          <BotaoIniciar onPress={aoClicarMenu} />
        </View>
        

        {/* Footer com versão */}
        <View style={styles.footer}>
          <Text style={styles.version}>Versão 0.0.1 Alpha</Text>
          <Text style={styles.copyright}>© 2026 Albertool Tools</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  fundo: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: 30,
  },
  emojiContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  emoji: {
    fontSize: 50,
  },
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#3b82f6',
    borderRadius: 2,
    marginVertical: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#334155',
  },
  saudacao: {
    fontSize: 16,
    color: '#e2e8f0',
    fontWeight: '600',
  },
  hora: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#334155',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 20,
  },
  version: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
  },
  copyright: {
    color: '#334155',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
})
