import React from 'react'
import { Route, Routes } from 'react-router-native'
import { Autos, Camiones, OperativosMain, Motos } from '.'

const OperativosRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<OperativosMain />} />
      <Route path="/autos" element={<Autos />} />
      <Route path="/motos" element={<Motos />} />
      <Route path="/camiones" element={<Camiones />} />
    </Routes>
  )
}

export default OperativosRoutes
