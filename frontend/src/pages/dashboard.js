import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { Button,Card, Icon, Avatar,Alert } from 'antd';
import { useState , useEffect} from "react";
import { db } from './firebase-config';
import { collection , getDocs , addDoc ,updateDoc ,doc} from "firebase/firestore";

import { UserOutlined } from '@ant-design/icons';
import logo from '../img/logo.png';
import { Label } from '@mui/icons-material';

const { Meta } = Card;
function Dashboard() {
    const [patients,setpatients] = useState([]);
    const usersCollectionRef = collection(db,"bracelet_data");
    useEffect(() =>{
        const getUsers = async () =>{
           const data = await getDocs(usersCollectionRef);
           setpatients(data.docs.map((doc) => ({...doc.data(),id :doc.id})))
           console.log(data);
           
        }
        getUsers()
     }, [])
  return (
    <div style={{minHeight: "550px"}} >
       <Alert style={{marginBottom: "30px"}}
      message="Tableau de bord"
      description="Vous trouvez ci-join la liste des Patient avec leurs numeros de chambres et leurs etats ."
      type="success"
      showIcon
    />
        {patients.map((patient)=>{
            //vvv
          if( 37.2>patient.temperature && patient.temperature >36.1  && 100>patient.oxygene_blood && patient.oxygene_blood>80 && 100>patient.battement &&patient.battement>60){
           return( <Card
          
          style={{ width: 680 }}
          
          actions={[
           
          <Button type="primary" title="temperature"
          style={{ background: "green", paddingLeft:"-40px" }} >temperature :{patient.temperature}°</Button>,<Button type="primary" style={{ background: "green" }}> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" style={{ background: "green" }}>Battement :{patient.battement} b/min</Button>]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={patient.nom}
            description={"numero chambre : "+patient.numero_chambre}
          />
        </Card>)
          }
          //vvr
          if( 37.2>patient.temperature && patient.temperature >36.1  && 100>patient.oxygene_blood && patient.oxygene_blood>80 && patient.oxygene_blood>100 || patient.battement<60){
            return( <Card
          
              style={{ width: 680 }}
              
              actions={[
               
              <Button type="primary" title="temperature"
              style={{ background: "green", paddingLeft:"-40px" }} >temperature :{patient.temperature}°</Button>,<Button type="primary" style={{ background: "green" }}> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" danger>Battement :{patient.battement} b/min</Button>]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={patient.nom}
                description={"numero chambre : "+patient.numero_chambre}
              />
            </Card>)
           }
          //rvv
          if( 37.2<=patient.temperature || patient.temperature<=36.1  && 100>patient.oxygene_blood && patient.oxygene_blood>80 && 100>patient.battement &&patient.battement>60){
            return( <Card
          
              style={{ width: 680 }}
              
              actions={[
               
              <Button type="primary" title="temperature"
              danger >temperature :{patient.temperature}°</Button>,<Button type="primary" style={{ background: "green" }}> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" style={{ background: "green" }}>Battement :{patient.battement} b/min</Button>]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={patient.nom}
                description={"numero chambre : "+patient.numero_chambre}
              />
            </Card>)
          }
          //rrv
          if( 37.2<=patient.temperature || patient.temperature<=36.1  && 80>=patient.oxygene_blood|| patient.oxygene_blood>=100 && 100>patient.battement &&patient.battement>60){
            return( <Card
          
              style={{ width: 680 }}
              
              actions={[
               
              <Button type="primary" title="temperature"
              danger >temperature :{patient.temperature}°</Button>,<Button type="primary" danger> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" style={{ background: "green" }}>Battement :{patient.battement} b/min</Button>]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={patient.nom}
                description={"numero chambre : "+patient.numero_chambre}
              />
            </Card>)
          }
          //rrr
          if( 37.2<=patient.temperature || patient.temperature<=36.1  && 80>=patient.oxygene_blood|| patient.oxygene_blood>=100 && 100<=patient.battement ||patient.battement<=60){
            return( <Card
          
              style={{ width: 680 }}
              
              actions={[
               
              <Button type="primary" title="temperature"
              danger >temperature :{patient.temperature}°</Button>,<Button type="primary" danger> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" danger>Battement :{patient.battement} b/min</Button>]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={patient.nom}
                description={"numero chambre : "+patient.numero_chambre}
              />
            </Card>)
          }
          //rvr
          if( 37.2<=patient.temperature || patient.temperature<=36.1  && 100>patient.oxygene_blood && patient.oxygene_blood>80 && 100<=patient.battement ||patient.battement<=60){
            return( <Card
          
              style={{ width: 680 }}
              
              actions={[
               
              <Button type="primary" title="temperature"
              danger >temperature :{patient.temperature}°</Button>,<Button type="primary" style={{ background: "green"}}> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" danger>Battement :{patient.battement} b/min</Button>]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={patient.nom}
                description={"numero chambre : "+patient.numero_chambre}
              />
            </Card>)
          }
          //vrr
          if( 37.2>patient.temperature && patient.temperature<36.1 && 80>=patient.oxygene_blood|| patient.oxygene_blood>=100 && 100<=patient.battement ||patient.battement<=60){
            return(  <Card
          
              style={{ width: 680 }}
              
              actions={[
               
              <Button type="primary" title="temperature"
              style={{ background: "green", paddingLeft:"-40px" }} >temperature :{patient.temperature}°</Button>,<Button type="primary" danger> OXygene du sang: {patient.oxygene_blood} mm Hg</Button>,<Button type="primary" danger>Battement :{patient.battement} b/min</Button>]}
            >
              <Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={patient.nom}
                description={"numero chambre : "+patient.numero_chambre}
              />
            </Card>)
          }
          //vrv
          if( 37.2>patient.temperature && patient.temperature>36.1  && 100<=patient.oxygene_blood || patient.oxygene_blood<=80 && 100>patient.battement && patient.battement>60){
            return( <Card
           
           style={{ width: 300 }}
           
           actions={[
              
           <Button type="primary" style={{ background: "green" }} >{patient.temperature}</Button>,<Button type="primary" danger>{patient.oxygene_blood}</Button>,<Button type="primary" style={{ background: "green" }}>{patient.battement}</Button>]}
         >
           <Meta
             avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
             title={patient.nom}
             description={patient.numero_chambre}
           />
         </Card>)
          }


})}
    
    </div>
  );
}

export default Dashboard;