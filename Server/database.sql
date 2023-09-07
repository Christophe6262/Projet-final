CREATE DATABASE parking_api;
\c parking_api

CREATE TYPE user_role AS ENUM ('admin','user');

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY, 
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  CHECK (char_length(first_name)>=3 and char_length(first_name)<=50),
  CHECK (char_length(last_name)>=3 and char_length(last_name)<=50),
  phone INT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  Check (char_length(password)>=6),
  role user_role NOT NULL DEFAULT 'user'
);

CREATE TABLE parking(
  article_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  picture VARCHAR(255),
  price INT NOT NULL,
  city VARCHAR(255) NOT NULL,
  street VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  available_date date,
user_id INT REFERENCES users(user_id),
created_at timestamp with time zone not null default now()
);
