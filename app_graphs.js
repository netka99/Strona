// Create an empty object to store the summarized data
let summarySale = {};
let summaryReturn = {};

//spliting data for Return into separate arrays to be able to pass to graph
let valuesByProductReturn = {};
let valuesByProductSale = {};
let datesByProductSale = {};
let datesByProductReturn = {};

let returnsByProduct = {};
let sortedSale;
let sortedReturn;


async function fetchData(apiEndpoint) {
  try {
    const dateStart = document.getElementById("startDate").value;
    const dateEnd = document.getElementById("endDate").value;

    const response = await fetch(
      `https://smacznykaseksuwalki.com/api/${apiEndpoint}?start=${dateStart}&end=${dateEnd}`
    );

    // Check if the response status code indicates success (e.g., 200 OK)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response body as JSON
    const data = await response.json();
    return data; // Return the fetched data
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error:", error);
    throw error; // Rethrow the error to handle it outside this function if needed
  }
}

async function getData(apiEndpoint) {
  try {
    const apiData = await fetchData(apiEndpoint);
    return apiData;
  } catch (error) {
    console.error("Error:", error);
  }
}

//write a function to sort salesData and returnsData by date 
const sortObjectsByDate = (objectList) => {
  return objectList.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
};

async function calculateSummary() {
   summarySale = {};
   summaryReturn = {};
   valuesByProductReturn = {};
   valuesByProductSale = {};
   datesByProductSale = {};
   datesByProductReturn = {};
   returnsByProduct = {};
   
  try {
    const [salesData, returnsData] = await Promise.all([
      getData('sales'),    // Fetch sales data
      getData('returns') // Fetch returns data
    ]);

    sortedSale = sortObjectsByDate(salesData);
    sortedReturn = sortObjectsByDate(returnsData);

    // Process the fetched data as needed
    summaryData(sortedSale, summarySale, valuesByProductSale, datesByProductSale);
    summaryData(sortedReturn, summaryReturn, valuesByProductReturn, datesByProductReturn);

  } catch (error) {
    console.error("Error:", error);
  }
}

// Comparison of two objects for Sale and Return and concatinating dates
// if there is no return for a sale's date pass 0
const objectsComparison = () => {
  for (const product in summarySale) {
    returnsByProduct[product] = {};
    const saleDates = Object.keys(summarySale[product]);
    const returnDates = Object.keys(summaryReturn[product] || {});

    const allDates = [...new Set([...saleDates, ...returnDates])];

    for (const date of allDates) {
      const returnValue = summaryReturn[product]?.[date] || 0;
      returnsByProduct[product][date] = returnValue;
    }
  }
}




const summaryData = (dataArr, summaryObj, valuesByProduct, datesByProduct) => {
  // Loop through each sale in the data
  dataArr.forEach((sale) => {
    // If the product doesn't exist in the summarySale object, add it with an empty object
    if (!summaryObj[sale.product]) {
      summaryObj[sale.product] = {};
    }

    // If the date doesn't exist in the summarySale object for the product, add it with a quantity of 0
    if (!summaryObj[sale.product][sale.date]) {
      summaryObj[sale.product][sale.date] = 0;
    }

    // Add the quantity of the sale to the summarySale object for the product and date
    summaryObj[sale.product][sale.date] += sale.quantity;
  });

  objectsComparison();

  for (const product in summaryObj) {
    const productData = summaryObj[product];
    const values = [];
    const dates = [];
    for (const date in productData) {
      values.push(productData[date]);
      dates.push(date);
    }
    valuesByProduct[product] = values;
    datesByProduct[product] = dates;
  }

};

//for each product button is assign event listener to
//show graph with corresponding data
const graphsPerProduct = document.querySelectorAll(
  ".summary-buttons-product"
);
const graphsSummary = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        type: "bar",
        label: "Sprzedaż",
        data: [],
        backgroundColor: ["rgba(131, 99, 192, 0.5)"],
        borderColor: ["rgb(131, 99, 192)"],
        borderWidth: 1,
      },
      {
        type: "line",
        label: "Zwrot",
        data: [],
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: ["rgba(54, 162, 235)"],
      },
    ],
  };

  graphsPerProduct.forEach((button) => {
    button.addEventListener("click", (e) => {
      const graphContainer = document.querySelector(".graphs");
      const id = e.currentTarget.dataset.id;

      if (id === "Kartacze") {
        myChart.config.data.labels = datesByProductSale.Kartacze;
        myChart.config.data.datasets[0].data = valuesByProductSale.Kartacze;
        myChart.config.data.datasets[1].data = returnsByProduct.Kartacze;
      }
      if (id === "Babka") {
        myChart.config.data.labels = datesByProductSale.Babka;
        myChart.config.data.datasets[0].data = valuesByProductSale.Babka;
        myChart.config.data.datasets[1].data = returnsByProduct.Babka;
      }
      if (id === "Kiszka") {
        myChart.config.data.labels = datesByProductSale.Kiszka;
        myChart.config.data.datasets[0].data = valuesByProductSale.Kiszka;
        myChart.config.data.datasets[1].data = returnsByProduct.Kiszka;
      }
      myChart.update();
      graphContainer.classList.add("active");
    });
  });

  const config = {
    type: "scatter",
    data: data,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const ctx = document.getElementById("myChart");

    const chart = Chart.getChart(ctx);
  //   function removeData(chart) {
  //     chart.data.labels.pop();
  //     chart.data.datasets.forEach((dataset) => {
  //         dataset.data.pop();
  //     });
  //     chart.update();
  // }
    if (chart) {
      // removeData(chart);
      chart.destroy();
    }


  const myChart = new Chart(ctx, config);

}


const searchDate = document.getElementById("searchDate");

//graph's logic
const dateSearching = () => {
  calculateSummary();
  graphsSummary();
};

searchDate.addEventListener("click", dateSearching);

