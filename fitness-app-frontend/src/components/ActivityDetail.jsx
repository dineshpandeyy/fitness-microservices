import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography, Chip, Grid, Paper, Avatar, LinearProgress, IconButton, Tooltip } from '@mui/material';
import { DirectionsRun, Timer, LocalFireDepartment, CalendarToday, TrendingUp, Lightbulb, Security, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        setLoading(true);
        const response = await getActivityDetail(id);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivityDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <LinearProgress />
        <Typography sx={{ mt: 2, textAlign: 'center' }}>Loading activity details...</Typography>
      </Box>
    );
  }

  if (!activity) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2, textAlign: 'center' }}>
        <Typography variant="h6" color="error">Activity not found</Typography>
      </Box>
    );
  }

  const getActivityIcon = (type) => {
    switch (type?.toUpperCase()) {
      case 'RUNNING':
        return <DirectionsRun sx={{ fontSize: 40, color: '#1976d2' }} />;
      case 'WALKING':
        return <DirectionsRun sx={{ fontSize: 40, color: '#4caf50' }} />;
      case 'CYCLING':
        return <DirectionsRun sx={{ fontSize: 40, color: '#ff9800' }} />;
      case 'SWIMMING':
        return <DirectionsRun sx={{ fontSize: 40, color: '#2196f3' }} />;
      default:
        return <DirectionsRun sx={{ fontSize: 40, color: '#9c27b0' }} />;
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
      case 'SWIMMING':
        return '#2196f3';
      default:
        return '#9c27b0';
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      {/* Header with back button */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Tooltip title="Go back">
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Activity Details
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Activity Information Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ 
            borderRadius: 3, 
            background: `linear-gradient(135deg, ${getActivityColor(activity.type)}15, ${getActivityColor(activity.type)}05)`,
            border: `1px solid ${getActivityColor(activity.type)}30`
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  bgcolor: getActivityColor(activity.type), 
                  mr: 2, 
                  width: 60, 
                  height: 60 
                }}>
                  {getActivityIcon(activity.type)}
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {activity.type}
                  </Typography>
                  <Chip 
                    label={`${activity.duration} minutes`} 
                    color="primary" 
                    variant="outlined"
                    icon={<Timer />}
                  />
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <LocalFireDepartment sx={{ fontSize: 30, color: '#ff5722', mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold" color="#ff5722">
                      {activity.caloriesBurned}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Calories Burned
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
                    <CalendarToday sx={{ fontSize: 30, color: '#2196f3', mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold" color="#2196f3">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Date
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              {activity.additionalMetrics && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Additional Metrics
                  </Typography>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {JSON.stringify(activity.additionalMetrics, null, 2)}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendation Card */}
        <Grid item xs={12} md={6}>
          {recommendation ? (
            <Card elevation={3} sx={{ borderRadius: 3, height: 'fit-content' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                    <TrendingUp />
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold">
                    AI Analysis
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                    Performance Analysis
                  </Typography>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#f5f5f5' }}>
                    <Typography variant="body1" paragraph>
                      {activity.recommendation}
                    </Typography>
                  </Paper>
                </Box>

                {activity?.improvements && activity.improvements.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" color="success.main">
                      <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Improvements
                    </Typography>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#e8f5e8' }}>
                      {activity.improvements.map((improvement, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ marginRight: '8px', color: '#4caf50' }}>•</span>
                          {improvement}
                        </Typography>
                      ))}
                    </Paper>
                  </Box>
                )}

                {activity?.suggestions && activity.suggestions.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom fontWeight="bold" color="info.main">
                      <Lightbulb sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Suggestions
                    </Typography>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#e3f2fd' }}>
                      {activity.suggestions.map((suggestion, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ marginRight: '8px', color: '#2196f3' }}>•</span>
                          {suggestion}
                        </Typography>
                      ))}
                    </Paper>
                  </Box>
                )}

                {activity?.safety && activity.safety.length > 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom fontWeight="bold" color="warning.main">
                      <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Safety Guidelines
                    </Typography>
                    <Paper elevation={1} sx={{ p: 2, borderRadius: 2, bgcolor: '#fff3e0' }}>
                      {activity.safety.map((safety, index) => (
                        <Typography key={index} variant="body2" paragraph sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <span style={{ marginRight: '8px', color: '#ff9800' }}>•</span>
                          {safety}
                        </Typography>
                      ))}
                    </Paper>
                  </Box>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card elevation={3} sx={{ borderRadius: 3, height: 'fit-content' }}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No AI Analysis Available
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  AI recommendations will appear here once processed
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ActivityDetail