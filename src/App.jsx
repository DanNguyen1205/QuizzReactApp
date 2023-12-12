import { useState, createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Question from './components/Question'
import Answer from './components/Answer'
import Quiz from './pages/Quiz'

import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import QuizErrorPage from './pages/QuizErrorPage'

// export const AppContext = createContext();

function App() {
  

  const [points, setPoints] = useState(0);

  //client for api queries. config
  const client = new QueryClient({defaultOptions:{
    queries:{
      refetchOnWindowFocus: false,
    }
  } });

  return (
    <>
    {/* <AppContext.Provider> */}
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path='/QuizzReactApp' element={ <Home/> }></Route>
            <Route path='/QuizzReactApp/quiz' element={ <Quiz/> }></Route>
            <Route path='/QuizzReactApp/quizErrorPage' element={ <QuizErrorPage/> }></Route>

          </Routes>
        </Router>
      </QueryClientProvider>
    {/* </AppContext.Provider> */}
    </>
  )
}

export default App
