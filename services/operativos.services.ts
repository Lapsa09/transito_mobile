import {
  IMotivos,
  OperativoAutos,
  OperativoCamiones,
  OperativoMotos,
  IMotivosPaseo,
  IZonasPaseo,
  OperativoDiario,
  OperativoPaseo,
} from '../types'
import { getEnums, getter, setter } from './mains.services'

export const getMotivosCamion = async () =>
  await getEnums<IMotivos[]>('motivos_camion')

export const getMotivosMoto = async () =>
  await getter<IMotivos[]>('/operativos/motos/motivos')

export const nuevoOperativoAuto = async (body) =>
  await setter<OperativoAutos>({ route: '/operativos/autos', body })

export const getOperativosAutos = async () =>
  await getter<OperativoAutos[]>('/operativos/autos')

export const getOperativosMotos = async () =>
  await getter<OperativoMotos[]>('/operativos/motos')

export const nuevoOperativoMoto = async (body) =>
  await setter<OperativoMotos>({ route: '/operativos/motos', body })

export const getOperativosCamiones = async () =>
  await getter<OperativoCamiones[]>('/operativos/camiones')

export const nuevoOperativoCamiones = async (body) =>
  await setter<OperativoCamiones>({ route: '/operativos/camiones', body })

const geocodingAutos = async () => {
  await setter({ route: '/operativos/autos/geocoding' })
}

const geocodingMotos = async () => {
  await setter({ route: '/operativos/motos/geocoding' })
}

const geocodingCamiones = async () => {
  await setter({ route: '/operativos/camiones/geocoding' })
}

export const geocoding = async (type: string) => {
  const types = {
    Autos: geocodingAutos,
    Motos: geocodingMotos,
    Camiones: geocodingCamiones,
  }

  await types[type]()
}

export const nuevoControl = async (body) =>
  await setter<OperativoDiario>({ route: '/control/diario', body })

export const nuevoControlPaseo = async (body) =>
  await setter<OperativoPaseo>({ route: '/control/paseo', body })

export const getMotivosPaseo = async () =>
  await getEnums<IMotivosPaseo[]>('motivo')

export const getControles = async () =>
  await getter<OperativoDiario[]>('/control/diario')

export const getControlesPaseo = async () =>
  await getter<OperativoPaseo[]>('/control/paseo')

export const getZonasPaseo = async () =>
  await getter<IZonasPaseo[]>('/control/paseo/zonas')
