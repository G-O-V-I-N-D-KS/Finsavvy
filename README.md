# 💰 FinSavvy – Finance Management Platform

**FinSavvy** is a full-stack personal finance management platform designed to help users track transactions, manage installments, receive timely reminders, and gain deep insights into their financial health.

Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and integrated with the **Plaid API** to fetch banking data.

---

## 🚀 Features

### 🔐 Authentication
- Secure user authentication using **JWT tokens**
- Signup, login, logout, and token blacklisting for session management

### 🏦 Banking & Transactions
- Seamless integration with **Plaid API** to link user bank accounts
- Fetch and categorize real-time transaction data
- Store and retrieve transactions from MongoDB

### 📊 Financial Analytics
- Interactive data visualization (bar/line charts, pie graphs)
- Month-over-month comparison and insights
- Filtering and categorizing transactions

### 📅 Installment Planner
- Add daily/weekly/monthly installment reminders
- **Automated email notifications** using NodeMailer or similar service

### 🌐 Tech Stack
| Tech              | Usage                           |
|-------------------|----------------------------------|
| React.js          | Frontend UI                     |
| Node.js + Express | RESTful backend API             |
| MongoDB           | NoSQL database                  |
| JWT               | User Authentication             |
| Plaid API         | Bank account & transaction data |
| Email Service     | Email reminders for installments|
| Chart.js/Recharts | Data visualization              |

---

## 🛠️ Setup Instructions

### 🔧 Backend (Express.js)
```bash
cd backend
npm install
# Add .env with:
# PLAID_CLIENT_ID, PLAID_SECRET, MONGO_URI, JWT_SECRET, EMAIL_SERVICE configs
npm start
