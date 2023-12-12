import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import Axios from "axios"
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

export const Options = () => {
//hooks
const [numberOfQuestions, setNumberOfQuestions] = useState(50);
const [seconds, setSeconds] = useState(50);



//Functions
const {register, handleSubmit} = useForm()
const navigate = useNavigate();

const rangeHandler = (event) => {
    setNumberOfQuestions(event.target.value)
}

const secondsRangeHandler = (event) => {
    setSeconds(event.target.value)
}

const onSubmit = (data) => {
    navigate('/QuizzReactApp/quiz', {state: data});
}

const { data: categoryData, isLoading } = useQuery(["category"], () => {
    const res = Axios.get("https://opentdb.com/api_category.php").then((res) => res.data); 
    return res; 
});

//html returned
    return (
        <>
            <h2 className='mt-10 mb-10'>Configure the settings to your liking</h2>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5 items-center grow' action="">
                <output id="num" className=''>Number of questions: {numberOfQuestions}</output> 
                <input className='w-full' type="range" min="1" max="50"   {...register('amount', {onChange: (e) => rangeHandler(e)})}/>
                {/* <output id="seconds" className=''>Seconds per question: {seconds}</output> 
                <input className='w-full' type="range" min="5" max="60" {...register('seconds', {onChange: (e) => secondsRangeHandler(e)})}/> */}
                <select className='w-full' name="" id="" {...register("category")}>
                    {/* <option value="" disabled selected>Select Category</option> */}
                    <option value="" id='AnyCategory'>Any Category</option>
                    {categoryData?.trivia_categories.map((category)=> <option value={category.id} id={category.id}>{category.name}</option>)}
                </select>
                <select className='w-full' name="" id="" {...register("difficulty")}>
                    {/* <option value="" disabled selected>Select Difficulty</option> */}
                    <option value="">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <select className='w-full' name="" id="" {...register("type")}>
                    {/* <option value="" disabled selected>Select Type</option> */}
                    <option value="">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>

                </select>
                <select className='w-full' name="" id="" {...register("encode")}>
                    <option value="" disabled selected>Select Encoding</option>
                    <option value="">Default Encoding</option>
                    <option value="url3986">URL Encoding (RFC 3986)</option>
                    <option value="base64">Base64 Encoding</option>
                </select>
                <input className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mt-10 mb-10 w-3/4' type="submit" value="Generate Quizz" />

                {/* time limit per question */}
            </form>
        </>

    )
}

export default Options