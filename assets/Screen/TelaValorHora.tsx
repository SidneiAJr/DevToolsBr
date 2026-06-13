// Screen/TelaValorHora.tsx
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

const TelaValorHora = () => {
  const [salario, setSalario] = useState('');
  const [horasPorDia, setHorasPorDia] = useState('');
  const [diasPorSemana, setDiasPorSemana] = useState('');
  const [resultado, setResultado] = useState<number | null>(null);

  const calcularValorHora = () => {
    const salarioNum = parseFloat(salario);
    const horasNum = parseFloat(horasPorDia);
    const diasNum = parseFloat(diasPorSemana);

    if (isNaN(salarioNum) || isNaN(horasNum) || isNaN(diasNum)) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente');
      return;
    }

    if (salarioNum <= 0 || horasNum <= 0 || diasNum <= 0) {
      Alert.alert('Erro', 'Preencha valores válidos (maiores que zero)');
      return;
    }

    const horasTotais = horasNum * diasNum;
    const valorHora = salarioNum / horasTotais;
    setResultado(valorHora);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.titulo}>💰 Valor por Hora Trabalhada</Text>
          <Text style={styles.subtitulo}>Descubra quanto vale sua hora de trabalho</Text>

          <View style={styles.card}>
            <Text style={styles.label}>💵 Salário Mensal (R$)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 2500"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={salario}
              onChangeText={setSalario}
            />

            <Text style={styles.label}>⏰ Horas por dia</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 8"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={horasPorDia}
              onChangeText={setHorasPorDia}
            />

            <Text style={styles.label}>📅 Dias por semana</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5"
              placeholderTextColor="#64748b"
              keyboardType="numeric"
              value={diasPorSemana}
              onChangeText={setDiasPorSemana}
            />

            <TouchableOpacity style={styles.botao} onPress={calcularValorHora}>
              <Text style={styles.botaoTexto}>Calcular</Text>
            </TouchableOpacity>

            {resultado !== null && (
              <View style={styles.resultadoContainer}>
                <Text style={styles.resultadoLabel}>Valor da sua hora:</Text>
                <Text style={styles.resultadoValor}>R$ {resultado.toFixed(2)}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TelaValorHora;

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
  botao: {
    backgroundColor: '#3b82f6',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resultadoContainer: {
    marginTop: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
    alignItems: 'center',
  },
  resultadoLabel: { color: '#94a3b8', fontSize: 14 },
  resultadoValor: { color: '#10b981', fontSize: 32, fontWeight: 'bold', marginTop: 5 },
});