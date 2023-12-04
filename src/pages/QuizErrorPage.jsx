import React from 'react'
import { useNavigate } from 'react-router-dom'

export const QuizErrorPage = () => {
    const navigate = useNavigate();

    const returnHome = () => {
        console.log("HI")
        navigate('/');
    }

  return (
    <>
        <div>QuizErrorPage! The quiz could not be made with the current settings. Try lowering the number of questions</div>
        <button onClick={returnHome}>Go back to options page</button>
    </>

  )
}

export default QuizErrorPage