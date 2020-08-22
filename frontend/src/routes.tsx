import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatPoint'
import RegistrationCompleted from './pages/RegistrationCompleted'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact/>
            <Route component={CreatePoint} path="/create-point"/>
            <Route component={RegistrationCompleted} path="/registration-completed"/>
        </BrowserRouter>
    )
}

export default Routes