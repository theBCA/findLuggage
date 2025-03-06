-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create luggage_reports table
CREATE TABLE luggage_reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    airport_location VARCHAR(255) NOT NULL,
    date_lost DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create luggage_details table
CREATE TABLE luggage_details (
    id SERIAL PRIMARY KEY,
    report_id INTEGER REFERENCES luggage_reports(id),
    brand VARCHAR(100),
    color VARCHAR(50),
    size VARCHAR(50),
    weight DECIMAL(5,2),
    distinctive_features TEXT,
    contents_description TEXT,
    image_urls TEXT[]
);

-- Create airports table
CREATE TABLE airports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    city VARCHAR(100),
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
); 