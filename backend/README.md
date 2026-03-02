# Orphanage Care System Backend

## Setup

1. Install dependencies:
   npm install express mongoose

2. Create a `.env` file for environment variables (optional):
   - `PORT=5000`
   - `MONGO_URI=mongodb://localhost:27017/orphanage-care-system`

3. Start the server:
   npm start

## Project Structure
- `models.js`: Mongoose schemas and models
- `app.js`: Express app setup
- `server.js`: Entry point, connects to MongoDB and starts server

## Schemas Included
- Child
- Staff
- MealPlan
- AdoptionRecord
- VisitorLog
- Inventory
- Attendance

## Extend
Add more routes and controllers as needed for full CRUD operations.
