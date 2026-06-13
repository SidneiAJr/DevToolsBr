import React, { useState, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import FundoEconomico from '../Components/FundoEconomico'

// ─── Helpers ───────────────────────────────────────────────────────────────────

const toFloat = (str) => parseFloat(str.replace(',', '.')) || 0

const formatarBRL = (valor) =>
  valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// ─── Subcomponente: Campo de Input ─────────────────────────────────────────────

const Campo = ({ label, placeholder, value, onChange, erro }) => (
  <View style={styles.campoWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, erro && styles.inputErro]}
      placeholder={placeholder}
      placeholderTextColor="#475569"
      keyboardType="numeric"
      value={value}
      onChangeText={onChange}
    />
    {erro ? <Text style={styles.erroTexto}>{erro}</Text> : null}
  </View>
)

// ─── Subcomponente: Linha de Resultado ─────────────────────────────────────────

const LinhaResultado = ({ icone, label, valor }) => (
  <View style={styles.linhaResultado}>
    <Text style={styles.resultLabel}>{icone} {label}</Text>
    <Text style={styles.resultValue}>{valor}</Text>
  </View>
)

// ─── Tela Principal ────────────────────────────────────────────────────────────

const TelaSimularFII = () => {
  const [cotasAtuais,       setCotasAtuais]       = useState('')
  const [precoMedio,        setPrecoMedio]         = useState('')
  const [provento,          setProvento]           = useState('')
  const [disponivelAplicar, setDisponivelAplicar]  = useState('')
  const [salarioMinimo,     setSalarioMinimo]      = useState('')
  const [erros,             setErros]              = useState({})
  const [calculado,         setCalculado]          = useState(false)

  // Validação dos campos obrigatórios
  const validar = useCallback(() => {
    const novosErros = {}
    const preco = toFloat(precoMedio)
    const prov  = toFloat(provento)
    const cotas = toFloat(cotasAtuais)
    const disp  = toFloat(disponivelAplicar)

    if (preco <= 0) novosErros.precoMedio = 'Informe um preço válido'
    if (prov  <= 0) novosErros.provento   = 'Informe um provento válido'
    if (cotas <= 0 && disp <= 0)
      novosErros.cotasAtuais = 'Informe cotas atuais ou valor disponível'

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }, [precoMedio, provento, cotasAtuais, disponivelAplicar])

  // useMemo: recalcula apenas quando os inputs mudam
  const resultado = useMemo(() => {
    if (!calculado) return null

    const cotas   = toFloat(cotasAtuais)
    const preco   = toFloat(precoMedio)
    const prov    = toFloat(provento)
    const disp    = toFloat(disponivelAplicar)
    const salario = toFloat(salarioMinimo)

    const cotasCompradas    = Math.floor(disp / preco)
    const totalCotas        = cotasCompradas + cotas
    const proventoTotal     = totalCotas * prov
    const cotasParaSalario  = salario > 0 ? Math.ceil(salario / prov) : 0
    const custoSalario      = cotasParaSalario * preco

    return {
      cotasCompradas,
      totalCotas:     Math.floor(totalCotas),
      proventoAntes:  prov,
      proventoDepois: proventoTotal,
      cotasParaSalario,
      custoSalario,
    }
  }, [calculado, cotasAtuais, precoMedio, provento, disponivelAplicar, salarioMinimo])

  const handleCalcular = useCallback(() => {
    if (validar()) setCalculado(true)
  }, [validar])

  const handleLimpar = useCallback(() => {
    setCotasAtuais('')
    setPrecoMedio('')
    setProvento('')
    setDisponivelAplicar('')
    setSalarioMinimo('')
    setErros({})
    setCalculado(false)
  }, [])

  // Ao alterar qualquer campo, invalida o resultado atual
  const criarHandler = (setter) => (texto) => {
    setter(texto)
    setCalculado(false)
  }

  return (
    <FundoEconomico>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.titulo}>🏢 Simular Proventos FII</Text>

        <View style={styles.card}>
          <Campo
            label="Cotas atuais"
            placeholder="Ex: 100"
            value={cotasAtuais}
            onChange={criarHandler(setCotasAtuais)}
            erro={erros.cotasAtuais}
          />
          <Campo
            label="Preço médio da cota (R$)"
            placeholder="Ex: 95,50"
            value={precoMedio}
            onChange={criarHandler(setPrecoMedio)}
            erro={erros.precoMedio}
          />
          <Campo
            label="Provento por cota (R$)"
            placeholder="Ex: 0,85"
            value={provento}
            onChange={criarHandler(setProvento)}
            erro={erros.provento}
          />
          <Campo
            label="Disponível para aplicar (R$)"
            placeholder="Ex: 1.000,00"
            value={disponivelAplicar}
            onChange={criarHandler(setDisponivelAplicar)}
          />
          <Campo
            label="Salário mínimo de referência (R$)"
            placeholder="Ex: 1.412,00"
            value={salarioMinimo}
            onChange={criarHandler(setSalarioMinimo)}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonCalcular} onPress={handleCalcular} activeOpacity={0.8}>
              <Text style={styles.buttonText}>📊 Calcular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLimpar} onPress={handleLimpar} activeOpacity={0.8}>
              <Text style={styles.buttonText}>🗑️ Limpar</Text>
            </TouchableOpacity>
          </View>

          {resultado && (
            <View style={styles.resultCard}>
              <Text style={styles.resultTitle}>📈 Resultado da Simulação</Text>

              <View style={styles.resultSeparador} />

              <LinhaResultado
                icone="🛒"
                label="Cotas a comprar"
                valor={resultado.cotasCompradas.toString()}
              />
              <LinhaResultado
                icone="📦"
                label="Total de cotas"
                valor={resultado.totalCotas.toString()}
              />
              <LinhaResultado
                icone="⬅️"
                label="Provento antes"
                valor={`R$ ${formatarBRL(resultado.proventoAntes)}`}
              />
              <LinhaResultado
                icone="✅"
                label="Provento após aporte"
                valor={`R$ ${formatarBRL(resultado.proventoDepois)}`}
              />

              {resultado.cotasParaSalario > 0 && (
                <>
                  <View style={styles.resultSeparador} />
                  <LinhaResultado
                    icone="🎯"
                    label="Cotas p/ 1 salário mínimo"
                    valor={resultado.cotasParaSalario.toString()}
                  />
                  <LinhaResultado
                    icone="💰"
                    label="Investimento necessário"
                    valor={`R$ ${formatarBRL(resultado.custoSalario)}`}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </FundoEconomico>
  )
}

export default TelaSimularFII

// ─── Estilos ───────────────────────────────────────────────────────────────────

const CORES = {
  fundo:       '#0f172a',
  fundoCard:   '#1e293b',
  fundoBorda:  '#334155',
  laranja:     '#f7931a',
  vermelho:    '#ef4444',
  verde:       '#4ade80',
  textoPrinc:  '#ffffff',
  textoMuted:  '#94a3b8',
  textoBody:   '#cbd5e1',
  textoErro:   '#f87171',
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center'
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: CORES.laranja,
    textAlign: 'center',
    marginBottom: 24,
    letterSpacing: 0.5,
  },

  // Card principal
  card: {
    backgroundColor: CORES.fundoCard,
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },

  // Campo
  campoWrapper: {
    marginTop: 12,
  },
  label: {
    color: CORES.textoMuted,
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    backgroundColor: CORES.fundo,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: CORES.textoPrinc,
    fontSize: 15,
    borderWidth: 1,
    borderColor: CORES.fundoBorda,
  },
  inputErro: {
    borderColor: CORES.textoErro,
  },
  erroTexto: {
    color: CORES.textoErro,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },

  // Botões
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 24,
  },
  buttonCalcular: {
    flex: 1,
    backgroundColor: CORES.laranja,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonLimpar: {
    flex: 1,
    backgroundColor: CORES.vermelho,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: CORES.textoPrinc,
    fontWeight: 'bold',
    fontSize: 15,
  },

  // Card de resultado
  resultCard: {
    backgroundColor: CORES.fundo,
    borderRadius: 14,
    padding: 16,
    marginTop: 20,
    borderWidth: 1,
    borderColor: CORES.fundoBorda,
  },
  resultTitle: {
    color: CORES.laranja,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  resultSeparador: {
    height: 1,
    backgroundColor: CORES.fundoBorda,
    marginVertical: 10,
  },
  linhaResultado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  resultLabel: {
    color: CORES.textoBody,
    fontSize: 13,
    flex: 1,
  },
  resultValue: {
    color: CORES.verde,
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'right',
  },
})