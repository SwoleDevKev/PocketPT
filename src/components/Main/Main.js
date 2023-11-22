import './Main.scss'
import WeekCard from '../WeekCard/WeekCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../util'

function Main(){

    const [program, setProgram] = useState(null)
    useEffect( () => {

        async function getProgram(){
            const response = await axios.get(`${API_URL}/api/programs/1`)
            setProgram(response.data)
        }
        getProgram()
    
    
      },[])


    if (program){
        return(
        
            <>
              <h1 className='main__heading'>Get Started</h1>
              {program && program.map((week, index)=>{
                return <WeekCard week={week} weekNum={index+1} />
              })}
            </>
          ) 
    } else {
        return (
            <h2>Loading .........</h2>
        )
    }
   
}


export default Main