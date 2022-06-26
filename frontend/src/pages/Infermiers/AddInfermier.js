import React  from 'react'
import { db } from '../firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc} from "firebase/firestore";
import { Form, Input, message, Button, Space,Alert } from 'antd';
import { useState , useEffect} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

export default function AddInfermier() {
    const [form] = Form.useForm();
    const [newFirstName , setNewFirstName] =useState("")
    const [newFamilyName , setNewFamilyName] =useState("")
    const [newEmail , setNewEmail] =useState("")
    const [newPassword, setNewPassword] =useState("")
    const [newTelephone , setNewTelephone] =useState("")
    const usersCollectionRef = collection(db,"infirmier");
    

    const onFinish = () => {
      message.success('Submit success!');
    };
  
    const onFinishFailed = () => {
      message.error('Submit failed!');
    };
    
    const createInfirmier = async () =>
    {
      await addDoc(usersCollectionRef , { prenom: newFirstName, nom:newFamilyName, email:newEmail,password:newPassword,telephone:newTelephone,status:true})
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          newEmail,
          newPassword
        );
        console.log(user);
      } catch (error) {
        console.log(error.message);
      }

    }
    
  
  return (
      <>
       <Alert
      message="Ajouter Infermiers"
      description="Pour ajouter un infermier, veuillez remplir le formulaire suivant ."
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
      <Input placeholder="nom" />
    </Form.Item>
    <Form.Item
      name="prenom"
      label="Prénom"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewFirstName(event.target.value);
      }}
    >
      <Input placeholder="prénom" />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[{ required: true }, { type: 'email', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewEmail(event.target.value);
      }}
    >
      <Input placeholder="Email" />
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
      name="Telephone"
      label="Telephone"
      rules={[{ required: true }, { type: 'text', warningOnly: true }, { type: 'string', min: 6 }]}
      onChange= {(event) =>{
        setNewTelephone(event.target.value);
      }}
    >
      <Input placeholder="Email" />
    </Form.Item>
    <Form.Item>
      <Space>
        <Button  htmlType="submit" style={{backgroundColor:"#7c8ea9"}} onClick={createInfirmier}>
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
