import React, { useState } from 'react'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components'
import { useController, UseControllerProps } from 'react-hook-form'
import { Enums } from '../types'

type Props<T, K> = UseControllerProps<T> & {
  options?: K[] | Enums[]
  optionID?: string
  optionLabel?: string
  label: string
}

function MyPicker<T, K>({
  control,
  name,
  label,
  options,
  optionLabel = 'label',
  optionID = 'id',
  rules,
}: Props<T, K>) {
  const {
    field: { onChange, ref },
  } = useController({ control, name, rules })

  const [selected, setSelected] = useState(new IndexPath(0))

  const handleSelect = (index) => {
    setSelected(index)
    onChange(defaultOptions[index.row][optionID])
  }

  const defaultOptions: K[] | any[] = [
    {
      [optionID]: null,
      [optionLabel]: 'ELIJA UNA OPCION',
    },
    ...options,
  ]

  const generateLabel = () => `${label} ${rules?.required ? '*' : ''}`

  return (
    <Select
      ref={ref}
      selectedIndex={selected}
      onSelect={handleSelect}
      label={generateLabel()}
      value={defaultOptions[selected.row][optionLabel]}
    >
      {defaultOptions?.map((option) =>
        'enumlabel' in option ? (
          <SelectItem key={option.enumlabel} title={option.enumlabel} />
        ) : (
          <SelectItem key={option[optionID]} title={option[optionLabel]} />
        )
      )}
    </Select>
  )
}

export default MyPicker
