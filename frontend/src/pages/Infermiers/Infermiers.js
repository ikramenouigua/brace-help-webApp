import React from 'react'
import { Table, Badge, Menu, Dropdown, Space ,Alert, Switch ,Input} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EditFilled,DeleteFilled,PlusCircleOutlined,CheckCircleTwoTone} from '@ant-design/icons';
import { Link, Route } from 'react-router-dom';
import { useState , useEffect} from "react";
import { db } from '../firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc} from "firebase/firestore";


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
        title: 'email',
        width: 80,
        dataIndex: 'email',
        key: 'email',
      
      },
     
      { title: 'Telephone', dataIndex: 'telephone',  width: 80, key: 'telephone' },
    
    {
      title: 'Actions',
      key: 'operation',
      fixed: 'right',
      width: 80,
      render: (e,record) => <a> <Link to={`/EditInfermier/${record.id}`} state={record.id}><EditFilled style={{color:"green"}} /></Link>  
       <Switch
      checked={record.status}
      checkedChildren="in"
      unCheckedChildren="out"
      onChange={() => handleSwitchChange(record)} defaultChecked={e}
      
    /></a>,
    },
  ];
 
  const [input,setInput] = useState(false);
  const [infirmiers,setInfirmiers] = useState([]);
  const usersCollectionRef = collection(db,"infirmier");

  useEffect(() =>{
    const getUsers = async () =>{
       const data = await getDocs(usersCollectionRef);
       setInfirmiers(data.docs.map((doc) => ({...doc.data(),id :doc.id})))
       console.log(data);
       
    }
    getUsers()
 }, [])

 const handleSwitchChange = async (record) =>{
  setInput(!record.status);
  const patientDoc =  doc(db ,"infirmier" ,record.id)
  const newFields = {status: input}
  await updateDoc(patientDoc, newFields)
}
  return (
    <div style={{minHeight: "550px"}}>
    <Alert
      message="Infirmiers"
      description="Vous trouvez ci-join la liste des Infirmiers ."
      type="success"
      showIcon
    />
    <br></br>
    <div style={{textAlign: "end"}} >
    <Link  to="/AddInfermier"><PlusCircleOutlined style={{fontSize:"30px",color:"#018037"}} /></Link>
    <b style={{padding: "5px",margin:"5px"}}>Ajouter Infirmier</b>
  
    </div> 
    <br></br>
    <hr></hr>
    <br></br>
  
    <Table columns={columns} rowSelection={{}}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    }} 
     dataSource={infirmiers} scroll={{ x: 1300 }} />
    </div>
    
  );
}
