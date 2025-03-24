// app.js
document.getElementById('convert-button').addEventListener('click', async () => {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('result');
    
    if (!amount) {
      resultDiv.innerHTML = '<p>Please enter an amount.</p>';
      return;
    }
    
    resultDiv.innerHTML = '<p>Converting...</p>';
    
    try {
      // Replace YOUR_RAPIDAPI_KEY with your actual API key from RapidAPI
      const url = `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '696507170bmsh5cc152e75858265p1b76b2jsn6d0368985055',
          'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
        }
      };
      
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      // Assume the JSON returns a "result" property with the converted value
      const conversionResult = data.result;
      
      resultDiv.innerHTML = `<p>${amount} ${fromCurrency} equals ${conversionResult} ${toCurrency}</p>`;
    } catch (error) {
      resultDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
      console.error('Error fetching conversion data:', error);
    }
  });
  