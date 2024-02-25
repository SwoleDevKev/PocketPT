import './Main.scss'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../util'
import ClientWeekCard from '../ClientWeekCard/ClientWeekCard'

function Main({programId}){

    const [program, setProgram] = useState([])
    
    
    useEffect( () => {

        async function getProgram(){
            const response = await axios.get(`${API_URL}/api/programs/${programId}`)
            setProgram(response.data.workouts)
        }
        if(programId){
          getProgram()
        }
      
    
    
      },[programId])

    if (program && programId){
        return(
        
            <div className='main'>
              <h1 className='main__heading'>Get Started</h1>
              {program && program.map((week, index)=>{
                return <ClientWeekCard week={week} weekNum={index+1} index={index} />
              })}
            </div>
          ) 
    } else if(!programId){
      return(
        <div className='main'>
        <h1 className='main__heading'>No Program Set</h1>
        {program && program.map((week, index)=>{
          return <ClientWeekCard week={week} weekNum={index+1} index={index} />
        })}
      </div>
      )
    }else {
        return (
            <h2>Loading .........</h2>
        )
    }
   
}


export default Main