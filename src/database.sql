CREATE DATABASE chatbot;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE chats(
    chat_id UUID  PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT  NOT NULL,
    role  VARCHAR(12) NOT NULL CHECK (role IN ('ADMIN', 'USER')), -- Enum-like behavior  
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
