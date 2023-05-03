function updateChart() {
  async function fetchData() {
    const url = "./dummydataSale.json";
    const url2 = "./dummydataReturn.json";
    const response = await fetch(url);
    const datapoints = await response.json();
    const response2 = await fetch(url2);
    const datapoints2 = await response2.json();

    return [datapoints, datapoints2];
  }

  fetchData().then((dataArr) => {
    // Create an empty object to store the summarized data
    const summarySale = {};
    const summaryReturn = {};

    // Loop through each sale in the data
    dataArr[0].Sale.forEach((sale) => {
      // If the product doesn't exist in the summarySale object, add it with an empty object
      if (!summarySale[sale.product]) {
        summarySale[sale.product] = {};
      }

      // If the date doesn't exist in the summarySale object for the product, add it with a quantity of 0
      if (!summarySale[sale.product][sale.date]) {
        summarySale[sale.product][sale.date] = 0;
      }

      // Add the quantity of the sale to the summarySale object for the product and date
      summarySale[sale.product][sale.date] += sale.quantity;
    });

    dataArr[1].Return.forEach((sale) => {
      if (!summaryReturn[sale.product]) {
        summaryReturn[sale.product] = {};
      }
      if (!summaryReturn[sale.product][sale.date]) {
        summaryReturn[sale.product][sale.date] = 0;
      }
      summaryReturn[sale.product][sale.date] += sale.quantity;
    });

    console.log("summaryReturn", summaryReturn);
    console.log("summarySale", summarySale);

    //Dividing data by date and values in arrays
    const valuesByProduct = {};
    const datesByProduct = {};

    // console.log("values", valuesByProduct);
    // console.log("dates", datesByProduct);

    const returnsByProduct = {};

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

    console.log(returnsByProduct);

    for (const product in summarySale) {
      const productData = summarySale[product];

      const values = [];
      const dates = [];

      for (const date in productData) {
        values.push(productData[date]);
        dates.push(date);
      }

      valuesByProduct[product] = values;
      datesByProduct[product] = dates;
    }

    const graphsPerProduct = document.querySelectorAll(
      ".summary-buttons-product"
    );
    graphsPerProduct.forEach((button) => {
      button.addEventListener("click", (e) => {
        const graphContainer = document.querySelector(".graphs");
        const id = e.currentTarget.dataset.id;
        console.log(id);
        if (id === "Kartacze") {
          myChart.config.data.labels = datesByProduct.Kartacze;
          myChart.config.data.datasets[0].data = valuesByProduct.Kartacze;
        }
        if (id === "Babka") {
          myChart.config.data.labels = datesByProduct.Babka;
          myChart.config.data.datasets[0].data = valuesByProduct.Babka;
        }
        if (id === "Kiszka") {
          myChart.config.data.labels = datesByProduct.Kiszka;
          myChart.config.data.datasets[0].data = valuesByProduct.Kiszka;
        }
        myChart.update();
        graphContainer.classList.add("active");
      });
    });
  });
}

updateChart();
const ctx = document.getElementById("myChart");
const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      type: "bar",
      label: "Sprzedaż",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: ["rgba(131, 99, 192, 0.5)"],
      borderColor: ["rgb(131, 99, 192)"],
      borderWidth: 1,
    },
    {
      type: "line",
      label: "Zwrot",
      data: [10, 20, 30, 50],
      fill: false,
      borderColor: "rgb(54, 162, 235)",
    },
  ],
};

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

const myChart = new Chart(ctx, config);
