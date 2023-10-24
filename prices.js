let pricesAmended = {};

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function loadPrices() {
  try {
    const pricesData = await fetchData(
      'https://smacznykaseksuwalki.com/api/settings/aneta'
    );
    pricesAmended = pricesData.prices;
    populatePrices(pricesAmended);
    console.log(pricesAmended);
  } catch (error) {
    console.log('Error:', error);
  }
}

loadPrices();

const populatePrices = (data) => {
  const kartaczeInput = document.getElementById('Price_Kartacze');
  const babkaInput = document.getElementById('Price_Babka');
  const kiszkaInput = document.getElementById('Price_Kiszka');

  kartaczeInput.value = data.Kartacze;
  babkaInput.value = data.Babka;
  kiszkaInput.value = data.Kiszka;
};

// // Example usage:
// const newShops = [
//   'Eden - Noniewicza',
//   'Lewiatan - Waryńskiego',
//   'Lewiatan - Sikorskiego',
//   'Lewiatan - Putry',
//   'Lewiatan - Świerkowa',
//   'Lewiatan - W. Polskiego',
//   'Stan - Maja',
// ];
// const newPrices = {
//   Kartacze: 7,
//   Babka: 14,
//   Kiszka: 20,
// };
