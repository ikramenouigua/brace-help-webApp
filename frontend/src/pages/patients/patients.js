import React from 'react'
import { Table, Badge, Menu, Dropdown, Space ,Alert, Switch ,Input} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EditFilled,DeleteFilled,PlusCircleOutlined,CheckCircleTwoTone} from '@ant-design/icons';
import { Link, Route } from 'react-router-dom';
import { useState , useEffect} from "react";
import { db } from '../firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc,getDoc} from "firebase/firestore";


export default function Patients() {
  
  
  const columns = [
    Table.SELECTION_COLUMN,
    {
     
      title: 'Nom',
      width: 70,
      dataIndex: 'nom',
      key: 'nom',
      fixed: 'left',
    },
    {
      title: 'Prénom',
      width: 70,
      dataIndex: 'prenom',
      key: 'prenom',
      fixed: 'left',
    },
    {
      title: 'age',
      width: 50,
      dataIndex: 'age',
      key: 'age',
     
    },
    {
        title: 'Numero  chambre',
        width: 60,
        dataIndex: 'numero_chambre',
        key: 'numero_chambre',
       
      },
      {
        title: 'email',
        width: 80,
        dataIndex: 'email',
        key: 'email',
      
      },
      { title: 'Telephone', dataIndex: 'tel',  width: 80, key: 'tel' },
     
    { title: 'Poids', dataIndex: 'poids',  width: 50, key: 'poids' },
    { title: 'Taille', dataIndex: 'taille',  width: 50, key: 'taille' },
   
    
    {
      title: 'Actions',
      key: 'operation',
      fixed: 'right',
      width: 80,
      render: (e,record) => <a> <Link  to={`/EditPatient/${record.id}`} state={record.id}><EditFilled style={{color:"green"}} /></Link>  
       <Switch
      checked={record.status}
      checkedChildren="in"
      unCheckedChildren="out"
      onChange={() => handleSwitchChange(record)} defaultChecked={e}
      
    /></a>,
    },
  ];
 
  const [input,setInput] = useState(false);
  const [patients,setPatients] = useState([]);
  const usersCollectionRef = collection(db,"patient");

  useEffect(() =>{
    const getUsers = async () =>{
       const data = await getDocs(usersCollectionRef);
       setPatients(data.docs.map((doc) => ({...doc.data(),id :doc.id})))
       console.log(data);
       console.log(patients);
    }
    getUsers()
 }, [])
 const handleSwitchChange = async (record) =>{
  setInput(!record.status);
  console.log(record.id)
  console.log(input)
  const patientDoc =  doc(db ,"patient" ,"zOR4fYE1WaWvtSD0bI")
  const docRef = await getDoc(patientDoc);
  console.log(docRef)
  const newFields = {status: input}
  await updateDoc(patientDoc, newFields)
}
  return (
    <>
    <Alert
      message="Patient"
      description="Vous trouvez ci-join la liste des Patient ."
      type="success"
      showIcon
    />
    <br></br>
    <div style={{textAlign: "end"}} >
    <Link  to="/AddPatient"><PlusCircleOutlined style={{fontSize:"30px",color:"#018037"}} /></Link>
    <b style={{padding: "5px",margin:"5px"}}>Ajouter Patient</b>
  
    </div> 
    <br></br>
    <hr></hr>
    <br></br>
  
    <Table columns={columns} rowSelection={{}}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    }} 
     dataSource={patients} scroll={{ x: 1300 }} />
    </>
    
  );
}
