// Screen/TelaJurosCompostos.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

type TipoInvestimento = 'cdb' | 'lci' | 'tesouro';

const TelaJurosCompostos = () => {
  const [valorInicial, setValorInicial] = useState('');
  const [juros, setJuros] = useState('');
  const [tempo, setTempo] = useState('');
  const [tipo, setTipo] = useState<TipoInvestimento>('cdb');
  const [resultado, setResultado] = useState<{
    valorFuturo: number;
    imposto: number;
    liquido: number;
  } | null>(null);

  const calcular = () => {
    const valor = parseFloat(valorInicial);
    const jurosAnual = parseFloat(juros);
    const anos = parseFloat(tempo);

    if (isNaN(valor) || isNaN(jurosAnual) || isNaN(anos)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    if (valor <= 0 || jurosAnual <= 0 || anos <= 0) {
      Alert.alert('Erro', 'Preencha valores maiores que zero');
      return;
    }

    const meses = anos * 12;
    const taxaJuros = jurosAnual / 100;
    const valorFuturo = valor * Math.pow(1 + taxaJuros, anos);

    let imposto = 0;

    if (tipo === 'cdb') {
      if (meses <= 12) imposto = valorFuturo * 0.225;
      else if (meses <= 24) imposto = valorFuturo * 0.20;
      else imposto = valorFuturo * 0.175;
    } else if (tipo === 'lci') {
      imposto = 0;
    } else if (tipo === 'tesouro') {
      if (meses <= 12) imposto = valorFuturo * 0.225;
      else if (meses <= 24) imposto = valorFuturo * 0.20;
      else imposto = valorFuturo * 0.175;
    }

    const liquido = valorFuturo - imposto;

    setResultado({
      valorFuturo,
      imposto,
      liquido,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.titulo}>📈 Simulador de Investimentos</Text>
          <Text style={styles.subtitulo}>Juros compostos + Impostos</Text>

          <View style={styles.card}>
            <Text style={styles.label}>💰 Valor inicial (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1000"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={valorInicial}
              onChangeText={setValorInicial}
            />

            <Text style={styles.label}>📊 Taxa de juros ao ano (%)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 12"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={juros}
              onChangeText={setJuros}
            />

            <Text style={styles.label}>⏱️ Tempo (anos)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={tempo}
              onChangeText={setTempo}
            />

            <Text style={styles.label}>🏦 Tipo de investimento</Text>
            <View style={styles.tipoContainer}>
              <TouchableOpacity
                style={[styles.tipoBotao, tipo === 'cdb' && styles.tipoAtivo]}
                onPress={() => setTipo('cdb')}>
                <Text style={[styles.tipoTexto, tipo === 'cdb' && styles.tipoTextoAtivo]}>CDB</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tipoBotao, tipo === 'lci' && styles.tipoAtivo]}
                onPress={() => setTipo('lci')}>
                <Text style={[styles.tipoTexto, tipo === 'lci' && styles.tipoTextoAtivo]}>LCI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tipoBotao, tipo === 'tesouro' && styles.tipoAtivo]}
                onPress={() => setTipo('tesouro')}>
                <Text style={[styles.tipoTexto, tipo === 'tesouro' && styles.tipoTextoAtivo]}>Tesouro</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.botao} onPress={calcular}>
              <Text style={styles.botaoTexto}>Calcular</Text>
            </TouchableOpacity>

            {resultado && (
              <View style={styles.resultadoContainer}>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Valor bruto:</Text>
                  <Text style={styles.resultadoValor}>R$ {resultado.valorFuturo.toFixed(2)}</Text>
                </View>
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Imposto de renda:</Text>
                  <Text style={[styles.resultadoValor, { color: '#ef4444' }]}>- R$ {resultado.imposto.toFixed(2)}</Text>
                </View>
                <View style={styles.divisor} />
                <View style={styles.resultadoLinha}>
                  <Text style={styles.resultadoLabel}>Valor líquido:</Text>
                  <Text style={[styles.resultadoValor, { color: '#10b981', fontSize: 24 }]}>R$ {resultado.liquido.toFixed(2)}</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaJurosCompostos;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  scrollView: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subtitulo: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20 },
  label: { color: '#e2e8f0', fontSize: 16, marginBottom: 8, marginTop: 15 },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tipoContainer: { flexDirection: 'row', gap: 10, marginTop: 5 },
  tipoBotao: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  tipoAtivo: { backgroundColor: '#3b82f6', borderColor: '#3b82f6' },
  tipoTexto: { color: '#94a3b8', fontWeight: '600' },
  tipoTextoAtivo: { color: '#fff' },
  botao: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 25 },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultadoContainer: { marginTop: 25, paddingTop: 20, borderTopWidth: 1, borderTopColor: '#334155' },
  resultadoLinha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  resultadoLabel: { color: '#94a3b8', fontSize: 16 },
  resultadoValor: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  divisor: { height: 1, backgroundColor: '#334155', marginVertical: 15 },
});