'use client'
import { Button, Card, CardContent, CardHeader, CardActions, Grid, Skeleton, Box } from "@mui/material";
import { useEffect, useState } from "react";
import SideBar from "../sidebar/sidebar";
import { useRouter } from "next/navigation";

const Posts = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([{
    id: null,
    title: null,
    userId: null,
    body: null
  }]);
  const [allUsers, setAllUsers] = useState([]);

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
        const usersData = await usersResponse.json();
        setAllUsers(usersData);
        setIsLoading(false);

        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
        const postsData = await postsResponse.json();
        setAllPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);

      }

      
    };

    fetchData();
    
  }, []);


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Grid display="flex" justifyContent="center">
            <h1>Posts</h1>
          </Grid>

          {isLoading ? (
            <Skeleton variant="rounded" width={210} height={60} />
          ) : (
            <Grid container spacing={2} sx={{ mt: 3 }}>
              {allPosts.map((post) => {
                const user = allUsers.find((user) => user.id === post.userId);
                return (
                  <Grid item md={4} sm={6} xs={12} key={post.id}>
                    <Card elevation={4} width={150}>
                      <CardHeader
                        title={"Title: " + post.title}
                        subheader={user ? "Posted by: " + user.name : ""}
                      />
                      <CardContent>{post.body}</CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          type="button"
                          onClick={() => {
                      
                              router.push(`/posts/${post.id}`);
                            
                          }}
                        >
                          See Comments
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Posts;
