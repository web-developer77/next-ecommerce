import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = () => {
  return (
    <div className="m-3 text-center">
      {/* <p>loading...</p> */}
      <Spinner animation="border" variant="danger" style={{ width: "16px",height: "16px"}} />
    </div>
  )
}

export default Loading
