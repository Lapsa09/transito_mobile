import Axios from 'axios'
import {
  IBarrio,
  ILicencias,
  IMotivos,
  IResolucion,
  ISeguridad,
  ITurnos,
  IZona,
} from '../types'
import { BASE_URL } from '@env'

const axios = Axios.create({
  baseURL: BASE_URL,
})

export const getter = async <T = any>(route: string) => {
  const { data } = await axios.get<T>(route)
  return data
}

type SetterProps<T> = {
  route: string
  body?: T
  headers?: any
}

export const setter = async <T = any, K = T>({
  route,
  body,
  headers,
}: SetterProps<T>) => {
  const { data } = await axios.post<K>(route, body, headers)
  return data
}

export const updater = async <T = any, K = T>({
  route,
  body,
}: SetterProps<T>) => {
  const { data } = await axios.put<K>(route, body)
  return data
}

export const getEnums = async <T>(type: string) =>
  await getter<T>('/api/' + type)

export const getTurnos = async () => await getEnums<ITurnos[]>('turnos')

export const getResolucion = async () =>
  await getEnums<IResolucion[]>('resolucion')

export const getLicencias = async () => await getter<ILicencias[]>('/licencias')

export const getZonasVL = async () => await getter<IZona[]>('/zonas/vl')

export const getAllZonas = async () => await getter<IBarrio[]>('/zonas')

export const getSeguridad = async () =>
  await getEnums<ISeguridad[]>('seguridad')

export const getMotivos = async () => await getter<IMotivos[]>('/motivos')
