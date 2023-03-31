import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { Route, Routes, NativeRouter } from 'react-router-native'
import { AppBar } from './components'
import { Home, OperativosRoutes } from './pages'
import * as eva from '@eva-design/eva'
import { registerTranslation } from 'react-native-paper-dates'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider } from 'react-redux'
import { store } from './redux'

registerTranslation('es', {
  close: 'Cerrar',
  dateIsDisabled: 'No se permite esta fecha',
  mustBeBetween: (startDate, endDate) =>
    `Debe estar entre el dia ${startDate} y el dia ${endDate}`,
  mustBeHigherThan: (date) => `Debe ser posterior al dia ${date}`,
  mustBeLowerThan: (date) => `Debe ser anterior al dia ${date}`,
  next: 'Siguiente',
  notAccordingToDateFormat: (inputFormat) =>
    `El formato debe ser ${inputFormat}`,
  pickDateFromCalendar: 'Selecciona una fecha del calendario',
  previous: 'Anterior',
  save: 'Guardar',
  selectMultiple: 'Seleccionar fechas',
  selectRange: 'Selecciona un periodo',
  selectSingle: 'Seleccionar una fecha',
  typeInDate: 'Tipo en Fecha',
})

export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <PaperProvider>
            <AppBar title="Bienvenido" />
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/operativos/*" element={<OperativosRoutes />} />
            </Routes>
          </PaperProvider>
        </ApplicationProvider>
      </NativeRouter>
    </Provider>
  )
}
