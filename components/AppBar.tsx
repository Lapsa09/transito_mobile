import React from 'react'
import { Appbar } from 'react-native-paper'
import { useLocation, useNavigate } from 'react-router-native'

const MyAppBar = ({ title }: { title: string }) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Appbar.Header>
      {location.pathname !== '/' && (
        <Appbar.BackAction onPress={() => navigate(-1)} />
      )}
      <Appbar.Content title={title} />
      <Appbar.Action icon="logout" />
    </Appbar.Header>
  )
}

export default MyAppBar
