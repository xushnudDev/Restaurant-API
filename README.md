# 🍽️ Backend API for a Restaurant

# 🎯 Project Purpose:
- The goal of this project is to build a backend API that allows users to view menus and place orders for food in a restaurant.

# ✅ Functional Requirements:
- All food items must belong to a category (e.g., pasta, sushi, desserts, etc.).
- Each food item must be associated with one specific category.
- A food item should include an image, name, price, and description.
- Categories and food items should be viewable without registration.
- Users can register using their email and name.
- Users can log in using email.
- Users can add food items to a cart.
- Users can place orders with multiple food items.
- Users should be able to view their order history in their profile.
- Users should be able to update their profile information.

# 🚀 Non-functional Requirements:
- High performance
- Strong security
- Must be scalable for future extensions

# 🗂️ Database Models:

1. Category:

    - id

    - name

    - createdAt

    - updatedAt

2. Food:

    - id

    - name

    - price

    - description

    - imageUrl

    - categoryId (foreign key)

    - createdAt

    - updatedAt

3. User:

    - id

    - name

    - email

    - phoneNumber

    - password

    - role
    
    - createdAt

    - updatedAt

4. Order 🛒:

    - id

    - createdAt

    - total_price

    - userId (foreign key)

5. OrderItem:

    - count

    - orderId (foreign key)

    - foodId (foreign key)

