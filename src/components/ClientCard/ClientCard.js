import { Link } from 'react-router-dom'
import './ClientCard.scss'

function ClientCard( {program_id, client}){
    return(
            <section className='client'>
                <div className='client__avatar-container'>
                    <img alt='account profile' className='client__avatar' src={client.icon || process.env.REACT_APP_defaultAvatar}/>
                </div>
                <div className='client__info'>
                    <h3 className='client__heading'>{client?.first_name+' '+client?.last_name}</h3>
                    <Link className='client__link' to={`/trainer/client/${client.id}/${program_id}`}><button className='client__button'>Current Program</button></Link>
                </div>
            </section>
       
    )
}


export default ClientCard