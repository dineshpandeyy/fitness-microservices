import { Card, CardContent, Typography, Grid, Box, Chip, Avatar, Paper, LinearProgress, IconButton, Tooltip } from '@mui/material'
import { DirectionsRun, DirectionsWalk, DirectionsBike, Timer, LocalFireDepartment, CalendarToday, TrendingUp, Visibility } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const getActivityIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'RUNNING':
        return <DirectionsRun sx={{ fontSize: 30, color: '#1976d2' }} />;
      case 'WALKING':
        return <DirectionsWalk sx={{ fontSize: 30, color: '#4caf50' }} />;
      case 'CYCLING':
        return <DirectionsBike sx={{ fontSize: 30, color: '#ff9800' }} />;
      default:
        return <DirectionsRun sx={{ fontSize: 30, color: '#9c27b0' }} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type?.toUpperCase()) {
      case 'RUNNING':
        return '#1976d2';
      case 'WALKING':
        return '#4caf50';
      case 'CYCLING':
        return '#ff9800';
      default:
        return '#9c27b0';
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: 'center' }}>Loading activities...</Typography>
      </Box>
    );
  }

  if (activities.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Activities Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start by adding your first activity!
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Your Activities
        </Typography>
        <Chip 
          label={`${activities.length} activities`} 
          color="primary" 
          variant="outlined" 
          sx={{ ml: 2 }}
        />
      </Box>

      <Grid container spacing={3}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card 
              elevation={3} 
              sx={{ 
                cursor: 'pointer',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                background: `linear-gradient(135deg, ${getActivityColor(activity.type)}08, ${getActivityColor(activity.type)}15)`,
                border: `1px solid ${getActivityColor(activity.type)}20`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  border: `1px solid ${getActivityColor(activity.type)}40`,
                }
              }}
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <CardContent sx={{ p: 3 }}>
                {/* Header with Icon and Type */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: getActivityColor(activity.type), 
                    mr: 2,
                    width: 50,
                    height: 50
                  }}>
                    {getActivityIcon(activity.type)}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {activity.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Tooltip title="View Details">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </Box>

                {/* Metrics Grid */}
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center', borderRadius: 2 }}>
                      <Timer sx={{ fontSize: 20, color: '#2196f3', mb: 0.5 }} />
                      <Typography variant="h6" fontWeight="bold" color="#2196f3">
                        {activity.duration}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Minutes
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper elevation={1} sx={{ p: 1.5, textAlign: 'center', borderRadius: 2 }}>
                      <LocalFireDepartment sx={{ fontSize: 20, color: '#ff5722', mb: 0.5 }} />
                      <Typography variant="h6" fontWeight="bold" color="#ff5722">
                        {activity.caloriesBurned}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Calories
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                {/* Additional Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Chip 
                    label={activity.type} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ 
                      borderColor: getActivityColor(activity.type),
                      color: getActivityColor(activity.type)
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(activity.createdAt).toLocaleTimeString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default ActivityList