import React from 'react'
import { useRouter } from 'next/router'
import { Modal } from 'react-bootstrap'

const RegisterModal = (props: any) => {

  const router = useRouter()

  return (
    <Modal
      show={props.show}
      onHide={() => props.toggle(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Register as</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <button
          className="btn-ezy btn-ezy-primary btn-ezy-lg w-100"
          onClick={() => {
            props.toggle(false)
            router.push('/lawyers/plans')
          }}
        >
          Register as Business User
        </button>
        <br />
        <br />
        <button
          className="btn-ezy btn-ezy-primary btn-ezy-lg w-100"
          onClick={() => {
            props.toggle(false)
            router.push('/register')
          }}
        >
          Register as Individual
        </button>
      </Modal.Body>
    </Modal>
  )
}

export default RegisterModal
