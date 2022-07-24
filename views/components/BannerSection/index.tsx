import React from 'react'
import Link from 'next/link'
import Slider from 'react-slick'
import RequestAssistance from './request'
import NewTopics from './news'

const settings = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: true,
}

const BannerSection = (props: any) => {
  return (
    <section className="banner-wrapper clearfix">
      <RequestAssistance className="hidden-mobile-area" {...props} />
      <section className="banner">
        <Slider {...settings}>
          <div className="banner-item">
            {/* <img src="/assets/img/banner-image.jpg" className="img-responsive" width="996" height="450" alt="" /> */}
            <iframe
              width="996"
              height="450"
              src={props.categoryData.categoryId == 1447 ?"https://www.youtube.com/embed/AYQf91OF1Bc": props.categoryData.categoryId == 1402 ? "https://www.youtube.com/embed/59u-IK1cJUI": props.categoryData.categoryId == 549 ? "https://www.youtube.com/embed/rD0sdNbVNj0" : props.categoryData.categoryId == 1672 ? "https://www.youtube.com/embed/VUBobkVHrw0" : props.categoryData.categoryId == 1396 ? "https://www.youtube.com/embed/O5WUQQmdAhQ" : props.categoryData.categoryId == 1384 ? "https://www.youtube.com/embed/vNGX0UTcfDg" : props.categoryData.categoryId == 1384 ? "https://www.youtube.com/embed/VaJHtp8PHOc" : "https://www.youtube.com/embed/VaJHtp8PHOc"}
              frameBorder="0"
              allowFullScreen
              style={{ width: '100%', height: 450 }}
              title="Lawyers  / Attorneys LIVE waiting to assist"
            ></iframe>
          </div>
          <div className="banner-item">
            <img
              src="/assets/img/banner2.webp"
              className="img-responsive"
              width="996"
              height="450"
              alt="banner2"
            />
          </div>
        </Slider>
      </section>
      <NewTopics />
      <RequestAssistance className="hidden-desktop-area" {...props} />
      <NewTopics className="hidden-desktop-area" />
    </section>
  )
}

export default BannerSection
