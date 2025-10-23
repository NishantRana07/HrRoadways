import axios from 'axios';

async function testTripPlanner() {
  try {
    const response = await axios.post('http://localhost:5000/api/tripPlanner', {
      stops: ["Chandigarh", "Panipat", "Delhi"],
      preference: "fastest"
    });
    
    console.log('Trip Planner API Response:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error testing Trip Planner API:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

testTripPlanner();