import React, { useState } from 'react'
import RegisterModal from '../RegisterModal'

const CtaSection = () => {
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <section className="cta clearfix">
      <div className="cta-container">
        <div className="cta-box">
          <div className="cta-box-overlay">
            <div className="cta-overlay-content">
              <div className="cta-logo">
                <img
                  src="/assets/img/logo.webp"
                  width="163"
                  height="94"
                  className="img-responsive"
                  alt="logo"
                />
              </div>
              <div className="cta-content">
                <h2>Enter The World Of Opportunity!</h2>
                <h3>Request for A Quote?</h3>
                <p>Register here and submit your request Online</p>
                <button
                  className="btn btn-tertiary with-icon"
                  aria-label="Register Now"
                  onClick={() => setShowModal(true)}
                >
                  Register Now{' '}
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RegisterModal show={showModal} toggle={setShowModal} />
    </section>
  )
}

export default CtaSection
