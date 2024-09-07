// IMPORTS 
// Styles 
import './App.css'
// React 
import { useEffect } from 'react'
// RRD
import { Route, Routes} from 'react-router-dom'

//PAGES 
import { Home } from './pages/Home'

function App() {




  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>Log in</h1>} />
        <Route path="*" element={<h1>Errr Page</h1>} />
      </Routes>
    </div>
  )
}

export default App
