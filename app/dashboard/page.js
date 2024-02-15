'use client'
import * as React from 'react';
import { Toolbar, Divider, Box } from '@mui/material';;
import { BarChart } from '@mui/x-charts';
import { useEffect, useState  } from "react";
import SideBar from '../sidebar/sidebar';


export default function Dashboard() {

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();
        setUsers(usersData);

        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();
        setPosts(postsData);

        const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments');
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        const todosResponse = await fetch('https://jsonplaceholder.typicode.com/todos');
        const todosData = await todosResponse.json();
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      
    };

    fetchData();
    
  }, []);


 
  const userTodoCounts = users && users.length > 0
  ? users.map(user => {
      const userTodos = todos.filter(todo => todo.userId === user.id);
      return userTodos.length;
    })
  : [0];

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar/>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Divider/>
          Welcome
        <Divider/>
        <Toolbar/>
       

         Statistics  
        <Divider/>
        <BarChart
          series={[
            { data: [Object.keys(users).length, Object.keys(posts).length, Object.keys(comments).length, Object.keys(todos).length] }
          ]}
          height={290}
          xAxis={[{ data: ['Users', 'Posts', 'Comments', 'Todos'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
        <Divider/>
        <Toolbar/>



        User&apos;s Todos Count
        <Divider/>
        <BarChart
          series={[
            { data: userTodoCounts }
          ]}
          height={290}
          xAxis={[{ data: users.map(user => user.name), scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Box>
    </Box>
  );
}
