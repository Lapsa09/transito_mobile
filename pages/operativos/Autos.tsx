import React, { useState, useEffect } from 'react'
import { View, StyleSheet, LayoutAnimation, ScrollView } from 'react-native'
import { FormProvider, useForm } from 'react-hook-form'
import { List, MD2Colors } from 'react-native-paper'
import {
  Autocomplete,
  DateField,
  Picker,
  TextField,
  TimeField,
} from '../../components'
import { Text, Button } from '@ui-kitten/components'
import useSelects from '../../hooks/useSelects'
import { FormInputProps, IMotivos } from '../../types'

interface AutosForm extends FormInputProps {
  motivo?: IMotivos
  graduacion_alcoholica?: number
}

const Autos = () => {
  const methods = useForm<AutosForm>({
    mode: 'all',
  })
  const [expanded, setExpanded] = useState(null)
  const {
    selects: {
      barrios,
      licencias,
      motivos,
      resolucion,
      seguridad,
      turnos,
      vicente_lopez,
    },
  } = useSelects()
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = methods

  const submitEvent = (data) => {
    //TODO
    console.log(data)
  }
  const handleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setExpanded((expanded: string) => (expanded === id ? '' : id))
  }
  const esSancionable =
    getValues('resolucion') === 'ACTA' || getValues('resolucion') === 'REMITIDO'

  useEffect(() => {
    if (!esSancionable) {
      setValue('acta', null)
      setValue('motivo', null)
    }
  }, [esSancionable])

  return (
    <FormProvider {...methods}>
      <ScrollView>
        <Text category="h1" style={styles.title}>
          Autos
        </Text>
        <List.AccordionGroup
          expandedId={expanded}
          onAccordionPress={handleExpand}
        >
          <List.Accordion
            style={styles.accordion}
            title="Operativo"
            id="operativo"
            titleStyle={styles.title}
          >
            <View style={styles.form}>
              <DateField
                control={control}
                name="fecha"
                label="Fecha"
                rules={{ required: 'Ingrese una fecha' }}
              />
              <TimeField
                control={control}
                name="hora"
                label="Hora"
                rules={{ required: 'Ingrese una hora' }}
              />
              <TextField
                control={control}
                label="Direccion"
                name="direccion"
                rules={{ required: 'Inserte una direccion valida' }}
              />
              <Autocomplete
                control={control}
                label="Zona"
                name="zona"
                options={vicente_lopez}
                optionID="id_barrio"
                optionLabel="barrio"
                rules={{ required: 'Elija una localidad' }}
              />

              <TextField.Legajo
                control={control}
                name="legajo_a_cargo"
                label="Legajo a cargo"
              />
              <TextField.Legajo
                control={control}
                name="legajo_planilla"
                label="Legajo planilla"
              />
              <Picker
                control={control}
                name="turno"
                label="Turno"
                options={turnos}
                rules={{ required: 'Elija una opcion' }}
              />
              <Picker
                control={control}
                name="seguridad"
                label="Seguridad"
                options={seguridad}
                rules={{ required: 'Elija una opcion' }}
              />
            </View>
          </List.Accordion>
          <List.Accordion
            titleStyle={styles.title}
            style={styles.accordion}
            title="Vehiculo"
            id="vehiculo"
          >
            <TextField.Dominio
              control={control}
              name="dominio"
              label="Dominio"
            />
            <TextField
              control={control}
              name="licencia"
              label="Licencia"
              keyboardType="numeric"
            />
            <Autocomplete
              control={control}
              name="tipo_licencia"
              label="Tipo licencia"
              options={licencias}
              optionID="id_tipo"
              optionLabel="tipo"
            />
            <Autocomplete
              control={control}
              name="zona_infractor"
              label="Zona infractor"
              options={barrios}
              optionID="id_barrio"
              optionLabel="barrio"
              rules={{ required: 'Elija una opcion' }}
            />
            <TextField
              control={control}
              name="graduacion_alcoholica"
              label="Graduacion Alcoholica"
              keyboardType="numeric"
            />
            <Picker
              control={control}
              name="resolucion"
              label="Resolucion"
              options={resolucion}
            />
            {esSancionable && (
              <>
                <Autocomplete
                  control={control}
                  name="motivo"
                  label="Motivo"
                  options={motivos}
                  optionID="id_motivo"
                  optionLabel="motivo"
                />
                <TextField
                  control={control}
                  name="acta"
                  label="Acta"
                  rules={{
                    required: 'Ingrese un nro de acta',
                  }}
                />
              </>
            )}
          </List.Accordion>
        </List.AccordionGroup>
        <Button
          disabled={!isValid}
          style={styles.button}
          onPress={handleSubmit(submitEvent)}
        >
          Guardar
        </Button>
      </ScrollView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: MD2Colors.grey500,
  },
  title: {
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
  },
  form: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
})

export default Autos
