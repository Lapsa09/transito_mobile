import { StyleSheet, View } from 'react-native'
import React from 'react'
import { MyCard } from '../components'

const Home = () => {
  return (
    <View style={styles.home}>
      <MyCard name="Operativos" to="/operativos" />
      <MyCard name="Control" to="/control" />
      <MyCard name="Waze" to="/waze" />
      <MyCard name="Servicios" to="/servicios" />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  home: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})
