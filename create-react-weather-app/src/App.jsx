import { useState } from 'react'
import './App.css'
import WeatherApp from './components/WeatherApp/WeatherApp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <WeatherApp/>
      </div>
      {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
