import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"
import ProgramCard from "../../components/programCard/ProgramCard"
import './TrainerPrograms.scss'
import WeeklyProgramCard from "../../components/WeeklyProgramCard/WeeklyProgramCard"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import TrainerFooter from "../../components/TrainerFooter/TrainerFooter"

function TrainerPrograms (){

    const [programs, setPrograms] = useState(null)
    const [weeklyPrograms, setWeeklyPrograms] = useState(null)

    useEffect(()=>{
       async function getPrograms(){
           const response = await axios.get(`${API_URL}/api/programs`)
           setPrograms(response.data)
        }
        getPrograms()
    },[])

    useEffect(()=>{
        async function getWeeklyPrograms(){
            const response = await axios.get(`${API_URL}/api/programs/weekly`)
            console.log(response.data)
            setWeeklyPrograms(response.data)
         }
         getWeeklyPrograms()
     },[])

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get(`${API_URL}/api/trainers/current`, {
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
            <section className="program">

                <h2 className="program__heading">Monthly Programs </h2>
                {programs && programs.map((program)=>{
                    return(
                        <ProgramCard key={program.id} program={program}/>
                    )
                })}
            </section>

            <section className="program">

                <h2 className="program__heading" >Weekly Programs</h2>
                {weeklyPrograms && weeklyPrograms.map((program)=>{
                    return(
                        <WeeklyProgramCard key={program.id} program={program}/>
                    )
                })}
            </section>
            
            <h2 className="program__heading" >Daily Workouts</h2>

            <div className="program-container">
                <Link  className="program" to="/trainer/workouts">
                    <h2 className="program__heading program__heading--link" >Default Daily Workouts</h2>
                </Link>
                <Link  className="program" to="/trainer/custom-workouts">
                    <h2 className="program__heading program__heading--link" >Custom Daily Workouts</h2>
                </Link>
            </div>
           
            <TrainerFooter />
            
        </>
    )
}

export default TrainerPrograms