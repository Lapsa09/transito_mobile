import React, { useCallback, useState } from 'react'
import { TimePickerModal } from 'react-native-paper-dates'
import { useController, UseControllerProps } from 'react-hook-form'
import { Icon, Input, InputProps, Layout } from '@ui-kitten/components'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'

type Props<T> = UseControllerProps<T> &
  Omit<InputProps, 'defaultValue' | 'name' | 'value'>

const formatTime = (time) =>
  `${time?.hours}:${time?.minutes < 10 ? '0' + time?.minutes : time?.minutes}`

function TimeField<T>({ control, name, label, rules }: Props<T>) {
  const { field } = useController({ control, name, rules })

  const [visible, setVisible] = useState(false)
  const onDismiss = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = useCallback(
    (time) => {
      field.onChange(formatTime(time))
      setVisible(false)
    },
    [setVisible]
  )

  const renderIcon = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <Icon style={styles.icon} name="clock-outline" fill="#8F9BB3" />
      </TouchableWithoutFeedback>
    )
  }

  const generateLabel = () => `${label} ${rules?.required ? '*' : ''}`

  return (
    <Layout level="1">
      <Input
        label={generateLabel()}
        {...field}
        value={field.value as string}
        editable={false}
        accessoryRight={renderIcon}
        style={styles.input}
        placeholder="HH:mm"
      />

      <TimePickerModal
        visible={visible}
        locale="es"
        label={label as string}
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

export default TimeField
