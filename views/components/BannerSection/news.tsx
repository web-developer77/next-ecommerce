import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import Slider from 'react-slick'
import { Dispatch } from 'redux'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import { createSelector } from 'reselect'
import { setNewsSliderKey } from '@views/containers/Reference/ReferenceSlice'
import { makeSelectReference } from '@views/containers/Reference/selectors'

interface INewProps {
  className?: string | undefined
}

const actionDispatch = (dispatch: Dispatch) => ({
  setNewsSliderKey: (
    key: String,
  ) => dispatch(setNewsSliderKey(key)),
})

const stateSelector = createSelector(
  makeSelectReference,
  (reference) => reference,
)

const sliderKeys = [
  "help",
  "attorney",
  "agreement",
] as Array<String>

const NewTopics = (props: INewProps) => {
  const sliderRef = useRef(null)
  const { newsSliderKey } = useAppSelector(stateSelector)
  const { setNewsSliderKey } = actionDispatch(useAppDispatch())

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    beforeChange: (current: any, next: number) => setNewsSliderKey(sliderKeys[next])
  }

  useEffect(() => {
    if (newsSliderKey) (sliderRef.current as any)?.slickGoTo(sliderKeys.indexOf(newsSliderKey))
  }, [newsSliderKey])

  return (
    <div className={`what-new ${props.className || ""}`}>
      <Slider ref={sliderRef} {...settings}>
        <div className="what-new-box">
          {/* <b>Legal Help</b> */}
          <ul>
            <li className="wh">
              <Link
                href={{ pathname: "/lawyers", query: { scopeId: 2 } }}
                // as="/lawyers"
              >What’s Hot</Link>
            </li>
            <li className="es">
              <Link
                href={{ pathname: "/lawyers", query: { scopeId: 3 } }}
                // as="/lawyers"
              >Ending Soon</Link>
            </li>
            <li className="wn">
              <Link
                href={{ pathname: "/lawyers", query: { scopeId: 3 } }}
                // as="/lawyers"
              >What’s New</Link>
            </li>
            <li className="ts">
              <Link
                href={{ pathname: "/lawyers", query: { scopeId: 1 } }}
                // as="/lawyers"
              >Top Searches</Link>
            </li>
            <li className="rb">
              <Link
                href={{ pathname: "/lawyers", query: { scopeId: 2 } }}
                // as="/lawyers"
              >Recent Buys</Link>
            </li>
          </ul>
        </div>
        <div className="what-new-box">
          {/* <b>Law Firm / Attorney</b> */}
          <ul>
            <li className="wh">
              <Link
                href={{ pathname: "/businesses", query: {} }}
                // as="/lawyers/attorneys"
              >Most Viewed</Link>
            </li>
            <li className="es">
              <Link
                href={{ pathname: "/businesses", query: {} }}
                // as="/lawyers/attorneys"
              >Most interactive</Link>
            </li>
          </ul>
        </div>
        <div className="what-new-box">
          <b>Download</b>
          {/* Agreements / Contracts */}
          <ul>
            <li className="wh">
              <Link
                href={{ pathname: "/listing", query: { scopeId: 1 } }}
                // as="/lawyers/contracts"
              >Most viewed</Link>
            </li>
            <li className="es">
              <Link
                href={{ pathname: "/listing", query: { scopeId: 2 } }}
                // as="/lawyers/contracts"
              >Most downloaded</Link>
            </li>
            <li className="gd">
              <Link
                href={{ pathname: "/listing", query: { scopeId: 3 } }}
                // as="/lawyers/contracts"
              >Frequent downloaded</Link>
            </li>
            {/* <li className="wn">
              <Link
                href={{ pathname: "/lawyers/contracts", query: { scopeId: 4 } }}
                // as="/lawyers/contracts"
              >Most Legal checked</Link>
            </li> */}
          </ul>
        </div>
      </Slider>
    </div>
  )
}

export default NewTopics
