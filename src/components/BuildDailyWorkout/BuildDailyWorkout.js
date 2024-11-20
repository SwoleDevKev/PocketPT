import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Button } from 'react-bootstrap';
import './BuildDailyWorkout.scss'
import { v4 as uuidv4 } from 'uuid';
import { convertFromISO8601, formatNumberWithCommas  } from '../../HelperFunctions/conversions';
import Input from '../Input/Input';


function BuildDailyWorkout({ workout, setModalVisibility, exList, setExList, trainer_id }) {
    const [exerciseBank, setExerciseBank] = useState([]);
    const [allExercises, setAllExercises] = useState([]);
    const [showCreateExModal, setShowCreateExModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const formRef = useRef();
    const inputRef = useRef(null);
    const [name, setName] = useState('')
    const [exerciseImage, setExerciseImage] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [video_link, setVideo_link] = useState('')
    const [videoResults, setVideoResults] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('');
    const [vidDetails, setVidDetails] = useState([])
    const [showVideoPlayer, setShowVideoPlayer] = useState(false)
    const [exerciseBankRefresh, setExerciseBankRefresh] = useState(false)


    let videoId = ''

    useEffect(() => {
        const fetchAllVideos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises`);
                setExerciseBank(response.data);
                setAllExercises(response.data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchAllVideos();
    }, [exerciseBankRefresh]);

    useEffect(() => {
        if (showSearch && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showSearch]);

    const addExercise = async (exercise) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/workouts`, {
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

    const handlePlayVideo = async (event, videoId, videoName) => {
        event.stopPropagation();
        setVideoTitle(videoName)
        setVideo_link(videoId)
        setShowVideoPlayer(true)        
    }

    const handleAddExercise = async function ( videoId, videoName, videoImage) {
        setShowSearch(false)
        setVideoTitle(videoName)
        setExerciseImage(videoImage)
        setVideo_link(videoId)

        formRef.current.search.value = videoName

    }

    async function handlePostNewExercise(event) {
        event.preventDefault()
        const exercise_name = event.target.name.value
        await axios.post(`${process.env.REACT_APP_API_URL}/api/exercises`,{ trainer_id, exercise_name, video_link })
        alert('Exercise created successfully')
        setShowCreateExModal(false)


        exerciseBankRefresh ? setExerciseBankRefresh(false) : setExerciseBankRefresh(true)
    }
    const handleGetNewExercises = async (event) => {
        event.preventDefault(); 
        
        try {
            const response = await axios.get(`${process.env.REACT_APP_youtubeAPI_URL}${process.env.REACT_APP_youtubeAPI_search}${event.target.search.value}&maxResults=10&pageToken=${nextPageToken}`);
            setVideoResults(response.data.items);
            setNextPageToken(response.data.nextPageToken);           
        } catch (error) {
            console.error('Error fetching new exercises:', error);
        }
    };


    useEffect(() => {
        getVidDetails()

    }, [videoResults])

    const getVidDetails = async () => {
        const vidList = videoResults.map((el) =>  el.id.videoId ).join(',')

        const response = await axios.get(`${process.env.REACT_APP_youtubeAPI_URL}${process.env.REACT_APP_youtubeAPI_details}${vidList}`)
        
        setVidDetails(response.data.items.map((el) => {
            return {
                duration: el.contentDetails.duration,
                views: el.statistics.viewCount
            }
        }))
        
        

    }

    const handleGetMoreVids = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_youtubeAPI_URL}${process.env.REACT_APP_youtubeAPI_search}${inputRef.current.value}&maxResults=10&pageToken=${nextPageToken}`);
            setVideoResults([...videoResults, ...response.data.items]);
            setNextPageToken(response.data.nextPageToken);
        } catch (error) {
            console.error('Error fetching more videos:', error);
        }
    }

    const handleChangeExerciseList = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredExercises = allExercises.filter((exercise) => 
            exercise.exercise_name.toLowerCase().includes(searchValue)
        );
        setExerciseBank(filteredExercises);
    }


    const handleChangeName = (event) => {
        setName(event.target.value)
      };

    return (
        <>
            <section className='list'>
                <h3 className='list__heading' >{`Add Exercises for ${workout['daily-workout_name']}`}</h3>
                <p className='list__cancel' onClick={() => { setModalVisibility(false) }}>X</p>
                <Input classNameDiv="list__container" type='text' placeholder='Search' onChange={handleChangeExerciseList}/>
                {exerciseBank.map((exercise) => {

                    videoId = exercise.video_link

                    if (videoId.includes('=')){
                        const splitLink = exercise.video_link.split('=');
                        const videoIdAndQuery = splitLink[1]
                        videoId = videoIdAndQuery.split('&')[0]
                    }
                       
                    return (
                        <div key={uuidv4()} className='list__item' onClick={() => { addExercise(exercise) }}>
                            <img className='list__image' alt={exercise.exercise_name} src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`} />
                            <p className='list__text'>{exercise.exercise_name}</p>
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
                                                        <img className='field__image' alt={videoTitle} src={exerciseImage} />
                                                    </div>
                                                    
                                                </div>
                                                <Button type="submit">Create</Button>
                                            </form>
                                        </div>
            </div>}
            {showSearch && <section className='search-modal'>
                <div className='search-modal__heading-container'>

                    <h4 className='search-modal__heading'>Search for Video </h4>
                    <span className='search-modal__close btn-close' onClick={() => { setShowSearch(false) }}></span>
                </div>
                <div className='search-modal__body'>
                    <form className='search-modal__form' onSubmit={handleGetNewExercises}>
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
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>

                    <ul className='search-modal__list'>

                        {videoResults?.map((el,i) => {

                            const htmlString = el.snippet.title
                            
                            const parser = new DOMParser();
                            const htmlTitle = parser.parseFromString(htmlString, 'text/html').body.textContent;

                            return (
                                <li className='search-modal__list-item' key={uuidv4()} onClick={() => {
                                    handleAddExercise(el.id.videoId, el.snippet.title, el.snippet.thumbnails.medium.url )
                                }}>
                                    <img className='search-modal__image' alt={el.snippet.title} src={el.snippet.thumbnails.medium.url} onClick={(e)=> handlePlayVideo(e,el.id.videoId,el.snippet.title)} />
                                    <div className='search-modal__text-container'>
                                        <h4 className='search-modal__video-title'>{htmlTitle}</h4>
                                        <div className='search-modal__video-stats'>
                                            <p className='search-modal__duration'> &#x23F0; {convertFromISO8601(vidDetails[i]?.duration || "")}</p>
                                            <p className='search-modal__views'>Views: {formatNumberWithCommas(vidDetails[i]?.views|| "")}</p>
                                        </div>
                                    </div>
                                </li>
                                
                                
                            )

                        })}

                    </ul>
                    {showVideoPlayer && 
                    
                    <div className='video-player' key={uuidv4()}>
                         <section className='video-player__container'>
                                 <h2 className='video-player__heading'>{name}</h2>
                                 <p className='video-player__cancel' onClick={()=> setShowVideoPlayer(false)}>X</p>
                                 <iframe title={`demonstration of a ${name}`} src={`https://www.youtube.com/embed/${video_link}`} className='video-player__video' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share ; fullscreen"></iframe>
                             </section>
                    </div>
                        }

                    

                    {videoResults.length > 0 && <button className='search-modal__button' onClick={handleGetMoreVids}>Load More</button>}
                </div>

            </section>}

        </>
    )
}

export default BuildDailyWorkout