import axios from 'axios';

async function testTripPlannerAPI() {
  try {
    const response = await axios.post('http://localhost:5000/api/tripPlanner', {
      stops: ["Chandigarh", "Panipat", "Delhi"],
      preference: "fastest"
    });
    
    console.log('API Response:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Status:', error.response.status);
    }
  }
}

testTripPlannerAPI();