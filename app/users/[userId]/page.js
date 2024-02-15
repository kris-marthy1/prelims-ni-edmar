'use client' 
import { useEffect, useState  } from "react";
import { Button, Box , Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import * as React from 'react'
import { useRouter } from 'next/navigation';


export default function Page({ params }) {
    const router = useRouter()
    const userId = params.userId
    const [allTodos, setAllTodos] = useState([])
    const [allUsers, setAllUsers] = useState([])
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users/'+userId)
            const usersData = await usersResponse.json();
            setAllUsers(usersData);
    
            const todosResponse = await fetch('https://jsonplaceholder.typicode.com/users/'+userId+'/todos')
            const todosData = await todosResponse.json();
            setAllTodos(todosData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    
          
        };
    
        fetchData();
        
      }, []);

  return (
    <>

    
   
    <Button size="small" onClick={()=>{
      router.push(`/users`)
    }}>Go Back?</Button>
        <Grid padding={2}  display="flex" justifyContent="center">           
        
                <Box>
                    <Card variant="outlined">
                        <React.Fragment>
                            <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Users number: {allUsers.id}
                            </Typography>
                            <Typography variant="h3" component="div">
                                {allUsers.name}
                            </Typography>
                            <Typography color="text.secondary">
                                allUsersname: {allUsers.allUsersname}
                            </Typography>
                            <Typography color="text.secondary">
                                email: {allUsers.email}
                            </Typography>
                            <Typography color="text.secondary">
                                Phone No: {allUsers.phone}
                            </Typography>
                            
                            <Typography sx={{mb: 2}} color="text.secondary">
                               website: {allUsers.website}
                            </Typography>
                            
                            </CardContent>
                           
                        </React.Fragment>
                    </Card>
                </Box>
        </Grid>        
    

    <h1>Todos:</h1>
    <Grid container>
       {allTodos.map((todo) => {
       return(
        <Grid lg = {3} md = {4} sm = {6} xs = {12} key = {todo.id}  padding={2}>

            <Card elevation={4}>
                <CardHeader title = {todo.title} />
                <CardContent sx={{ bgcolor: 'text.disabled' }}>
                    Status: {
                        todo.completed === false ? <Typography sx={{ color: 'error.main' }}>Not yet Completed</Typography> 
                        : <Typography sx={{ color: 'success.main' }}>Completed</Typography>
                    }
                </CardContent>
            </Card>
        </Grid>
       )
   })}
   </Grid>
    </>
  ) 
}