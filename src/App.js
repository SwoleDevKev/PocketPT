import './App.scss';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProgramOverview from './pages/WeekOverview/WeekOverview';
import DayOverview from './pages/DayOverview/DayOverview'
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import CurrentClientProgram from './pages/CurrentClientProgram/CurrentClientProgram';
import TrainerLogin from './pages/TrainerLogin/TrainerLogin';
import TrainerSignup from './pages/TrainerSignup/TrainerSignup';
import LandingPage from './pages/LandingPage/LandingPage';
import TrainerDashboard from './pages/TrainerDashboard/TrainerDashboard';
import TrainerPrograms from './pages/TrainerPrograms/TrainerPrograms';
import DailyWorkouts from './pages/DailyWorkouts/DailyWorkouts';
import Journal from './pages/Journal/Journal';
import TrainerProfile from './pages/TrainerProfile/TrainerProfile';
import ClientProfile from './components/ClientProfile/ClientProfile';
import BuildDailyWorkout from './components/BuildDailyWorkout/BuildDailyWorkout';



function App() {


  
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<LandingPage  />}></Route>
          <Route path='/client' element={<ProgramOverview  />}></Route>
          <Route path='/workout/:id' element={<DayOverview  />}></Route>
          <Route path="/journal" element={<Journal />} />
          <Route path="/profile" element={<ClientProfile />} />
          
					


          <Route path="/trainer/login" element={<TrainerLogin />} />
					<Route path="trainer/signup" element={<TrainerSignup />} />
          <Route path="/trainer/home" element={<TrainerDashboard />} />
          <Route path="/trainer/programs" element={<TrainerPrograms />} />
          <Route path='/trainer/client/:clientId/:programId' element={<CurrentClientProgram  />}></Route>
          <Route path="/trainer/workouts" element={<DailyWorkouts />} />
          <Route path="/trainer/profile" element={<TrainerProfile />} />
          <Route path="/trainer/add-exercise" element={<BuildDailyWorkout />} />

          
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
