# Full Stack Transaction Manager

## Overview

This is a full-stack transaction manager project built with React, Vite, Node, Express, and MongoDB. The application allows users to manage people, accounts, and financial transactions efficiently.

## Features

- **People Management**: Add and edit information about individuals involved in financial transactions.
- **Account Management**: Create and manage accounts associated with individuals.
- **Transaction Tracking**: Record and monitor financial transactions for each account.

## Tech Stack

- **Frontend**:
  - React: A JavaScript library for building user interfaces.
  - Vite: A fast build tool that enhances the development experience.
  
- **Backend**:
  - Node.js: A JavaScript runtime for building server-side applications.
  - Express: A minimal and flexible Node.js web application framework.
  
- **Database**:
  - MongoDB: A NoSQL database for storing and retrieving transaction data efficiently.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ruandqm/transaction-manager.git
   cd transaction-manager
   ```

2. Install dependencies:

   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Create database:

   Create a new database in mongodb named "transaction-manager". If you don't already have mongodb configured, go to https://www.mongodb.com/try/download/community to install.

4. Start the application:

   ```bash
   # Start the frontend (in the frontend directory)
   npm run dev

   # Start the backend (in the backend directory)
   npm run dev
   ```

5. Access the application at `http://localhost:5173` in your browser.

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the [MIT License](LICENSE).