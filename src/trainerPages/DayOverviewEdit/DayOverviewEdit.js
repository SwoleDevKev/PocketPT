import { Link, useNavigate, useParams } from 'react-router-dom'
import './DayOverviewEdit.scss'
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseCardEdit from '../../components/ExerciseCardEdit/ExerciseCardEdit';
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';


function DayOverviewEdit (){

    const [exercises, setExercises] = useState()
	const [details, setDetails] = useState(false)
    const {id} = useParams()
    
    useEffect(()=>{
        async function getExercises(){
          const response =  await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/custom/${id}`)

          setExercises(response.data)
        }
        getExercises()
    },[id, details])
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get(`${process.env.REACT_APP_API_URL}/api/trainers/current`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				setUser(response.data)
			})
			.catch((error) => {
				setFailedAuth(true)
			})

        
		
	}, []);


	if (failedAuth) {
		return (
			<main className="dashboard">
				<p>You must be logged in to see this page.</p>
				<p>
					<Link to="/trainer/login">Log in</Link>
				</p>
			</main>
		);
	}

	if (user === null) {
		return (
			<main className="dashboard">
				<p>Loading...</p>
			</main>
		);
	}
    return (
        <>
            <Header />
            <h1 className='day-overview__heading'>Let's get it</h1>
            {exercises && exercises.map((exercise)=>{
              return  <ExerciseCardEdit details={details} setDetails={setDetails} exercise={exercise}/>
            })}
            <TrainerFooter />
        </>
    )
}

export default DayOverviewEdit