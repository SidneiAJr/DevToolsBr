// components/InputCustomizado.tsx
import { TextInput, StyleSheet } from 'react-native'

export default function InputCustomizado({ 
  placeholder, 
  value, 
  onChangeText, 
  keyboardType = 'default',
  secureTextEntry = false 
}) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: 'grey',
    width: 300,
    height: 80,
    borderColor: 'grey',
    color: 'white'
  }
})