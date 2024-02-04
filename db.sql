DROP TABLE IF EXISTS users ;
DROP TABLE IF EXISTS tasks ;

-- Table to store user information
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Table to store tasks
CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description TEXT NOT NULL,    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
