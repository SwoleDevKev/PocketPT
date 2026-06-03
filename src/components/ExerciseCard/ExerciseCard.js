import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import './ExerciseCard.scss'
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useState } from 'react';

function ExerciseCard({ exercise }) {
    const link = exercise.video_link
    let videoId = link

    if (link.includes('=')) {
        const splitLink = link.split('=');
        const videoIdAndQuery = splitLink[1]
        videoId = videoIdAndQuery.split('&')[0]
    }

    const [videoModalVisibility, setVideoModalVisibility] = useState(false)

    function handleModalVisibility() {
        setVideoModalVisibility(prev => !prev)
    }

    return (
        <section className='exercise'>

            <div className='exercise__top'>
                <div className='exercise__checkbox-container'>
                    <CustomCheckbox />
                </div>
                <h2 className='exercise__heading'>{exercise.exercise_name}</h2>
            </div>

            <div className='exercise__thumbnail' onClick={handleModalVisibility}>
                <img
                    alt={`how to ${exercise.exercise_name}`}
                    className='exercise__image'
                    src={`http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                />
                <div className='exercise__play-overlay'>
                    <div className='exercise__play-btn'>&#9654;</div>
                </div>
            </div>

            <div className='exercise__stats'>
                <div className='exercise__stat'>
                    <span className='exercise__stat-label'>Sets</span>
                    <span className='exercise__stat-value'>{exercise.sets || '—'}</span>
                </div>
                <div className='exercise__stat'>
                    <span className='exercise__stat-label'>Reps</span>
                    <span className='exercise__stat-value'>{exercise.reps || '—'}</span>
                </div>
                <div className='exercise__stat'>
                    <span className='exercise__stat-label'>Weight</span>
                    <span className='exercise__stat-value'>{exercise.weight || '—'}</span>
                </div>
                <div className='exercise__stat'>
                    <span className='exercise__stat-label'>Rest</span>
                    <span className='exercise__stat-value'>{exercise.rest_time || '—'}</span>
                </div>
            </div>

            {exercise.note && (
                <div className='exercise__note'>
                    <span className='exercise__note-label'>Note</span>
                    <p className='exercise__note-text'>{exercise.note}</p>
                </div>
            )}

            {videoModalVisibility && (
                <VideoPlayer
                    videoId={videoId}
                    handleModalVisibility={handleModalVisibility}
                    exercise={exercise}
                />
            )}
        </section>
    )
}

export default ExerciseCard
