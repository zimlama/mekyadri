import React from 'react'

function Card({name,city,img,stars}) {

  return (
    <div>
        {name}
        {city}
        <img src={img}/>
        {stars}
    </div>
  )
}

export default Card