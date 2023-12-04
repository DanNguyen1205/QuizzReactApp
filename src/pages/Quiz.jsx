import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState, useEffect, useRef} from 'react'
import { useQuery } from '@tanstack/react-query';
import Axios from "axios"
import Question from '../components/Question';
import Answer from '../components/Answer';
import QuizHeader from '../components/QuizHeader';
import Timer from '../components/Timer';
import { useNavigate } from 'react-router-dom';


const Quiz = () => {
  //Hooks
  const {state} = useLocation();
  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(state.seconds)

  const [QnA, setQnA] = useState([]); 
  const [question, setQuestion] = useState([])
  const [answers, setAnswers] = useState([]);
  const retakeQuizRef = useRef(null)

  const navigate = useNavigate();

  //Utility functions 
  useEffect(() => {
    console.log(seconds, "-state has changed")
    if(seconds<=0){

      changeQnAHandler(index+1)
      setSeconds(state.seconds);
    }
  }, [seconds]);

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const answerHandler = (event) => {
    console.log("------------------------------------------------------------")

    if(index === QnA.length-1){
      //End the quizz
      console.log("Correct answer: " + QnA[index].correct_answer)
      console.log("Chosen answer: " + event.target.innerText)
      QnA[index].correct_answer === event.target.innerText &&
      setPoints(points+1) 

      endQuiz();
    }else{
      var localIndex = index;
      //Set points
      console.log("Correct answer: " + QnA[localIndex].correct_answer)
      console.log("Chosen answer: " + event.target.innerText)
  
      QnA[localIndex].correct_answer === event.target.innerText && 
      setPoints(points+1)

      localIndex++;
      setIndex(localIndex)
      console.log("Index: " + localIndex)
  
      //Change question and answer
      changeQnAHandler(localIndex)
    }
  }

  const endQuiz = () => {
    setQuestion("Your quiz has finished!")
    setAnswers([])

    const element = retakeQuizRef.current;
    element.style.visibility = "visible"
  }

  const changeQnAHandler = (index) => {
    console.log("Next Correct answer: " + QnA[index].correct_answer)

    setQuestion(QnA[index].question)
    setAnswerHandler(QnA, index)

  }

  const setAnswerHandler = (array, index) => {
    var answersArray;


    answersArray = array[index].incorrect_answers;
    //Some answers from the API has the correct answer in its incorrect answer list
    //and some dont, therefore we check and insert it into answersarray if they dont. 
    !array[index].incorrect_answers.includes(array[index].correct_answer) 
    && answersArray.push(array[index].correct_answer);

    shuffleArray(answersArray);    
    setAnswers(answersArray)
  }

  const resetQuizHandler = () => {
    const element = retakeQuizRef.current;
    element.style.visibility = "hidden"

    setPoints(0);
    setIndex(0);
    
    changeQnAHandler(0);

    setSeconds(state.seconds);
  }

  const { data: quizData, isLoading } = useQuery(["quiz"], () => {
    Axios.get("https://opentdb.com/api.php?", {params: {amount: state.amount, category: state.category, difficulty: state.difficulty,
    type: state.type, encode: state.encode}})
    .then((res) => {
      setQnA(res.data.results); 
      console.log(res.data.results)
      setQnA(res.data.results); 

      setQuestion(res.data.results[0].question)
      // var answersArray = res.data.results[0].incorrect_answers;
      // answersArray.push(res.data.results[0].correct_answer);
      // shuffle(answersArray);
      // setAnswers(answersArray)
      setAnswerHandler(res.data.results, index);
      return res.data.results
    }).catch(
      function(error){
        navigate('/quizErrorPage');

       
      }
    )
  });
  
  return (
    <>
      {isLoading && <div>Loading ...</div>}
      <QuizHeader index={index} length={QnA.length} points={points} seconds={seconds} endQuiz={endQuiz}/>
      <div className='mx-8 mt-10 bg-blue-100'>
      <Question decodeHtml={decodeHtml} question={question}/>
      <Answer decodeHtml={decodeHtml} answerHandler={answerHandler} answers={answers}/>
      </div>
      <div ref={retakeQuizRef} onClick={resetQuizHandler} className='invisible mx-8 flex flex-row-reverse'>
        <button className="bg-blue-500 hover:bg-blue-700 text-lg text-white font-bold py-16 px-32 border border-blue-700 rounded-br-lg">Retake quizz?</button>
      </div>

        
    </>
    
  )
}

export default Quiz