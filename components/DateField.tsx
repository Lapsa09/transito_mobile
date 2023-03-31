import React, { useState, useCallback } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import { DatePickerModal } from 'react-native-paper-dates'
import { Layout, Input, Icon, InputProps } from '@ui-kitten/components'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

type Props<T> = UseControllerProps<T> &
  Omit<InputProps, 'defaultValue' | 'name' | 'value'>

function DateField<T>({ control, name, label, rules }: Props<T>) {
  const {
    field: { value, onChange },
  } = useController({ control, name, rules })

  const [visible, setVisible] = useState(false)
  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = useCallback(
    ({ date }) => {
      onChange(date)
      setVisible(false)
    },
    [setVisible]
  )

  const _value = value ? new Date(value as Date).toLocaleDateString() : ''

  const renderIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <Icon style={styles.icon} name="calendar-outline" fill="#8F9BB3" />
      </TouchableWithoutFeedback>
    )
  }

  const generateLabel = () => `${label} ${rules?.required ? '*' : ''}`

  return (
    <Layout level="1">
      <Input
        label={generateLabel()}
        value={_value}
        editable={false}
        accessoryRight={renderIcon}
        style={styles.input}
        placeholder="DD/MM/YYYY"
      />

      <DatePickerModal
        visible={visible}
        mode="single"
        locale="es"
        label={label as string}
        date={value as Date}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  input: {
    // flex: 1,
  },
  icon: { height: 24, width: 24 },
})

export default DateField
