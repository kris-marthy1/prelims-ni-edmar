'use client' 
import { useEffect, useState  } from "react";
import { Button, Card, CardContent, CardHeader, Grid} from "@mui/material";
import { useRouter } from 'next/navigation';

export default function Page({ params }) {

    const router = useRouter()
    const postId = params.postId
    const [allComments, setAllComments] = useState([])
    const [allPosts, setAllPosts] = useState([])
    const [allUsers, setAllUsers] = useState([])

      useEffect(() => {
        const fetchData = async () => {
          try {
            const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
            const usersData = await usersResponse.json();
            setAllUsers(usersData);
    
            const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts/'+postId);
            const postsData = await postsResponse.json();
            setAllPosts(postsData);
    
            const commentsResponse = await fetch('https://jsonplaceholder.typicode.com/comments?postId='+postId);
            const commentsData = await commentsResponse.json();
            setAllComments(commentsData);

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
        
      }, []);

  return (
    <>

    
    <Button size="small" onClick={()=>{
      router.push(`/posts`)
    }}>Go Back?</Button>

        <Grid padding={2}  display="flex" justifyContent="center">           
           <Card elevation={4} sx={{ maxWidth: 1245 }} >
                <CardHeader title = {"Title: "+ allPosts.title} subheader={
                    allUsers.map((user)=>{
                        if(allPosts.userId === user.id) {
                            return "Posted by: " +user.name
                        }
                    })
                }/>
                <CardContent>
                        {allPosts.body}
                </CardContent>
            </Card>
        </Grid>        
    

    <h1>Comments</h1>
    {Array.isArray(allComments) ? (
  <Grid container>
    {allComments.map((comment) => (
      <Grid lg={3} md={4} sm={6} xs={12} key={comment.id} padding={2}>
        <Card elevation={4}>
          <CardHeader title={comment.name} subheader={comment.email} />
          <CardContent>{comment.body}</CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
) : (
  <p>No comments available.</p>
)}
    </>
  ) 
}