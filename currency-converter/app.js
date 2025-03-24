// app.js
document.getElementById('convert-button').addEventListener('click', async () => {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;
  const resultDiv = document.getElementById('result');

  if (!amount || amount <= 0) {
      resultDiv.innerHTML = '<p class="error">Please enter a valid amount.</p>';
      return;
  }

  resultDiv.innerHTML = '<p>Converting...</p>';

  try {
      const apiKey = '6f06ec9f1942fd7641215458'; 
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.conversion_rates[toCurrency]) {
          throw new Error('Invalid currency selection.');
      }

      const conversionRate = data.conversion_rates[toCurrency];
      const conversionResult = (amount * conversionRate).toFixed(2);

      resultDiv.innerHTML = `<p>${amount} ${fromCurrency} = ${conversionResult} ${toCurrency}</p>`;
  } catch (error) {
      resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      console.error('Error fetching conversion data:', error);
  }
});
