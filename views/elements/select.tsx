import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'

interface ISelectProps {
  value?: string | number | string[] | undefined
  onChange: any
  name: string | undefined
  placeholder: string | undefined
  type?: string | undefined
  preIcon?: any
  options: Array<any>,
  disabled: Boolean,
}

const Select = (props: ISelectProps) => {
  return (
    <Form.Control
      as="select"
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      disabled={!!props.disabled}
    >
      {props.options.map((option, index) => (
        <option value={option?.value} key={index}>{option?.label}</option>
      ))}
    </Form.Control>
  )
}

export default Select
