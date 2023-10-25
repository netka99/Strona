// const productPrices = {
//   Kartacze: 5,
//   Babka: 52,
//   Kiszka: 41,
// };

let productPrices = {};
const searchDate = document.getElementById('searchDate');

//summary of Sale and Return per date
const sumSalesReturns = (sumSale, sumReturn) => {
  const summary = {};

  for (const product in sumSale) {
    summary[product] = {};
    for (const shop in sumSale[product]) {
      summary[product][shop] = sumSale[product][shop];
    }
  }

  for (const product in sumReturn) {
    if (!summary[product]) {
      summary[product] = {};
    }

    for (const shop in sumReturn[product]) {
      if (!summary[product][shop]) {
        summary[product][shop] = -sumReturn[product][shop];
      } else {
        summary[product][shop] -= sumReturn[product][shop];
      }
    }
  }

  return summary;
};

async function fetchData(apiEndpoint) {
  try {
    const dateStart = document.getElementById('dateStart').value;
    const dateEnd = document.getElementById('dateEnd').value;

    const response = await fetch(
      `${APIGeneral}/${apiEndpoint}?start=${dateStart}&end=${dateEnd}`
    );

    // Check if the response status code indicates success (e.g., 200 OK)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response body as JSON
    const data = await response.json();
    console.log('Data:', data);
    return data; // Return the fetched data
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error('Error:', error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

async function getData(apiEndpoint) {
  try {
    const dateStart = document.getElementById('dateStart').value;

    const apiData = await fetchData(apiEndpoint);
    if (apiEndpoint === 'returns' && apiData.length === 0) {
      // If the fetch from 'returns' is empty, return an array of dummy 0 values
      return [
        {
          id: 100001,
          product: 'Kartacze',
          shop: 'Maja',
          quantity: 0,
          date: dateStart,
        },
      ];
    }
    return apiData;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function fetchPrices() {
  const url = APISettings;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.statusText}`);
    }

    const data = await response.json();
    productPrices = data.prices;
    console.log('Prices:', productPrices);
    return productPrices;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

fetchPrices();
async function calculateSummary() {
  try {
    const [returnsData, salesData] = await Promise.all([
      getData('returns'), // Fetch returns data
      getData('sales'), // Fetch sales data
    ]);

    // Process the fetched data as needed
    const filteredSales = filteredByDate(salesData);
    const filteredReturns = filteredByDate(returnsData);
    const summaryPerDay = sumSalesReturns(filteredSales, filteredReturns);

    loadingComponent(summaryPerDay);

    // console.log('Summary Per Day Sale:', filteredSales);
    // console.log('Summary Per Day Return:', filteredReturns);
    // console.log('Summary Per Day:', summaryPerDay);

    // console.log('All:', returnsData, salesData);
  } catch (error) {
    console.error('Error:', error);
  }
}

const summaryContainer = document.querySelector('.summary-output');

// Function to clear existing data in the summary container
function clearSummaryContainer() {
  while (summaryContainer.firstChild) {
    summaryContainer.removeChild(summaryContainer.firstChild);
  }
}

const loadingComponent = function (filteredData) {
  clearSummaryContainer();
  console.log('running loading Component');
  for (const product in filteredData) {
    const productContainer = document.createElement('div');
    summaryContainer.append(productContainer);
    productContainer.className = 'summary-container';
    productContainer.setAttribute('data-product', `${product}`);

    const productImage = document.createElement('img');
    productContainer.append(productImage);
    productImage.className = 'summary-product-image';
    productImage.src = `./images/${product}-Small.jpg`;
    productImage.setAttribute('alt', 'kartacze image');

    //summary output container
    const outputContainer = document.createElement('div');
    productContainer.append(outputContainer);
    outputContainer.className = 'summary-output-container';

    //summary subcontainers
    const outputSubcontShops = document.createElement('div');
    outputContainer.append(outputSubcontShops);
    outputSubcontShops.className = 'summary-subcont subcont-shops';

    const titlesShop = document.createElement('p');
    outputSubcontShops.append(titlesShop);
    titlesShop.className = 'summary-title';
    titlesShop.textContent = 'Sklep';

    const outputSubcontQuantities = document.createElement('div');
    outputContainer.append(outputSubcontQuantities);
    outputSubcontQuantities.className = 'summary-subcont subcont-quantities';

    const titlesQuantities = document.createElement('p');
    outputSubcontQuantities.append(titlesQuantities);
    titlesQuantities.className = 'summary-title';
    titlesQuantities.textContent = 'Ilość';

    const outputSubcontValue = document.createElement('div');
    outputContainer.append(outputSubcontValue);
    outputSubcontValue.className = 'summary-subcont subcont-value';

    const titlesValue = document.createElement('p');
    outputSubcontValue.append(titlesValue);
    titlesValue.className = 'summary-title';
    titlesValue.textContent = 'Koszt';

    let sumQuantity = 0;
    for (const shop in filteredData[product]) {
      const shopName = document.createElement('div');
      outputSubcontShops.appendChild(shopName);
      shopName.className = 'summary-shop-name';
      shopName.textContent = `${shop}`;

      const dailyPerShop = document.createElement('div');
      outputSubcontQuantities.appendChild(dailyPerShop);
      dailyPerShop.className = 'summary-daily-sale';
      if (product == 'Babka' || product == 'Kiszka') {
        dailyPerShop.textContent = `${filteredData[product][shop].toFixed(
          2
        )} kg`;
      } else {
        dailyPerShop.textContent = `${filteredData[product][shop]} szt.`;
      }

      sumQuantity += filteredData[product][shop];

      let sumPricePerShop =
        filteredData[product][shop] * productPrices[product];

      const dailyPricePerShop = document.createElement('div');
      outputSubcontValue.append(dailyPricePerShop);
      dailyPricePerShop.className = 'summary-daily-price';
      dailyPricePerShop.textContent = sumPricePerShop.toFixed(2) + ' zł';
    }

    const summaryPerProduct = document.createElement('div');
    productContainer.append(summaryPerProduct);
    summaryPerProduct.className = 'summary-total';

    const summarytext = document.createElement('p');
    summaryPerProduct.append(summarytext);
    summarytext.textContent = 'Suma';

    const summaryQuantity = document.createElement('div');
    summaryPerProduct.append(summaryQuantity);
    summaryQuantity.className = 'summary-total-quantity';
    if (product == 'Babka' || product == 'Kiszka') {
      summaryQuantity.textContent = sumQuantity.toFixed(2) + ' kg';
    } else {
      summaryQuantity.textContent = sumQuantity + ' szt.';
    }

    let sumPrize = sumQuantity * productPrices[product];
    const summaryPrize = document.createElement('div');
    summaryPerProduct.append(summaryPrize);
    summaryPrize.className = 'summary-total-prize';
    summaryPrize.textContent = sumPrize.toFixed(2) + ' zł';
  }

  const hiddenBabkaContainer = document.querySelector(
    '[data-product=Kartacze]'
  );
  hiddenBabkaContainer.classList.add('active');

  const buttonsProductMenu = document.querySelectorAll(
    '.summary-buttons-product'
  );
  buttonsProductMenu.forEach((button) => {
    button.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const summaryContainerAll = document.querySelectorAll('[data-product]');
      const summaryContainerProduct = document.querySelector(
        `[data-product=${id}`
      );

      summaryContainerAll.forEach((container) => {
        if (container.classList.contains('active')) {
          container.classList.remove('active');
        }
      });

      if (id) {
        summaryContainerProduct.classList.add('active');
      }
    });
  });
};

const filteredByDate = function (data) {
  const dailySaleSummary = data.reduce((acc, sale) => {
    const { product, quantity, shop } = sale;

    if (!acc[product]) {
      acc[product] = {};
    }
    if (!acc[product][shop]) {
      acc[product][shop] = 0;
    }
    acc[product][shop] += quantity;
    return acc;
  }, {});

  console.log('sorted data', dailySaleSummary);
  loadingComponent(dailySaleSummary);
  return dailySaleSummary;
};

const dateSearching = () => {
  calculateSummary();
};

searchDate.addEventListener('click', dateSearching);
