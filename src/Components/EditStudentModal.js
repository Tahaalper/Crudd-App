import React,{useState} from "react";
import "../Assets/Css/editModal.css"
import axios from "axios";
const EditStudentModal = (props)=>{
    const {setShowEditModal,selectedStudent,students,setDidUpdate,didUpdate } = props;
    const [stdNum,setStdNum]=useState(selectedStudent.number);
    const [name,setName]=useState(selectedStudent.name);
    const [surname,setSurname]=useState(selectedStudent.surname);
    const [stdClass,setStdClass]=useState(selectedStudent.class);
    const handleEdit=(event)=>{
        event.preventDefault();
        if(stdNum === "" || name === "" || surname === "" || stdClass === ""){
            alert("Bütün alanlar zorunludur!");
            return;
        }
        const filteredStudents = students.filter((item)=>item.id !== selectedStudent.id)
        const hasStudent=filteredStudents.find((item)=>item.number === stdNum)
        if(hasStudent !== undefined){
            alert("bu numarada öğrenci zaten kayıtlıdır")
        }
        const updatedStudent={
            ...selectedStudent,
            name:name,
            surname:surname,
            number:stdNum,
            class:stdClass

        }
        axios.put(`http://localhost:3004/students/${selectedStudent.id}`,updatedStudent)
        .then((response)=>{
            setShowEditModal(false)
            setDidUpdate(!didUpdate)
        })
        .catch((err)=>{console.log(err)})
        //güncelleme isteği atıyoruz
    }

    return(
        <div className="modalMainContainer">
            <div className="modalContainer">
                <h1 className="modalTitle">Öğrenci Düzenle</h1>
<form onSubmit={handleEdit} className="w-75 mx-auto">
      <div className="mb-3">
    <label for="stdNum" >Öğrenci No</label>
    <input value={stdNum} onChange={(event)=>setStdNum(event.target.value)}
    type="text" id="stdNum" className="form-control"/>
  </div>
  <div className="mb-3">
    <label htmlFor="name" >Adı</label>
    <input value={name} onChange={(event)=>setName(event.target.value)}
    type="text" id="name" className="form-control"/>
    </div>
    <div className="mb-3">
    <label htmlFor="surname" >Soyadı</label>
    <input value={surname} onChange={(event)=>setSurname(event.target.value)}
    type="text" id="surname" className="form-control"/>
    <div className="mb-3">
    <label htmlFor="stdclass" >Sınıfı</label>
    <input value={stdClass} onChange={(event)=>setStdClass(event.target.value)}
    type="text" id="stdclass" className="form-control"/>
    </div>
    </div>
    <div className="d-flex justify-content-center">
      <button className="btn btn-outline-primary" type="submit">Kaydet</button>
      <button className="btn btn-outline-danger mx-3" onClick={()=>{setShowEditModal(false);}}>Kapat</button>
    </div>
      </form>

            </div>  
        </div>
    )
}
export default EditStudentModal;