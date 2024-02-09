import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Button } from 'react-bootstrap';
import { API_URL, API_KEY } from '../../util'
import './BuildDailyWorkout.scss'

function BuildDailyWorkout({ workout, setModalVisibility, exList, setExList, trainer_id }) {
    const [exerciseBank, setExerciseBank] = useState([]);
    const [showCreateExModal, setShowCreateExModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const formRef = useRef();
    const inputRef = useRef(null);
    const [name, setName] = useState('')
    const [exerciseImage, setExerciseImage] = useState('')
    const [video_link, setVideo_link] = useState('')
    const [videoResults, setVideoResults] = useState([]);

    let videoId = ''

    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/exercises`);
                setExerciseBank(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchAllVideos();
    }, []);

    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const addExercise = async (exercise) => {
        try {
            await axios.post(`${API_URL}/api/workouts`, {
                "daily_workout_id": workout.id,
                "exercise_id": exercise.id,
                "trainer_id": trainer_id
            });
            setExList(!exList);
            setModalVisibility(false);
        } catch (error) {
            console.error('Error adding exercise:', error);
        }
    };

    const handleAddExercise = async function (videoId, videoName, videoImage) {
        setShowSearch(false)
        setExerciseImage(videoImage)
        setVideo_link(videoId)
        formRef.current.search.value = videoName

    }

    async function handlePostNewExercise(event) {
        event.preventDefault()
        const exercise_name = event.target.name.value
        const response = await axios.post(`${API_URL}/api/exercises`,{ trainer_id, exercise_name, video_link })
    }
    const handleGetNewExercises = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${event.target.search.value}`);
            setVideoResults(response.data.items);
        } catch (error) {
            console.error('Error fetching new exercises:', error);
        }
    };
    const handleChangeName = (event) => {
        setName(event.target.value)
      };

    return (
        <>
            <section className='list'>
                <h3 className='list__heading' >{`Add Exercises for ${workout['daily-workout_name']}`}</h3>
                <p className='list__cancel' onClick={() => { setModalVisibility(false) }}>X</p>
                {exerciseBank.map((exercise) => {

                    {
                         videoId = exercise.video_link

                        if (videoId.includes('=')){
                            const splitLink = exercise.video_link.split('=');
                            const videoIdAndQuery = splitLink[1]
                            videoId = videoIdAndQuery.split('&')[0]
                        }
                        
                        console.log(videoId);
                    } return (
                        <div className='list__item' onClick={() => { addExercise(exercise) }}>
                            <img className='list__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`} />
                            <p>{exercise.exercise_name}</p>
                        </div>
                    )

                })}
                <div className='list__button-container'>
                    <button className='list__button' onClick={() => { setShowCreateExModal(true) }}>Create New Exercise</button>
                </div>
            </section>
            {showCreateExModal && <div className='exerciseModal'>
                                        <div className='exerciseModal__heading-container'>
                                            <h4 className='exerciseModal__heading'>Create New Exercise</h4>
                                            <span className='exerciseModal__close btn-close' onClick={() => { setShowCreateExModal(false)}}></span>
                                        </div>
                                        <div className='exerciseModal__body'>
                                            <form ref={formRef} onSubmit={handlePostNewExercise}>
                                                <div className="field" >
                                                    <label htmlFor='name' className="field__label">Name</label>
                                                    <input
                                                        onChange={handleChangeName}
                                                        type='text'
                                                        id='name'
                                                        name='name'
                                                        className="field__input"
                                                        onClick={(e) => { e.stopPropagation(); }}
                                                    />
                                                </div>
                                                <div className="field" >
                                                    <label htmlFor={'search'} className="field__label">Add video</label>
                                                    <div className='field__inputAndImage'>
                                                        <input
                                                            onFocus={() => { setShowSearch(true) }}
                                                            type='text'
                                                            id='search'
                                                            name='search'
                                                            className="field__input field__input--small "
                                                            onClick={(e) => { e.stopPropagation(); }}
                                                            
                                                        />
                                                        <img className='field__image' src={exerciseImage} />
                                                    </div>
                                                    
                                                </div>
                                                <Button type="submit">Create</Button>
                                            </form>
                                        </div>
            </div>}
            {showSearch && <section className='searchModal'>
                <div className='searchModal__heading-container'>

                    <h4 className='searchModal__heading'>Search for Video</h4>
                    <span className='searchModal__close btn-close' onClick={() => { setShowSearch(false) }}></span>
                </div>
                <div className='searchModal__body'>
                    <form className='searchModal__form' onSubmit={handleGetNewExercises}>
                        <div className="field">
                            <label htmlFor='search' className="field__label">Add a video</label>
                            <input
                                ref={inputRef}
                                className='field__input'
                                type='text'
                                defaultValue={name}
                                id='search'
                                name='search'
                                onClick={(e) => e.stopPropagation()}
                            />

                        </div>
                        <button type="submit" className="btn btn-primary">Search</button> {/* Search button added */}
                    </form>

                    <ul>

                        {videoResults?.map((el) => {
                            return (
                                <li onClick={() => {
                                    handleAddExercise(el.id.videoId, el.snippet.title, el.snippet.thumbnails.medium.url )
                                }}>
                                    <div><img src={el.snippet.thumbnails.medium.url} /></div>
                                    <div>
                                        <h4>{el.snippet.title}</h4>
                                    </div>
                                </li>
                            )

                        })}
                    </ul>
                </div>

            </section>}

        </>
    )
}

export default BuildDailyWorkout