import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Quotebar from './components/Quotebar'
import Home from './pages/Home'
import Economics from './pages/Economics'
import Footer from './components/Footer'
import { Box } from '@chakra-ui/react'
import Articles from './pages/Articles'
import History from './pages/History'
import Geography from './pages/Geography'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoutes'
import Questions from './pages/Questions'
import Question from './pages/Question'

function App() {

  return (
    <>
      <Navbar />
      <Quotebar />
      <Box minHeight={"60vh"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/economics" element={<Economics />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/history" element={<History />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/login" element={<Login />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/question" element={<ProtectedRoute component={Question} />} />
        </Routes>
      </Box>
      <Footer />
    </>
  )
}

export default App
