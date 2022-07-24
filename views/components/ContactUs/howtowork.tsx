import React from 'react'
import { Row, Col } from 'react-bootstrap'

const HowToWork = () => {
  const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID)

  return (
    <>
      {categoryId == 1447 && (
        <h3>
          Register and post your enquiry online for prompt assistance.
          <br />
          Your request is private and only shared with Attorneys / Lawyers
          registerd on www.LawyersEzyFind.co.za
        </h3>
      )}
      {categoryId == 1447 ? (
        <>
          <Row className="heading">
            <h2>How it works</h2>
          </Row>
          <Row className="pb-5">
            <Col md={3} xs={12}>
              <div className="work_col">
                <div className="step">STEP - 1</div>
                <div className="work_col_details">
                  <div className="step_col">
                    <div className="work_icon flex">
                      <img
                        src="/assets/img/work_icon1.webp"
                        width="62"
                        height="61"
                        alt="work_icon1"
                      />
                    </div>
                    <h4>Register</h4>
                    <p>
                      Get started with a simple registration. (Your request is not
                      posted on social media if registering with facebook, google
                      or linkedIn){' '}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3} xs={12}>
              <div className="work_col">
                <div className="step">STEP - 2</div>
                <div className="work_col_details">
                  <div className="step_col">
                    <div className="work_icon flex">
                      <img
                        src="/assets/img/work_icon2.webp"
                        width="57"
                        height="58"
                        alt="work_icon2"
                      />
                    </div>
                    <h4>Enquire</h4>
                    <p>
                      Submit your detail enquiry with supported documents if
                      needed{' '}
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3} xs={12}>
              <div className="work_col">
                <div className="step">STEP - 3</div>
                <div className="work_col_details">
                  <div className="step_col">
                    <div className="work_icon flex">
                      <img
                        src="/assets/img/work_icon3.webp"
                        width="67"
                        height="71"
                        alt="work_icon3"
                      />
                    </div>
                    <h4>Advice</h4>
                    <p>
                      Lawyers / Attorneys will respond via the website or mobile
                      app
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3} xs={12}>
              <div className="work_col">
                <div className="step">STEP - 4</div>
                <div className="work_col_details">
                  <div className="step_col">
                    <div className="work_icon flex">
                      <img
                        src="/assets/img/work_icon4.webp"
                        width="66"
                        height="65"
                        alt="work_icon4"
                      />
                    </div>
                    <h4>Confirm</h4>
                    <p>Confirm Lawyer / Attorney &amp; get your case resolved</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ) : categoryId == 1402 ? (
        <Row className="manufact-how-to-work">
          <Col lg={4} className="manufact-how-to-work-left">
            <img
              src="/assets/img/manufacturing.webp"
              alt="manufacturing"
            />
          </Col>
          <Col lg={8} className="manufact-howtowork-right">
            <h1>How it works?</h1>
            <h2>Snap A Picture And Add Details On The Item You Are Looking For With Volumes And Timelines.</h2>
            <Row>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 1</h4>
                      <h3>REQUEST</h3>
                      <p>Send us a picture of the items you are seeking with volumes and timelines.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 2</h4>
                      <h3>LOCATION</h3>
                      <p>Select the correct category and add the location you seeking this item from.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 3</h4>
                      <h3>OFFERS</h3>
                      <p>Manufacturing providers will come to you with quotes and timeslines regarding your volumes.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 4</h4>
                      <h3>PICK</h3>
                      <p>Select the best quote & get the item you are seeking.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row >
      ) : categoryId == 549 ? (
        <Row className="manufact-how-to-work">
          <Col lg={4} className="manufact-how-to-work-left">
            <img
              src="/assets/img/car-howtowork.webp"
              alt="manufacturing"
            />
          </Col>
          <Col lg={8} className="manufact-howtowork-right">
            <h1>How it works?</h1>
            <h2>Submit Car Part Image With License Disc VIN Number And Request For Quotes</h2>
            <Row>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 1</h4>
                      <h3>REGISTER</h3>
                      <p>Get started with a simple registration.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon2.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 2</h4>
                      <h3>REQUEST</h3>
                      <p>Send us a picture of your car part, license disc & add vehicle details</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon3.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 3</h4>
                      <h3>OFFERS</h3>
                      <p>Spare shops will come back to you with quotes</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon4.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 4</h4>
                      <h3>PICK</h3>
                      <p>Select the best quote & get your vehicle fixed</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row >
      ) : categoryId == 1672 ? (
        <Row className="manufact-how-to-work">
          <Col lg={4} className="manufact-how-to-work-left">
            <img
              src="/assets/img/tyer-howtowork.webp"
              alt="manufacturing"
            />
          </Col>
          <Col lg={8} className="manufact-howtowork-right">
            <h1>How it works?</h1>
            <h2>Snap A Pic Of The Tyre Or Add Tyre Size And Request For Quotes</h2>
            <Row>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 1</h4>
                      <h3>REGISTER</h3>
                      <p>Get started with a simple registration.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon2.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 2</h4>
                      <h3>REQUEST</h3>
                      <p>Send us a picture of your tyre or add size and make (dunlop, michelin etc).</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon3.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 3</h4>
                      <h3>OFFERS</h3>
                      <p>Tyre companies will come back to you with quotes to choose from.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon4.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 4</h4>
                      <h3>PICK</h3>
                      <p>Select a provider with best quote and get your tyres. Schedule and book a fitment time slot.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row >
      ) : categoryId == 1396 ? (
        <Row className="manufact-how-to-work">
          <Col lg={4} className="manufact-how-to-work-left">
            <img
              src="/assets/img/panel-howtowork.webp"
              alt="manufacturing"
            />
          </Col>
          <Col lg={8} className="manufact-howtowork-right">
            <h1>How it works?</h1>
            <h2>Submit dent image And Request for Quotes</h2>
            <Row>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 1</h4>
                      <h3>REGISTER</h3>
                      <p>Get started with a simple registration.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon3.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 2</h4>
                      <h3>REQUEST</h3>
                      <p>Send us a picture of your dent, scratch or crash & add vehicle details</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon2.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 3</h4>
                      <h3>OFFERS</h3>
                      <p>Panelbeaters will come back to you with guestimated quotes based on images</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon4.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 4</h4>
                      <h3>PICK</h3>
                      <p>Select a panelbeater & get your vehicle fixed</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row >
      ) : categoryId == 1384 ? (
        <Row className="manufact-how-to-work">
          <Col lg={4} className="manufact-how-to-work-left">
            <img
              src="/assets/img/finance-howtowork.webp"
              alt="manufacturing"
            />
          </Col>
          <Col lg={8} className="manufact-howtowork-right">
            <h1>How it works?</h1>
            <h2>Request for Loans, Credit card Etc Any Banking or Financial Products.</h2>
            <Row>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 1</h4>
                      <h3>REGISTER</h3>
                      <p>Start with a simple registration. One click social registration available</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon2.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 2</h4>
                      <h3>REQUEST</h3>
                      <p>Add the details of the loans, credit card etc with supporting documents. May it be personal or business.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon3.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 3</h4>
                      <h3>OFFERS</h3>
                      <p>Banks & businesses will then come back with a quote.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/car-icon4.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 4</h4>
                      <h3>PICK</h3>
                      <p>Negotiate price and select who you would like the product form</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row >
      ) : categoryId == 1342 ? (
        <img
          src="/assets/img/Screenshot1.webp"
          width="100%"
          height="100%"
          alt="Screenshot1"
        />
      ) : categoryId == 1671 ? (
        <Row className="manufact-how-to-work">
          <Col lg={4} className="manufact-how-to-work-left">
            <img
              src="/assets/img/mag-howtowork.webp"
              alt="manufacturing"
            />
          </Col>
          <Col lg={8} className="manufact-howtowork-right">
            <h1>How it works?</h1>
            <h2>Submit An Image of the Damaged Mag or Mag Your Are Looking For, & Request For Quotes</h2>
            <Row>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon1.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 1</h4>
                      <h3>REGISTER</h3>
                      <p>Get started with a simple registration.</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon2.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 2</h4>
                      <h3>REQUEST</h3>
                      <p>Send us a picture of your damaged mag/ wheel or mag then add mag details</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon3.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 3</h4>
                      <h3>OFFERS</h3>
                      <p>Mag Repar or Mag providers will come back to you with quotes based on</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col className="manufact-htw-step" lg={6}>
                <Row>
                  <Col md={2} lg={3} sm={2}>
                    <img
                      src="/assets/img/tyre-icon4.webp"
                      alt="icon1"
                    />
                  </Col>
                  <Col md={10} lg={9} sm={10} className="manufact-howtowork-content">
                    <div>
                      <h4>STEP - 4</h4>
                      <h3>PICK</h3>
                      <p>Select a mag repairer & get your mag fixed or purchased</p>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row >
      ) : (
        <img
          src="/assets/img/Screenshot6.webp"
          width="100%"
          height="100%"
          alt="Screenshot6"
        />
      )}
    </>
  )
}

export default HowToWork
