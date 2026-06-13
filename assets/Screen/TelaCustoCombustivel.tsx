// Screen/TelaCustoCombustivel.tsx
import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native'

const TelaCustoCombustivel = () => {
  const [kmPorLitro, setKmPorLitro] = useState('')
  const [precoLitro, setPrecoLitro] = useState('')
  const [capacidadeTanque, setCapacidadeTanque] = useState('')
  const [resultado, setResultado] = useState<{
    custoTotalTanque: number
    custoPorKm: number
    distanciaTotal: number
  } | null>(null)

  const calcular = () => {
    const kml = parseFloat(kmPorLitro)
    const preco = parseFloat(precoLitro)
    const capacidade = parseFloat(capacidadeTanque)

    if (isNaN(kml) || isNaN(preco) || isNaN(capacidade)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente')
      return
    }

    if (kml <= 0 || preco <= 0 || capacidade <= 0) {
      Alert.alert('Erro', 'Preencha valores maiores que zero')
      return
    }

    const custoTotalTanque = preco * capacidade
    const distanciaTotal = capacidade * kml
    const custoPorKm = custoTotalTanque / distanciaTotal

    setResultado({
      custoTotalTanque,
      custoPorKm,
      distanciaTotal,
    })
  }

  const limpar = () => {
    setKmPorLitro('')
    setPrecoLitro('')
    setCapacidadeTanque('')
    setResultado(null)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>⛽</Text>
            </View>
            <Text style={styles.titulo}>Custo Combustível</Text>
            <Text style={styles.subtitulo}>Calcule gastos do seu veículo</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>📊 KM por litro</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 12"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={kmPorLitro}
              onChangeText={setKmPorLitro}
            />

            <Text style={styles.label}>💰 Preço do litro (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5,79"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={precoLitro}
              onChangeText={setPrecoLitro}
            />

            <Text style={styles.label}>🛢️ Capacidade do tanque (L)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 50"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={capacidadeTanque}
              onChangeText={setCapacidadeTanque}
            />

            <View style={styles.botoesRow}>
              <TouchableOpacity style={styles.botaoCalcular} onPress={calcular}>
                <Text style={styles.botaoTexto}>Calcular</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
                <Text style={styles.botaoTexto}>Limpar</Text>
              </TouchableOpacity>
            </View>

            {resultado && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTitulo}>Resultados:</Text>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Custo total do tanque:</Text>
                  <Text style={styles.resultadoValor}>R$ {resultado.custoTotalTanque.toFixed(2)}</Text>
                </View>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Custo por KM:</Text>
                  <Text style={styles.resultadoValor}>R$ {resultado.custoPorKm.toFixed(2)}</Text>
                </View>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Distância com tanque cheio:</Text>
                  <Text style={styles.resultadoValor}>{resultado.distanciaTotal.toFixed(1)} km</Text>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.dica}>💡 Dica: Use valores reais do seu carro e da gasolina da sua região.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TelaCustoCombustivel

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  scrollView: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 25, marginTop: 10 },
  emojiContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 2, borderColor: '#3b82f6' },
  emoji: { fontSize: 40 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 5 },
  divider: { width: 50, height: 2, backgroundColor: '#3b82f6', borderRadius: 1, marginTop: 15 },
  card: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#e2e8f0', fontSize: 14, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#0f172a', borderRadius: 12, padding: 12, color: '#fff', fontSize: 16, borderWidth: 1, borderColor: '#334155' },
  botoesRow: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 10 },
  botaoCalcular: { flex: 1, backgroundColor: '#3b82f6', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  botaoLimpar: { flex: 1, backgroundColor: '#475569', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultadoContainer: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#334155' },
  resultadoTitulo: { color: '#94a3b8', fontSize: 14, marginBottom: 10, textAlign: 'center' },
  resultadoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resultadoLabel: { color: '#e2e8f0', fontSize: 14 },
  resultadoValor: { color: '#10b981', fontSize: 16, fontWeight: 'bold' },
  dica: { color: '#475569', fontSize: 11, textAlign: 'center', marginTop: 10 },
})