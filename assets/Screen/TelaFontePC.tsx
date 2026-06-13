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

const TelaFontePC = () => {
  const [memoria, setMemoria] = useState('')
  const [processador, setProcessador] = useState('')
  const [placaVideo, setPlacaVideo] = useState('')
  const [ssd, setSsd] = useState('')
  const [nve, setNve] = useState('')
  const [hd, setHd] = useState('')
  const [resultado, setResultado] = useState<{ potenciaTotal: number; recomendacao: string } | null>(
    null
  )

  const calcularFonte = () => {
    // Converte para número, se vazio coloca 0
    const memoriaNum = parseInt(memoria) || 0
    const processadorNum = parseInt(processador) || 0
    const placaVideoNum = parseInt(placaVideo) || 0
    const ssdNum = parseInt(ssd) || 0
    const nveNum = parseInt(nve) || 0
    const hdNum = parseInt(hd) || 0

    // Soma todos os componentes
    const somaTotal =
      memoriaNum + processadorNum + placaVideoNum + ssdNum + nveNum + hdNum

    if (somaTotal === 0) {
      Alert.alert('Erro', 'Preencha pelo menos um campo com valor maior que zero!')
      return
    }

    // Cálculo: soma + 30% de margem
    const potencia = somaTotal * 0.3
    const potenciaTotal = somaTotal + potencia
    const recomendacao = potenciaTotal <= 600 ? 'Fonte 600W ou maior' : 'Fonte 500W ou menor'

    setResultado({
      potenciaTotal: Math.ceil(potenciaTotal), // arredonda pra cima
      recomendacao,
    })
  }

  const limparCampos = () => {
    setMemoria('')
    setProcessador('')
    setPlacaVideo('')
    setSsd('')
    setNve('')
    setHd('')
    setResultado(null)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.emojiContainer}>
              <Text style={styles.emoji}>🖥️</Text>
            </View>
            <Text style={styles.titulo}>Fonte para PC</Text>
            <Text style={styles.subtitulo}>Calcule a potência ideal</Text>
            <View style={styles.divider} />
          </View>

          {/* Formulário em Card */}
          <View style={styles.card}>
            <Text style={styles.label}>Memória RAM (GB)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 16"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={memoria}
              onChangeText={setMemoria}
            />

            <Text style={styles.label}>Processador (W)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 65"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={processador}
              onChangeText={setProcessador}
            />

            <Text style={styles.label}>Placa de Vídeo (W)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 150"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={placaVideo}
              onChangeText={setPlacaVideo}
            />

            <Text style={styles.label}>SSD (GB)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 512"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={ssd}
              onChangeText={setSsd}
            />

            <Text style={styles.label}>NVMe (GB)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 256"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={nve}
              onChangeText={setNve}
            />

            <Text style={styles.label}>HD (GB)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1000"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={hd}
              onChangeText={setHd}
            />

            <View style={styles.botoesRow}>
              <TouchableOpacity style={styles.botaoCalcular} onPress={calcularFonte}>
                <Text style={styles.botaoTexto}>Calcular</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
                <Text style={styles.botaoTexto}>Limpar</Text>
              </TouchableOpacity>
            </View>

            {resultado && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoTitulo}>Resultado:</Text>
                <Text style={styles.resultadoPotencia}>
                  Potência recomendada: {resultado.potenciaTotal}W
                </Text>
                <Text style={styles.resultadoRecomendacao}>
                  {resultado.recomendacao}
                </Text>
              </View>
            )}
          </View>

          {/* Dica */}
          <Text style={styles.dica}>
            💡 Dica: A fórmula considera o consumo base + 30% de folga para picos.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TelaFontePC

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
    marginBottom: 25,
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
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  label: {
    color: '#e2e8f0',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  botoesRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  botaoCalcular: {
    flex: 1,
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoLimpar: {
    flex: 1,
    backgroundColor: '#475569',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultadoContainer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
  },
  resultadoTitulo: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 10,
  },
  resultadoPotencia: {
    color: '#10b981',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  resultadoRecomendacao: {
    color: '#f7931a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dica: {
    color: '#475569',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 10,
  },
})