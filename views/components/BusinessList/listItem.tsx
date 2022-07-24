import React, { useState } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { categoryData } from '@views/lib/constants'

interface IAttorneyItemProps {
  data: any
  onContact: any
}

const ListItem = (props: IAttorneyItemProps) => {
  const [loadMore, setLoadMore] = useState<Boolean>(false)
  const { data, onContact } = props

  console.log("inside list item--------------------------",props)
  return (
    <div className="searching_list_col">
      <Link href={`/${categoryData.name}/business/${data?.companyId}`}>
        <div className="searching_list_col_image cursor-pointer">
          <img
            src={
              data?.logoPath
                ? `${categoryData.domain}/Documents/${data.logoPath}`
                : '/assets/img/nia.jpg'
            }
            alt={data?.companyName}
            onError={(e: any) =>
              (e.target.src = '/assets/img/nia.jpg')
            }
          />
          <div className="searching_list_date">
            {data.joinDate ? moment(data.joinDate).format('D MMMM') : 'N/A'}
          </div>
        </div>
      </Link>
      <div className="searching_list_col_content">
        <Link href={`/${categoryData.name}/business/${data?.companyId}`}>
          <h2 className="cursor-pointer">{data?.companyName}</h2>
        </Link>
        <h3>{data?.compStreetAddress}</h3>
        <div className="search_col_detail">
          <p style={{ height: loadMore ? '100%' : '52px' }}>
            {data?.compDescription}
          </p>
        </div>
        <ul>
          <li>
            <Link href={`/${categoryData.name}/business/${data?.companyId}`}>
              <button className="btn-ezy btn-ezy-dark">Read More</button>
            </Link>
          </li>
          <li>
            <button
              className="btn-ezy btn-ezy-primary"
              onClick={() => onContact(data.companyId)}
            >
              Contact Now
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ListItem
