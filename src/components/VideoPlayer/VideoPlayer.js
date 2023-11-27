import './VideoPlayer.scss'



function VideoPlayer ({exercise, handleModalVisibility, videoId}){
    return(
        <div className='video-player'>
            <section className='video-player__container'>
                <h2 className='video-player__heading'>{exercise.exercise_name}</h2>
                <p className='video-player__cancel' onClick={handleModalVisibility}>X</p>
                <iframe src={`https://www.youtube.com/embed/${videoId}`} className='video-player__video' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share ; fullscreen"></iframe>
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

//<iframe width="560" height="315" src="https://www.youtube.com/embed/sAq_ocpRh_I?si=NVZGkLetbE_u71Ec" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


export default VideoPlayer