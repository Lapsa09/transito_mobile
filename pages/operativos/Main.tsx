import { StyleSheet, View } from 'react-native'
import { MyCard } from '../../components'
import React from 'react'

const OperativosMain = () => {
  return (
    <View style={styles.main}>
      <MyCard name="Autos" to="autos" />
      <MyCard name="Motos" to="motos" />
      <MyCard name="Camiones" to="camiones" />
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
  },
})

export default OperativosMain
