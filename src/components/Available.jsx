import React from 'react';
import '../styles/Available.css'
import Buses from './BusCard'
const Available = () => {
  return (
    <>
    <div className="main dark:bg-gray-950 dark:text-white">
        <div className="heading dark:bg-gray-950 dark:text-white">
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