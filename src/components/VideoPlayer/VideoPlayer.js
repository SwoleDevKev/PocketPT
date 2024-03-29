import './VideoPlayer.scss'



function VideoPlayer ({exercise, handleModalVisibility, videoId}){
    return(
        <div className='video-player'>
            <section className='video-player__container'>
                <h2 className='video-player__heading'>{exercise.exercise_name}</h2>
                <p className='video-player__cancel' onClick={handleModalVisibility}>X</p>
                <iframe title={`demonstration of a ${exercise.exercise_name}`} src={`https://www.youtube.com/embed/${videoId}`} className='video-player__video' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share ; fullscreen"></iframe>
                <div className='video-player__exercise-stats'>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Sets:</span>{exercise.sets}</p>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Reps:</span>{exercise.reps}</p>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Weight:</span>{exercise.weight}</p>
                    <p className='video-player__exercise-stat'><span className='video-player__exercise-label'>Rest:</span>{exercise.rest_time}</p>
                </div>
                <p className='video-player__exercise-note'><span className='video-player__exercise-label'>Note:</span>{exercise.note}</p>
            </section>
        </div>
    )
}



export default VideoPlayer