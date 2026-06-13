import { StyleSheet, View } from 'react-native'
import React from 'react'

const FundoEconomico = ({ children }) => {
  return (
    <View style={styles.fundo}>
      {children}
    </View>
  )
}

export default FundoEconomico

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a', 
  }
})