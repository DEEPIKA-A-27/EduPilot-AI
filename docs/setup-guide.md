# Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MySQL Server
- Git

## Installation

1. Clone the repository:
   ```
   git clone <repo-url>
   cd edupilot-ai
   ```

2. Install root dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Create a MySQL database named `edupilot`
   - Run the schema script:
     ```
     mysql -u root -p < database/schema.sql
     ```

4. Set up the backend:
   ```
   cd backend
   npm install
   cd ..
   ```

5. Set up the frontend:
   ```
   cd frontend
   npm install
   cd ..
   ```

6. Set up AI services:
   ```
   cd ai-services
   pip install -r requirements.txt
   cd ..
   ```

7. Configure environment variables:
   - Copy `.env` and update the values

## Running the Application

1. Start the backend:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```
   cd frontend
   npm start
   ```

3. The app will be available at `http://localhost:3000`

## Troubleshooting

- Ensure MySQL is running
- Check that all dependencies are installed
- Verify environment variables are set correctly