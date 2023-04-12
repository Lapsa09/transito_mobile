import { LoginUserProps, RegisterUserProps } from '../types'
import { setter } from './mains.services'

export const register = async (body: RegisterUserProps) =>
  await setter<RegisterUserProps, string>({ route: '/auth/register', body })

export const loginCall = async (body: LoginUserProps) =>
  await setter<LoginUserProps, string>({ route: '/auth/login', body })

export const verifyAuth = async () =>
  await setter<boolean>({
    route: '/auth/verify',
    headers: {
      jwt_token: window.localStorage.getItem('token'),
    },
  })
