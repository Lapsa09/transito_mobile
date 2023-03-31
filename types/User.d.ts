export enum Roles {
  ADMIN = 'ADMIN',
  INSPECTOR = 'INSPECTOR',
  ADMINISTRATIVO = 'ADMINISTRATIVO',
  WAZE = 'TRAFICO',
}

export type User = {
  legajo: number
  nombre: string
  apellido: string
  telefono: number
  turno?: string
  rol?: Roles
  iat: number
  isAdmin?(): boolean
}

export interface RegisterUserProps {
  legajo: number
  nombre: string
  apellido: string
  telefono: number
  password: string
  confirmPassword: string
}

export interface LoginUserProps {
  legajo: number
  password: string
}
