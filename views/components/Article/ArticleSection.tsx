import React, { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Form } from 'react-bootstrap'

const ArticleSection = (props: any) => {
  const article = props.data
  return (
    <Container className="py-5">
      <h2 className="heading text-center">
        <Link href="/listing">{article?.title || 'Article'}</Link>
      </h2>
      <div className="link_image my-3 text-center">
        <Link href="/listing">
          <img
            src="/assets/img/Free-Legal-Contract-Download.gif"
            alt="Download legal contract for free"
          />
        </Link>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: article?.description?.replace(/\:\:marker/g, '') || '' }}
      ></div>
    </Container>
  )
}

export default ArticleSection
