import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import './ClientProfile.scss'
import  backupIcon  from '../../assets/icons/profile.png';



function ClientProfile ({user}){
    
	const navigate = useNavigate()      
	const [previewImage, setPreviewImage] = useState(null);
	const [showModal, setShowModal] = useState(false);


	const closeModal = () => {
    	setShowModal(false);
    	setPreviewImage(null); // Clear preview when modal is closed
  	};

  	const openModal = () => {
    	setShowModal(true);		
  	};

	const handleProfilePicUpload = async (event) => {
		event.preventDefault();
		const file = event.target[0].files[0];
		const formData = new FormData();
		formData.append('icon', file);
		formData.append('id', user.id);
	
		try {
		  const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/clients/icon`, formData, {
			headers: {
			  Authorization: `Bearer ${sessionStorage.getItem('token')}`
			},
		  });
		  closeModal();
		} catch (error) {
		  console.error(error);
		}
	  };
	
	  const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
		  if (file.size > 10 * 1000 * 1024) {
			alert("File size cannot exceed 10MB");
			return false;
		  }
		  setPreviewImage(URL.createObjectURL(file));
		}
	  };

	  const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate('/login');
	};



    return (
        <>
            <Header />
            <main className="dashboard">
					<div className="dashboard__content">
						<h2 className="dashboard__heading" >My Profile</h2>
						<div className="dashboard__avatar-container">
							<img alt='account profile' onClick={openModal} className="dashboard__avatar" src={user.icon || process.env.REACT_APP_defaultAvatar}/>
						</div>
						<p>Name: {`${user.first_name} ${user.last_name}`}</p>
						<p>Email: {user.email}</p>
						<p>Phone: {user.phone}</p>
					</div>

					{showModal && (
          <div className="modal-custom">
            <div className="modal-custom__content">
              <span className="modal-custom__close" onClick={closeModal}>
                &times;
              </span>
              <form onSubmit={handleProfilePicUpload}>
                <h2 className='modal-custom__heading'>Upload a new profile picture</h2>
                <input
                  className="modal-custom__input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange} 
                />
                <div className="modal-custom__preview-container"><img className="modal-custom__preview" src={previewImage || user?.icon || backupIcon} alt="icon preview" /></div>
                <button className="modal-custom__button">Upload</button>
              </form>
            </div>
          </div>
        )}

					

					<button className="dashboard__logout" onClick={handleLogout}>
						Log out
					</button>
		    </main>
            <Footer user={user} />
        </>
    )
}


export default ClientProfile