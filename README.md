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
  <a href="https://hrroadways.vercel.app/" target="_blank" rel="noopener noreferrer">Live Link</a>
</h2>

## Tech Stack

- React with Vite Framework
- i18next for internationalization
- React Router for navigation
- Tailwind CSS for styling
- Framer Motion for animations

## National Language Support

HrRoadways supports **13 Indian languages** to serve users across India:

- **English** (en)
- **Hindi** (hi) - हिन्दी
- **Bengali** (bn) - বাংলা
- **Telugu** (te) - తెలుగు
- **Marathi** (mr) - मराठी
- **Tamil** (ta) - தமிழ்
- **Gujarati** (gu) - ગુજરાતી
- **Kannada** (kn) - ಕನ್ನಡ
- **Malayalam** (ml) - മലയാളം
- **Punjabi** (pa) - ਪੰਜਾਬੀ
- **Oriya/Odia** (or) - ଓଡ଼ିଆ
- **Assamese** (as) - অসমীয়া
- **Urdu** (ur) - اردو

### Language Features

- Automatic language detection based on browser settings
- Language preference saved in localStorage
- Dynamic language switching without page reload
- Complete translation coverage for all UI elements
- Responsive design maintained across all languages

### For Developers

The project uses `react-i18next` for internationalization. Translation files are located in `src/i18n/locales/`. To add new translations:

1. Update the appropriate language file in `src/i18n/locales/`
2. Use the `useTranslation` hook in components: `const { t } = useTranslation();`
3. Reference translations with: `{t('key.subkey')}`

## File Structure

<pre>
HrRoadways/
├── Databases/
│   └── State_Database/
├── src/
│   ├── components/
│   └── assets/
</pre>

- Json Database hosting link - https://jsonblob.com/api/jsonBlob/1333092652136194048

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/NishantRana07/HrRoadways.git
   ```
2. Navigate to the project directory and install dependencies:

  ```
    npm install
  ```
3. Create .env and add following:

```
VITE_WEATHER_API_KEY=a88a791860616b06b7b7b8637de9af7b
VITE_GEMINI_API_KEY=your_gemini_api_key
```

4. Run the development server to access the site locally: 
  ```
    npm run dev
  ```

<h1 align="center">Popular Places Repository</h1>
<h4 align="center">
  A centralized repository to store and manage information about popular places across various locations.
</h4>

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

<h1 align="center">Contributing Guidelines</h1>
<h4 align="center">
  Guidelines for contributing to the repository, including adding content and ensuring Hindi translations.
</h4>

## Contributing

If you are adding content to the site or creating new pages, please:

- Apply logic for Hindi translation and add translations for all words.
- Use PNG or JPG files for minimal size and always compress images.
- Ensure that your forked repository is up to date before submitting a pull request.

### Steps for Contributing

#### 1. Fork the Repository:

Click on the "Fork" button at the top right of the repository page.

#### 2. Clone the Forked Repository:

```bash
git clone https://github.com/your-username/HrRoadways.git
```

#### 3. Create a New Branch:

```bash
git checkout -b your-branch-name
```

#### 4. Create .env and add following:

```
VITE_WEATHER_API_KEY=a88a791860616b06b7b7b8637de9af7b
VITE_GEMINI_API_KEY=your_gemini_api_key
```

#### 5. Make Your Changes:

Ensure that you:

- Apply the logic for Hindi translation.
- Compress images before uploading.

#### 6. Commit Your Changes:

```bash
git add .
git commit -m "Describe your changes"
```
#### 7. Push to the Branch:

```bash
git push origin your-branch-name
```

#### 8. Create a Pull Request:

Go to the original repository and click on "New Pull Request."

## Keeping Your Fork Updated

Before making a pull request, ensure that your forked repository is up to date.

#### Add Remote Upstream Repository:

```bash
git remote add upstream https://github.com/NishantRana07/HrRoadways.git
```

#### Fetch Upstream Changes:

```bash
git fetch upstream
```

#### Merge Upstream Changes:

```bash
git checkout main
git merge upstream/main
```

#### Push Changes to Your Fork:

```bash
git push origin main
```

By following these steps, you ensure that your pull request is based on the latest code.

<h1 align="center">Contributing and Translation Guidelines</h1>
<h4 align="center">
  Comprehensive guidelines for contributing to the repository and implementing bilingual functionality.
</h4>

## Contributing

If you are adding content to the site or creating new pages, please:

- Apply logic for Hindi translation and add translations for all words.
- Use PNG or JPG files for minimal size and always compress images.
- Ensure that your forked repository is up to date before submitting a pull request.

### Steps for Contributing

#### 1. Fork the Repository:

Click on the "Fork" button at the top right of the repository page.

#### 2. Clone the Forked Repository:

```bash
git clone https://github.com/your-username/HrRoadways.git
```

#### 3. Create a New Branch:

```bash
git checkout -b your-branch-name
```

#### 4. Make Your Changes:

Ensure that you:

- Apply the logic for Hindi translation.
- Compress images before uploading.

#### 5. Commit Your Changes:

```bash
git add .
git commit -m "Describe your changes"
```

#### 6. Push to the Branch:

```bash
git push origin your-branch-name
```

#### 7. Create a Pull Request:

Go to the original repository and click on "New Pull Request."

## Keeping Your Fork Updated

Before making a pull request, ensure that your forked repository is up to date.

#### Add Remote Upstream Repository:

```bash
git remote add upstream https://github.com/NishantRana07/HrRoadways.git
```

#### Fetch Upstream Changes:

```bash
git fetch upstream
```

#### Merge Upstream Changes:

```bash
git checkout main
git merge upstream/main
```

#### Push Changes to Your Fork:

```bash
git push origin main
```

By following these steps, you ensure that your pull request is based on the latest code.

## Translation Documentation

### Overview

The HrRoadways project supports bilingual functionality, allowing users to switch between English and Hindi. This is achieved through a translation logic that provides translated text for various components.

### Translation Logic Implementation

#### Translation Data Structure:

The translation data is organized in a structured format within the components. Each language has its own set of translations for different text elements.

#### State Management:

A state variable (`isHindi`) is used to toggle between English and Hindi translations.

#### Language Toggle Function:

A function (`handleToggleLanguage`) is provided to switch between languages.

### Adding Translations

#### Define Translations:

Add the translations for both English and Hindi in the respective component.

#### Use the Translation:

Use the translation logic to display the translated text based on the current language state.

#### Example: Adding Translations to a New Component

##### Define Translations:

```javascript
const translations = {
  en: {
    heading: "Your English Heading",
    description: "Your English Description",
  },
  hi: {
    heading: "आपका हिंदी शीर्षक",
    description: "आपका हिंदी विवरण",
  },
};
```

##### Use the Translation:

```javascript
const currentLanguage = isHindi ? translations.hi : translations.en;

