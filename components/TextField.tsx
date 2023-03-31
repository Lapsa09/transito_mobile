import { CheckBox, Icon, Input, InputProps } from '@ui-kitten/components/ui'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {
  Path,
  PathValue,
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form'
import { DOMINIO_PATTERN, LEGAJO_PATTERN } from '../utils'
import { MD3Colors } from 'react-native-paper'

type Props<T> = UseControllerProps<T> &
  Omit<InputProps, 'defaultValue' | 'name' | 'value'> & {
    className?: string
  }

const AlertIcon = (props) => <Icon {...props} name="alert-circle-outline" />

function TextField<T>({
  control,
  name,
  label,
  rules,
  defaultValue,
  ...props
}: Props<T>) {
  const {
    field,
    fieldState: { error, invalid },
  } = useController<T>({ control, name, rules, defaultValue })

  const { onChange, onBlur, value } = field

  const handleChange = (_value: string) => {
    onChange(_value)
  }

  const renderCaption = () => {
    return (
      invalid && (
        <View style={styles.captionContainer}>
          {AlertIcon(styles.captionIcon)}
          <Text style={styles.captionText}>{error?.message}</Text>
        </View>
      )
    )
  }

  const generateLabel = () => `${label} ${rules?.required ? '*' : ''}`

  return (
    <Input
      onChangeText={handleChange}
      onBlur={onBlur}
      value={value as string}
      status={invalid ? 'danger' : 'basic'}
      caption={renderCaption}
      label={generateLabel()}
      {...props}
    />
  )
}

function FileNumberField<T>({ control, name, label, defaultValue }: Props<T>) {
  return (
    <TextField
      control={control}
      name={name}
      label={label}
      defaultValue={defaultValue}
      keyboardType="numeric"
      rules={{
        required: 'Ingrese un legajo',
        pattern: {
          value: LEGAJO_PATTERN,
          message: 'Ingrese un legajo valido',
        },
      }}
    />
  )
}

function DomainField<T>({ control, name, ...props }: Props<T>) {
  const { trigger } = useFormContext()

  const { field } = useController<T>({
    name: 'extranjero' as Path<T>,
    control,
    defaultValue: false as PathValue<T, Path<T>>,
  })

  const changeDomainStatus = (nextValue) => {
    field.onChange(nextValue)
    setTimeout(() => {
      trigger('dominio')
    }, 100)
  }

  return (
    <TextField
      control={control}
      label="Dominio"
      name={name}
      rules={{
        pattern: {
          value: !field.value ? DOMINIO_PATTERN : /./,
          message: 'Ingrese una patente valida',
        },
        required: 'Ingrese una patente',
      }}
      accessoryRight={(props) => (
        <CheckBox
          checked={Boolean(field.value)}
          onChange={changeDomainStatus}
          {...props}
        >
          Extranjero
        </CheckBox>
      )}
      {...props}
    />
  )
}

function PasswordField<T>({ control, name, label, ...props }: Props<T>) {
  return (
    <TextField
      control={control}
      name={name}
      secureTextEntry
      rules={{ required: 'Campo requerido' }}
      label={label}
      {...props}
    />
  )
}

TextField.Legajo = FileNumberField
TextField.Dominio = DomainField
TextField.Password = PasswordField

export default TextField

const styles = StyleSheet.create({
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    color: MD3Colors.error50,
  },
})
