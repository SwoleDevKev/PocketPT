import { Link } from 'react-router-dom'
import './ClientCard.scss'

function ClientCard( {program_id, client}){
    return(
            <section className='client'>
                <div className='client__avatar-container'>
                    <img className='client__avatar' src=''/>
                </div>
                <div className='client__info'>
                    <h3 className='client__name'>{client?.first_name+' '+client?.last_name}</h3>
                    <Link to={`/trainer/client/${client.id}/${program_id}`}><button className='client__program'>Current Program</button></Link>
                </div>
            </section>
       
    )
}


export default ClientCard