

// function EditProgram() {
//     return (
//         <form className="program-edit" onSubmit={handleSubmit}>
//             <h1 className="login__title">Edit Program</h1>

//             <label className='edit__label' htmlFor='program'>Week1 workouts</label>
//             <select
//                 className='item-availability__input item-availability__input--select'
//                 name="weekly-program"
//                 id="weekly-program"
//                 value={currentProgram}
//                 onChange={handleChangeProgram}
//             >
//                 {weeklyPrograms.map((program) => (
//                     <option key={program.id} value={program.id}>
//                         {program.program_name}
//                     </option>
//                 ))}
//             </select>
//             <label className='edit__label' htmlFor='program'>Week2 workouts</label>
//             <select
//                 className='item-availability__input item-availability__input--select'
//                 name="weekly-program"
//                 id="weekly-program"
//                 value={currentProgram}
//                 onChange={handleChangeProgram}
//             >
//                 {weeklyPrograms.map((program) => (
//                     <option key={program.id} value={program.id}>
//                         {program.program_name}
//                     </option>
//                 ))}
//             </select>
//             <label className='edit__label' htmlFor='program'>Week3 workouts</label>
//             <select
//                 className='item-availability__input item-availability__input--select'
//                 name="weekly-program"
//                 id="weekly-program"
//                 value={currentProgram}
//                 onChange={handleChangeProgram}
//             >
//                 {weeklyPrograms.map((program) => (
//                     <option key={program.id} value={program.id}>
//                         {program.program_name}
//                     </option>
//                 ))}
//             </select>
//             <label className='edit__label' htmlFor='program'>Week4 workouts</label>
//             <select
//                 className='item-availability__input item-availability__input--select'
//                 name="weekly-program"
//                 id="weekly-program"
//                 value={currentProgram}
//                 onChange={handleChangeProgram}
//             >
//                 {weeklyPrograms.map((program) => (
//                     <option key={program.id} value={program.id}>
//                         {program.program_name}
//                     </option>
//                 ))}
//             </select>

//             <button className="Assign__button">
//                 Save
//             </button>

//         </form>
//     )
// }

// export default EditProgram