import React from 'react'
import { useState , useEffect} from "react";
import { db } from '../firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc} from "firebase/firestore";
import { Form, Input, message, Button, Space,Alert , Select} from 'antd';

export default function AddPatient() {
  const { Option } = Select;
  const [newFirstName , setNewFirstName] =useState("")
  const [newFamilyName , setNewFamilyName] =useState("")
  const [newEmail , setNewEmail] =useState("")
  const [newTelephone, setNewTelephone] =useState("")
  const [newNumeroChambre , setNewNumeroChambre] =useState(0)
  const [newPoids , setNewPoids] =useState(0)
  const [newAge , setNewAge] =useState(0)
  const [newTaille , setNewTaille] =useState(0)
  const [newSexe, setNewSexe] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const usersCollectionRef = collection(db,"patient");
  const [form] = Form.useForm();

    const onFinish = () => {
      message.success('Submit success!');
    };
  
    const onFinishFailed = () => {
      message.error('Submit failed!');
    };
  
    const createPatient = async () =>
  {
    await addDoc(usersCollectionRef , { prenom: newFirstName, nom:newFamilyName, age:newAge,numero_chambre:newNumeroChambre,email:newEmail,password:newPassword,tel:newTelephone,taille:newTaille,poids:newPoids,status:true})

    
  }
  
  return (
      <>
       <Alert
      message="Ajouter Patient"
      description="Pour ajouter un Patient, veuillez remplir le formulaire suivant ."
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
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string' }]}
      onChange= {(event) =>{
        setNewFirstName(event.target.value);
      }}
    >
      <Input placeholder="nom" />
    </Form.Item>
    <Form.Item
      name="prenom"
      label="Prénom"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string'}]}
      onChange= {(event) =>{
        setNewFamilyName(event.target.value);
      }}
    >
      <Input placeholder="prénom" />
    </Form.Item>
    <Form.Item
      name="age"
      label="age"
      rules={[{ required: true }, { type: 'text', warningOnly: true }]}
      onChange= {(event) =>{
        setNewAge(event.target.value);
      }}
    >
      <Input placeholder="age" />
    </Form.Item>
    <Form.Item
      name="email"
      label="email"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewEmail(event.target.value);
      }}
    >
      <Input placeholder="email" />
    </Form.Item>
    <Form.Item
      name="password"
      label="Mot de passe"
      rules={[{ required: true }, { type: 'password', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewPassword(event.target.value);
      }}
    >
    <Input.Password placeholder="Mot de passe" style={{marginLeft:"0"}} />
    </Form.Item>
    <Form.Item
      name="telephone"
      label="telephone"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewTelephone(event.target.value);
      }}
    >
      <Input placeholder="telephone" />
    </Form.Item>
    <Form.Item
      name="numero_chambre"
      label="numero chambre"
      rules={[{ required: true }, { type: 'number', warningOnly: true }]}
      onChange= {(event) =>{
        setNewNumeroChambre(event.target.value);
      }}
    >
      <Input placeholder="numero chambre" />
    </Form.Item>
    
    <Form.Item
      name="Poids"
      label="Poids"
      rules={[{ required: true }, { type: 'number', warningOnly: true }]}
      onChange= {(event) =>{
        setNewPoids(event.target.value);
      }}
    >
      <Input placeholder="Poids" />
    </Form.Item>
    <Form.Item
      name="taille"
      label="taille"
      rules={[{ required: true }, { type: 'number', warningOnly: true }]}
      onChange= {(event) =>{
        setNewTaille(event.target.value);
      }}
    >
      <Input placeholder="taille" />
    </Form.Item>
   
    <Form.Item>
      <Space>
        <Button  htmlType="submit" style={{backgroundColor:"#7c8ea9"}} onClick= {createPatient}>
          Ajouter
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
