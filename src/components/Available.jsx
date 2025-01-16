import React from 'react';
import '../assets/Available.css'
import Buses from './BusCard'
const Available = () => {
  return (
    <>
    <div className="main">
        <div className="heading">
            <h3>Hey! These are the avalialble Buses</h3>
        </div>
        <div className="cards">
            <Buses/>
            
            
        </div>
    </div>
    </>
  )
}

export default Available;