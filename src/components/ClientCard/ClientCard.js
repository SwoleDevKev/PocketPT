import { Link } from 'react-router-dom'
import { API_URL } from '../../util'
import './ClientCard.scss'

function ClientCard( {program_id, client}){
    return(
            <section className='client'>
                <div className='client__avatar-container'>
                    <img className='client__avatar' src={client.client_avatar || `${API_URL}/images/profile.png`}/>
                </div>
                <div className='client__info'>
                    <h3 className='client__heading'>{client?.first_name+' '+client?.last_name}</h3>
                    <Link className='client__link' to={`/trainer/client/${client.id}/${program_id}`}><button className='client__button'>Current Program</button></Link>
                </div>
            </section>
       
    )
}


export default ClientCard