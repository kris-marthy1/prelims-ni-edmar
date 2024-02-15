'use client'
import { Button, Card, CardContent, Box, CardActions , Grid, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import { useRouter } from "next/navigation";
import SideBar
 from "../sidebar/sidebar";
export default function Users() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [allUsers, setAllUsers] = useState([{
    id: null,
    name: null,
    email: null,
    body: null
  }])
  useEffect(() => {
    setIsLoading(true)
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setAllUsers(json)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
<Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >


        <Grid display="flex" justifyContent="center">
            <h1>Users</h1>
        </Grid>
         
        {isLoading ? <Skeleton variant="rounded" width={210} height={60} /> : <Grid container spacing={2} sx={{mt:3}}>
 
    {allUsers.map((user) => {
       return(
           <Grid item  md = {4} sm = {6} xs = {12} key = {user.id}>
            
        <Box>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        User number: {user.id}
                    </Typography>
                    <Typography variant="h3" component="div">
                        {user.name}
                    </Typography>
                    <Typography color="text.secondary">
                        username: {user.username}
                    </Typography>
                    <Typography color="text.secondary">
                        email: {user.email}
                    </Typography>
                    <Typography color="text.secondary">
                        Phone No: {user.phone}
                    </Typography>
                    
                    <Typography sx={{mb: 2}} color="text.secondary">
                       website: {user.website}
                    </Typography>
                    
                    </CardContent>
                    <CardActions>
                    <Button size="small" onClick={()=>{
                        router.push(`/users/${user.id}`)
                }}>See user&apos;s Todos...</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>



            
    
           </Grid>
       )
   })}
  
  
     
  
       
  
   </Grid>}
  
   
      
   </Box>
</Box>    
    </>
  )
}