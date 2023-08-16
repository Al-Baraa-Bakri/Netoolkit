import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import Netx from './Pages/Netx/Netx'
import CreateNetxProject from './Pages/Netx/CreateNetxProject'
import Graph from './Pages/Graph/Graph'
import React from 'react'
import { Provider } from 'react-redux';
import { store } from './Store/store'
import { Auth0ProviderWithNavigate } from './Layers/Auth0ProviderWithNavigate'
import AuthLayer from './Layers/AuthLayer'
import Home from './Pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Result from './Pages/Netx/Result'
import Ip from './Pages/Ip/Ip';

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
                <Route path='netx/create' element={<CreateNetxProject update={false}/>}/>
                <Route path='netx/update/:id' element={<CreateNetxProject update={true}/>}/>
                <Route path='netx/result/:id' element={<Result />}/>
                <Route path="graph" element={<Graph />} />
                <Route path="ip" element={<Ip />} />
              </Route>  
            </Routes>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AuthLayer>
        </Auth0ProviderWithNavigate>
      </Provider>
  )
}

export default App
