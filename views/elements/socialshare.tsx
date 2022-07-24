import React from 'react'
import router from 'next/router'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share'
import { config } from '@views/lib/constants'

const SocialShare = () => {
  return (
    <div className="w-100 d-flex justify-content-end align-items-center mb-1">
      <FacebookShareButton
        url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
        children={<FacebookIcon size={32} round={false} />}
        quote={''}
        hashtag={''}
      />
      <LinkedinShareButton
        url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
        children={<LinkedinIcon size={32} round={false} />}
        title={''}
        summary={''}
        source={''}
      />
      <TwitterShareButton
        url={process.env.NEXT_PUBLIC_ROOT_URL + router.asPath}
        children={<TwitterIcon size={32} round={false} />}
        title={''}
        via={''}
        hashtags={[]}
        related={[]}
      />
    </div>
  )
}

export default SocialShare
