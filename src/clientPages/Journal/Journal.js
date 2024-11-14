import './Journal.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';



function Journal ({user}) {
	

    return (
        <>
            <Header />
            <div className='journal-container'>
				<h1>Journal Coming soon </h1>
				<h3>Stay Tuned for our summer UPDATE</h3>
			</div>
          
            <Footer user={user}/>
        </>
    )
}

export default Journal