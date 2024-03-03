import './CurrentClientProgram.scss'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TrainerMain from '../../components/TrainerMain/TrainerMain';
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';
import TrainerAuthorization from '../../components/TrainerAuth/TrainerAuth';



function CurrentClientProgram () {

	const {clientId, programId} = useParams()

    return (
        <>
			<TrainerAuthorization/>
            <Header />

            <TrainerMain clientId={clientId} programId={programId}/>
			<TrainerFooter />
        </>
    )
}

export default CurrentClientProgram