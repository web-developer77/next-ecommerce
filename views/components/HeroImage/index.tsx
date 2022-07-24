import React from 'react'
import style from './heroimage.module.scss'

interface IHeroImageProps {
  title: String
  bgImageUrl: String
}

const HeroImage = (props: IHeroImageProps) => {

  return (
    <div
      className={style.banner}
      style={{ backgroundImage: `url(${props.bgImageUrl})` }}
    >
      <h1>{props.title}</h1>
    </div>
  )
}

export default HeroImage
