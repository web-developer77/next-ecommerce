import React from 'react'
import { InputGroup, Form } from 'react-bootstrap'

interface IInputProps {
  value?: string | number | string[] | undefined
  onChange: any
  name: string | undefined
  placeholder: string | undefined
  type?: string | undefined
  preIcon?: any,
  disabled?: boolean,
}

const Input = (props: IInputProps) => {
  return (
    <InputGroup hasValidation>
      {props.preIcon && (
        <InputGroup.Prepend>
          <InputGroup.Text id="inputGroupPrepend">
            {props.preIcon}
          </InputGroup.Text>
        </InputGroup.Prepend>
      )}
      <Form.Control
        type={props.type || "text"}
        placeholder={props.placeholder}
        aria-describedby="inputGroupPrepend"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        disabled={!!props.disabled}
      />
    </InputGroup>
  )
}

export default Input
