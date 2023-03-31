import React from 'react'
import { FAB } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'

type Props = {
  name: string
  to: string
}

const MyCard = ({ name, to }: Props) => {
  const navigate = useNavigate()

  return (
    <FAB
      style={style.card}
      color="white"
      size="large"
      onPress={() => navigate(to)}
      label={name}
    />
  )
}

const style = StyleSheet.create({
  card: {
    backgroundColor: '#b7e912',
    paddingVertical: 10,
    margin: 5,
    width: '45%',
  },
  title: {
    color: 'white',
    textAlign: 'center',
  },
})

export { MyCard }
