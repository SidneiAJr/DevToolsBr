import React, { useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import BotaoApi from '../Components/BotaoApi'
import BotaoEco from '../Components/BotaoEco'
import BotaoPrevisao from '../Components/BotaoPrevisao'
import Botaodolar from '../Components/Botaodolar'
import BotaoOpcao from '../Components/BotaoOpcao'
import BotaoPequeno from '../Components/BotaoPequeno'

const Menu = () => {
  const navigation = useNavigation()

  const aoClicarApi      = useCallback(() => navigation.navigate('TelaBTC'), [navigation])
  const aoClicarPrevisao = useCallback(() => navigation.navigate('TelaPrevisaoTempo'), [navigation])
  const aoClicarBCB      = useCallback(() => navigation.navigate('BCB'), [navigation])
  const aoClicarCota     = useCallback(() => navigation.navigate('Cota'), [navigation])
  const aoClicarSubmenu  = useCallback(() => navigation.navigate('submenu'), [navigation])

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>💰</Text>
          <Text style={styles.titulo}>MAX TOOLS BR</Text>
          <Text style={styles.subtitulo}>Selecione uma ferramenta</Text>
        </View>

        {/* Botões */}
        <View style={styles.container}>
          <BotaoApi      onPress={aoClicarApi} />
          <BotaoPrevisao onPress={aoClicarPrevisao} />
          <BotaoEco      onPress={aoClicarBCB} />
          <Botaodolar    onPress={aoClicarCota} />
          <BotaoOpcao
            onPress={aoClicarSubmenu}
            titulo="🏢 Menu de Opção"
            cor="#f7931a"
          />
          <Text style={styles.version}>v0.0.1 Alpha</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Menu

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 32,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#ffffff',
    letterSpacing: 1,
  },
  subtitulo: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 6,
  },

  // Card de botões
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    gap: 4,
  },
  version: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
})