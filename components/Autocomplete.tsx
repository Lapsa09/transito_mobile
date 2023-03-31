import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Autocomplete, AutocompleteItem, Icon } from '@ui-kitten/components'
import { useController, UseControllerProps } from 'react-hook-form'

interface Props<T, K> extends UseControllerProps<T> {
  label: string
  options: K[] | any[]
  optionLabel?: string
  optionID?: string
}

function AutocompleteField<T, K>({
  control,
  name,
  label,
  options,
  optionLabel = 'label',
  optionID = 'id',
  rules,
}: Props<T, K>) {
  const { field } = useController({ control, name, rules })

  const [value, setValue] = React.useState(null)
  const [data, setData] = React.useState(options)

  const filter = (item, query) =>
    item[optionLabel].toLowerCase().includes(query.toLowerCase())

  const onSelect = (index) => {
    field.onChange(options[index])
    setValue(options[index][optionLabel])
  }

  const onChangeText = (query) => {
    setValue(query)
    setData(options.filter((item) => filter(item, query)))
    if (data.length === 0) {
      setData([
        {
          [optionID]: null,
          [optionLabel]: 'No se encontro lo que busca',
        },
      ])
    }
  }

  const handleDelete = () => {
    field.onChange(null)
    setValue(null)
    setData(options)
  }

  const renderIcon = () => {
    return (
      value != null && (
        <TouchableWithoutFeedback onPress={handleDelete}>
          <Icon style={styles.icon} name="close-outline" fill="#8F9BB3" />
        </TouchableWithoutFeedback>
      )
    )
  }

  const renderOption = (item) => (
    <AutocompleteItem key={item[optionID]} title={item[optionLabel]} />
  )

  const generateLabel = () => `${label} ${rules?.required ? '*' : ''}`
  return (
    <Autocomplete
      label={generateLabel()}
      value={value}
      onChangeText={onChangeText}
      accessoryRight={renderIcon}
      onSelect={onSelect}
      placement="top"
    >
      {data.map(renderOption)}
    </Autocomplete>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
  },
})

export default AutocompleteField
