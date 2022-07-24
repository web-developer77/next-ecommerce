import React, { useState } from 'react'

interface IRatingProps {
  score: number,
  onRating: Function,
}

const Ratings = (props: IRatingProps) => {
  const [score, setScore] = useState<number>(props.score)

  return (
    <div className="product-rating">
      {[...new Array(5)].map((e, index) => (
        <i
          key={index}
          className={`${score > index && 'active'} fa fa-star`}
          aria-hidden="true"
          onMouseOver={() => setScore(+index + 1)}
          onMouseOut={() => setScore(props.score)}
          onClick={() => props.onRating(+index + 1)}
        />
      ))}
    </div>
  )
}

export default Ratings
