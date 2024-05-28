import { useState } from 'react'
//import ProjectCreate from "./comp/ProjectCreate"
import Testing from "./comp/Testing"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <ProjectCreate/> */}
      <Testing/>
    </>
  )
}

export default App
