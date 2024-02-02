import './App.scss';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import ProgramOverview from './clientPages/WeekOverview/WeekOverview';
import DayOverview from './clientPages/DayOverview/DayOverview'
import Login from './clientPages/Login/Login';
import Signup from './clientPages/Signup/Signup';
import CurrentClientProgram from './trainerPages/CurrentClientProgram/CurrentClientProgram';
import TrainerLogin from './trainerPages/TrainerLogin/TrainerLogin';
import TrainerSignup from './trainerPages/TrainerSignup/TrainerSignup';
import LandingPage from './trainerPages/LandingPage/LandingPage';
import TrainerDashboard from './trainerPages/TrainerDashboard/TrainerDashboard';
import TrainerPrograms from './trainerPages/TrainerPrograms/TrainerPrograms';
import DailyWorkouts from './trainerPages/DailyWorkouts/DailyWorkouts';
import Journal from './clientPages/Journal/Journal';
import TrainerProfile from './trainerPages/TrainerProfile/TrainerProfile';
import ClientProfile from './clientPages/ClientProfile/ClientProfile';
import BuildDailyWorkout from './components/BuildDailyWorkout/BuildDailyWorkout';
import CustomWorkouts from './trainerPages/CustomWorkouts/CustomWorkouts'
import DayOverviewEdit from './trainerPages/DayOverviewEdit/DayOverviewEdit';


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
          <Route path='/trainer/custom-workouts' element={<CustomWorkouts/>}></Route>
          <Route path='/trainer/client/:clientId/:programId' element={<CurrentClientProgram  />}></Route>
          <Route path="/trainer/workouts" element={<DailyWorkouts />} />
          <Route path='/trainer/workout/:id' element={<DayOverviewEdit  />}></Route>
          <Route path="/trainer/profile" element={<TrainerProfile />} />
          <Route path="/trainer/add-exercise" element={<BuildDailyWorkout />} />

          
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
