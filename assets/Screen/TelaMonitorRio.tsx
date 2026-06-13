// Screen/TelaMonitorRio.tsx
import React, { useState, useRef } from 'react';
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

const TelaMonitorRio = () => {
  const [cmPorHora, setCmPorHora] = useState('');
  const [nivelAtual, setNivelAtual] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [ativo, setAtivo] = useState(false);
  const intervaloRef = useRef<NodeJS.Timeout | null>(null);
  const nivelRef = useRef(0);
  const horasRef = useRef(0);

  const iniciarMonitor = () => {
    const cm = parseFloat(cmPorHora);
    const nivel = parseFloat(nivelAtual);

    if (isNaN(cm) || isNaN(nivel)) {
      Alert.alert('Erro', 'Preencha os valores corretamente');
      return;
    }

    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
    }

    nivelRef.current = nivel;
    horasRef.current = 0;
    setLog([]);
    setAtivo(true);

    const variacaoPorHora = cm / 100; // Converte cm para metros

    intervaloRef.current = setInterval(() => {
      const direcao = variacaoPorHora >= 0 ? 'Subindo' : 'Descendo';
      const linha = `⏱️ Hora ${horasRef.current}: ${direcao} → ${nivelRef.current.toFixed(2)} m`;
      
      setLog(prev => [...prev, linha]);
      
      nivelRef.current += variacaoPorHora;
      horasRef.current++;
    }, 1000);
  };

  const pararMonitor = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
      setAtivo(false);
      setLog(prev => [...prev, '🛑 Monitoramento finalizado']);
    }
  };

  const limparLog = () => {
    setLog([]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.titulo}>🌊 Monitor do Rio</Text>
          <Text style={styles.subtitulo}>Simule subida/descida do nível do rio</Text>

          <View style={styles.card}>
            <Text style={styles.label}>📏 Variação (cm por hora)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 10 (para subir) ou -5 (para descer)"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={cmPorHora}
              onChangeText={setCmPorHora}
            />

            <Text style={styles.label}>🌊 Nível atual do rio (metros)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2.5"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={nivelAtual}
              onChangeText={setNivelAtual}
            />

            <View style={styles.botoesContainer}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoIniciar, ativo && styles.botaoDesabilitado]}
                onPress={iniciarMonitor}
                disabled={ativo}>
                <Text style={styles.botaoTexto}>▶ Iniciar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.botaoParar]}
                onPress={pararMonitor}>
                <Text style={styles.botaoTexto}>⏹ Parar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.botaoLimpar]}
                onPress={limparLog}>
                <Text style={styles.botaoTexto}>🗑 Limpar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {log.length > 0 && (
            <View style={styles.logContainer}>
              <Text style={styles.logTitulo}>📋 Histórico do monitoramento:</Text>
              <ScrollView style={styles.logScroll} nestedScrollEnabled>
                {log.map((linha, index) => (
                  <Text key={index} style={styles.logLinha}>
                    {linha}
                  </Text>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaMonitorRio;

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
  botoesContainer: { flexDirection: 'row', gap: 10, marginTop: 25 },
  botao: { flex: 1, padding: 14, borderRadius: 12, alignItems: 'center' },
  botaoIniciar: { backgroundColor: '#10b981' },
  botaoParar: { backgroundColor: '#ef4444' },
  botaoLimpar: { backgroundColor: '#64748b' },
  botaoDesabilitado: { opacity: 0.5 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  logContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    maxHeight: 400,
  },
  logTitulo: { color: '#e2e8f0', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  logScroll: { maxHeight: 300 },
  logLinha: { color: '#94a3b8', fontSize: 12, marginBottom: 5, fontFamily: 'monospace' },
});