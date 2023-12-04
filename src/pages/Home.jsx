import React from 'react'
import Options from '../components/Options'

const Home = () => {
  return (
    

    <>
    <div className='h-screen flex items-center flex-col mt-8'>
      <nav>
        <h1 className='font-black text-5xl'>QUIZ GENERATOR</h1>     
      </nav>
      {/* Selectors */}
      <Options/>
    </div>
    
    


    </>
  )
}

export default Home