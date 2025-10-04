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

</div>

[![OSCI-Project-Banner.png](https://i.postimg.cc/76mJvBmF/OSCI-Project-Banner.png)](https://postimg.cc/8JfzMb84)


## Our Events - 
<a href="https://www.elitecoders.xyz/events/1756104358418"><img src="https://github.com/user-attachments/assets/2e87bdb6-aa0d-42e6-a40c-fd00125d64c2"/></a>

## 📢 Weekly Shoutouts 🎉
| Profile | Name | Profile | Name | Profile | Name | Profile | Name |
|---------|------|---------|------|---------|------|---------|------|
| <a href="https://github.com/Keshav1605"><img src="https://github.com/Keshav1605.png" width="80" /></a> | [**Keshav1605**](https://github.com/Keshav1605) | <a href="https://github.com/Renu-code123"><img src="https://github.com/Renu-code123.png" width="80" /></a> | [**Soumyosish**](https://github.com/Renu-code123) | <a href="https://github.com/anushkasark08"><img src="https://github.com/anushkasark08.png" width="80" /></a> | [**anjaliitgit**](https://github.com/anushkasark08) | <a href="https://github.com/Aripilli-Bhavana"><img src="https://github.com/Aripilli-Bhavana.png" width="80" /></a> | [**Aripilli-Bhavana**](https://github.com/Aripilli-Bhavana) |








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

---


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

3. Run the development server to access the site locally:

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

````markdown
<h1 align="center">Contributing & Translation Guidelines</h1>
<h4 align="center">
  Guidelines for contributing to the repository, ensuring Hindi translations, and keeping the codebase updated.
</h4>

## Contributing

If you are adding content to the site or creating new pages, please:

- Apply logic for Hindi translation and add translations for all words.
- Use PNG or JPG files for minimal size and always compress images.
- Ensure that your forked repository is up to date before submitting a pull request.

### Steps for Contributing

#### 1. Fork the Repository:
Click on the **Fork** button at the top right of the repository page.

#### 2. Clone the Forked Repository:
```bash
git clone https://github.com/your-username/HrRoadways.git
````

#### 3. Create a New Branch:

```bash
git checkout -b your-branch-name
```

#### 4. Make Your Changes:

* Apply the Hindi translation logic.
* Compress images before uploading.

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

Go to the original repository and click **New Pull Request**.

---

## Keeping Your Fork Updated

Before making a pull request, ensure that your forked repository is up to date.

#### Add Remote Upstream:

```bash
git remote add upstream https://github.com/NishantRana07/HrRoadways.git
```

#### Fetch Upstream Changes:

```bash
git fetch upstream
```

#### Merge Changes into Main:

```bash
git checkout main
git merge upstream/main
```

#### Push Changes to Your Fork:

```bash
git push origin main
```

By following these steps, your pull request will be based on the latest code.

---

## Translation Documentation

### Overview

The HrRoadways project supports bilingual functionality (English & Hindi). This is achieved through translation logic built into components.

### Implementation

#### Translation Data Structure:

Each component maintains translations for both languages:

```javascript
const translations = {
  en: { heading: "Your English Heading" },
  hi: { heading: "आपका हिंदी शीर्षक" },
};
```

#### State Management:

A state variable (`isHindi`) toggles between languages.

```javascript
const [isHindi, setIsHindi] = useState(false);
const currentLanguage = isHindi ? translations.hi : translations.en;
```

#### Toggle Function:

```javascript
const handleToggleLanguage = () => setIsHindi(!isHindi);
```

---

### Adding Translations to New Components

1. **Define Translations:**

   ```javascript
   const translations = {
     en: { description: "Your English Description" },
     hi: { description: "आपका हिंदी विवरण" },
   };
   ```

2. **Use the Translations:**

   ```javascript
   <p>{currentLanguage.description}</p>
   ```

---

### Example: Hero.jsx

```javascript
const translations = {
  en: {
    heading: "Haryana Roadways - Your Own Bus Service",
    button: "Search Buses",
  },
  hi: {
    heading: "हरियाणा रोडवेज - आपकी अपनी बस सेवा",
    button: "बसें खोजें",
  },
};

const currentLanguage = isHindi ? translations.hi : translations.en;

return (
  <div>
    <h1>{currentLanguage.heading}</h1>
    <button>{currentLanguage.button}</button>
  </div>
);
```

---

## Best Practices

* **Always apply translation logic** for new content/pages.
* **Use PNG/JPG** files and compress images before uploading.
* **Keep your fork updated** before submitting PRs.

---


<div align="center">

[🔼 Back to Top](#-hrroadways)

</div>
