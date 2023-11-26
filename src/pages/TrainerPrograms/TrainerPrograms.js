
function TrainerPrograms (){





    return (
        <>
            {programs && programs.map((program)=>{
                return(
                    <ProgramCard key={program.id} program={program}/>
                )
            })}
        </>
    )
}

export default TrainerPrograms