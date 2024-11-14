import './WeekOverview.scss'
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader'
import Main from '../../components/Main/Main'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';



function WeekOverview ({user}) {

    

    return (
        <>
            <WelcomeHeader user={user}/>
            <Main programId={user.program_id}/>
            <Footer user={user} />
        </>
    )
}

export default WeekOverview