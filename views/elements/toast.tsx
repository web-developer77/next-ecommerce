import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

interface IRatingProps {}

const ToastComp = (props: IRatingProps) => {
  const [show, setShow] = useState<boolean>(true)
  return (
    <div className="toast-container">
      <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="mr-auto">Refresh page</strong>
        </Toast.Header>
        <Toast.Body>Oop! Something API Error.</Toast.Body>
      </Toast>
    </div>
  )
}

export default ToastComp
