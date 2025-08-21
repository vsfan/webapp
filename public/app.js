document.getElementById('mortgage-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const amount = document.getElementById('amount').value;
  const years = document.getElementById('years').value;
  const rate = document.getElementById('rate').value;
  const resultDiv = document.getElementById('result');
  const amortDiv = document.getElementById('amortization-table');
  resultDiv.textContent = 'Calculating...';
  amortDiv.innerHTML = '';
  try {
    const res = await fetch('/api/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, years, rate })
    });
    const data = await res.json();
    if (data.monthly) {
      resultDiv.innerHTML = `<div>Monthly Payment: <b>$${data.monthly}</b></div>`;
      if (data.schedule && Array.isArray(data.schedule)) {
        let tableHtml = `<div style="overflow-x:auto;"><table border="1" cellpadding="4" style="margin-top:16px;width:100%;border-collapse:collapse;font-size:14px;">
          <thead><tr><th>Month</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead><tbody>`;
        data.schedule.forEach(row => {
          tableHtml += `<tr><td>${row.month}</td><td>$${row.principal}</td><td>$${row.interest}</td><td>$${row.balance}</td></tr>`;
        });
        tableHtml += `</tbody></table></div>`;
        amortDiv.innerHTML = tableHtml;
      } else {
        amortDiv.innerHTML = '';
      }
    } else {
      resultDiv.textContent = 'Error: ' + (data.error || 'Invalid input.');
      amortDiv.innerHTML = '';
    }
  } catch (err) {
    resultDiv.textContent = 'Error calculating payment.';
  }
});
