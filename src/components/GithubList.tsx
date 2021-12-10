import { gql, useQuery } from '@apollo/client';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Autocomplete,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';

const exampleRepo = [
  "facebook",
  "github",
  "konichar",
  "microsoft",
]
interface RepoProps {
  name: string;
  description: string;
  url: string
  stargazerCount: number
}

export const GitHubList: React.FC = () => {
  const [active, setActive] = React.useState<RepoProps>({ name: '', description: '', url: "", stargazerCount: 0 });
  const [inputSearchValue, setSearchInputValue] = React.useState('facebook');
  const [searchValue, setSearchValue] = React.useState<string | null>('facebook');


  const handleClick = (chip: RepoProps) => {
    setActive(chip)
  }

  const GET_REPOSITORIES = gql`
      query { 
      repositoryOwner(login: "${searchValue}") {
        avatarUrl
        repositories (first: 100) {
          edges{
            node{
              name,
              description,
              url,
              stargazerCount
            }
          }
        }
      }
    }
    `
  const { loading, error, data } = useQuery(GET_REPOSITORIES);


  return (
    <div>
      <Typography variant="h2" gutterBottom component="h2" sx={{ fontFamily: "DM Mono, monospace", fontSize: 32, fontWeight: 'bold', textTransform: 'capitalize' }}>
        List of {inputSearchValue}  repositories
      </Typography>
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
          color: "white"

        }} >
          <Toolbar  >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Avatar alt="Github" src={data?.repositoryOwner?.avatarUrl} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
              {inputSearchValue}
            </Typography>

            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={exampleRepo}
              sx={{ width: 300, }}
              renderInput={(params) => <TextField {...params} label="select" variant="standard" />}
              onChange={(event: any, newValue: string | null) => {
                setSearchValue(newValue);
              }}
              onInputChange={(_event, newInputSearchValue) => {
                setSearchInputValue(newInputSearchValue);
                console.log(newInputSearchValue)
              }}
            />
          </Toolbar>
          {loading && <LinearProgress />}
        </AppBar>

        {error && <p>Error :( Please try again</p>}

        <Grid container
          spacing={2}
          sx={{
            marginTop: 6,
          }}
        >
          <Grid item xs={12} sm={8} order={2} >
            <Box
              sx={{
                overflow: 'scroll',
                height: 300,
              }}
            >
              {
                data?.repositoryOwner?.repositories.edges.map(({ node }: { node: RepoProps }) => (
                  <Chip
                    onClick={(_e) => handleClick(node)}
                    key={node.name}
                    label={node.name}
                    variant="outlined"
                    sx={{
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
          </Grid>
          {
            active && (
              <Grid item xs={12} sm={4} order={1}>
                <Card >
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Repository
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ textTransform: 'capitalize' }}>
                      {active.name}
                    </Typography>

                    <Button
                      size="small"
                      variant="outlined"
                      disabled
                      startIcon={
                        <Badge badgeContent={active.stargazerCount} showZero color="primary">
                          <GitHubIcon fontSize="small" color="action" />
                        </Badge>
                      }
                      sx={{ textTransform: "capitalize", paddingX: 2, marginY: 1 }}>
                      Stars
                    </Button>

                    <Typography variant="body2">
                      {active.description}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href={active.url} target="_blank" rel="noopener noreferrer">Learn More</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          }

        </Grid>

        {data?.repositoryOwner === null && (

          <Box>

            Please select a valid repository owner's name
          </Box>

        )}

      </Box>

    </div>
  );
};
