import './App.scss';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProgramOverview from './pages/WeekOverview/WeekOverview';
import DayOverview from './pages/DayOverview/DayOverview'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from './util'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';



function App() {

  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<ProgramOverview  />}></Route>
          <Route path='/workout' element={<DayOverview  />}></Route>
          <Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
