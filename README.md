# foodstock-frontend

Foodstock is a web application that allows you to manage your food stock. It is composed of a frontend and a backend. This is the frontend part.

## Screenshots (not the best looking but functional)

Updates are coming soon
<!--
<img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/stockpage.png" alt="Main Stock Page" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/categorypage.png" alt="Category Page" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/productpage.png" alt="Product Page" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/adjustquantity.png" alt="Adjust Quantities" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/nomore.png" alt="Mark the Product as Out of Stock" width="250px" height="auto">
-->


## Architecture
- A stock page that allows you to see all your food
- ~~A list page that allows you to see all your lists~~
- ~~a social page that allows you to give or get food for free with links to NGOs~~
- a profile page that allows you to see your profile and your settings

The frontend and backend are separated in two different repositories. The backend is available [here](https://github.com/food-stock/foodstock-frontend).

 I wanted them to be separated because I wanted to be able to change the frontend without changing the backend and vice versa.

 I chose to build a PWA and not a mobile app because I didn't wanted to be constrained by the app stores mainly.

## Features
- [x] Basic pages
- [ ] Add a convenient way to pick a date for mobile (might use [this one](https://nehakadam.github.io/DateTimePicker/))
- [ ] A solid authentication system 
- [ ] Diverse means of authentication (Google, Facebook, Apple, etc.)
- [ ] OCR to enter food by reading barcode and date of validity on the product
- [ ] Integrating proximity to find people who want to give food and NGOs distance from the user
- [ ] Push notifications to warn the user of the expiration of a food : right now, I am able to get user endpoints to send notifications but I have troubles sending them in the Django backend
- [ ] Connexions with local supermarkets to get food details and date of validity directly from a single qr code
- [ ] Responsivness for desktop
- [x] Add i18n support for translations (translations are now missing)

## Getting food details using OpenFoodFacts API

From [barcode](https://openfoodfacts.github.io/api-documentation/#jump-2READrequests-Getnutritionfactsforaspecificbarcode)
