import { Button, Card, Form, Input, Divider ,Alert} from 'antd';

import 'antd/dist/antd.css';
import FormPredict from './FormPredict'
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link
} from "react-router-dom";


const Model = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const [activeItem, setActiveItem] = useState({
    id: null,
    title: '',
    age: 0,
    sex: 0,
    chest_pain_type: 0,
    resting_blood_pressure: 0,
    cholesterol: 0,
    fasting_blood_sugar: 0,
    rest_ecg: 0,
    max_heart_rate_achieve: 0,
    exercise_induced_angina: 0,
    st_depression: 0,
    st_slope: 0,
    num_major_vessels: 0,
    thalassemia: 0,
    completed: false,
  })
  const [todoList, setTodoList] = useState([])
  const [editing, setEditing] = useState(false)

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = () => {
    console.log('Fetching...')

    fetch('http://127.0.0.1:8000/api/task-list/')
      .then(response => response.json())
      .then(data => setTodoList(data))
  }

  const handleChange = (e) => {
    var myname = e.target.name
    var value = e.target.value

    myname === "age" && setActiveItem({
      ...activeItem,
      age: value
    })

    myname === "title" && setActiveItem({
      ...activeItem,
      title: value
    })
    myname === "sex" && setActiveItem({
      ...activeItem,
      sex: value
    })
    myname === "chest_pain_type" && setActiveItem({
      ...activeItem,
      chest_pain_type: value
    })
    myname === "resting_blood pressure" && setActiveItem({
      ...activeItem,
      resting_blood_pressure: value
    })
    myname === "cholesterol" && setActiveItem({
      ...activeItem,
      cholesterol: value
    })
    myname === "fasting_blood_sugar" && setActiveItem({
      ...activeItem,
      fasting_blood_sugar: value
    })
    myname === "rest_ecg" && setActiveItem({
      ...activeItem,
      rest_ecg: value
    })
    myname === "max_heart_rate_achieve" && setActiveItem({
      ...activeItem,
      max_heart_rate_achieve: value
    })
    myname === "exercise induced_angina" && setActiveItem({
      ...activeItem,
      exercise_induced_angina: value
    })
    myname === "st_depression" && setActiveItem({
      ...activeItem,
      st_depression: value
    })
    myname === "st_slope" && setActiveItem({
      ...activeItem,
      st_slope: value
    })
    myname === "num_major_vessels" && setActiveItem({
      ...activeItem,
      num_major_vessels: value
    })
    myname === "thalassemia" && setActiveItem({
      ...activeItem,
      thalassemia: value
    })

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('ITEM:', activeItem)

    var csrftoken = getCookie('csrftoken')

    var url = 'http://127.0.0.1:8000/api/task-create/'

    if (editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${activeItem.id}/`
      setEditing(false)
    }



    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(activeItem)
    }).then((response) => {
      fetchTasks()
      setActiveItem({
        id: null,
        age: 0,
        title: '',
        sex: 0,
        chest_pain_type: 0,
        resting_blood_pressure: 0,
        cholesterol: 0,
        fasting_blood_sugar: 0,
        rest_ecg: 0,
        max_heart_rate_achieve: 0,
        exercise_induced_angina: 0,
        st_depression: 0,
        st_slope: 0,
        num_major_vessels: 0,
        thalassemia: 0,
        completed: false,
      })
    }).catch(function (error) {
      console.log('ERROR:', error)
    })

  }

  const startEdit = (task) => {
    setActiveItem({
      activeItem: task,
      editing: true,
    })
  }


  const deleteItem = (task) => {
    var csrftoken = getCookie('csrftoken')

    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    }).then((response) => {
      fetchTasks()
    })
  }


  const strikeUnstrike = (task) => {

    task.completed = !task.completed
    var csrftoken = getCookie('csrftoken')
    var url = `http://127.0.0.1:8000/api/task-update/${task.id}/`

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ 'completed': task.completed, 'title': task.title, 'age': task.age })
    }).then(() => fetchTasks())

    console.log('TASK:', task.completed)
  }
  return (
    <div >
     <Alert
      message="Analyser l'état du patient"
      description="Prédire l'éxistance d'une maladie cardiaque ."
      type="success"
      showIcon
    />
      <div >
        <div id="form-wrapper">
          <Form  
            style={{height:"1100px",marginRight: "100px",marginTop: "30px"}}
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
              label="Le nom du patient"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="title" value={activeItem.title} name="title" placeholder="Le nom du patient" />
            </Form.Item>
            <Form.Item
              label="age"
              name="age"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="age" value={activeItem.age} name="age" placeholder="L'age du patient" />
            </Form.Item>
            <Form.Item
              label="Sexe"
              name="sex"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="sex" value={activeItem.sex} name="sex" placeholder="Mal/Femelle" />
            </Form.Item>
            <Form.Item
              label="chest_pain_type"
              name="chest_pain_type"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="chest_pain_type" value={activeItem.chest_pain_type} name="chest_pain_type" placeholder="Le nom du patient" />
            </Form.Item>
            <Form.Item
              label="resting_blood pressure"
              name="resting_blood pressure"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="resting_blood pressure" value={activeItem.resting_blood_pressure} name="resting_blood pressure" placeholder="Le nom du patient" />
            </Form.Item>
            <Form.Item
              label="cholesterol"
              name="cholesterol"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="cholesterol" value={activeItem.cholesterol} name="cholesterol" placeholder="Le nom du patient" />
            </Form.Item>
            <Form.Item
              label="Fasting blood sugar"
              name="fasting_blood_sugar"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="fasting_blood_sugar" value={activeItem.fasting_blood_sugar} name="fasting_blood_sugar" placeholder="Le nom du patient" />
            </Form.Item>
            <Form.Item
              label="rest_ecg"
              name="rest_ecg"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="rest_ecg" value={activeItem.rest_ecg} name="rest_ecg" placeholder="Le nom du patient" />
            </Form.Item>
            <Form.Item
              label="max_heart_rate_achieve"
              name="max_heart_rate_achieve"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="max_heart_rate_achieve" value={activeItem.max_heart_rate_achieve} name="max_heart_rate_achieve" placeholder="max_heart_rate_achieve" />
            </Form.Item>
            <Form.Item
              label="exercise induced_angina"
              name="exercise induced_angina"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="exercise induced_angina" value={activeItem.exercise_induced_angina} name="exercise induced_angina" placeholder="exercise induced_angina" />
            </Form.Item>
            <Form.Item
              label="st_depression"
              name="st_depression"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="st_depression" value={activeItem.st_depression} name="st_depression" placeholder="st_depression" />
            </Form.Item>
            <Form.Item
              label="st_slope"
              name="st_slope"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="st_slope" value={activeItem.st_slope} name="st_slope" placeholder="st_slope" />
            </Form.Item>
            <Form.Item
              label="num_major_vessels"
              name="num_major_vessels"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="num_major_vessels" value={activeItem.num_major_vessels} name="num_major_vessels" placeholder="num_major_vessels" />
            </Form.Item>
            <Form.Item
              label="thalassemia"
              name="thalassemia"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input onChange={handleChange} id="thalassemia" value={activeItem.thalassemia} name="thalassemia" placeholder="thalassemia" />
            </Form.Item>





            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Prédire
              </Button>
            </Form.Item>
          </Form>
          <Divider orientation="left">Resultat de la prédiction</Divider>
         


        </div>

        <div id="list-wrapper">
          {todoList.map(function (task, index) {
            return (
              <div style={{marginLeft: "250px"}}>
            
               <Card key={index}
            title="Résultats"

            style={{
              width: 800,
            }}
          >
            <span onClick={() => strikeUnstrike(task)}> {task.completed === false ? (
                    <span>{task.title} {task.predict}</span>

                  ) : (

                    <strike>{task.title} {task.predict}</strike>
                  )}
           </span>  
           <button style={{float:'right'}} onClick={() => deleteItem(task)} className="btn btn-sm btn-outline-dark delete">-</button>

            
          </Card>
          </div>
            )
          })}
        </div>
      </div>
      

    </div>
  )
}

export default Model;
