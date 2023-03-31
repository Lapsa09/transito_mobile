import { LoginUserProps, RegisterUserProps } from '../types'
import { setter } from './mains.services'

export const register = async (body: RegisterUserProps) =>
  await setter<string>({ route: '/auth/register', body })

export const loginCall = async (body: LoginUserProps) =>
  await setter<string>({ route: '/auth/login', body })

export const verifyAuth = async () =>
  await setter<boolean>({
    route: '/auth/verify',
    headers: {
      jwt_token: localStorage.getItem('token'),
    },
  })
