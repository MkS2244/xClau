// ------- COMPONENTES -------
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/Home/Home'
// ----- RUTAS -----
import { Route, Routes } from 'react-router-dom'
// ----- CSS -----
import './style/App.css'

function App() {


  return (
    <>
      <div className='container' >
        <Header />
        <Routes>
          <Route path="/productos" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
