import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { Container, Row, Col, Form, Modal, InputGroup } from 'react-bootstrap'
import Pagination from '@views/elements/pagination'
import { Loading, Toast, Empty } from '@views/elements'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import {
  setJobList,
  setRegisteredUser,
} from '@views/containers/Reference/ReferenceSlice'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import { GetPostList_getPostList } from '@services/referenceService/__generated__/GetPostList'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import referenceService from '@services/referenceService'
import authService from '@services/authService'
import { doLogin, doRegister } from '@views/lib/auth'
import { config } from '@views/lib/constants'
import { useToasts } from 'react-toast-notifications'
import LoginRegisterModal from '../LoginRegisterModal'

const actionDispatch = (dispatch: Dispatch) => ({
  setJobList: (jobs: GetPostList_getPostList) => dispatch(setJobList(jobs)),
  setRegisteredUser: (data: RegisterUser_registerUser_result) =>
    dispatch(setRegisteredUser(data)),
})

const stateSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const categoryList = [
  { id: 1, name: 'Jobs' },
  { id: 2, name: 'Internships' },
  { id: 3, name: 'Apprenticeship' },
  { id: 4, name: 'Articles' },
  { id: 8, name: 'Bursary' },
]

const LegalJobSection = (props: any) => {
  const { _jobList } = props
  const { addToast } = useToasts()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const [emailValid, setEmailValid] = useState<string>('')
  const [pwdValid, setPwdValid] = useState<string>('')
  const [forgotPwd, setForgotPwd] = useState<boolean>(false)
  const [mobileValid, setMobileValid] = useState<string>('')
  const [step, setStep] = useState<Number>(1)
  const [searchParam, setSearchParam] = useState<any>({
    text: '',
    categoryId: 1,
  })
  const { setJobList, setRegisteredUser } = actionDispatch(useAppDispatch())
  const { jobList } = useAppSelector(stateSelector)

  const getPostList = async (page: number, categoryId: number) => {
    setLoading(true)
    const result = await referenceService.getJobList(
      null,
      searchParam.text || null,
      categoryId,
      props?.categoryId,
      null,
      null,
      page,
      10,
    )
    setLoading(false)
    // console.log(result)
    if (result) {
      setJobList(result)
    }
  }

  useEffect(() => {
    // if (!jobList || !jobList.result || jobList.result.length < 2)
    if (_jobList) {
      setJobList(_jobList)
    } else {
      getPostList(1, 1)
    }
  }, [])

  const handleChangePage = (page: number) => {
    getPostList(page, searchParam.categoryId)
  }
  const handleSearch = () => {
    getPostList(1, searchParam.categoryId)
  }
  const handleHideModal = () => {
    setModalShow(false)
    setStep(1)
    setSearchParam({
      ...searchParam,
      title: '',
      description: '',
      email: '',
      mobileNumber: '',
      password: '',
    })
  }

  /* Reply (API) */
  const postReply = async () => {
    const result = await referenceService.postReply({
      postReplyId: null,
      userId: null,
      title: searchParam.title,
      description: searchParam.description,
      status: null,
      titleCategoryId: searchParam.categoryId,
      postId: searchParam.postId,
      createdBy: null,
      createdDate: null,
      postReplyAttachments: searchParam.images?.length
        ? searchParam.images.map((image: string) => ({
            thumbNailImagePath: image,
          }))
        : null,
    })
    console.log(result)
    if (result?.success) {
      addToast('Successfully applied!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setStep(1)
      setSearchParam({})
      handleHideModal()
    } else {
      addToast('Failed to apply', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  const responseFacebook = async (response: any) => {
    console.log(response)
    const { email, name, userID, picture, accessToken } = response
    if (!userID || !accessToken) {
      addToast('FaceBook OAuth Error. Try again', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }
    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const token = 'Basic ' + window.btoa(`${userID}:3`)
      const loginRes = await authService.oAuth(token)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in with Facebook!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        postReply()
        return
      } else {
        addToast('Failed to login with Facebook', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      return
    }

    setLoading(true)
    const result = await doRegister(
      email,
      userID,
      null,
      picture.data.url,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      accessToken,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered with Facebook!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      postReply()
    } else {
      addToast('Failed to register with Facebook', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const responseGoogle = async (response: any) => {
    console.log(response)
    if (response?.error) {
      addToast('Google OAuth Error. Try again', {
        appearance: 'error',
        autoDismiss: true,
      })
      return
    }
    const {
      googleId,
      accessToken,
      tokenId,
      profileObj: { email, name, imageUrl: picture },
    } = response
    // emailCheck
    const result1 = await authService.emailCheck(email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const token = 'Basic ' + window.btoa(`${googleId}:4`)
      const loginRes = await authService.oAuth(token)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in with Google!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        postReply()
        return
      } else {
        addToast('Failed to login with Google', {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      return
    }

    setLoading(true)
    const result = await doRegister(
      email,
      null,
      googleId,
      picture,
      name?.split(' ')[0] || null,
      name?.split(' ')[1] || null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered  with Google!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      postReply()
    } else {
      addToast('Failed to register with Google', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  const handleSubmitApply = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    // passwordCheck
    if (!/^(?:(?=.*\d)(?=.*[A-Z]).*)$/.test(searchParam.password)) {
      setPwdValid('Include one capital letter and one number or more')
      return
    }
    setPwdValid('')

    // mobileCheck
    if (
      !searchParam.mobileNumber.match(/^(\+\d{1,3}[- ]?)?\d{9}$/) ||
      searchParam.mobileNumber.match(/0{5,}/)
    ) {
      setMobileValid('Invaild Mobile Number')
      return
    }
    setMobileValid('')

    // emailCheck
    const result1 = await authService.emailCheck(searchParam.email)
    console.log(result1)
    if (result1?.message === 'Email already exists') {
      addToast(result1.message, {
        appearance: 'warning',
        autoDismiss: true,
      })
      // try to login
      const loginRes = await doLogin(searchParam.email, searchParam.password)
      if (loginRes?.result?.token) {
        localStorage.setItem('token', loginRes.result.token)
        addToast('Successfully logged in!', {
          appearance: 'success',
          autoDismiss: true,
        })
        setRegisteredUser(loginRes.result)
        postReply()
        return
      } else {
        addToast('Password is not correct', {
          appearance: 'error',
          autoDismiss: true,
        })
        setForgotPwd(true)
        return
      }
    }
    setEmailValid('')

    // mobileCheck
    const result2 = await authService.mobileCheck(searchParam.mobileNumber)
    console.log(result2)
    if (result2?.result !== 'true') {
      addToast(result2?.message || 'Phone Number already exists', {
        appearance: 'error',
        autoDismiss: true,
      })
      setMobileValid(result2?.message || 'Phone Number already exists')
      return
    }
    setMobileValid('')

    // submitting...
    console.log(searchParam)
    setLoading(true)
    const result = await doRegister(
      searchParam.email,
      null,
      null,
      searchParam.images ? searchParam.images[0] : null,
      null,
      null,
      searchParam.mobileNumber,
      searchParam.password,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    )
    setLoading(false)
    console.log(result)
    if (result?.token) {
      // Regustered
      localStorage.setItem('token', result.token)
      addToast('Successfully registered!', {
        appearance: 'success',
        autoDismiss: true,
      })
      setRegisteredUser(result)
      postReply()
    } else {
      addToast('Failed to register', {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  /* Step 2 (Image Upload) */
  const handleChangeFiles = (e: any) => {
    console.log(e.target.files)
    const promiseArr = []
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 20 * 1024 * 1024) {
        alert(`Image ${e.target.files[i].name} size cannot be more than 20mb.`)
        break
      }
      promiseArr.push(
        new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(e.target.files[i])
          reader.onload = async () => {
            resolve(reader.result)
          }
          reader.onerror = (e) => reject(e)
        }),
      )
    }
    Promise.all(promiseArr).then((result) => {
      setSearchParam({
        ...searchParam,
        images: searchParam.images
          ? [...searchParam.images, ...result]
          : [...result],
      })
    })
  }

  return (
    <>
      <Container fluid className="product_search mt-5">
        <Container>
          <Row className="product_search_area">
            <Col md={3} sm={6} className="my-1 align-self-center">
              <p>Search Job</p>
            </Col>
            <Col md={3} sm={6} className="my-1 align-self-center">
              <input
                name="ctl00$cphBody$txtTitle"
                type="text"
                id="txtTitle"
                className="form-control"
                placeholder="Search by Title"
                onChange={(e) =>
                  setSearchParam({
                    ...searchParam,
                    text: e.target.value,
                  })
                }
              />
            </Col>
            <Col md={3} sm={6} className="my-1 align-self-center">
              <select
                name="ctl00$cphBody$cboCategory"
                id="cboCategory"
                className="form-control"
                onChange={(e) =>
                  setSearchParam({
                    ...searchParam,
                    categoryId: Number(e.target.value),
                  })
                }
                value={searchParam.categoryId}
              >
                {categoryList.map((e) => (
                  <option value={e.id} key={e.id}>
                    {e.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col md={3} sm={6} className="my-1 align-self-center">
              <input
                type="submit"
                name="ctl00$cphBody$btnSearch"
                value="Search"
                id="btnSearch"
                className="btn-ezy btn-ezy-primary btn-ezy-round w-100"
                onClick={handleSearch}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="product_page">
        <Container>
          <Row className="justify-content-center">
            {loading ? (
              <Loading />
            ) : jobList?.result?.length ? (
              jobList.result.map((item, index) => (
                <Col md={3} sm={6} key={index}>
                  <div className="product_col">
                    <div className="product_image">
                      <Link
                        href={`${
                          item?.thumbNailImagePath
                            ? process.env.NEXT_PUBLIC_DOCUMENT_URL +
                              item.thumbNailImagePath.replace(/\\/g, '/')
                            : '/assets/img/11460-Adams-and-Adams.webp'
                        }`}
                      >
                        <img
                          src={`${
                            item?.thumbNailImagePath
                              ? process.env.NEXT_PUBLIC_DOCUMENT_URL +
                                item.thumbNailImagePath.replace(/\\/g, '/')
                              : '/assets/img/11460-Adams-and-Adams.webp'
                          }`}
                          alt={item?.title || ''}
                        />
                      </Link>
                    </div>
                    <h2>
                      <a>{item?.title}</a>
                      <br />
                      <label>{item?.companyName}</label>
                    </h2>
                    <p>{item?.description}</p>
                    <br />
                    <h4 style={{ fontStyle: 'italic', fontSize: 'smaller' }}>
                      <span>
                        Posted :{' '}
                        {item?.startDate
                          ? moment(item?.startDate).format('MMM DD, YYYY')
                          : 'N/A'}
                      </span>
                      <br />
                      <span>
                        Expires on :{' '}
                        {item?.endDate
                          ? moment(item?.endDate).format('MMM DD, YYYY')
                          : 'N/A'}
                      </span>
                    </h4>
                    <div className="btt_area clearfix">
                      <div className="buy_now">
                        <button
                          className="btn-ezy btn-ezy-primary btn-ezy-round btn-ezy-sm"
                          data-pid="604"
                          onClick={() => {
                            setSearchParam({
                              ...searchParam,
                              title: item?.title || '',
                              postId: item?.postID,
                            })
                            setModalShow(true)
                            // setShowLoginModal(true)
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))
            ) : (
              <Empty
                text={`No ${
                  categoryList.find((e) => e.id === searchParam.categoryId)
                    ?.name || 'items'
                }`}
              />
            )}
          </Row>
          <Row className="justify-content-center">
            <Pagination
              data={jobList}
              onChange={handleChangePage}
              loading={loading}
            />
          </Row>
        </Container>
      </Container>
      <Container fluid className="about_us p-0">
        <Container>
          <div className="about_content">
            <ul className="list-2">
              <li>
                <h2>How to become a lawyer? </h2>
                <ul className="list-2">
                  <li>
                    <ul className="list-2">
                      <li>
                        <p>
                          Firstly, you need to attain a Bachelor of Laws (LLB)
                          degree which takes four to five years. Alternatively
                          you can study a BCom or BA which takes <br />
                          three years and then another two years to complete
                          your LLB.
                          <br />
                          <br />
                          Secondly, you need to complete your articles of
                          clerkship at a law firm as a “candidate attorney”
                          which lasts between one or two years <br />
                          depending on whether or not you attend full time
                          Practical Legal Training (PLT). You need to register
                          your contract with the Legal Practice Council <br />
                          within two months of starting your articles. <br />
                          <br />
                          Thirdly, you have to attend a compulsory course (PLT)
                          which aims to teach you practical legal skills and
                          prepare you for the board exams. <br />
                          <br />
                          There are two options available for this course:
                          <br />
                          <br /> 1) the full time course which is either during
                          the day or at night or, <br />
                          <br />
                          2) the part-time course which is two evenings per week
                          or one full day per week. <br />
                          <br />
                          Fourthly, you are required to complete four Attorneys
                          Admissions Examinations. <br />
                          <br />
                          Lastly, once you have completed all the above steps
                          you are entitled to apply to the High Court to be
                          admitted as an attorney. You will require a <br />
                          Notice of Motion, a founding and confirmatory
                          affidavit, and the relevant annexures. <br />
                          <br />
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <ul className="list-2">
              <li>
                <h2>What subjects are needed to become a lawyer?</h2>

                <ul className="list-2">
                  <li>
                    <ul className="list-2">
                      <li>
                        <p>
                          First year:
                          <br />
                          <br />
                          • Criminal law
                          <br />
                          • Family law <br />
                          • Introduction to legal studies
                          <br />
                          • Legal history
                          <br />
                          • Legal practice <br />
                          • Law of persons
                          <br />
                          • Roman law
                          <br />
                          <br />
                          Second year:
                          <br />
                          <br />
                          • Labour law
                          <br />
                          • Law of succession <br />
                          • Legal interpretation
                          <br />
                          • Legal practice
                          <br />
                          • Criminal procedure
                          <br />
                          • Law of contract
                          <br />
                          • Law of evidence <br />
                          <br />
                          Third year:
                          <br />
                          <br />
                          • Law of business enterprise <br />
                          • Law of delict <br />
                          • Legal pluralism <br />
                          • Legal practice <br />
                          • Commercial law
                          <br />
                          • Public law
                          <br />
                          • Property law <br />
                          • Tax law
                          <br />
                          <br />
                          Fourth year:
                          <br />
                          <br />
                          • Capita selecta private law
                          <br />
                          • Capita selecta mercantile law <br />
                          • Civil procedure
                          <br />
                          • Jurisprudence <br />
                          • Legal practice <br />
                          • International law
                          <br />
                          • Law of insolvency <br />
                          • Third party compensation law
                          <br />
                          <br />
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </Container>
      </Container>
      <Modal
        show={modalShow}
        onHide={handleHideModal}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Apply</Modal.Title>
        </Modal.Header>
        <Modal.Body className="request-item-form mt-1">
          {step === 1 ? (
            <Form className="request-item-form-box pb-0">
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  required
                  onChange={(e: any) =>
                    setSearchParam({
                      ...searchParam,
                      title: e.target.value,
                    })
                  }
                  value={searchParam.title || ''}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Description"
                  required
                  onChange={(e: any) =>
                    setSearchParam({
                      ...searchParam,
                      description: e.target.value,
                    })
                  }
                  value={searchParam.description || ''}
                />
              </Form.Group>
              <Form.Group className="text-right">
                <button
                  className="btn-ezy btn-ezy-primary btn-ezy-round"
                  onClick={() => setStep(+step + 1)}
                  disabled={!searchParam.title || !searchParam.description}
                >
                  Next
                </button>
              </Form.Group>
            </Form>
          ) : step === 2 ? (
            <form>
              <div className="request-item-form-box">
                <h5>Upload Document</h5>
                <label htmlFor="upload" className="w-100">
                  <div
                    className="upload-input text-center"
                    /* style={{
                      backgroundImage:
                        searchParam?.images && searchParam?.images[0]
                          ? `url(${searchParam.images[0]})`
                          : 'none',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'auto 100%',
                      backgroundPosition: 'center',
                    }} */
                  >
                    <i className="fa fa-upload text-secondary" />
                    <p className="text-secondary">Click to upload</p>
                  </div>
                </label>
                <input
                  type="file"
                  hidden
                  id="upload"
                  multiple
                  onChange={handleChangeFiles}
                  accept="image/*"
                />
                <span className="text-secondary">
                  <span className="text-primary">Note:</span>Image or document
                  size cannot be more than 20mb.
                </span>
                <div className="image-preview mt-2">
                  {searchParam.images?.map((image: any, index: number) => (
                    <div className="mr-1 position-relative">
                      <img
                        src={image}
                        alt={`image-preview-${index}`}
                        key={index}
                        width="100"
                        height="80"
                      />
                      <i
                        className="fa fa-close close"
                        onClick={() =>
                          setSearchParam({
                            ...searchParam,
                            images: searchParam.images?.filter(
                              (e: string) => e !== image,
                            ),
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="request-item-form-box d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-ezy btn-ezy-secondary btn-ezy-round"
                  aria-label="Prev"
                  onClick={() => setStep(+step - 1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary btn-ezy-round"
                  aria-label="Next"
                  onClick={() => setStep(+step + 1)}
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            <Form onSubmit={handleSubmitApply}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  required
                  onChange={(e: any) =>
                    setSearchParam({
                      ...searchParam,
                      email: e.target.value,
                    })
                  }
                  value={searchParam.email || ''}
                />
                {emailValid && (
                  <Form.Text className="text-danger">{emailValid}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">+27</InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Enter mobile number"
                    aria-describedby="inputGroupPrepend"
                    name="phone"
                    required
                    onChange={(e) =>
                      setSearchParam({
                        ...searchParam,
                        mobileNumber: e.target.value.slice(0, 9),
                      })
                    }
                    value={searchParam.mobileNumber || ''}
                  />
                </InputGroup>
                {mobileValid && (
                  <Form.Text className="text-danger">{mobileValid}</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  required
                  onChange={(e: any) =>
                    setSearchParam({
                      ...searchParam,
                      password: e.target.value,
                    })
                  }
                  value={searchParam.password || ''}
                />
                {pwdValid && (
                  <Form.Text className="text-danger">{pwdValid}</Form.Text>
                )}
                {forgotPwd && (
                  <Form.Text className="text-danger text-right cursor-pointer">
                    <Link href="/forgot">Forgot password?</Link>
                  </Form.Text>
                )}
              </Form.Group>
              <div className="request-item-form-box mb-0">
                <hr />
                <span className="hr-text text-secondary">Or</span>
              </div>
              <div className="request-item-form-box mb-3 d-flex justify-content-between">
                <FacebookLogin
                  appId={config?.facebookAppId || ''}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  cssClass="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon my-1 xs-w-100 px-1"
                  icon="fa-facebook mr-2"
                  textButton="Facebook"
                />
                <GoogleLogin
                  clientId={config?.googleClientId || ''}
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      className="btn-ezy btn-ezy-secondary btn-ezy-soical with-icon ml-2 my-1 xs-w-100 px-1"
                    >
                      <i className="fa fa-google mr-2" aria-hidden="true"></i>
                      Google
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
              <div className="request-item-form-box mb-0 d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-ezy btn-ezy-secondary btn-ezy-round"
                  aria-label="Prev"
                  onClick={() => setStep(+step - 1)}
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="btn-ezy btn-ezy-primary btn-ezy-round"
                  aria-label="Request"
                  disabled={loading}
                >
                  Request
                </button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
      <LoginRegisterModal show={showLoginModal} toggle={setShowLoginModal} />
    </>
  )
}

export default LegalJobSection
