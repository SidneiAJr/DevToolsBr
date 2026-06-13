// Screen/TelaCalculadoraImposto.tsx
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

const TelaCalculadoraImposto = () => {
  const [valorGanho, setValorGanho] = useState('')
  const [resultado, setResultado] = useState<{ imposto: number; liquido: number } | null>(null)

  const calcular = () => {
    const valor = parseFloat(valorGanho)

    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Erro', 'Preencha um valor válido maior que zero')
      return
    }

    const imposto = valor * 0.20 // 20% de imposto
    const liquido = valor - imposto

    setResultado({ imposto, liquido })
  }

  const limpar = () => {
    setValorGanho('')
    setResultado(null)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>🧾</Text>
            </View>
            <Text style={styles.titulo}>Calculadora de Imposto</Text>
            <Text style={styles.subtitulo}>Calcule IR sobre proventos (20%)</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>💰 Valor do ganho/provento (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1000"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={valorGanho}
              onChangeText={setValorGanho}
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
                <Text style={styles.resultadoTitulo}>Resultado:</Text>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Valor bruto:</Text>
                  <Text style={styles.resultadoValor}>R$ {parseFloat(valorGanho).toFixed(2)}</Text>
                </View>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Imposto (20%):</Text>
                  <Text style={[styles.resultadoValor, { color: '#ef4444' }]}>- R$ {resultado.imposto.toFixed(2)}</Text>
                </View>
                <View style={styles.divisor} />
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Valor líquido:</Text>
                  <Text style={[styles.resultadoValor, { color: '#10b981', fontSize: 20 }]}>R$ {resultado.liquido.toFixed(2)}</Text>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.dica}>💡 Dica: Alíquota padrão de 20% para proventos de FIIs e ações.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TelaCalculadoraImposto

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  scrollView: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginBottom: 25, marginTop: 10 },
  emojiContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 2, borderColor: '#ef4444' },
  emoji: { fontSize: 40 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
  subtitulo: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginTop: 5 },
  divider: { width: 50, height: 2, backgroundColor: '#ef4444', borderRadius: 1, marginTop: 15 },
  card: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#e2e8f0', fontSize: 14, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: '#0f172a', borderRadius: 12, padding: 12, color: '#fff', fontSize: 16, borderWidth: 1, borderColor: '#334155' },
  botoesRow: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: 10 },
  botaoCalcular: { flex: 1, backgroundColor: '#ef4444', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  botaoLimpar: { flex: 1, backgroundColor: '#475569', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultadoContainer: { marginTop: 20, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#334155' },
  resultadoTitulo: { color: '#94a3b8', fontSize: 14, marginBottom: 10, textAlign: 'center' },
  resultadoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  resultadoLabel: { color: '#e2e8f0', fontSize: 14 },
  resultadoValor: { color: '#10b981', fontSize: 16, fontWeight: 'bold' },
  divisor: { height: 1, backgroundColor: '#334155', marginVertical: 10 },
  dica: { color: '#475569', fontSize: 11, textAlign: 'center', marginTop: 10 },
})