import './TrainerMain.scss'
import WeekCard from '../WeekCard/WeekCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../util'
import { Link } from 'react-router-dom'
import AssignProgram from '../AssignProgram/AssignProgram'

function TrainerMain({programId, clientId}){

    const [program, setProgram] = useState(null)
    const [editModalVisibility, setEditModalVisibility] = useState(false)


    const handleModal = () =>{
        console.log('ok');
        setEditModalVisibility(true)
    }

    useEffect( () => {

        async function getProgram(){
            const response = await axios.get(`${API_URL}/api/programs/${programId || 1}`)
            setProgram(response.data)
        }
        getProgram()
    
    
      },[])


    if (program){
      console.log(program);
        return(
        
            <>
              <h1 className='main__heading'>Get Started</h1>
              <button onClick={handleModal}>Assign different Program</button>
              {editModalVisibility && <AssignProgram clientId={clientId} programId={programId}/>}
              {program && program.map((week, index)=>{
                return <WeekCard week={week} index={index} weekNum={index+1} />
              })}
            </>
          ) 
    } else {
        return (
            <h2>Loading .........</h2>
        )
    }
   
}


export default TrainerMain