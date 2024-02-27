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

            const filteredArr = response.data 
            setProgram(filteredArr)
        }
        if (programId !== 'null' ){
          getProgram()
        }
      },[programId])

      if (programId === 'null') {
        return(
          <>
            <h2>client has no program set</h2>
            <button className='trainer-main__button' onClick={handleModal}>Assign different Program</button>
            {editModalVisibility && <AssignProgram setModal={setEditModalVisibility} modal={editModalVisibility} clientId={clientId} programId={programId}/>}
          </>
         
        )
      }
    
    if (program?.workouts.length === 0){
      return(
        
        <section className='trainer-main-container'>
          <div className='trainer-main'>
              <h1 className='trainer-main__heading'><span>{program?.program_info.program_name} </span>Program is empty</h1>
              <button className='trainer-main__button' onClick={handleModal}>Assign different Program</button>

          </div>
          {editModalVisibility && <AssignProgram setModal={setEditModalVisibility} modal={editModalVisibility} clientId={clientId} programId={programId}/>}
          <h3>{program[0]?.program_name}</h3>
          {program && program?.workouts.map((week, index)=>{
            return <WeekCard week={week} index={index} weekNum={index+1} />
          })}
        </section>
      ) 
    }

    if (program){
        return(
        
            <section className='trainer-main'>
              <div className='trainer-main__container'>
                  <h2 className='trainer-main__heading'>Let's Work</h2>
                  <button className='trainer-main__button' onClick={handleModal}>Assign different Program</button>

              </div>
              {editModalVisibility && <AssignProgram setModal={setEditModalVisibility} modal={editModalVisibility} clientId={clientId} programId={programId}/>}
              <h1 className='trainer-main__title'>{program.program_info.program_name}</h1>
              {program && program.workouts.map((week, index)=>{
                return <WeekCard week={week} index={index} weekNum={index+1} />
              })}
            </section>
          ) 
    }
    else {
        return (
            <h2>Loading .........</h2>
        )
    }
   
}


export default TrainerMain