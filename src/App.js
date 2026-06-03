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
import Journal from './clientPages/Journal/Journal';
import TrainerProfile from './trainerPages/TrainerProfile/TrainerProfile';
import ClientProfile from './clientPages/ClientProfile/ClientProfile';
import BuildDailyWorkout from './components/BuildDailyWorkout/BuildDailyWorkout';
import CustomWorkouts from './trainerPages/CustomWorkouts/CustomWorkouts'
import DayOverviewEdit from './trainerPages/DayOverviewEdit/DayOverviewEdit';
import { TrainerAuthorization } from './components/TrainerAuth/TrainerAuth';
import { ClientAuthorization } from './components/ClientAuth/ClientAuth';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';



function App() {

  const AuthenticatedProgramOverview = ClientAuthorization(ProgramOverview)
  const AuthenticatedDayOverview = ClientAuthorization(DayOverview)
  const AuthenticatedJournal = ClientAuthorization(Journal)
  const AuthenticatedClientProfile = ClientAuthorization(ClientProfile)


  const AuthenticatedTrainerDashboard = TrainerAuthorization(TrainerDashboard)
  const AuthenticatedTrainerPrograms = TrainerAuthorization(TrainerPrograms)
  const AuthenticatedCustomWorkouts = TrainerAuthorization(CustomWorkouts)
  const AuthenticatedCurrentClientProgram = TrainerAuthorization(CurrentClientProgram)
  const AuthenticatedDayOverviewEdit = TrainerAuthorization(DayOverviewEdit)
  const AuthenticatedTrainerProfile = TrainerAuthorization(TrainerProfile)
  const AuthenticatedBuildDailyWorkout = TrainerAuthorization(BuildDailyWorkout)




  
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<LandingPage  />}></Route>

          <Route path='/client' element={<AuthenticatedProgramOverview  />}></Route>
          <Route path='/workout/:id' element={<AuthenticatedDayOverview  />}></Route>
          <Route path="/journal" element={<AuthenticatedJournal />} />
          <Route path="/profile" element={<AuthenticatedClientProfile />} />
          
					


          <Route path="/trainer/login" element={<TrainerLogin />} />
					<Route path="trainer/signup" element={<TrainerSignup />} />
          <Route path="/trainer/home" element={<AuthenticatedTrainerDashboard />} />
          <Route path="/trainer/programs" element={<AuthenticatedTrainerPrograms />} />
          <Route path='/trainer/workouts' element={<AuthenticatedCustomWorkouts/>}></Route>
          <Route path='/trainer/client/:clientId/:programId' element={<AuthenticatedCurrentClientProgram  />}></Route>
          <Route path='/trainer/workout/:id' element={<AuthenticatedDayOverviewEdit  />}></Route>
          <Route path="/trainer/profile" element={<AuthenticatedTrainerProfile />} />
          <Route path="/trainer/add-exercise" element={<AuthenticatedBuildDailyWorkout />} />
          <Route path="*" element={<NotFoundPage />} />

          
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
