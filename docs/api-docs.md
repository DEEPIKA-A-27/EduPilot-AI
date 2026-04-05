# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All requests except login/register require `Authorization: Bearer <token>` header.

### POST /auth/register
Register a new user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password",
  "name": "User Name"
}
```

### POST /auth/login
Login user.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response:**
```json
{
  "token": "jwt_token"
}
```

## Notes

### GET /notes
Get all notes for the user.

### POST /notes
Create a new note.

**Body:**
```json
{
  "title": "Note Title",
  "content": "Note content"
}
```

### PUT /notes/:id
Update a note.

### DELETE /notes/:id
Delete a note.

## Study Planner

### GET /planner
Get all planner entries.

### POST /planner
Create a new entry.

**Body:**
```json
{
  "subject": "Math",
  "date": "2023-10-01",
  "time": "10:00",
  "description": "Study algebra"
}
```

## Career

### GET /career
Get career data.

### POST /career
Update career interests/skills.

**Body:**
```json
{
  "interests": "Technology, Science",
  "skills": "Programming, Math"
}
```

## Assistant

### POST /assistant/chat
Chat with AI assistant.

**Body:**
```json
{
  "message": "Help with math problem"
}
```