return (
  <div>
    <h1>{currentLanguage.heading}</h1>
    <p>{currentLanguage.description}</p>
  </div>
);
```

### Example: Existing Components

#### App.jsx

The `App.jsx` file manages the routing and includes the language toggle functionality.

##### State Management and Toggle Function:

```javascript
const [isHindi, setIsHindi] = useState(false);

const handleToggleLanguage = () => setIsHindi(!isHindi);

return (
  <Router>
    <Navigation isHindi={isHindi} onToggleLanguage={handleToggleLanguage} />
    <Routes>
      <Route path="/" element={<Hero isHindi={isHindi} />} />
      {/* Other routes */}
    </Routes>
    <Footer isHindi={isHindi} />
  </Router>
);
```

##### Passing Translation State:

The `isHindi` state is passed to components that require translations, such as `Hero` and `Footer`.

#### Hero.jsx

The `Hero` component uses the translation logic to display content in the selected language.

##### Define Translations:

```javascript
const translations = {
  en: {
    heading: "Haryana Roadways - Your Own Bus Service",
    subheading: "Your Journey, Our Pride | आपकी यात्रा, हमारा गौरव",
    departure: "From",
    arrival: "To",
    button: "Search Buses",
    popular: "Popular Routes",
    allBuses: "All Buses",
    volvo: "Volvo AC",
    superExpress: "Super Express",
    ordinary: "Ordinary",
    searchPlaceholder: "Search bus stands...",
  },
  hi: {
    heading: "हरियाणा रोडवेज - आपकी अपनी बस सेवा",
    subheading: "आपकी यात्रा, हमारा गौरव",
    departure: "कहाँ से",
    arrival: "कहाँ तक",
    button: "बसें खोजें",
    popular: "लोकप्रिय मार्ग",
    allBuses: "सभी बसें",
    volvo: "वोल्वो एसी",
    superExpress: "सुपर एक्सप्रेस",
    ordinary: "साधारण",
    searchPlaceholder: "बस स्टैंड खोजें...",
  },
};
```

##### Use Translations:

```javascript
const currentLanguage = isHindi ? translations.hi : translations.en;

return (
  <div>
    <h1>{currentLanguage.heading}</h1>
    <p>{currentLanguage.subheading}</p>
    {/* Other translated elements */}
  </div>
);
```

### Best Practices

#### Apply Translation Logic:

Ensure that all new content and pages implement the translation logic.

#### Compress Images:

Use PNG or JPG files for images and always compress them to minimize size.

#### Update Forked Repo:

Before submitting a pull request, always ensure that your forked repository is up to date.

### Summary

By following this documentation, developers can effectively add and manage translations in the HrRoadways project. This ensures a consistent bilingual experience for users.

If you have any questions or need further assistance, feel free to reach out to the project maintainers.
