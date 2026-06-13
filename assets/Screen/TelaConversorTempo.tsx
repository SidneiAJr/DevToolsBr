// Screen/TelaConversorTempo.tsx
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

const TelaConversorTempo = () => {
  const [anos, setAnos] = useState('');
  const [dias, setDias] = useState<number | null>(null);
  const [meses, setMeses] = useState<number | null>(null);
  const [horas, setHoras] = useState<number | null>(null);

  const converter = () => {
    const anosNum = parseFloat(anos);

    if (isNaN(anosNum) || anosNum <= 0) {
      Alert.alert('Erro', 'Digite um valor válido maior que zero');
      return;
    }

    setDias(anosNum * 365);
    setMeses(anosNum * 12);
    setHoras(anosNum * 8766);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.titulo}>⏱️ Conversor de Tempo</Text>
          <Text style={styles.subtitulo}>Converta anos em dias, meses e horas</Text>

          <View style={styles.card}>
            <Text style={styles.label}>📅 Quantos anos?</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={anos}
              onChangeText={setAnos}
            />

            <TouchableOpacity style={styles.botao} onPress={converter}>
              <Text style={styles.botaoTexto}>Converter</Text>
            </TouchableOpacity>

            {dias !== null && (
              <View style={styles.resultadosContainer}>
                <View style={styles.resultadoItem}>
                  <Text style={styles.resultadoValor}>{dias.toLocaleString()}</Text>
                  <Text style={styles.resultadoLabel}>Dias</Text>
                </View>
                <View style={styles.resultadoItem}>
                  <Text style={styles.resultadoValor}>{meses?.toLocaleString()}</Text>
                  <Text style={styles.resultadoLabel}>Meses</Text>
                </View>
                <View style={styles.resultadoItem}>
                  <Text style={styles.resultadoValor}>{horas?.toLocaleString()}</Text>
                  <Text style={styles.resultadoLabel}>Horas</Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaConversorTempo;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0f172a' },
  scrollView: { flexGrow: 1 },
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
  subtitulo: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: '#1e293b', borderRadius: 20, padding: 20 },
  label: { color: '#e2e8f0', fontSize: 16, marginBottom: 8 },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 15,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 20,
  },
  botao: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultadosContainer: {
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  resultadoItem: { alignItems: 'center' },
  resultadoValor: { color: '#10b981', fontSize: 24, fontWeight: 'bold' },
  resultadoLabel: { color: '#94a3b8', fontSize: 12, marginTop: 5 },
});