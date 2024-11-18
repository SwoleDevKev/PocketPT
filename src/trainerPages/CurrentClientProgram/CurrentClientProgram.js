import './CurrentClientProgram.scss'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TrainerMain from '../../components/TrainerMain/TrainerMain';
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';



function CurrentClientProgram ({user}) {

	const {clientId, programId} = useParams()
    console.log(user, "TEST USER");
    

    return (
        <>
            <Header />

            <TrainerMain clientId={clientId} programId={programId}/>
			<TrainerFooter user={user}/>
        </>
    )
}

export default CurrentClientProgram