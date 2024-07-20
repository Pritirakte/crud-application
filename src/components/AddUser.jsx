import { Box, Button, Card, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddUser = () => {

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [nameHelperText, setNameHelperText] = useState("");

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [phoneHelperText, setPhoneHelperText] = useState("");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailHelperText, setEmailHelperText] = useState("");

    const nav = useNavigate();
    const {id}=useParams();

    const handleSubmit = () => {
        let user = {
            id: uuidv4,
            name,
            phone,
            email
        }
        console.log(user)
        axios.post('http://localhost:3000/users', user).then((res) => {
            alert("Registerd Successfully");
            nav("/")
        }).catch((err) => {
            console.log(object)
        })
    };


    useEffect(()=>{
        axios.get(`http://localhost:3000/users/${id}`).then((res)=>{
            setName(res.data.name);
            setEmail(res.data.email);
            setPhone(res.data.phone)
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    const handleUpdate = () => {
        let user = {
            id,
            name,
            phone,
            email
        }
        console.log(user)
        axios.put(`http://localhost:3000/users/${id}`, user).then((res) => {
            alert("Updated Successfully");
            nav("/")
        }).catch((err) => {
            console.log(err)
        })
    };

    return (

        <Card
            sx=
            {{
                height: "100vh",
                width: { xs: "900px", md: "1000px", lg: "1200px" },
                margin: "auto"
            }}>
            <Box sx={{
                width: "inherit",
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                {id?(<Typography variant='h4'>Update User</Typography>):(
                    <Typography variant='h4'>User Registration</Typography>
                )}
                

                <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    value={name}
                    onChange={(e) => {
                         setName(e.target.value)
                            setNameError(false);
                            setNameHelperText("");
                        }}
                        error={nameError}
                        helperText={nameHelperText}
                />
                <TextField
                    id="standard-basic"
                    label="Phone no"
                    variant="standard"
                    value={phone}
                    onChange={(e) => { 
                        setPhone(e.target.value)
                        setPhoneError(false);
                        setPhoneHelperText("");
                    }}
                    inputProps={{maxLength:"10"}}
                    error={phoneError}
                    helperText={phoneHelperText}
                 
                />
                <TextField
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    value={email}
                    onChange={(e) => { 
                        setEmail(e.target.value)
                        setEmailError(false);
                        setEmailHelperText("");

                    }}
                    error={emailError}
                    helperText={emailHelperText}
                        />

                <Button variant='contained'
                    sx={{ mt: "10px" }}
                    onClick={() => {
                        if(name===""||name===null||name==="undefined")
                        {
                            setNameError(true);
                            setNameHelperText("Please Enter Name");
                        }
                        else if(phone===""||phone===null||phone==="undefined")
                            {
                                setPhoneError(true);
                                setPhoneHelperText("Please Enter Phone no");
                            }
                         else if(email===""||email===null||email==="undefined")
                                {
                                    setEmailError(true);
                                    setEmailHelperText("Please Enter Email");
                                }  
                            else if(id){
                                handleUpdate();
                            }
                            else {
                                handleSubmit();
                            }
                    }}
                >
                        {id?(<>Update</>):(<>Submit</>)}
                     </Button>
            </Box>

        </Card>
    )
}

export default AddUser