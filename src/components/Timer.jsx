import React, { useEffect, useState, useRef } from 'react'

export const Timer = ({seconds, endQuiz}) => {
    const [num, setNum] = useState(seconds);
    
    let intervalRef = useRef();
    
    const decreaseNum = () => setNum((prev) => prev - 1);
  
    useEffect(() => {
      intervalRef.current = setInterval(decreaseNum, 1000);
  
      return () => clearInterval(intervalRef.current);
    }, []);

    // Add a listener to `timeLeft`
    useEffect(() => {
        console.log(num)


        if (num <= 0) {
        clearInterval(intervalRef.current);
        endQuiz();
        }
    }, [num]);
    
    return (
      <div>
        <div className='ml-10 mt-4 text-2xl'>{num}</div>
      </div>
    );
}

export default Timer