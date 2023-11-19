# foodstock-frontend

Foodstock is a web application that allows you to manage your food stock. It is composed of a frontend and a backend. This is the frontend part.

## Screenshots (not the best looking but functional)

Updates are coming soon
<!--
<img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/stockpage.png" alt="Main Stock Page" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/categorypage.png" alt="Category Page" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/productpage.png" alt="Product Page" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/adjustquantity.png" alt="Adjust Quantities" width="250px" height="auto"><img src="https://raw.githubusercontent.com/food-stock/foodstock-frontend/master/screenshots/nomore.png" alt="Mark the Product as Out of Stock" width="250px" height="auto">
-->


## Architecture
- [x] A stock page that allows you to see all your food
- [x] A profile page that allows you to see your profile and your settings
- [ ] A social page that allows you to give or get food for free with links to NGOs

The frontend and backend are separated in two different repositories. The backend is available [here](https://github.com/food-stock/foodstock-backend-django).

 I wanted them to be separated because I wanted to be able to change the frontend without changing the backend and vice versa.

 I chose to build a PWA and not a mobile app because I didn't wanted to be constrained by the app stores mainly.

## Features
- [x] Basic pages
- [x] Add i18n support for translations (diy version, because [svelte-i18n](https://github.com/kaisermann/svelte-i18n) is hardly usable)
- [x] Scanning barcodes to add food to the stock. If the product barcode is not registered, it uses OpenFoodFact API (an online collaborative database that collects and shares information about food products) to get product details 
- [ ] Push notifications to warn the user of the expiration of a food : right now, I am able to get suscribe and unsuscribe of notifications. Just need to set cron job to check for product expiration
- [x] A solid authentication system , it needs now to check response to maybe refresh the token using the implemented Django endpoint.
- [ ] OCR to enter food by reading barcode and date of validity on the product
- [ ] Integrating proximity to find nearest NGOs or people to give food to including distance between the user and them
- [ ] Responsivness for desktop -- in work
- [ ] Add a convenient way to pick a date for mobile (might use [this one](https://nehakadam.github.io/DateTimePicker/))
- [ ] Connexions with local supermarkets to get food details and date of validity directly from a single qr code

