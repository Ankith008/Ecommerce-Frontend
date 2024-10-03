# E-commerce Website Documentation

Website link - [https://ecommerce-frontend-ten-beryl.vercel.app/](https://ecommerce-frontend-ten-beryl.vercel.app/).

# Project Overview

This project is an E-commerce website built to provide a seamless online shopping experience for users, as well as a comprehensive platform for companies to manage their products and stores. The platform allows users to search for products, purchase them, and track their delivery status. Companies can sign up, create stores, list products for sale, manage orders, and handle deliveries.

# Features

# User Features:

1. Signup/Login: Users can register and log in to access the platform.
2. Product Search: Users can search for products by name or category.
3. Product Purchase: Users can purchase products or add them to their cart.
4. Order Tracking: Users can view the delivery status of their orders.

# Company Features:

1. Signup/Login: Companies can create accounts and log in to manage their business.
2. Store Creation: Companies can create stores to sell their products.
3. Store Management: Companies can manage the store profile, view store products, and update details.
4. Order Management: Companies are responsible for processing and delivering products, and they can update delivery statuses.
5. Product Management: Companies can add, update, or remove products from their stores.

# Technology Stack

# Frontend

1. React.js: The frontend is built using React.js to provide an interactive and dynamic user 
   interface.
2. TailwindCSS: For designing responsive and consistent user interfaces.
3. JWT (JSON Web Token): JWT rotation is implemented for secure user authentication, ensuring 
   that user sessions are protected against token theft.

# Backend

1. Node.js: A JavaScript runtime environment that allows running server-side code.
2. Express.js: A web application framework for Node.js used to build RESTful APIs for handling requests from the frontend.
3. JWT Rotation: Used to ensure secure user sessions by periodically rotating tokens, protecting against potential session hijacking.

# Database

MongoDB: A NoSQL database used to store user, company, product, and order information. The flexibility of MongoDB makes it ideal for handling various data types in the application.

# User Flow

1. User Login/Signup: The user selects "User Signup" or "User Login" from the options. After successful login/signup, they are redirected to their home page.
2. Product Browsing: Users can search for products and view details.
3. Purchasing: Users can buy products or add them to their cart.
4. Order Tracking: After purchase, users can track the delivery status of their orders.

# Company Flow

1. Company Login/Signup: The company selects "Company Signup" or "Company Login." After logging in, they are redirected to their dashboard.
2. Store Creation: Companies can create stores under their profile to list products.
3. Store Management: Companies manage their stores and products.
4. Order Management: Companies update the delivery status of orders, which is visible to users.

# Security Features

1. JWT Token Rotation: JWT tokens are used for session management, with regular rotation to ensure security.
2. Password Hashing: User and company passwords are secured using bcrypt hashing.

This website provides an efficient and secure platform for both users and companies, ensuring smooth shopping and store management experiences.
