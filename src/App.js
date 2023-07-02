import React,{useState,useEffect} from "react";
import axios from "axios";
import EditStudentModal from "./Components/EditStudentModal";
function App() {
  const [searchText,setSearchText]=useState("");
  const [students,setStudents]=useState(null);
  const [showAddForm,setShowAddForm]=useState(false);
  const [stdNumber,setStdNumber]=useState("");
  const [name,setName]=useState("");
  const [surname,setSurname]=useState("");
  const [stdClass,setStdClass]=useState("");
  const [didUpdate,setDidUpdate]=useState(false);
  const [showEditModal,setShowEditModal]=useState(false);
  const [selectedStudent,setSelectedStudent]=useState({
    id:"",
    number: "",
    name:"",
    surname:"",
    class:""  })
  useEffect(()=>{
    axios.get(" http://localhost:3004/students")
    .then((response)=>{
      console.log(response)
      setStudents(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[didUpdate]);
  const handleAdd=(event)=>{
    event.preventDefault()
    if(stdNumber === "" || name === "" || surname === "" ||
    stdClass === ""){alert("Bütün alanlar zorunludur!")
  return
  }
  const hasStudent = students.find(item=>item.number === stdNumber)
  if(hasStudent !== undefined){
    alert("Bu numarada öğrenci zaten kayıtlıdır.")
    return
  }
    const newStudent={
      id: String(new Date().getTime()),
      number: stdNumber,
      name:name,
      surname:surname,
      class:stdClass
    }
    axios.post("http://localhost:3004/students",newStudent)
    .then((response)=>{
      setStudents([...students,newStudent])
      setShowAddForm(false)
      setName("")
      setStdClass("")
      setStdNumber("")
      setSurname("")
    })
    .catch((err)=>{console.log(err)})
  }
  const handleDelete=(studentId)=>{
    axios.delete(`http://localhost:3004/students/${studentId}`)
    .then((response)=>{
      setDidUpdate(!didUpdate)
    })
    .catch((err)=>{console.log(err)})
  }

  if(students === null){//erken kaçış
    return(
      <h1>Loading...</h1>)}
      var filteredStudents = []
      filteredStudents=students.filter(item=> item.name.toLowerCase().includes(searchText.toLowerCase()))
  return (

    <div>
      <nav className="navbar navbar-light bg-primary navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="">Crudd App</a>
  </div>
</nav>
<div className="container my-5">
  <div className="d-flex justify-content-end">
    <button onClick={()=>setShowAddForm(!showAddForm)} className="btn btn-primary">Öğrenci Ekle</button>
  </div>
  </div>
  {
    showAddForm === true && ( //bu sayede direkt olarak ne yapması
    //gerektiğini söylüyoruz
      <form onSubmit={handleAdd} className="w-50 mx-auto">
      <div className="mb-3">
    <label htmlFor="stdNum" >Öğrenci No</label>
    <input value={stdNumber} onChange={(event)=>setStdNumber(event.target.value)}
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
    </div>
      </form>
    )
  }
  <input
      type="text" 
      className="form-control container" 
      placeholder="Type to search..."
      value={searchText}
      onChange={(event)=>{setSearchText(event.target.value)}}
    />
  <div>
<table className="table">
  <thead>
    <tr>
      <th scope="col">Öğrenci numarası</th>
      <th scope="col">Adı</th>
      <th scope="col">Soyadı</th>
      <th scope="col">Sınıfı</th>
      <th>İşlem</th>
    </tr>
  </thead>
  <tbody>
  {
        filteredStudents.map(student=>(
          <tr key={student.id}>
            <td>{student.number}</td>
            <td>{student.name}</td>
            <td>{student.surname}</td>
            <td>{student.class}</td>
            <td>
              <button onClick={()=>{handleDelete(student.id)}} className="btn btn-sm btn-danger">Sil</button>
              <button onClick={()=>{
                setShowEditModal(true);
                setSelectedStudent(student);
              }} className="btn btn-sm btn-secondary">Düzenle</button>
            </td>
          </tr>
        ))
      }
  </tbody>
</table>
</div>
{
  showEditModal && (<EditStudentModal 
    setShowEditModal={setShowEditModal}
    selectedStudent={selectedStudent}
    students={students}
    setDidUpdate={setDidUpdate}
    didUpdate={didUpdate}
    /*
  arka plana gönderdik*//>)
}
</div>
  );
}

export default App;
