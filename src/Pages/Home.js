import React, {useState,useEffect } from 'react';
import axios from 'axios';
import { Container,Row,Col,Accordion } from 'react-bootstrap'
import SubItem from '../Components/SubItem';
import AddItem from '../Components/AddItem';

function Home() {
  const baseUrl = process.env.REACT_APP_BASE_URL
  const [listOfTodos, setListOfTodos] = useState([]);
  useEffect(() => {
      axios.get(`${baseUrl}/todos`).then((response) => {
        setListOfTodos(response.data.todoList)        
      });

  }, [])
  
  /* Todo status Update from here */
 const  todoStatusChange = (id,status) => {
    const statusObj = {id: id, status: status}
    axios.post(`${baseUrl}/todos/todosStatus`,statusObj).then( (response)=> {
      setListOfTodos(listOfTodos.map((todos) => {
        if(todos.id === id){
          return {...todos, status:response.data.status}
        }else{
          return todos
        }
      }))
      
    })
  }

  /* subtasks Status Update */
  const subtasksStatusChange = (id, status) => {
    const statusObj = {id: id, status: status}
    axios.post(`${baseUrl}/todos/subtasksStatus`,statusObj).then( (response)=> {
      setListOfTodos(listOfTodos.map((todos) => {
        const updateSteps = todos.Subtasks.map( (subtasks) => {
          if(subtasks.id === id){
            return {...subtasks, status: response.data.status}
          }else{
            return subtasks
          }
        })
        return {...todos, Subtasks:[...updateSteps]}
      }))
    })
  }

  
return <div className='createPostPage'>
  <Container>
      <Row className="justify-content-md-center"> 
      <Col md="auto">
      <AddItem />
      <Accordion defaultActiveKey="0">
          {listOfTodos.map((value,index) => {   
            /* total Step and Selected Count */
            let totaStep = Object.keys(value['Subtasks']).length;
            let substepTotal = 0
            value['Subtasks'].map((obj) => {
              if(obj.status === 'completed'){
                return substepTotal += 1
              }
              
            })
           
         return <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>  
              <SubItem value={value} subtasksStatusChange={todoStatusChange} />   
                <div style={{textAlign: "right","width":"50%"}}> {substepTotal} of {totaStep} </div>
              </Accordion.Header>
              <Accordion.Body> 
               { value['Subtasks'].map((val, ind) => {
                return <div key={ind}> 
                  <SubItem value={val} subtasksStatusChange={subtasksStatusChange} />                  
                </div>
               })}
              </Accordion.Body>
          </Accordion.Item>
            })}
          
      </Accordion>       
      </Col>          
      </Row>      
  </Container>
    </div>;
}

export default Home;
