import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch } from 'redux'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { Container, Button } from 'react-bootstrap'
import { getMobileOperatingSystem } from '@views/lib/helper'
import { createSelector } from 'reselect'
import productsService from '@services/productsService'
import referenceService from '@services/referenceService'
import authService from '@services/authService'
import { makeSelectCartList } from '@views/containers/HomePage/selectors'
import { makeSelectReference } from '@views/containers/Reference/selectors'
import { setCartList } from '@views/containers/HomePage/homePageSlice'
import {
  setPostList,
  setRegisteredUser,
} from '@views/containers/Reference/ReferenceSlice'
import { GetPrdShoppingCart_getPrdShoppingCart } from '@services/productsService/__generated__/GetPrdShoppingCart'
import { GetPostList_getPostList_result } from '@services/referenceService/__generated__/GetPostList'
import { RegisterUser_registerUser_result } from '@services/authService/__generated__/RegisterUser'
import RegisterModal from '../RegisterModal'

const stateSelector = createSelector(makeSelectCartList, (cartList) => ({
  cartList,
}))

const postSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const actionDispatch = (dispatch: Dispatch) => ({
  setCartList: (cart: GetPrdShoppingCart_getPrdShoppingCart) =>
    dispatch(setCartList(cart)),
  setPostList: (data: GetPostList_getPostList_result[]) =>
    dispatch(setPostList(data)),
  setRegisteredUser: (data: RegisterUser_registerUser_result | null) =>
    dispatch(setRegisteredUser(data)),
})

