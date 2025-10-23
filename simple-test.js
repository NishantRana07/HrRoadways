// Simple test to check if the trip planner endpoint is working
fetch('http://localhost:5000/api/tripPlanner', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    stops: ["Chandigarh", "Panipat", "Delhi"],
    preference: "fastest"
  })
})
  .then(response => response.json())
  .then(data => console.log('Trip Planner Response:', data))
  .catch(error => console.error('Error:', error));