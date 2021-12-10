import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Box, Chip, Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



export const GitHubList: React.FC = () => {
  const [value, setValue] = React.useState('facebook');

  const GET_REPOSITORIES = gql`
    query { 
      repositoryOwner(login: "${value}") { 
        repositories (first: 100) {
          edges{
            node{
              name
            }
          }
          
        }
      }
    }
    `
  const { loading, error, data } = useQuery(GET_REPOSITORIES);
  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  console.log(data)
  return (
    <div>
      <h1>List of Facebook repositories</h1>

      <Box
        p={2}
        sx={{
          boxShadow: 2,
          borderRadius: 4,

          color: 'black',
          backgroundColor: 'white',
          position: "relative"
        }}
      >
        <AppBar position="absolute" sx={{
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }} >
          <Toolbar  >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {value}
            </Typography>
            <Button color="inherit">Select</Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            borderRadius: 4,
            overflow: 'scroll',
            height: 300,
            marginTop: 6
          }}
        >
          {
            data?.repositoryOwner.repositories.edges.map(({ node }: { node: { name: string } }) => (
              <Chip key={node.name} label={node.name} variant="outlined" sx={{
                margin: 0.4,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  opacity: [0.9, 0.8, 0.7],
                },
              }} />
            ))
          }

        </Box>

      </Box>

    </div>
  );
};
