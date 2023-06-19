# foodstock-frontend

Foodstock is a web application that allows you to manage your food stock. It is composed of a frontend and a backend. This is the frontend part.

## Architecture
- A stock page that allows you to see all your food
- A list page that allows you to see all your lists
- a social page that allows you to give or get food for free with links to NGOs
- a profile page that allows you to see your profile and your settings

The frontend and backend are separated in two different repositories. The backend is available [here](https://github.com/food-stock/foodstock-frontend).

 I wanted them to be separated because I wanted to be able to change the frontend without changing the backend and vice versa.

 I chose to build a PWA and not a mobile app because I didn't wanted to be constrained by the app stores mainly.

## Features
- [x] Basic pages
- [ ] Add a convenient way to pick a date (might use [thisone](https://nehakadam.github.io/DateTimePicker/))
- [ ] A solid authentication system using FastAPI
- [ ] Diverse means of authentication (Google, Facebook, Apple, etc.)
- [ ] OCR to enter food including barcode and date of validity
- [ ] Integrating proximity to find people who want to give food and NGOs distance from the user
- [ ] Push notifications to warn the user of the expiration of a food
- [ ] Connexions with local supermarkets to get food details and date of validity directly from a single qr code
- [ ] Responsivness for desktop
- [ ] Add i18n support for translations

## Getting food details using OpenFoodFacts API

> From [barcode](https://openfoodfacts.github.io/api-documentation/#jump-2READrequests-Getnutritionfactsforaspecificbarcode)