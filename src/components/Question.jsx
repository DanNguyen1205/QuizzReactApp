import React from 'react'

export const Question = (props) => {
  return (
    <>
      <div className='flex justify-center items-center align-middle border-4 border-blue-700 h-56 rounded-t-lg'>
      <span className='font-semibold text-2xl m-10'>{props.decodeHtml(props.question)}</span>
      </div>
    </>
  )
}

export default Question