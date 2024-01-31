import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { API_URL } from '../../util'
import Input from '../Input/Input';
import './BuildDailyWorkout.scss'
import { API_KEY } from '../../util';


function BuildDailyWorkout ({workout, setModalVisibility , exList, setExList, trainer_id}){

    console.log("TRAINER ID :",trainer_id);
    const [exerciseBank, setExerciseBank ]= useState([])
    const [showCreateExModal, setShowCreateExModal] = useState(false)
    const [showSearch, setShowSearch] = useState(true)

    const [videoResults, setVideoResults] = useState([])

    let videoId = ''

    const addExercise = async (exercise)=>{
         await axios.post(`${API_URL}/api/workouts`,{
            "daily_workout_id": workout.id,
            "exercise_id": exercise.id, 
            "trainer_id": trainer_id
        })

        alert(`added ${exercise.exercise_name}`)
        exList ? setExList(false) : setExList(true)
        setModalVisibility(false)

    }

    useEffect(()=>{
        async function getAllVideos(){
            const response = await axios.get(`${API_URL}/api/exercises`)
            setExerciseBank(response.data)
        }

        getAllVideos()
    },[])

    const handleAddExercise = async function (){
        await axios.post(`${API_URL}`)
    }
    
   async function handlePostNewExercise (event) {
         event.preventDefault()
    //    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${event.target.search.value}`)
    //    console.log(response.data);
    //    setVideoResults(response.data.items)
    }
    async function handleGetNewExercises (event) {
        event.preventDefault()
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${event.target.search.value}`)
      console.log(response.data);
      setVideoResults(response.data.items)
   }

    return(
        <>
        <section className='list'>
            <h3 className='list__heading' >{`Add Exercises for ${workout['daily-workout_name']}`}</h3>
            <p className='list__cancel' onClick={ ()=>{ setModalVisibility(false)} }>X</p>
            {exerciseBank.map((exercise)=>{
                
                {const splitLink = exercise.video_link.split('=');
                const videoIdAndQuery = splitLink[1]
                videoId = videoIdAndQuery.split('&')[0]
                
            } return(
                <div className='list__item' onClick={ ()=>{addExercise(exercise)}}>
                    <img className='list__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`}/>
                    <p>{exercise.exercise_name}</p>
                </div>
            )
            
        } )}
            <div className='list__button-container'>
                <button className='list__button' onClick={()=>{setShowCreateExModal(true)}}>Create New Exercise</button>
            </div>
        </section>
        <Modal show={showCreateExModal} fullscreen={true} onHide={() => setShowCreateExModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handlePostNewExercise}>
                <Input label='Name' name='name'></Input>
                <Input  onFocus={()=>{setShowSearch(true)}} type='text' label='Add video' name='search'></Input>
                <Button>Create</Button>
            </form>
            <Modal show={showSearch} fullscreen={true} onHide={() => setShowSearch(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Search for Video</Modal.Title>
                    <Modal.Body>
                        <form onSubmit={handleGetNewExercises}>
                            <Input onClick={()=>{}} type='text' label='Add video' name='search'></Input>
                        </form>
                    </Modal.Body>
                </Modal.Header>
            </Modal>
            <ul>

            {videoResults?.map((el)=>{
                return(
                    <li onClick={()=>{
                        handleAddExercise(el.id.videoId)
                    }}>
                        <div><img src={el.snippet.thumbnails.medium.url}/></div> 
                        <div>
                                <h4>{el.snippet.title}</h4>
                        </div>
                    </li>
                )
                
            })}
            </ul>
        </Modal.Body>
      </Modal>
        
        </>
    )
}

export default BuildDailyWorkout