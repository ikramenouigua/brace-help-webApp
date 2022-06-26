import React from 'react'

import { Form, Input, message, Button, Space, Alert } from 'antd';
import { db } from '../firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc,getDoc ,setDoc} from "firebase/firestore";
import { useState , useEffect} from "react";
import {useParams} from 'react-router-dom';
export default function EditInfermier() {
  const params = useParams();
  const [form] = Form.useForm();
  const [newFirstName , setNewFirstName] =useState("")
  const [newFamilyName , setNewFamilyName] =useState("")
  const [newEmail , setNewEmail] =useState("")
  const [newPassword, setNewPassword] =useState("")
  const [newTelephone , setNewTelephone] =useState("")
  
  console.log("urrrrrrrrrrrrrl"+params.id); // 👉️ {userId: '4200'}
    

    const onFinish = () => {
      message.success('Submit success!');
    };
  
    const onFinishFailed = () => {
      message.error('Submit failed!');
    };
   
    const [input,setInput] = useState(false);
    const [infirmier,setInfirmier] = useState([]);
    const usersCollectionRef = collection(db,"infirmier");
    const docRef = doc(db, "infirmier", params.id);
    let getinfirmier;
    
    useEffect(() =>{
       getinfirmier = async () =>{
    
    const doc = await getDoc(docRef);
setInfirmier(({...doc.data(),id :doc.id}))
  
  }
  getinfirmier()
}, [])
const updateUser = async () => {
  
  const userDoc = doc(db, "infirmier", params.id);
  const newFields = { nom: newFamilyName ,prenom:newFirstName,email:newEmail,telephone:newTelephone,status:true};
  await updateDoc(userDoc, newFields);
  
};
console.log(infirmier);

  return (
      <>
       <Alert
      message="Modifier les infermiers"
      description="Pour modifier les informations d'un infermier, veuillez remplir le formulaire suivant ."
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
      < Input placeholder={infirmier.nom}/>
    </Form.Item>
    <Form.Item
      name="prenom"
      label="Prénom"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewFirstName(event.target.value);
      }}
    >
      <Input placeholder={infirmier.prenom} />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[{ required: true }, { type: 'email', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewEmail(event.target.value);
      }}
    >
      <Input placeholder={infirmier.email} />
    </Form.Item>
    <Form.Item
      name="Telephone"
      label="Telephone"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewTelephone(event.target.value);
      }}
      
    >
    <Input placeholder={infirmier.telephone} style={{marginLeft:"0"}} />
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
