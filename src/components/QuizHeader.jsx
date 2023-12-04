import React, { useState } from 'react'
import Timer from './Timer'

export const QuizHeader = (props) => {


  return (
    <>
    <div className='mx-8 mt-2 grid grid-cols-3'>
      <div className='flex justify-center items-center col-start-2 col-end-3'>
        <span className='mt-4 text-2xl'>Current question {props.index+1}/{props.length}</span> 
        <span className='ml-10 mt-4 text-2xl'>Points: {props.points}</span>
      </div>
      <div className='flex justify-center items-center'>
        {/* <Timer seconds={props.seconds} endQuiz={props.endQuiz}/> */}
      </div>
    </div>
    </>
  )
}

export default QuizHeader