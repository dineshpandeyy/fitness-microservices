import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Card, CardContent, Typography, Grid, Chip, Avatar, Paper, Divider } from '@mui/material'
import { DirectionsRun, DirectionsWalk, DirectionsBike, Timer, LocalFireDepartment, Add, FitnessCenter } from '@mui/icons-material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'

const ActivityForm = ({ onActivityAdded }) => {
    const [activity, setActivity] = useState({
        type: "RUNNING", 
        duration: '', 
        caloriesBurned: '',
        additionalMetrics: {}
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addActivity(activity);
            onActivityAdded();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: ''});
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case 'RUNNING':
                return <DirectionsRun sx={{ fontSize: 24, color: '#1976d2' }} />;
            case 'WALKING':
                return <DirectionsWalk sx={{ fontSize: 24, color: '#4caf50' }} />;
            case 'CYCLING':
                return <DirectionsBike sx={{ fontSize: 24, color: '#ff9800' }} />;
            default:
                return <DirectionsRun sx={{ fontSize: 24, color: '#9c27b0' }} />;
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
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
    
    return (
        <Card elevation={3} sx={{ borderRadius: 3, mb: 4 }}>
            <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <FitnessCenter />
                    </Avatar>
                    <Typography variant="h5" fontWeight="bold">
                        Add New Activity
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Activity Type Selection */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom fontWeight="bold" color="primary">
                                Choose Activity Type
                            </Typography>
                            <Grid container spacing={2}>
                                {['RUNNING', 'WALKING', 'CYCLING'].map((type) => (
                                    <Grid item xs={12} sm={4} key={type}>
                                        <Paper 
                                            elevation={activity.type === type ? 3 : 1}
                                            sx={{ 
                                                p: 2, 
                                                cursor: 'pointer',
                                                border: activity.type === type ? `2px solid ${getActivityColor(type)}` : '2px solid transparent',
                                                bgcolor: activity.type === type ? `${getActivityColor(type)}10` : 'background.paper',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    elevation: 2,
                                                    transform: 'translateY(-2px)'
                                                }
                                            }}
                                            onClick={() => setActivity({...activity, type})}
                                        >
                                            <Box sx={{ textAlign: 'center' }}>
                                                {getActivityIcon(type)}
                                                <Typography variant="h6" sx={{ mt: 1, fontWeight: 'bold' }}>
                                                    {type.charAt(0) + type.slice(1).toLowerCase()}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>

                        <Divider sx={{ width: '100%', my: 2 }} />

                        {/* Duration and Calories */}
                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth
                                label="Duration (Minutes)"
                                type="number"
                                value={activity.duration}
                                onChange={(e) => setActivity({...activity, duration: e.target.value})}
                                InputProps={{
                                    startAdornment: <Timer sx={{ mr: 1, color: 'text.secondary' }} />
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField 
                                fullWidth
                                label="Calories Burned"
                                type="number"
                                value={activity.caloriesBurned}
                                onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
                                InputProps={{
                                    startAdornment: <LocalFireDepartment sx={{ mr: 1, color: '#ff5722' }} />
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2
                                    }
                                }}
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    size="large"
                                    disabled={loading || !activity.duration || !activity.caloriesBurned}
                                    startIcon={<Add />}
                                    sx={{ 
                                        px: 4, 
                                        py: 1.5, 
                                        borderRadius: 2,
                                        fontSize: '1.1rem',
                                        fontWeight: 'bold',
                                        background: `linear-gradient(45deg, ${getActivityColor(activity.type)}, ${getActivityColor(activity.type)}dd)`,
                                        '&:hover': {
                                            background: `linear-gradient(45deg, ${getActivityColor(activity.type)}dd, ${getActivityColor(activity.type)})`
                                        }
                                    }}
                                >
                                    {loading ? 'Adding Activity...' : 'Add Activity'}
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ActivityForm