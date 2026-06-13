import { StyleSheet, Text, TouchableOpacity, View, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const MenuOpcao = () => {
  const navigation = useNavigation()

  const opcoes = [
    { id: 1, nome: 'Simular FII', rota: 'cotafii', icon: '🏢', cor: '#f7931a', desc: 'Proventos' },
    { id: 2, nome: 'Monitor do Rio', rota: 'TelaMonitorRio', icon: '🌊', cor: '#3b82f6', desc: 'Nível água' },
    { id: 3, nome: 'Conversor de Tempo', rota: 'TelaConversorTempo', icon: '⏱️', cor: '#10b981', desc: 'Anos → Dias' },
    { id: 4, nome: 'Valor por Hora', rota: 'TelaValorHora', icon: '💰', cor: '#f59e0b', desc: 'Salário' },
    { id: 5, nome: 'Juros Compostos', rota: 'TelaJurosCompostos', icon: '📈', cor: '#8b5cf6', desc: 'Investimentos' },
    { id: 6, nome: 'Calculadora PC', rota: 'TelaFontePC', icon: '📈', cor: '#8b5cf6', desc: 'Fonte PC' },
  ]

  const navegar = (rota: string) => {
    navigation.navigate(rota as never)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>🛠️</Text>
            </View>
            <Text style={styles.titulo}>Ferramentas MAX</Text>
            <Text style={styles.subtitulo}>Selecione uma ferramenta</Text>
            <View style={styles.divider} />
          </View>

          {/* Grid de Cards */}
          <View style={styles.gridContainer}>
            {opcoes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, { borderTopColor: item.cor }]}
                onPress={() => navegar(item.rota)}
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
            <Text style={styles.copyright}>MAX TOOLS BR</Text>
          </View>
          
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MenuOpcao

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
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
    fontSize: 24,
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
  footer: {
    marginTop: 20,
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