import { useNavigate, useParams } from 'react-router-dom'
import './DayOverview.scss'
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DayOverview({ user }) {
    const [exercises, setExercises] = useState()
    const { id } = useParams()

    useEffect(() => {
        async function getExercises() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/${id}`)
            setExercises(response.data)
        }
        getExercises()
    }, [id])

    const navigate = useNavigate()

    if (!exercises) {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <Header />
            <div className='day-overview'>
                <div className='day-overview__exercises'>
                    {exercises.map((exercise, i) => (
                        <ExerciseCard key={i} exercise={exercise} />
                    ))}
                </div>
                <div className='day-overview__button-container'>
			    <button
                    onClick={() => navigate('/client')}
                    className='day-overview__button'
                >
                    Done
                </button>
            </div>
                
            </div>
            <Footer user={user} />
        </>
    )
}

export default DayOverview
