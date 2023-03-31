import { NavigateFunction, Location } from 'react-router-native'

type IHistory = {
  navigate: NavigateFunction
  location: Location
}

export const history: IHistory = {
  navigate: null,
  location: null
}