const HeaderTop = (props: any) => {
  const router = useRouter()

  const { setCartList, setPostList, setRegisteredUser } = actionDispatch(
    useAppDispatch(),
  )
  const { cartList } = useAppSelector(stateSelector)
  const { postList, registeredUser } = useAppSelector(postSelector)

  const [loggedin, setLoggedin] = useState<boolean>(false)
  const [swing, setSwing] = useState<Boolean>(false)
  const [smartVisible, setSmartVisible] = useState<Boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [includeScript, setIncludeScript] = useState<any>(false)

  /* const getPostListById = async (postId: number) => {
    const result = await referenceService.getPostList(
      postId,
      null,
      null,
      null,
      null,
      null,
      1,
      10,
    )
    console.log(result)
    if (result) {
      setPostList(result)
    }
  } */

  const getPostList = async () => {
    /* const _result = await referenceService.getJobList(
      null,
      null,
      props?.categoryId,
      9,
      null,
      "Menu",
      null,
      null,
    )
    console.log("_result", _result) */
    const result = await referenceService.getPostList(
      null,
      null,
      props?.categoryId,
      9,
      null,
      "Menu",
      1,
      -1,
    )
    console.log("result", result)
    if (result) {
      setPostList(result)
      result.forEach((e) => {
        // e.postID && getPostListById(e.postID)
        setIncludeScript(e.googleSchema)
      })
    }
  }

  const getPrdShoppingCart = async () => {
    const result = await productsService
      .getPrdShoppingCart(10, 1)
      .catch((err) => {
        console.log('Error', err)
        /* Reload guest token */
        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
          window.location.reload()
        }
      })
    if (result) {
      setCartList(result)
    }
  }

  const goto = () => {
    router.push({
      pathname: `/${props.name}/calculator`,
    })
  }
  useEffect(() => {
    setSmartVisible(localStorage.getItem('smart-hidden') ? false : true)
    getPrdShoppingCart()
    // if (!postList || !postList.length || postList == null)
    getPostList()
  }, [])

  /* Check logged in */
  const checkSession = async () => {
    const session = await authService.getSession(1)
    if (session?.sessionKeyLogin) {
      setLoggedin(true)
    }
  }

  useEffect(() => {
    if (registeredUser) {
      setLoggedin(
        registeredUser?.token === localStorage.getItem('token') ? true : false,
      )
    } else {
      checkSession()
    }
  }, [registeredUser])

  /* Mobile */
  const handleShowMobileMenu = () => {
    setSwing(!swing)
  }

  const handleCloseSmart = () => {
    localStorage.setItem('smart-hidden', 'true')
    setSmartVisible(false)
  }
  const handleSmartInstall = () => {
    localStorage.setItem('smart-hidden', 'true')
    switch (getMobileOperatingSystem()) {
      case 'Windows Phone':
        router.push('https://bit.ly/3layizZ')
        break
      case 'Android':
        router.push(
          'https://play.google.com/store/apps/details?id=com.INNOVEzyFind',
        )
        break
      case 'iOS':
        router.push(
          'https://itunes.apple.com/us/app/ezyfind/id980233151?ls=1&mt=8',
        )
        break
    }
  }

  /* register & logout */
  const handleRegister = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setShowModal(true)
  }

  const handleLogout = (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    localStorage.removeItem('token')
    setRegisteredUser(null)
    setLoggedin(false)
  }

  return (
    <section className="w-100">
      <div className="mobile-top-header">
        {/* {includeScript && <InjectScript script={includeScript} />} */}

        {smartVisible && (
          <div className="smart-banner">
            <div className="d-flex align-items-center">
              <i className="fa fa-close" onClick={handleCloseSmart}></i>
              <img
                src="/assets/img/apple-touch-icon.webp"
                className="img-responsive ml-3"
                width="57"
                height="57"
                alt="apple-touch-icon"
              />
              <div className="smart-info ml-3">
                <strong>EzyFind</strong>
                <br />
                <span>Innovation Evolved Pty Ltd</span>
                <br />
                <span>FREE - In Google Play</span>
              </div>
            </div>
            <Button variant="danger" size="sm" onClick={handleSmartInstall}>
              INSTALL
            </Button>
          </div>
        )}
        <ul className="clearfix mb-0">
          {loggedin ? (
            <>
              <li>
                <a href="/logout" onClick={handleLogout}>
                  Logout
                </a>
              </li>
              <li>
                <a>
                  {`${registeredUser?.firstName || 'User'} ${
                    registeredUser?.lastName || ''
                  }`}
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <a href="/register" onClick={handleRegister}>
                  Register
                </a>
              </li>
            </>
          )}
          <li>
            <Link href="/cart">
              <span className="btn-cart">
                {' '}
                <i className="icon-cart-full"></i> ({cartList?.count || 0})
              </span>
            </Link>
          </li>
          {props.categoryId !==
          Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID) ? (
            <li>
              <span className="btn-bid">
                {' '}
                <i className="icon-bid"></i> (0)
              </span>
            </li>
          ) : null}
        </ul>
      </div>
      <div className="main-header-top">
        <Container className="ezy-container">
          <div className="top-header-content clearfix">
            <ul className="left-panel-top-header clearfix">
              {loggedin ? (
                <>
                  <li>
                    <a href="/logout" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                  <li>
                    <a>
                      {`${registeredUser?.firstName || 'User'} ${
                        registeredUser?.lastName || ''
                      }`}
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <a href="/register" onClick={handleRegister}>
                      Register
                    </a>
                  </li>
                </>
              )}
            </ul>
            <ul className="right-panel-top-header clearfix">
              <li>
                <Link href="/cart">
                  <span className="btn-cart">
                    {' '}
                    <i className="icon-cart-full"></i> Cart (
                    {cartList?.count || 0})
                  </span>
                </Link>
              </li>
              {props.categoryId !==
              Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID) ? (
                <li>
                  <span className="btn-bid">
                    {' '}
                    <i className="icon-bid"></i> My Bid (0)
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        </Container>
      </div>
      <div className="bottom-header-wrapper">
        <div className="bottom-header">
          <div className="logo">
            <Link href="/">
              <img
                src="/assets/img/logo.webp"
                className="img-responsive"
                width="163"
                height="94"
                alt="logo"
              />
            </Link>
          </div>
          <div className="header-right">
            <button
              className="menu-icon"
              onClick={handleShowMobileMenu}
              aria-label="Menu"
            >
              <i className="icon-menu-bar"></i>
            </button>
            <nav className={swing ? 'swing nav-primary' : 'nav-primary'}>
              <ul className="menu-main-navigation menu clearfix">
                {props.menuList?.map((menu: any, index: number) => (
                  <li
                    className={`${
                      router.pathname === `/${props.name}${menu.path}` ||
                      `${router.pathname}/` === `/${props.name}${menu.path}` ||
                      router.pathname === menu.path
                        ? 'active '
                        : ''
                    } ${menu?.subMenu ? 'dropdown' : ''}`}
                    key={index}
                  >
                    {menu?.subMenu ? (
                      <>
                        <a
                          href={menu.path}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                          }}
                        >
                          {menu.name}
                        </a>
                        <ul className="dropdown-menu ">
                          {postList?.map((post: any, index: number) => (
                            <li className="dropdown-menu-list" key={index}>
                              <Link
                                href={`/${props.name}/article/${post.postID}`}
                                key={index}
                              >
                                {post.title}
                              </Link>
                            </li>
                          ))}
                          <li
                            // onClick={() => goto()}
                            className="dropdown-menu-list"
                          >
                            <Link href={`/${props.name}/calculator`}>
                              Child Maintenance
                            </Link>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <Link
                        href={
                          menu.name == 'Product'
                            ? '/businesses?text=&province=&city=&suburb=&subCategoryId='
                            : menu.name == 'Home'
                            ? '/'
                            : `/${props.name}${menu.path}`
                        }
                      >
                        {menu.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <RegisterModal show={showModal} toggle={setShowModal} />
    </section>
  )
}

export default HeaderTop
