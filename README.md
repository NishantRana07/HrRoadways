<h1 align="center">HrRoadways</h1>
<p align="center">
  <img src="https://img.shields.io/badge/BUILD-grey?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PASSING-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge" />
</p>

<h4 align="center">
  HrRoadways is a comprehensive project designed to provide users with an intuitive platform to check bus routes, timings, and real-time updates for government bus services.
</h4>
<h2 align="center">
  <a href="https://hrroadways.vercel.app/" target="_blank" rel="noopener noreferrer">🌐 Live Demo</a>
</h2>

---


## ⚙️ Tech Stack

<div align="center">

| Technology    | Purpose                                   |
|---------------|--------------------------------------------|
| React + Vite  | Frontend framework & build tooling         |
| React Router  | Client-side routing                        |
| i18next       | Internationalization                       |
| Tailwind CSS  | Utility-first styling                      |
| Framer Motion | Smooth, production-ready animations        |
| Node.js + Express | Backend server                       |
| Axios         | HTTP client for API requests               |

</div>

## Our Events - 
<a href="https://www.elitecoders.xyz/events/1756104358418"><img src="https://github.com/user-attachments/assets/2e87bdb6-aa0d-42e6-a40c-fd00125d64c2"/></a>

## 📢 Weekly Shoutouts 🎉
| Profile | Name | Profile | Name | Profile | Name | Profile | Name |
|---------|------|---------|------|---------|------|---------|------|
| <a href="https://github.com/Keshav1605"><img src="https://github.com/Keshav1605.png" width="80" /></a> | [**Keshav1605**](https://github.com/Keshav1605) | <a href="https://github.com/Soumyosish"><img src="https://github.com/Soumyosish.png" width="80" /></a> | [**Soumyosish**](https://github.com/Soumyosish) | <a href="https://github.com/anjaliitgit"><img src="https://github.com/anjaliitgit.png" width="80" /></a> | [**anjaliitgit**](https://github.com/anjaliitgit) | <a href="https://github.com/Aripilli-Bhavana"><img src="https://github.com/Aripilli-Bhavana.png" width="80" /></a> | [**Aripilli-Bhavana**](https://github.com/Aripilli-Bhavana) |








<h2 align="center">🌏 National Language Support</h2>

<p align="center">HrRoadways supports <b>13 Indian languages</b> to serve users across India 🇮🇳</p>

<div align="center">

| Language  | Code | Native Name   |
|-----------|------|---------------|
| English   | en   | English       |
| Hindi     | hi   | हिन्दी        |
| Bengali   | bn   | বাংলা         |
| Telugu    | te   | తెలుగు        |
| Marathi   | mr   | मराठी         |
| Tamil     | ta   | தமிழ்         |
| Gujarati  | gu   | ગુજરાતી      |
| Kannada   | kn   | ಕನ್ನಡ         |
| Malayalam | ml   | മലയാളം       |
| Punjabi   | pa   | ਪੰਜਾਬੀ       |
| Oriya     | or   | ଓଡ଼ିଆ        |
| Assamese  | as   | অসমীয়া       |
| Urdu      | ur   | اردو          |

</div>




<h2 align="center">📝 Language Features</h2>

<div align="center">

| Feature | Description |
|---------|-------------|
| 🔤 Unicode Support | Handles multilingual text seamlessly |
| 🌐 Localization | Supports 13 Indian languages for wider reach |
| 🗂️ Language Files | Each language stored in separate JSON for scalability |
| ⚡ Fast Switching | Toggle between languages instantly |
| 🛠️ Easy Maintenance | Simple structure for adding new languages |

</div>


<h2 align="center">⚡ For Developers</h2>

### Internationalization (i18n)
The project uses `react-i18next` for translations. Files are in `src/i18n/locales/`.  
To add new translations:
1. Update the appropriate file in `src/i18n/locales/`
2. Use the `useTranslation` hook: `const { t } = useTranslation();`
3. Reference translations with: `{t('key.subkey')}`

### Backend Server

This project includes a backend server built with Node.js and Express to handle API requests.

#### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check endpoint |
| `/api/smartRoute` | POST | Get smart route suggestions |
| `/api/tripPlanner` | POST | Plan multi-stop trips with optimized routes |

#### Smart Route API

The smart route API accepts a POST request with the following JSON body:

```json
{
  "source": "Chandigarh",
  "destination": "Delhi"
}
```

It returns route suggestions based on the bus database with optional travel time and distance data from Google Maps API.

#### AI Trip Planner API

The AI Trip Planner API accepts a POST request with the following JSON body:

```json
{
  "stops": ["Chandigarh", "Panipat", "Delhi"],
  "preference": "fastest"
}
```

It returns an optimized route plan for multi-stop journeys, minimizing travel time and transfers.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# API Keys
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# Database Paths
DB_PATH=./Databases/State_Database/Haryana.json
```

To get a Google Maps API key:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project
4. Go to "APIs & Services" > "Library"
5. Search for "Distance Matrix API" and enable it
6. Go to "APIs & Services" > "Credentials"
7. Click "Create Credentials" > "API Key"
8. Copy the API key and add it to your `.env` file

---

## File Structure

<pre>
HrRoadways/
├── Databases/
│   └── State_Database/
├── backend/
│   ├── routes/
│   └── mainServer.js
├── src/
│   ├── components/
│   └── assets/
</pre>

- Json Database hosting link - https://jsonblob.com/api/jsonBlob/1333092652136194048

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/NishantRana07/HrRoadways.git
   ```
2. Navigate to the project directory and install dependencies:

```
  npm install
```

3. Create a `.env` file in the root directory with your API keys (see Environment Variables section above)

4. Run the backend server:
```
  npm run server
```

5. In a new terminal, run the development server to access the site locally:

```
  npm run dev
```

<h1 align="center">Popular Places Repository</h1>
<h4 align="center">
  A centralized repository to store and manage information about popular places across various locations.
</h4>

---

## Format for Adding Popular Places

To add popular places to the repository, follow the format specified below:

### File Structure

<pre>
Places/
├── Location/
│   └── Location.json
</pre>

### JSON Format

```json
{
  "location": "City or Region Name",
  "places": [
    {
      "name": "Place Name",
      "category": "Category (e.g., Historical, Restaurant, Park, etc.)",
      "description": "A brief description of the place.",
      "latitude": "Latitude Coordinate",
      "longitude": "Longitude Coordinate"
    }
  ]
}
```

## Example

Here is an example of how to add a location:

**File:** `Places/NewYork/NewYork.json`

```json
{
  "location": "New York",
  "places": [
    {
      "name": "Central Park",
      "category": "Park",
      "description": "A large public park in New York City, featuring lakes, gardens, and walking trails.",
      "latitude": "40.785091",
      "longitude": "-73.968285"
    },
    {
      "name": "Statue of Liberty",
      "category": "Historical",
      "description": "An iconic symbol of freedom and democracy located on Liberty Island.",
      "latitude": "40.689247",
      "longitude": "-74.044502"
    }
  ]
}
```
