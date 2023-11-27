import './App.scss';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProgramOverview from './pages/WeekOverview/WeekOverview';
import DayOverview from './pages/DayOverview/DayOverview'
import { useEffect, useState } from 'react';
import axios from 'axios';
import {API_URL} from './util'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CurrentClientProgram from './pages/CurrentClientProgram/CurrentClientProgram';
import TrainerLogin from './pages/TrainerLogin/TrainerLogin';
import TrainerSignup from './pages/TrainerSignup/TrainerSignup';
import LandingPage from './pages/LandingPage/LandingPage';
import TrainerDashboard from './pages/TrainerDashboard/TrainerDashboard';
import TrainerPrograms from './pages/TrainerPrograms/TrainerPrograms';
import DailyWorkouts from './pages/DailyWorkouts/DailyWorkouts';



function App() {

  
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LandingPage  />}></Route>
          <Route path='/client' element={<ProgramOverview  />}></Route>
          <Route path='/trainer/client/:clientId/:programId' element={<CurrentClientProgram  />}></Route>
          <Route path='/workout' element={<DayOverview  />}></Route>
          <Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
          <Route path="/trainer/home" element={<TrainerDashboard />} />
          <Route path="/trainer/programs" element={<TrainerPrograms />} />
          <Route path="/trainer/workouts" element={<DailyWorkouts />} />
          <Route path="/trainer/login" element={<TrainerLogin />} />
					<Route path="trainer/signup" element={<TrainerSignup />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
