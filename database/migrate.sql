-- Disable foreign key checks temporarily
SET FOREIGN_KEY_CHECKS = 0;

-- Drop existing tables
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS planners;
DROP TABLE IF EXISTS careers;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;

-- Create new users table with all fields
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password VARCHAR(255) NOT NULL,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  mobileNumber VARCHAR(20),
  dateOfBirth DATE,
  gender VARCHAR(50),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  idProofType VARCHAR(50),
  idProofNumber VARCHAR(100),
  educationDetails TEXT,
  resume VARCHAR(255),
  profilePicture VARCHAR(255),
  preferences JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indices
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);

-- Recreate notes table
CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Recreate planners table
CREATE TABLE IF NOT EXISTS planners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(255),
  date DATE,
  time TIME,
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Recreate careers table
CREATE TABLE IF NOT EXISTS careers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  interests TEXT,
  skills TEXT,
  predicted_career VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
