🍸 React Native Cocktail Explorer

A modern React Native mobile app for exploring, searching, and saving cocktail recipes. Powered by [TheCocktailDB API](https://www.thecocktaildb.com/), this app offers users a smooth and interactive way to discover drinks, view details, and manage their favorites.

## ✨ Features

- 🔍 **Search Cocktails** – Type and get instant suggestions with debounced search.
- 📃 **Drink Details** – View full instructions, ingredients, and measurements.
- ❤️ **Save Favorites** – Add drinks to your local favorites list.
- 🗑️ **Remove Favorites** – Manage your list by removing individual drinks.
- 🔄 **Random Drink** – Get a completely random cocktail with one tap.
- 💾 **Local Storage** – All favorites are saved persistently using async storage.
- 🎨 **Consistent Styling** – Reusable global styles for a cohesive UI.
- 📱 **Cross-Platform UI** – Built with `expo`, works on both iOS and Android.

---

## 🧭 Navigation Structure

Implemented using `@react-navigation`:

- `Search` – Home screen with drink search and access to drink details
  ![Search](Assets/SSsearch.jpg)
- `Favorites` – View and manage saved drinks
- `Random` – Discover a new random drink every time
- All navigated via a **Bottom Tab Navigator**

---

## 🛠️ Technologies Used

- **React Native + Expo**
- **React Navigation**
- **AsyncStorage** – Persistent storage for favorites
- **Lodash.debounce** – Optimized search input
- **Ionicons** – For interactive icons like the heart button

---

## 📸 Screenshots

_Coming soon_

