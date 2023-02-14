import {Card,Row,Col} from 'react-bootstrap';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';

const CardComponent=()=>{
    const [dataArray,setDataArray]=useState([]);
    const colorArray=['Primary','Secondary','Success','Danger','Warning','Info','Light','Dark',]

    useEffect(()=>{
        getNotesData();
    },[]);
    const getNotesData=()=>{
        axios.get('http://localhost:3000/api/notes')
        .then(res=>{
            setDataArray(res.data);
            console.log(res.data)
        })
        .catch(err=>console.log(err));
        

    }

    const handleDelete=(id)=>{
        const newArray=dataArray.filter((note)=>{
            return note._id!==id
        })
        axios.delete(`http://localhost:3000/api/notes/${id}`)
        .then((res)=>{
            if(res.data==="Your Notes has been deleted"){
                setDataArray(newArray);
            }
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    return(
        <Row xs={1} md={3} className="g-4">
        {dataArray.map((obj, id) => (
            
            <Col>
        
                <Card
                    bg={colorArray[4].toLowerCase()}
                    
                    className="mb-3"
                >
                    <Card.Header>{obj.title}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            {obj.description}
                        </Card.Text>
                        <div>
                            <span><AiFillEdit /></span>
                            <span onClick={()=>handleDelete(obj._id)}><AiFillDelete /></span>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ))}
        </Row>
    )
}
export default CardComponent