import React from "react"
import { Container } from "react-bootstrap"

const DownloadSection = () => {
  return (
    <section className="download-option clearfix">
      <Container>
        <div className="download-option-wrapper">
          <h3 className="title">Download Our App</h3>
          <div className="download-option-cate clearfix">
            <a
              href="https://apps.apple.com/us/app/ezyfind/id1611700455"
              download
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-android" aria-hidden="true"></i> Android Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.inno.ezyfind"
              download
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa fa-apple" aria-hidden="true"></i> Apple Store
            </a>
            <a
              href="https://appgallery.huawei.com/app/C106621035"
              download
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/assets/img/hawei_icon.webp"
                width="72"
                height="71"
                alt="hawei_icon"
              />{" "}
              &nbsp; AppGallery
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DownloadSection
