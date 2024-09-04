# Food Order App - Challenge

## Goal

The goal of this app is allowing users to see the products in stock, add them to their cart, and then checking out their order.

## Requisites

- Display the Products
    - Allow users to add products to the cart
- Display the cart (modal) if desired
- Display the checkout form (modal) if desired

## Technical Details

- Fetch the dummy data from the backend (GET /meals)
- The cart data and user data need to be sent to the backend (POST /orders) for proper validation
- Any error regarding the submission should also be validated
- Loading states should also be considered (getting the meals, pushing the order)
