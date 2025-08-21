# Mortgage Calculator Web App

This is a simple Node.js single page web application that allows users to input a mortgage loan amount, loan term (years), and interest rate, then calculates and displays the monthly payment.

## Features
- Input loan amount, term (years), and interest rate
- Calculate monthly mortgage payment
- Simple HTML/CSS/JavaScript frontend
- Node.js + Express backend

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
3. Open your browser and go to `http://localhost:3000`

## Calculation Formula
Monthly Payment = P * r * (1 + r)^n / ((1 + r)^n - 1)
- P = loan amount
- r = monthly interest rate (annual rate / 12 / 100)
- n = total number of payments (years * 12)
