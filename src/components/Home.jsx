import { Box, Button, Card,CircularProgress,Drawer,Paper,Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow,Dialog, 
  Typography} from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { FaBedPulse } from 'react-icons/fa6';
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

const Home = () => {

  const [data, setData]= useState([]);
  const nav =useNavigate();
  const [isDtatFetching, setIsDataFetching]= useState(true);
  const [isDialogOpen, setIsDialogOpen] =useState(false);
  const [isDwrawerOpen, setIsDrawerOpen]=useState(false);


 
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{

    const fetchData = async ()=>{
      await axios.get("http://localhost:3000/users").then((res) =>{
        setData(res.data);
        setIsDataFetching(false)
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      });
    };
    setTimeout(() =>{
      if(isDtatFetching){
        fetchData()
      }
    },1000)
   
    
  },[isDtatFetching]);

  const deleteUser=(id)=>{
    axios.delete(`http://localhost:3000/users/${id}`).then((res)=>{
      alert("Deleted Successully");
      setIsDataFetching(true)
    }).catch((err)=>{
     console.log(err)
    })
  }


  const dialogFetch=(idx)=>{
    axios.get(`http://localhost:3000/users/${idx}`).then((res)=>{
      setName(res.data.name);
      setEmail(res.data.email);
      setPhone(res.data.phone);
      console.log(res);
    }).catch((err)=>{
     console.log(err)
    })
  }
  return (
    
        <Card sx={{height:"100vh",width:{xs:"900px",md:"1000px",lg:"1200px"},margin:"auto"}}>
          
        <Button variant='contained' color='success' sx={{margin:"10px"}} onClick={()=>{
          nav("/add-user")
        }}>Add New User</Button>


        {!isDtatFetching ? (
               <TableContainer component={Paper}>
               <Table sx={{ minWidth: 655 }} aria-label="spanning table">
                 <TableHead>
                   <TableRow>
                   <TableCell align="left">id</TableCell>
                     <TableCell align="left">name</TableCell>
                     <TableCell align="left">phone no</TableCell>
                     <TableCell align="left">email</TableCell>
                     <TableCell align="left">Actions</TableCell>
                   </TableRow>
                  
                 </TableHead>
                 <TableBody>
                   {data.map((e,idx) => (
                     <TableRow key={idx}
                     sx={{'&:last-child td, &:last-hild th':{border:0}}}>
                      
                       <TableCell  component="th" scope="e">
                        <Link onMouseOver={()=>{
                          dialogFetch(e.id)
                          setIsDialogOpen(true)
                        }}>{e.id}</Link>
            
                        </TableCell>
                       <TableCell align="left">{e.name}</TableCell>
                       <TableCell align="left">{e.phone}</TableCell>
                       <TableCell align="left">{e.email}</TableCell>
                       <TableCell align='left' sx={{display:"flex", justifyContent:"space-around"}}>

                      <MdDelete onClick={()=>{
                        deleteUser(e.id)
                       }}/>
                       <FaRegEdit onClick={()=>{
                        nav(`/edit-user/${e.id}`)
                       }}/>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
         
        ) : (
          <Box
            sx={{width:"100%",height:"inherit", display:"flex",justifyContent:"center",alignItems:"center"}}
          >
           {/* <CircularProgress sx={{margin:"auto"}}/> */}
           <PropagateLoader color='red'speedMultiplier="1" />
          </Box>
        )}
        <Dialog
        open={isDialogOpen}
        onClose={()=>{
          setIsDialogOpen(false);
        }}
        >
          <Box sx={{height:"300px",width:"500px",mt:"50px"}}>
            <Typography variant="h4" sx={{textAlign:"center"}}>
              User Details
            </Typography>
              <Box sx={{
                height:"200px",
                width:"500px",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                gap:2,
                mt:"40px"
              }}>

              <Typography>Name:{name}</Typography>
              <Typography>Phone:{phone}</Typography>
              <Typography>Email:{email}</Typography>
              </Box>
          </Box>
        </Dialog>
        <Drawer anchor="top"
        open={isDwrawerOpen}
        onClose={()=>{
          setIsDrawerOpen(false);
        }}
        sx={{height:"100px",width:"300px"}}
        >
          <Box sx={{height:"300px",width:"300px"}}></Box>
        </Drawer>
        </Card>
  )
}

export default Home