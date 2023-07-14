import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Netx from './Pages/Netx'
import Graph from './Pages/Graph'
import React from 'react'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/styles'

  const theme = createTheme({
  typography: {
    'fontFamily': [
      'Inter',
    ].join(','),
    'htmlFontSize': 40
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={theme}>
       <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Netx />} />
          <Route path="graph" element={<Graph />} />
        </Route>  
      </Routes>
    </ThemeProvider>
  )
}

export default App
