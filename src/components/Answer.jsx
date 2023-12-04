import React from 'react'

export const Answer = (props) => {
  return (
    <div className="grid grid-cols-2">
      {props.answers[0] != null && <button onClick={props.answerHandler} class="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-16 px-32 border border-blue-700 rounded-br-lg">
      {props.decodeHtml(props.answers[0])}
      </button>}
      {props.answers[1] != null && <button onClick={props.answerHandler} class="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-16 px-32 border border-blue-700 rounded-br-lg">
      {props.decodeHtml(props.answers[1])}
      </button>}
      {props.answers[2] != null && <button onClick={props.answerHandler} class="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-16 px-32 border border-blue-700 rounded-br-lg">
      {props.decodeHtml(props.answers[2])}
      </button>}
      {props.answers[3] != null && <button onClick={props.answerHandler} class="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-16 px-32 border border-blue-700 rounded-br-lg">
      {props.decodeHtml(props.answers[3])}
      </button>}

    </div>     
  )
}

export default Answer