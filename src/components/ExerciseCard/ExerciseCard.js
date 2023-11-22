import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import './ExerciseCard.scss'
import pushup from '../../assets/images/james-barr-ULqD07i0l7s-unsplash.jpg'

function ExerciseCard({exercise}){
    const splitLink = exercise.video_link.split('/');
    const videoIdAndQuery = splitLink[splitLink.length -1]
    const videoId = videoIdAndQuery.split('?')[0]

    
    return(
        <section>
            <div>
                <CustomCheckbox />
            </div>
            <div>
                <h2>{exercise.exercise_name}</h2>
                <video />
                <img src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`} />
                <div>
                    <p><span>Sets:</span>{exercise.sets}</p>
                    <p><span>Reps:</span>{exercise.reps}</p>
                    <p><span>Weigth:</span>{exercise.weight}</p>
                    <p><span>Rest:</span>{exercise.rest_time}</p>
                </div>
                <p><span>Note:</span>{exercise.note}</p>
            </div>
        </section>
    )
}


export default ExerciseCard