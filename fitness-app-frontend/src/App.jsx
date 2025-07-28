import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const ActvitiesPage = () => {
  return (<Box sx={{ p: 2, border: '1px dashed grey' }}>
    <ActivityForm onActivitiesAdded = {() => window.location.reload()} />
    <ActivityList />
  </Box>);
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
      <Box
      sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=1500&q=80') center/cover no-repeat`,
        }}
      >
        <Card sx={{ minWidth: 350, maxWidth: 400, mx: 2, boxShadow: 6, borderRadius: 3, background: 'rgba(255,255,255,0.95)' }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
            <FitnessCenterIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
              Welcome to FitTrack
      </Typography>
            <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
              Track your workouts, stay motivated, and achieve your fitness goals!
      </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="large" 
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                try {
                  logIn();
                } catch (error) {
                  console.error('Login error:', error);
                  setIsLoading(false);
                  alert('Login failed. Please check if Keycloak is running on http://localhost:8181');
                }
              }} 
              sx={{ mt: 2, px: 5, py: 1.5, fontWeight: 600, fontSize: '1.1rem', borderRadius: 2 }}
            >
              {isLoading ? 'Connecting...' : 'Login'}
            </Button>
          </CardContent>
        </Card>
    </Box>
            ) : (

              <Box sx={{ p: 2, border: '1px dashed grey' }}>
                 <Button variant="contained" color="secondary" onClick={logOut}>
                  Logout
                </Button>
              <Routes>
                <Route path="/activities" element={<ActvitiesPage />}/>
                <Route path="/activities/:id" element={<ActivityDetail />}/>

                <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welcome! Please Login.</div>} />
              </Routes>
            </Box>
            )}
    </Router>
  )
}

export default App
