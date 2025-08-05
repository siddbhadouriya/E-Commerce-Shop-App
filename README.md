🛍️ E-Commerce Shop App
A simple e-commerce website built with Node.js, Express.js, MongoDB, and EJS. Users can browse products, add them to the cart, and view a dynamic cart page with price breakdown.


📂 Features
Product listing page (/shop)

Add products to cart (/addtocart/:id)

Cart page with detailed billing (/cart)

Flash messages for success actions

File upload (product images) using Multer

Dynamic styles (background, panel, text colors per product)



📦 Installation
Clone this repo

bash
Copy
Edit[
(https://github.com/siddbhadouriya/E-Commerce-Shop-App/tree/main)
Install dependencies

bash
Copy
Edit
npm install
Create .env file

env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret
Run locally

bash
Copy
Edit
node app.js
# or use nodemon
nodemon app.js
🚀 Deployment Guide
Deploy Backend (Node.js) on Railway
Push code to GitHub (see instructions above)

Connect GitHub repo to Railway

Add environment variables (MONGODB_URI, etc.)

Railway auto deploys; copy your app URL.

🖼️ Project Structure
markdown
Copy
Edit
/routes
  - index.js
  - ownersRouter.js
  - productsRouter.js
  - usersRouter.js

/views
  - cart.ejs
  - shop.ejs
  - admin.ejs
  - partials/header.ejs
  - partials/footer.ejs

/models
  - user-model.js
  - product-model.js

/config
  - multer-config.js

app.js
