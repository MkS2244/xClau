// ----- PAGINAS -----
import Home from './pages/Home/Home'
import Details from './pages/Details/Details'
import LoginRegister from './pages/User/LoginRegister'

// ----- RUTAS -----
import { Route, Routes } from 'react-router-dom'

// ----- CSS -----
import './style/App.css'
import Container from 'react-bootstrap/Container'

function App() {

  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/detalle/:id' element={<Details />} />
          <Route path='/login' element={<LoginRegister />} />
        </Routes>
        {/* <Footer /> */}
      </Container>
    </>
  )
}

export default App
