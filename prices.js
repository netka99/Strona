let pricesAmended = {};
let shopsAmended = [];

//replacing data
async function updateSettings(shops, prices) {
  try {
    const response = await fetch(
      'https://smacznykaseksuwalki.com/api/settings/aneta',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shops,
          prices,
        }),
      }
    );
    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

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
    shopsAmended = pricesData.shops;
    populatePrices(pricesAmended);
  } catch (error) {
    console.log('Error:', error);
  }
}

loadPrices();
const kartaczeInput = document.getElementById('Price_Kartacze');
const babkaInput = document.getElementById('Price_Babka');
const kiszkaInput = document.getElementById('Price_Kiszka');

const populatePrices = (data) => {
  kartaczeInput.value = data.Kartacze;
  babkaInput.value = data.Babka;
  kiszkaInput.value = data.Kiszka;
};

const savePrice = document.getElementById('savePrices');

savePrice.addEventListener('click', () => {
  pricesAmended.Kartacze = parseInt(kartaczeInput.value);
  pricesAmended.Babka = parseInt(babkaInput.value);
  pricesAmended.Kiszka = parseInt(kiszkaInput.value);

  updateSettings(shopsAmended, pricesAmended);
  savePrice.textContent = 'Zapisano';
  kartaczeInput.disabled = true;
  babkaInput.disabled = true;
  kiszkaInput.disabled = true;
});

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
