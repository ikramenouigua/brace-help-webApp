import React from 'react'
import { useParams } from "react-router-dom";
import { Form, Input, message, Button, Space,Alert } from 'antd';

import { db } from '../firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc,getDoc ,setDoc} from "firebase/firestore";
import { useState , useEffect} from "react";


export default function EditPatient() {
  const [form] = Form.useForm();
  const [newFirstName , setNewFirstName] =useState("")
  const [newFamilyName , setNewFamilyName] =useState("")
  const [newEmail , setNewEmail] =useState("")
  const [newTelephone, setNewTelephone] =useState("")
  const [newNumeroChambre , setNewNumeroChambre] =useState(0)
  const [newPoids , setNewPoids] =useState(0)
  const [newAge , setNewAge] =useState(0)
  const [newTaille , setNewTaille] =useState(0)
  
  
  const usersCollectionRef = collection(db,"patient");
  
    const params = useParams();
    const id=params.id
    const [patient,setPatient] = useState([]);
    const onFinish = () => {
      message.success('Submit success!');
    };
   
    const onFinishFailed = () => {
      message.error('Submit failed!');
    };
    const docRef = doc(db, "patient", "EKiwTLs42nadJGyAM4Si");
    console.log(id)
    let getPatient;
    
    useEffect(() =>{

    getPatient = async () =>{
    
    const doc = await getDoc(docRef);
    setPatient(({...doc.data(),id :doc.id}))
    console.log(patient);
  }
  getPatient()
}, [])
  
const updateUser = async () => {
  
  const userDoc = doc(db, "patient", "EKiwTLs42nadJGyAM4Si");
  const newFields = { nom: newFamilyName ,prenom:newFirstName,email:newEmail,telephone:newTelephone,age:newAge,taille:newTaille,poids:newPoids,numero_chambre:newNumeroChambre};
  await updateDoc(userDoc, newFields);
  
};
  return (
      <>
      
       <Alert
      message="Modifier les Patient"
      description="Pour modifier les informations d'un patient, veuillez remplir le formulaire suivant ."
      type="success"
      showIcon
    />
    <br></br>
    <Form style={{marginRight:"100px",marginLeft:"100px"}}
    form={form}
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      name="nom"
      label="Nom"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewFamilyName(event.target.value);
      }}
     
    >
      <Input placeholder={patient.nom} />
    </Form.Item>
    <Form.Item
      name="prenom"
      label="Prénom"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewFirstName(event.target.value);
      }}
     
    >
      <Input placeholder={patient.prenom} />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[{ required: true }, { type: 'email', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewEmail(event.target.value);
      }}
    >
      <Input placeholder={patient.email} />
    </Form.Item>
    
    <Form.Item
      name="age"
      label="age"
      rules={[{ required: true }, { type: 'text', warningOnly: true }]}
      onChange= {(event) =>{
        setNewAge(event.target.value);
      }}
    
    >
      <Input placeholder={patient.age} />
    </Form.Item>
    <Form.Item
      name="telephone"
      label="telephone"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewTelephone(event.target.value);
      }}
     
    >
      <Input placeholder={patient.telephone} />
    </Form.Item>
    <Form.Item
      name="numero_chambre"
      label="numero chambre"
      rules={[{ required: true }, { type: 'number', warningOnly: true }]}
      onChange= {(event) =>{
        setNewNumeroChambre(event.target.value);
      }}
      
    >
      <Input placeholder={patient.numero_chambre} />
    </Form.Item>
    
    <Form.Item
      name="Poids"
      label="Poids"
      rules={[{ required: true }, { type: 'number', warningOnly: true }]}
      onChange= {(event) =>{
        setNewPoids(event.target.value);
      }}
    >
      <Input placeholder={patient.poids} />
    </Form.Item>
    <Form.Item
      name="taille"
      label="taille"
      rules={[{ required: true }, { type: 'number', warningOnly: true }]}  
      onChange= {(event) =>{
        setNewTaille(event.target.value);
      }}
    >
      <Input placeholder={patient.taille} />
    </Form.Item>
   
    <Form.Item>
      <Space>
        <Button  htmlType="submit" onClick={() => {updateUser()}} style={{backgroundColor:"#7c8ea9"}}>
          Modifier
        </Button>
        <Button htmlType="reset" >
          Annuler
        </Button>
      </Space>
    </Form.Item>
  </Form>
 </>
  )
}
