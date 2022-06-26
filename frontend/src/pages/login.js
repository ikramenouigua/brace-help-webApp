import React, { useCallback, useContext ,useState} from "react";
import 'antd/dist/antd.css';
import logo from '../img/logo.png';
import {  Form, Input, Button, Checkbox ,Image } from 'antd';

import { withRouter, Redirect } from "react-router";
import { auth } from "./firebase-config";
import { AuthContext } from "../components/auth";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
function Login({ history }) {
    const [email , setEmail] =useState("")
    const [password , setPassword] =useState("")
    console.log(email);
    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(user);
          history.push('/');
        } catch (error) {
          console.log(error.message);
        }
      };
    

const onFinish = (values) => {
          console.log('Success:', values);
        };
      
const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
        };
      
        return (
          <div style={{backgroundColor:'#EFFFE9'}}>
          <Image style={{marginLeft:'700px'}}
    width={300}
    src={logo}
  />
  <p style={{marginLeft:'700px',fontWeight:'bold',fontSize:'15px'}}>Bienvenue a notre application Brace Help</p>

          <Form style={{minHeight:'550px',marginRight:'300px'}}
           
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
              
            >
              <Input name="email"
               onChange= {(event) =>{
                setEmail(event.target.value);
              }} />
            </Form.Item>
      
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              onChange= {(event) =>{
                setPassword(event.target.value);
              }}
            >
              <Input.Password  />
            </Form.Item>
      
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
      
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary"  style={{ borderColor: "#018037" ,backgroundColor:"#018037" }} htmlType="submit" onClick={login}>
                Se connecter
              </Button>
            </Form.Item>
          </Form>
          </div>
        );
      };
      

export default Login;
