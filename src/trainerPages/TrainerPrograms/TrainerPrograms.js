import axios from "axios"
import { useEffect, useState } from "react"
import ProgramCard from "../../components/programCard/ProgramCard"
import './TrainerPrograms.scss'
import WeeklyProgramCard from "../../components/WeeklyProgramCard/WeeklyProgramCard"
import { Link } from "react-router-dom"
import Header from "../../components/Header/Header"
import TrainerFooter from "../../components/TrainerFooter/TrainerFooter"
import {Modal} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Input from "../../components/Input/Input"


function TrainerPrograms() {

    const [programs, setPrograms] = useState(null)
    const [customWeeklyPrograms, setCustomWeeklyPrograms] = useState([])
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);
    const [updatedWeeklyProgram, setUpdatedWeeklyProgram] = useState(false)
    const [updatedMonthlyProgram, setUpdatedMonthlyProgram] = useState(false)


    const [show, setShow] = useState(false);
    const [showMonthly, setShowMonthly] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseMonthly = () => setShowMonthly(false);
    const handleShowMonthly = () => setShowMonthly(true);


    useEffect(() => {
        async function getPrograms() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/programs`)
            setPrograms(response.data)
        }
        getPrograms()
        console.log('updated monthly program', programs);
        
    }, [updatedMonthlyProgram])


    useEffect(() => {
        async function getCustomWeeklyPrograms() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/programs/weekly/custom/${user?.id}`)
            setCustomWeeklyPrograms(response.data)
        }
        getCustomWeeklyPrograms()
    }, [user,updatedWeeklyProgram])


    const handlePostWeeklyProgram = async (event) => {
        event.preventDefault()
          await axios.post(`${process.env.REACT_APP_API_URL}/api/programs/weekly/custom/${user?.id}`, {weekly_program_name: event.target.name.value, weekly_program_details: event.target.details.value})
        setShow(false)

    }
    const handlePostMonthlyProgram = async (event) => {
        event.preventDefault()
          await axios.post(`${process.env.REACT_APP_API_URL}/api/programs/monthly/custom/${user?.id}`, {program_name: event.target.name.value, program_details: event.target.details.value})
        setShowMonthly(false)
    }



    useEffect(() => {
        const token = sessionStorage.getItem('token')

        if (!token) {
            return setFailedAuth(true)
        }

        axios
            .get(`${process.env.REACT_APP_API_URL}/api/trainers/current`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setUser(response.data)
            })
            .catch((error) => {
                setFailedAuth(true)
            })



    }, []);


    if (failedAuth) {
        return (
            <main className="dashboard">
                <p>You must be logged in to see this page.</p>
                <p>
                    <Link to="/trainer/login">Log in</Link>
                </p>
            </main>
        );
    }

    if (user === null) {
        return (
            <main className="dashboard">
                <p>Loading...</p>
            </main>
        );
    }

    return (
        <>
            <Header />
            <div className="program-container">

                <section className="program">

                    <h2 className="program__heading">Monthly Programs </h2>
                    {programs && programs.map((program) => {
                        return (
                            <ProgramCard key={program.id} program={program} updatedMonthlyProgram={updatedMonthlyProgram} setUpdatedMonthlyProgram={setUpdatedMonthlyProgram}/>
                            )
                        })}
                </section>
                
                <div className="btn-container">
                    <button onClick={handleShowMonthly} className="btn btn-primary">Create Monthly Program</button>
                </div>

                <Modal
                    show={showMonthly}
                    onHide={handleCloseMonthly} 
                    backdrop="static"
                    keyboard={false}
                    >
                    <form onSubmit={handlePostMonthlyProgram}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create A Monthly Program</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                                <Input name={'name'} label={"Name"}/>
                                <Input name={'details'} label={"Details"}/>
                            
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseMonthly}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">Create</Button>
                        </Modal.Footer>
                    </form>
                </Modal>

                <section className="program">

                    <h2 className="program__heading" >Weekly Programs</h2>
                    {customWeeklyPrograms && customWeeklyPrograms.map((program) => {
                        return (
                            <WeeklyProgramCard key={program.id} program={program} updatedProgram={updatedWeeklyProgram} setUpdatedProgram={setUpdatedWeeklyProgram}
                            trainer_id={user.id}/>
                            )
                        })}
                </section>
                <div className="btn-container">
                    <button onClick={handleShow} className="btn btn-primary">Create Weekly Program</button>
                </div>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    >
                    <form onSubmit={handlePostWeeklyProgram}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create A Program</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                                <Input name={'name'} label={"Name"}/>
                                <Input name={'details'} label={"Details"}/>
                            
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit">Create</Button>
                        </Modal.Footer>
                    </form>
                </Modal>

                <div className="workout-container">
                    <Link className="program" to="/trainer/workouts">
                        <h2 className="program__heading program__heading--link" >Daily Workouts</h2>
                    </Link>
                </div>

            </div>
            <TrainerFooter />

        </>
    )
}

export default TrainerPrograms