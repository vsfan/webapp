const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Mortgage calculation endpoint
app.post('/api/calculate', (req, res) => {
  const { amount, years, rate } = req.body;
  if (!amount || !years || rate === undefined || rate === null) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const principal = parseFloat(amount);
  const interestRate = parseFloat(rate); // Accepts decimals like 2.625
  if (isNaN(principal) || isNaN(interestRate)) {
    return res.status(400).json({ error: 'Invalid input.' });
  }
  const monthlyRate = interestRate / 100 / 12;
  const n = parseInt(years) * 12;
  const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

  // Amortization schedule
  let balance = principal;
  const schedule = [];
  for (let i = 1; i <= n; i++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthly - interestPayment;
    schedule.push({
      month: i,
      principal: principalPayment > 0 ? principalPayment : 0,
      interest: interestPayment > 0 ? interestPayment : 0,
      balance: balance - principalPayment > 0 ? balance - principalPayment : 0
    });
    balance -= principalPayment;
    if (balance < 0) balance = 0;
  }
  res.json({
    monthly: monthly ? monthly.toFixed(2) : '0.00',
    schedule: schedule.map(row => ({
      month: row.month,
      principal: row.principal.toFixed(2),
      interest: row.interest.toFixed(2),
      balance: row.balance.toFixed(2)
    }))
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
