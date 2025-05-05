# Wood Products - Online Store

## Introduction

This project is a full-stack web application for an online wood products store. It allows users to browse, search, and filter various wood-based products, while admins can manage inventory and product listings through a REST API.

## Problem Statement

Small and medium-sized wood product businesses often lack a digital presence, relying on manual processes and in-person sales that limit their customer reach and operational efficiency. Without an online platform, inventory management becomes error-prone, and potential buyers have no convenient way to browse or purchase products. This project addresses the need for a centralized, accessible, and modern e-commerce solution tailored to wood products, enabling sellers to manage offerings digitally and customers to shop online easily. By solving this, we help businesses expand their market and improve efficiency.

## Objectives
* Create an online storefront for wood-based products
* Provide a clean, responsive user interface for customers
* Enable admins to manage products through a secure backend API
* Support search and filtering for efficient product discovery

## Technology Stack

**Frontend:** ReactJS, Tailwind CSS

**Backend:** Django, Django REST Framework

**Database:** SQLite (development)

**Others:** Python, JavaScript

## Installation Instructions

###  Backend (Django)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/yourrepository.git

# 2. Navigate into the backend directory
cd ProjectBack

# 3. Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 4. Install dependencies
pip install -r requirements.txt

# 5. Run migrations
python manage.py migrate

# 6. Start the Django development server
python manage.py runserver
```

###  Frontend (React + Tailwind)

```bash
# 1. Navigate to the frontend directory
cd woodProducts-main

# 2. Install dependencies
npm install

# 3. Start the frontend application
npm start
```

> **Environment variables:** If applicable, add `.env` files for both frontend and backend with proper API endpoints and secrets.

## Usage Guide

* Visit `http://localhost:3000` to use the customer interface
* Backend API runs on `http://localhost:8000`
* Sample endpoints (if you need more, I can add detailed API docs):

  * `GET /products/` — list products
  * `POST /products/` — create product (admin only)
  * `GET /categories/` — list product categories

---

##  Testing

###  Backend (Django)

The backend uses Django’s built-in testing framework to ensure the integrity of models, database migrations, and future API functionality.

To run tests:

```bash
python manage.py test
```

Currently, the project includes basic tests. In the future, additional unit and integration tests can be added using `unittest` and `rest_framework.test.APITestCase` to validate views, serializers, and business logic.

###  Frontend (React)

The frontend supports testing through **Jest**, the default test runner included with Create React App.

To run tests:

```bash
npm test
```

Tests can be written using **React Testing Library** to verify component rendering, user interactions, and API responses. Expanding test coverage will ensure a more robust and reliable user interface.

---

## Known Issues / Limitations

* No authentication system implemented yet
* Admin panel is accessible only via Django admin
* SQLite used for dev; not recommended for production

## References

* [Django REST Framework](https://www.django-rest-framework.org/)
* [Tailwind CSS Documentation](https://tailwindcss.com/docs)
* [React Documentation](https://reactjs.org/)

## Team Members

* Askan Nursultan, 220103343, 20-P

* Taipov Assanali, 220103162, 20-P

* Seisenbay Bekassyl, 220103186, 20-P

* Daniyal Onggar, 220103318, 20-P

* Alisher Alexandr, 220103086, 20-P

---

