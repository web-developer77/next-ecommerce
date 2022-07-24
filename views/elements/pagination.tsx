import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'

interface IPaginationProps {
  data: {
    currentPage: number | null
    nextPage: number | null
    prevPage: number | null
    totalPages: number | null
  } | null
  onChange: any,
  loading: boolean,
}

const PaginationComp = (props: IPaginationProps) => {
  const { data, loading } = props
  if (!data || !data.totalPages) {
    return null
  }
  if (data.totalPages && data.totalPages < 8) {
    return (
      <Row>
        <Col>
          <Pagination>
            <Pagination.Prev
              disabled={loading || data.currentPage === 1}
              onClick={() => props.onChange(1)}
            />
            {[...new Array(data.totalPages)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={data.currentPage === index + 1}
                onClick={() =>
                  data.currentPage === index + 1
                    ? {}
                    : props.onChange(index + 1)
                }
                disabled={loading}
              >
                {+index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={loading || data.totalPages === data.currentPage}
              onClick={() => props.onChange(data.totalPages)}
            />
          </Pagination>
        </Col>
      </Row>
    )
  }
  if (!data.currentPage || data.currentPage < 5) {
    return (
      <Row>
        <Col>
          <Pagination>
            <Pagination.First
              disabled={loading || data.currentPage === 1}
              onClick={() => props.onChange(1)}
            />
            <Pagination.Prev
              disabled={loading || data.currentPage === 1}
              onClick={() =>
                props.onChange(data.currentPage && data.currentPage - 1)
              }
            />
            {[...new Array(5)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={data.currentPage === index + 1}
                onClick={() =>
                  data.currentPage === index + 1
                    ? {}
                    : props.onChange(index + 1)
                }
                disabled={loading}
              >
                {+index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Ellipsis disabled />
            <Pagination.Item
              active={data.currentPage === data.totalPages}
              onClick={() => props.onChange(data.totalPages)}
              disabled={loading}
            >
              {data.totalPages}
            </Pagination.Item>
            <Pagination.Next
              disabled={loading || data.totalPages === data.currentPage}
              onClick={() =>
                props.onChange(data.currentPage && data.currentPage + 1)
              }
            />
            <Pagination.Last
              disabled={loading || data.totalPages === data.currentPage}
              onClick={() => props.onChange(data.totalPages)}
            />
          </Pagination>
        </Col>
      </Row>
    )
  }
  if (data.currentPage < data.totalPages - 3) {
    return (
      <Row>
        <Col>
          <Pagination>
            <Pagination.First
              disabled={loading || data.currentPage === 1}
              onClick={() => props.onChange(1)}
            />
            <Pagination.Prev
              disabled={loading || data.currentPage === 1}
              onClick={() =>
                props.onChange(data.currentPage && data.currentPage - 1)
              }
            />
            <Pagination.Item disabled={loading}>{1}</Pagination.Item>
            <Pagination.Ellipsis disabled />
            {[...new Array(3)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index === 1}
                onClick={() =>
                  index === 1
                    ? {}
                    : props.onChange(
                        data.currentPage && data.currentPage + index - 1,
                      )
                }
                disabled={loading}
              >
                {data.currentPage && data.currentPage + index - 1}
              </Pagination.Item>
            ))}
            <Pagination.Ellipsis disabled />
            <Pagination.Item
              active={data.currentPage === data.totalPages}
              onClick={() => props.onChange(data.totalPages)}
              disabled={loading}
            >
              {data.totalPages}
            </Pagination.Item>
            <Pagination.Next
              disabled={loading || data.totalPages === data.currentPage}
              onClick={() =>
                props.onChange(data.currentPage && data.currentPage + 1)
              }
            />
            <Pagination.Last
              disabled={loading || data.totalPages === data.currentPage}
              onClick={() => props.onChange(data.totalPages)}
            />
          </Pagination>
        </Col>
      </Row>
    )
  }
  return (
    <Row>
      <Col>
        <Pagination>
          <Pagination.First
            disabled={loading || data.currentPage === 1}
            onClick={() => props.onChange(1)}
          />
          <Pagination.Prev
            disabled={loading || data.currentPage === 1}
            onClick={() =>
              props.onChange(data.currentPage && data.currentPage - 1)
            }
          />
          <Pagination.Item disabled={loading}>{1}</Pagination.Item>
          <Pagination.Ellipsis disabled />
          {[...new Array(5)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={
                (data.totalPages &&
                  data.currentPage === data.totalPages + index - 4) ||
                false
              }
              onClick={() =>
                data.totalPages &&
                data.currentPage === data.totalPages + index - 4
                  ? {}
                  : props.onChange(
                      data.totalPages && data.totalPages + index - 4,
                    )
              }
              disabled={loading}
            >
              {data.totalPages && data.totalPages + index - 4}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={loading || data.totalPages === data.currentPage}
            onClick={() =>
              props.onChange(data.currentPage && data.currentPage + 1)
            }
          />
          <Pagination.Last
            disabled={loading || data.totalPages === data.currentPage}
            onClick={() => props.onChange(data.totalPages)}
          />
        </Pagination>
      </Col>
      {/* <style jsx>{`
        .pagination {
            margin: 0;
          width: 100%;
        }

        .pagination ul {
            margin: 0 auto;
            display: table;
        }

        .pagination li {
            float: left;
            margin-right: 8px;
            list-style: none;
        }

        .pagination a {
            color: #575757;
            display: block;
            background: #ffffff;
            border: 1px solid #A4A4A4;
            text-decoration: none;
            padding: 5px 11px;
            font-size: 13px;
            font-weight: 700;
            border-radius: 2px;
            transition: all .4s ease-in-out;
        }

        .pagination a:hover {
            color: #ffffff;
          background: #BA0A1B;
          border-color: #BA0A1B;
        }
        @media (min-width: 1200px) {
          .pagination {
            margin-top: 30px;
          }
        }
      `}</style> */}
    </Row>
  )
}

export default PaginationComp
