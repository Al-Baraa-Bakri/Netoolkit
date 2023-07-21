import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Netx from './Pages/Netx'
import Graph from './Pages/Graph'
import React from 'react'
import { Provider } from 'react-redux';
import { store } from './Store/store'
import { Auth0ProviderWithNavigate } from './Layers/Auth0ProviderWithNavigate'
import AuthLayer from './Layers/AuthLayer'
import Home from './Pages/Home'


function App() {
  const [count, setCount] = useState(0)
  return (
      <Provider store={store}>
        <Auth0ProviderWithNavigate>
          <AuthLayer>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="netx" element={<Netx/>} />
                <Route path="graph" element={<Graph />} />
                <Route path="ip" element={<Graph />} />
              </Route>  
            </Routes>
          </AuthLayer>
        </Auth0ProviderWithNavigate>
      </Provider>
  )
}

export default App
