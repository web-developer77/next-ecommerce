import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Form } from 'react-bootstrap'
import HowToWork from '../ContactUs/howtowork'
import Pagination from '@views/elements/pagination'
import { Dispatch } from 'redux'
import { createSelector } from 'reselect'
import { useAppDispatch, useAppSelector } from '@redux/hooks'
import businessService from '@services/businessService'
import { GetBusiness_getBusinessList } from '@services/businessService/__generated__/GetBusiness'
import { setBusinessList } from '@views/containers/Attorneys/AttorneyPageSlice'
import { makeSelectBusinessList } from '@views/containers/Attorneys/selectors'

import { Loading } from '@views/elements'
const categoryId = Number(process.env.NEXT_PUBLIC_DEFAULT_CATEGORY_ID);
const actionDispatch = (dispatch: Dispatch) => ({
  setBusinessList: (page: GetBusiness_getBusinessList) => dispatch(setBusinessList(page)),
})

const stateSelector = createSelector(
  makeSelectBusinessList,
  (businessList) => ({
    businessList,
  }),
)

const AttorneySection = () => {
  const [loadMore, setLoadMore] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(true)
  const { setBusinessList } = actionDispatch(useAppDispatch())
  const { businessList } = useAppSelector(stateSelector)

  const fetchBusinessList = async () => {
    const result = await businessService
      .getBusinessList(
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
      .catch((err) => {
        console.log('Error', err)
      })
    setLoading(false)
    if (result) {
      console.log('result', result)
      setBusinessList(result)
    }
  }

  const handleChangePage = (page: number) => {
  }

  useEffect(() => {
    console.log('businessList', businessList)
    if (!businessList || !businessList.result || businessList.result.length < 2)
      fetchBusinessList()
  }, [])

  return (
    <>
      <Container className="contact-us">
        <HowToWork />
      </Container>
      <Container fluid className="product_search">
        <Container>
          <Row className="product_search_area">
            <Col md={12} sm={12}>
              <p>Search filters</p>
            </Col>
            <Col md={2} sm={6} className="my-1 align-self-center">
              <input
                name="ctl00$cphBody$txtTitle"
                type="text"
                id="txtTitle"
                className="form-control"
                tabIndex={1}
                placeholder="Company Name"
              />
            </Col>
            <Col md={2} sm={6} className="my-1 align-self-center">
              <select
                name="ctl00$cphBody$cboCategory"
                id="cboCategory"
                className="form-control"
              >
                <option value="0">All Category</option>
                <option value="8">Apologies</option>
                <option value="2">Citizenship</option>
                <option value="3">Commercial Transactions</option>
                <option value="4">Companies</option>
                <option value="5">Estates</option>
                <option value="1">Home Affairs</option>
                <option value="6">Intellectual Property</option>
                <option value="10">Mortgage and Notarial Agreements </option>
                <option value="7">Persons &amp; Family</option>
                <option value="9">Property</option>
                <option value="11">Sales </option>
              </select>
            </Col>
            <Col md={2} sm={6} className="my-1 align-self-center">
              <select
                name="ctl00$cphBody$cboCategory"
                id="cboCategory"
                className="form-control"
              >
                <option value="0">All Category</option>
                <option value="8">Apologies</option>
                <option value="2">Citizenship</option>
                <option value="3">Commercial Transactions</option>
                <option value="4">Companies</option>
                <option value="5">Estates</option>
                <option value="1">Home Affairs</option>
                <option value="6">Intellectual Property</option>
                <option value="10">Mortgage and Notarial Agreements </option>
                <option value="7">Persons &amp; Family</option>
                <option value="9">Property</option>
                <option value="11">Sales </option>
              </select>
            </Col>
            <Col md={2} sm={6} className="my-1 align-self-center">
              <select
                name="ctl00$cphBody$cboCategory"
                id="cboCategory"
                className="form-control"
              >
                <option value="0">All Category</option>
                <option value="8">Apologies</option>
                <option value="2">Citizenship</option>
                <option value="3">Commercial Transactions</option>
                <option value="4">Companies</option>
                <option value="5">Estates</option>
                <option value="1">Home Affairs</option>
                <option value="6">Intellectual Property</option>
                <option value="10">Mortgage and Notarial Agreements </option>
                <option value="7">Persons &amp; Family</option>
                <option value="9">Property</option>
                <option value="11">Sales </option>
              </select>
            </Col>
            <Col md={2} sm={6} className="my-1 align-self-center">
              <select
                name="ctl00$cphBody$cboCategory"
                id="cboCategory"
                className="form-control"
              >
                <option value="0">All Category</option>
                <option value="8">Apologies</option>
                <option value="2">Citizenship</option>
                <option value="3">Commercial Transactions</option>
                <option value="4">Companies</option>
                <option value="5">Estates</option>
                <option value="1">Home Affairs</option>
                <option value="6">Intellectual Property</option>
                <option value="10">Mortgage and Notarial Agreements </option>
                <option value="7">Persons &amp; Family</option>
                <option value="9">Property</option>
                <option value="11">Sales </option>
              </select>
            </Col>
            <Col md={2} sm={6} className="my-1 align-self-center">
              <input
                type="submit"
                name="ctl00$cphBody$btnSearch"
                value="Search"
                id="btnSearch"
                className="btn-ezy btn-ezy-primary btn-ezy-round w-100"
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="product_page">
        {loading ? (
          <Loading />
        ) : (
          <Container>
            <Row className="flex-column">
              <h3>Search Results</h3>
              <h4>{`${
                businessList?.count || 0
              }
              ${categoryId == 1447 ?"Attorneys Or Lawyers Law Firm ": categoryId == 1402 ? "Results Found": categoryId == 549 ? "Results Found" : categoryId == 1672 ? "Results Found" : categoryId == 1396 ? "Results Found" : categoryId == 1384 ? "Results Found" : categoryId == 1384 ? "Results Found" : "Results Found"}
 
              `}</h4>
              <br />
            </Row>
            <Row className="justify-content-center">
              {[...(businessList?.result || [])].map((el, index) => (
                <Col md={3} sm={6} key={index}>
                  <div className="search_box clearfix">
                    <div className="date">
                      <span className="day">25</span>{' '}
                      <span className="month">Jun</span>{' '}
                    </div>
                    <div className="search_img">
                      <a href="/Attorneys/11316/van-der-meer-attorneys-in-durbanville.aspx">
                        <img
                          src="https://www.lawyersezyfind.co.za/Documents/CompanyLogo/11316-Van-der-Meer-Attorneys.jpg"
                          alt="Van der Meer Attorneys "
                        />
                      </a>
                    </div>
                    <div className="meta">
                      <ul>
                        <li>
                          4 Durbanville Avenue Service Road,Valmary
                          Park,Durbanville,7550
                        </li>
                        <li>Durbanville</li>
                      </ul>
                    </div>
                    <h1>
                      <a href="/Attorneys/11316/van-der-meer-attorneys-in-durbanville.aspx">
                        Van der Meer Attorneys{' '}
                      </a>
                    </h1>
                    <p className="content">
                      Quality legal representation is essential for a successful
                      business. Our goal is to provide the best legal
                      representation available to our clients. We are proud of
                      the hi...
                    </p>
                    <div className="read_more">
                      <Link href="/western-cape/cape-town-north/durbanville/11316/van-der-meer-attorneys-in-Attorneys.aspx">
                        <button className="btn-ezy btn-ezy-secondary btn-ezy-sm">
                          Read More
                        </button>
                      </Link>
                      <button
                        className="btn-ezy btn-ezy-primary contact_bussiness btn-ezy-sm"
                        data-title="Van der Meer Attorneys "
                        data-desc="Quality legal representation is essential for a successful business. Our goal is to provide the best legal representation available to our clients. We are proud of the high legal and ethical standards that have been established by our firm and the tradition of excellence which we work to maintain. Our core purpose is to create partnerships that provide clients with peace of mind through expert advice and zealous representation. In all of our transactions, one variable remains the same: a commitment to respecting and understanding our clients’ best interests."
                      >
                        Contact Attorney
                      </button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <Row className="justify-content-center">
              <Pagination
                data={businessList}
                onChange={handleChangePage}
                loading={loading}
              />
            </Row>
          </Container>
        )}
      </Container>

      <Container className="contact-us">
        <Row className="heading">
          <h2>LAW CATEGORIES</h2>
        </Row>
        <Row
          className="catergory_menu justify-content-center"
          style={{ height: loadMore ? '100%' : '223px', overflow: 'hidden' }}
        >
          <ul id="myListBottom">
            <li>
              <a href="https://www.LawyersEzyFind.co.za/administrative-law.aspx">
                Administrative law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/african-customary-law.aspx">
                African customary law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/aviation-law.aspx">
                Aviation law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/banking-and-finance-law.aspx">
                Banking and finance law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/business-and-industry-law.aspx">
                Business and industry law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/civil-rights.aspx">
                Civil rights
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/company-law.aspx">
                Company law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/competition-law.aspx">
                Competition law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/constitutional-law.aspx">
                Constitutional law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/consumer-protection-law.aspx">
                Consumer protection law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/copyright-law.aspx">
                Copyright law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/criminal-law.aspx">
                Criminal law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/education-law.aspx">
                Education law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/environmental-law.aspx">
                Environmental law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/estate-planning-and-trusts-law.aspx">
                Estate planning and trusts law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/family-law.aspx">
                Family law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/general-legal-practice.aspx">
                General legal practice
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/health-care-and-social.aspx">
                Health care and social
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/immigration-law.aspx">
                Immigration law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/insolvency-law.aspx">
                Insolvency law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/insurance-law.aspx">
                Insurance law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/intellectual-property-law.aspx">
                Intellectual property law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/international-law.aspx">
                International law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/law-of-telecommunications.aspx">
                Law of telecommunications
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/legal-professional-ethics.aspx">
                Legal professional ethics
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/litigation.aspx">
                Litigation
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/marriage-and-divorce-law.aspx">
                Marriage and divorce law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/media-law.aspx">
                Media law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/national-credit-act.aspx">
                National credit act
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/personal-injury-law.aspx">
                Personal injury law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/pension-law.aspx">
                Pension law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/property-law.aspx">
                Property law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/science-and-technology-law.aspx">
                Science and technology law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/sports-law.aspx">
                Sports law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/tax-law.aspx">
                Tax law
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/the-law-behind-medical-malpractice.aspx">
                The law behind medical malpractice
              </a>
            </li>
            <li>
              <a href="https://www.LawyersEzyFind.co.za/the-law-of-lease-of-land.aspx">
                The law of lease of land
              </a>
            </li>
          </ul>
        </Row>
        <Row className="justify-content-center mt-4">
          <button
            className="btn-ezy btn-ezy-primary btn-ezy-round"
            type="button"
            onClick={() => setLoadMore(!loadMore)}
          >
            {loadMore ? 'Load less' : 'Load more'}
          </button>
        </Row>
      </Container>
    </>
  )
}

export default AttorneySection
