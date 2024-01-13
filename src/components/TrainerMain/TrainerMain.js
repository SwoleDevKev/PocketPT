import './TrainerMain.scss'
import WeekCard from '../WeekCard/WeekCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../util'
import AssignProgram from '../AssignProgram/AssignProgram'

function TrainerMain({programId, clientId}){

    const [program, setProgram] = useState(null)
    const [editModalVisibility, setEditModalVisibility] = useState(false)


    const handleModal = () =>{
        if(!editModalVisibility){
          setEditModalVisibility(true)
        } else{
          setEditModalVisibility(false)

        }
    }

    useEffect( () => {

        async function getProgram(){
            const response = await axios.get(`${API_URL}/api/programs/${programId}`)
            setProgram(response.data)
        }
        if (programId !== 'null' ){
          getProgram()
        }
      },[])

      if (programId === 'null') {
        return(
          <>
            <h2>client has no program set</h2>
            <button className='trainer-main__button' onClick={handleModal}>Assign different Program</button>
          </>
         
        )
      }
    

    if (program){
      
        return(
        
            <section className='trainer-main-container'>
              <div className='trainer-main'>
                  <h1 className='trainer-main__heading'>Get Started</h1>
                  <button className='trainer-main__button' onClick={handleModal}>Assign different Program</button>

              </div>
              {editModalVisibility && <AssignProgram setModal={setEditModalVisibility} modal={editModalVisibility} clientId={clientId} programId={programId}/>}
              {program && program.map((week, index)=>{
                return <WeekCard week={week} index={index} weekNum={index+1} />
              })}
            </section>
          ) 
    }
    else {
      console.log(programId);
        return (
            <h2>Loading .........</h2>
        )
    }
   
}


export default TrainerMain