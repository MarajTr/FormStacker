-- Create the database (if not exists)
CREATE DATABASE itransition;
\c itransition;

-- Create the table
CREATE TABLE authentication (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'blocked', 'inactive')),
  last_login TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_blocked BOOLEAN DEFAULT FALSE
);

-- Insert data
INSERT INTO authentication (id, username, email, password, status, last_login, created_at, is_blocked) VALUES
(129, 'test', 'marajtalukder200@gmail.com', '$2b$10$JrYSNoqa0n0Lu3BXQ4vRu.9h0wqtxAT4Q7wVnrYMdaG2iqNaS2yjC', 'active', '2025-03-27 07:21:32', '2025-03-27 01:21:26', FALSE),
(130, 'Maraj', 'marajtalukder2000@gmail.com', '$2b$10$F9E6bHzyEpH44MMXomoSnOUL4hriBquRYoi2Vw7KvIYyrCwlBKd6a', 'active', '2025-03-27 07:28:22', '2025-03-27 01:28:18', FALSE);

-- Create the trigger function
CREATE OR REPLACE FUNCTION update_status_on_block()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_blocked THEN
    NEW.status := 'inactive';
  ELSE
    NEW.status := 'active';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER update_status_on_block
BEFORE UPDATE ON authentication
FOR EACH ROW
EXECUTE FUNCTION update_status_on_block();
