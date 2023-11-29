import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './DayOverview.scss'
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../util';


function DayOverview (){

    const [exercises, setExercises] = useState()
    const {id} = useParams()
    
    useEffect(()=>{
        async function getExercises(){
          const response =  await axios.get(`${API_URL}/api/exercises/${id}`)

          setExercises(response.data)
        }
        getExercises()
    },[])
    const navigate = useNavigate()

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get("http://localhost:8085/api/clients/current", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				console.log(response.data);
				setUser(response.data)
			})
			.catch((error) => {
				console.log(error);
				setFailedAuth(true)
			})

	}, []);


	if (failedAuth) {
		return (
			<main className="dashboard">
				<p>You must be logged in to see this page.</p>
				<p>
					<Link to="/login">Log in</Link>
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




   

    
    if(!exercises){
        return(
            <h1>Loading......</h1>
        )
    }
    return (
        <>
            <Header />
            <h1 className='day-overview__heading'>Let's get it</h1>
            {exercises && exercises.map((exercise)=>{
              return  <ExerciseCard exercise={exercise}/>
            })}
            <button onClick={()=>{ navigate('/client') }} className='day-overview__button'>Done</button>
            <Footer />
        </>
    )
}

export default DayOverview