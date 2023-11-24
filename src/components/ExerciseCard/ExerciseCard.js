import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import './ExerciseCard.scss'
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useState } from 'react';


function ExerciseCard({exercise}){
    const splitLink = exercise.video_link.split('=');
    const videoIdAndQuery = splitLink[1]
    const videoId = videoIdAndQuery.split('&')[0]
    const [videoModalVisibility, setVideoModalVisibility] = useState(false)

    function handleModalVisibility (){
        if(!videoModalVisibility){
            setVideoModalVisibility(true)
        }else{
            setVideoModalVisibility(false)
        }
        
    }
    
    return(
        <section className='exercise'>
            
            <div className='exercise__content'>
            <div className='exercise__checkbox-container'>
                <CustomCheckbox />
            </div>
                <h2 className='exercise__heading'>{exercise.exercise_name}</h2>
                <img className='exercise__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`} onClick={handleModalVisibility} />
                <div className='exercise__stats'>
                <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Sets:</span>{exercise.sets}</p>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Reps:</span>{exercise.reps}</p>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Weight:</span>{exercise.weight}</p>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Rest:</span>{exercise.rest_time}</p>
                </div>
                <p className='exercise__note'><span>Note:</span>{exercise.note}</p>
            </div>
            {videoModalVisibility && <VideoPlayer videoId={videoId} handleModalVisibility={handleModalVisibility} exercise={exercise}/>}
        </section>
        
    )
}


export default ExerciseCard