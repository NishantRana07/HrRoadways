# 🚍 Bus Routes Contribution Guide

Welcome, and thank you for wanting to contribute new bus routes! This guide walks you through the JSON format, file location, naming conventions, and a contribution checklist to make sure your PR is smooth.

---

## 📂 File Location

All bus-route data lives in:

```

public/Places/HARYANA.json

````

> **Note:** Do _not_ create new files—always add new entries to `HARYANA.json` in the array.

---

## 🔧 JSON Structure

Your new route must be an object with exactly these fields, added inside the top‑level array. Here’s the template:

```json
{
  "from": "START_CITY",
  "to": "END_CITY",
  "Departure_Time": "HH:MM AM/PM",
  "Bus_Route": "START_CITY to END_CITY",
  "Total_Distance": "NNN KM",
  "Price": "₹XXX/-",
  "Bus_Type": "Operator Name",
  "Via": "Stop1, Stop2, Stop3",
  "Contact": "Phone number or use "" if not available"
}
````

---

### 📝 Field Definitions

| Field            | Required? | Description                                         |
| ---------------- | :-------: | --------------------------------------------------- |
| `from`           |    Yes    | Starting city name.                                 |
| `to`             |    Yes    | Destination city name.                              |
| `Departure_Time` |    Yes    | Departure time (12‑hour clock, with AM/PM).         |
| `Bus_Route`      |    Yes    | Display name for the route (“Abohar to Hisar”).     |
| `Total_Distance` |    Yes    | Journey length (e.g. “208 KM”).                     |
| `Price`          |    Yes    | Ticket price (use `₹` and add `/-` or just `₹199`). |
| `Bus_Type`       |    Yes    | Operator (e.g. “Haryana Roadways”, “Volvo”).        |
| `Via`            |    Yes    | Comma‑separated list of major stops en route.       |
| `Contact`        |     No    | Contact number, use `""` if not available.                   |

---

## 📖 Example Entry

Below is how an entry looks in `HARYANA.json`. Make sure it’s comma‑separated from the previous entry:

```json
[
  {
    "from": "Abohar",
    "to": "Hisar",
    "Departure_Time": "5:40 AM",
    "Bus_Route": "Fazilka to Hisar",
    "Total_Distance": "208 KM",
    "Price": "₹199",
    "Bus_Type": "Haryana Roadways",
    "Via": "Dabwali, Sirsa, Fatehabad, Agroha",
    "Contact": ""
  },
  {
    "from": "Agra",
    "to": "Bhiwani",
    "Departure_Time": "5:40 AM",
    "Bus_Route": "Agra to Bhiwani",
    "Total_Distance": "316 KM",
    "Price": "₹400/-",
    "Bus_Type": "Haryana Roadways",
    "Via": "Mathura, Kosi, Hodal, Palwal, Sohna, Gurugram, Jhajjar",
    "Contact": ""
  }
]
```

> 💡 **Tip:** Add your new entry after the last one, and remember to include a comma between entries if needed.

---

## ✅ Contribution Checklist

* [ ] **Add** your new route object to the existing array in `public/Places/HARYANA.json`
* [ ] **Validate** JSON syntax (commas, quotes) using a linter or in VS Code
* [ ] **Spell-check** all city names, times, and operator fields
* [ ] **Preview** changes locally using a JSON viewer
* [ ] **PR Title:** `Add route: <START_CITY> → <END_CITY>`

---

### ❓ Need Help?

If you run into trouble, please open an issue or ask in the Discussions tab under the “Routes” topic.
Thanks for contributing! 🚀
