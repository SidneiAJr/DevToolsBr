import React, { useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Menu = () => {
  const navigation = useNavigation()

  const aoClicarApi      = useCallback(() => navigation.navigate('TelaBTC'), [navigation])
  const aoClicarPrevisao = useCallback(() => navigation.navigate('TelaPrevisaoTempo'), [navigation])
  const aoClicarBCB      = useCallback(() => navigation.navigate('BCB'), [navigation])
  const aoClicarCota     = useCallback(() => navigation.navigate('Cota'), [navigation])
  const aoClicarSubmenu  = useCallback(() => navigation.navigate('submenu'), [navigation])

  // Dados dos cards
  const ferramentas = [
    { id: 1, nome: 'Bitcoin', rota: aoClicarApi, icon: '₿', cor: '#f7931a', desc: 'Cotação BTC' },
    { id: 2, nome: 'Previsão', rota: aoClicarPrevisao, icon: '🌤️', cor: '#3b82f6', desc: 'Clima hoje' },
    { id: 3, nome: 'Taxa Selic', rota: aoClicarBCB, icon: '📈', cor: '#10b981', desc: 'BCB' },
    { id: 4, nome: 'Dólar', rota: aoClicarCota, icon: '💵', cor: '#f59e0b', desc: 'Cotação USD' },
    { id: 5, nome: 'Menu Opção', rota: aoClicarSubmenu, icon: '🏢', cor: '#f7931a', desc: 'Mais ferramentas' },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>🛠️</Text>
          </View>
          <Text style={styles.titulo}>Albertool Tools</Text>
          <Text style={styles.subtitulo}>Selecione uma ferramenta</Text>
          <View style={styles.divider} />
        </View>

        {/* Grid de Cards */}
        <View style={styles.gridContainer}>
          {ferramentas.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { borderTopColor: item.cor }]}
              onPress={item.rota}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIconeBg, { backgroundColor: item.cor }]}>
                <Text style={styles.cardIcone}>{item.icon}</Text>
              </View>
              <Text style={styles.cardTitulo}>{item.nome}</Text>
              <Text style={styles.cardDescricao}>{item.desc}</Text>
              <View style={styles.cardSeta}>
                <Text style={styles.seta}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.version}>v1.0.0</Text>
          <Text style={styles.copyright}>Albertool Tools</Text>
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
    padding: 20,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  emoji: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 5,
  },
  divider: {
    width: 50,
    height: 2,
    backgroundColor: '#3b82f6',
    borderRadius: 1,
    marginTop: 15,
  },

  // Grid de Cards
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: '#f7931a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIconeBg: {
    width: 55,
    height: 55,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardIcone: {
    fontSize: 28,
    color: '#fff',
  },
  cardTitulo: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  cardDescricao: {
    color: '#94a3b8',
    fontSize: 11,
    textAlign: 'center',
  },
  cardSeta: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  seta: {
    fontSize: 14,
    color: '#475569',
  },

  // Footer
  footer: {
    marginTop: 10,
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