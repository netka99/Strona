const dataReturn = [
  {
    id: 1,
    product: "Babka",
    quantity: 3,
    isDiscounted: false,
    shop: "Maja",
    date: "2016-08-29",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 2,
    isDiscounted: false,
    shop: "Kowalskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 5,
    isDiscounted: false,
    shop: "Nowomiejska",
    date: "2023-03-24",
  },
];

const shops = [
  "Sklep Maja",
  "Sklep Kowalskiego",
  "Sklep Nowomiejska",
  "Sklep Lityńskiego",
  "Sklep Stankiewicza",
  "Sklep Buczka",
  "Sklep Świerkowa",
];

const products = [
  ["Kartacze", "szt."],
  ["Babka", "kg"],
  ["Kiszka", "kg"],
];

const productPrices = {
  Kartacze: 5,
  Babka: 52,
  Kiszka: 41,
};
//filtering data based on date
let date = "2023-03-24";

const searchDate = document.getElementById("searchDate");

//summary of Sale and Return per date
const sumSalesReturns = (sumSale, sumReturn) => {
  const summary = {};
  for (const product in sumSale) {
    summary[product] = {};
    for (const shop in sumSale[product]) {
      summary[product][shop] = sumSale[product][shop];
      if (sumReturn[product] && sumReturn[product][shop]) {
        summary[product][shop] -= sumReturn[product][shop];
      }
    }
  }
  return summary;
};

async function fetchData() {
  try {
    const dateStart = document.getElementById("dateStart");
    const dateEnd = document.getElementById("dateEnd");
    const dateStartValue = dateStart.value;
    const dateEndValue = dateEnd.value;

    const response = await fetch(
      `https://smacznykaseksuwalki.com/api/sales?start=${dateStartValue}&end=${dateEndValue}`
    );

    // Check if the response status code indicates success (e.g., 200 OK)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the response body as JSON
    const data = await response.json();
    filteredByDate(data);
    console.log("data:", data);
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error:", error);
  }
}

//const filteredSales = filteredByDate(data);
//const filteredReturns = filteredByDate(dataReturn, date);

//let summaryPerDay = sumSalesReturns(filteredByDate,filteredReturns);

const summaryContainer = document.querySelector(".summary-output");

// Function to clear existing data in the summary container
function clearSummaryContainer() {
  while (summaryContainer.firstChild) {
    summaryContainer.removeChild(summaryContainer.firstChild);
  }
}

const loadingComponent = function (filteredData) {
  clearSummaryContainer();
  console.log("running loading Component");
  for (const product in filteredData) {
    const productContainer = document.createElement("div");
    summaryContainer.append(productContainer);
    productContainer.className = "summary-container";
    productContainer.setAttribute("data-product", `${product}`);

    const productImage = document.createElement("img");
    productContainer.append(productImage);
    productImage.className = "summary-product-image";
    productImage.src = `./images/${product}-Small.jpg`;
    productImage.setAttribute("alt", "kartacze image");

    //summary output container
    const outputContainer = document.createElement("div");
    productContainer.append(outputContainer);
    outputContainer.className = "summary-output-container";

    //summary subcontainers
    const outputSubcontShops = document.createElement("div");
    outputContainer.append(outputSubcontShops);
    outputSubcontShops.className = "summary-subcont subcont-shops";

    const titlesShop = document.createElement("p");
    outputSubcontShops.append(titlesShop);
    titlesShop.className = "summary-title";
    titlesShop.textContent = "Sklep";

    const outputSubcontQuantities = document.createElement("div");
    outputContainer.append(outputSubcontQuantities);
    outputSubcontQuantities.className = "summary-subcont subcont-quantities";

    const titlesQuantities = document.createElement("p");
    outputSubcontQuantities.append(titlesQuantities);
    titlesQuantities.className = "summary-title";
    titlesQuantities.textContent = "Ilość";

    const outputSubcontValue = document.createElement("div");
    outputContainer.append(outputSubcontValue);
    outputSubcontValue.className = "summary-subcont subcont-value";

    const titlesValue = document.createElement("p");
    outputSubcontValue.append(titlesValue);
    titlesValue.className = "summary-title";
    titlesValue.textContent = "Koszt";

    let sumQuantity = 0;
    for (const shop in filteredData[product]) {
      const shopName = document.createElement("div");
      outputSubcontShops.appendChild(shopName);
      shopName.className = "summary-shop-name";
      shopName.textContent = `${shop}`;

      const dailyPerShop = document.createElement("div");
      outputSubcontQuantities.appendChild(dailyPerShop);
      dailyPerShop.className = "summary-daily-sale";
      if (product == "Babka" || product == "Kiszka") {
        dailyPerShop.textContent = `${filteredData[product][shop].toFixed(
          2
        )} kg`;
      } else {
        dailyPerShop.textContent = `${filteredData[product][shop]} szt.`;
      }

      sumQuantity += filteredData[product][shop];

      let sumPricePerShop =
        filteredData[product][shop] * productPrices[product];

      const dailyPricePerShop = document.createElement("div");
      outputSubcontValue.append(dailyPricePerShop);
      dailyPricePerShop.className = "summary-daily-price";
      dailyPricePerShop.textContent = sumPricePerShop.toFixed(2) + " zł";
    }

    const summaryPerProduct = document.createElement("div");
    productContainer.append(summaryPerProduct);
    summaryPerProduct.className = "summary-total";

    const summarytext = document.createElement("p");
    summaryPerProduct.append(summarytext);
    summarytext.textContent = "Suma";

    const summaryQuantity = document.createElement("div");
    summaryPerProduct.append(summaryQuantity);
    summaryQuantity.className = "summary-total-quantity";
    if (product == "Babka" || product == "Kiszka") {
      summaryQuantity.textContent = sumQuantity.toFixed(2) + " kg";
    } else {
      summaryQuantity.textContent = sumQuantity + " szt.";
    }

    let sumPrize = sumQuantity * productPrices[product];
    const summaryPrize = document.createElement("div");
    summaryPerProduct.append(summaryPrize);
    summaryPrize.className = "summary-total-prize";
    summaryPrize.textContent = sumPrize.toFixed(2) + " zł";
  }

  const hiddenBabkaContainer = document.querySelector(
    "[data-product=Kartacze]"
  );
  hiddenBabkaContainer.classList.add("active");

  const buttonsProductMenu = document.querySelectorAll(
    ".summary-buttons-product"
  );
  buttonsProductMenu.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      const summaryContainerAll = document.querySelectorAll("[data-product]");
      const summaryContainerProduct = document.querySelector(
        `[data-product=${id}`
      );

      summaryContainerAll.forEach((container) => {
        if (container.classList.contains("active")) {
          container.classList.remove("active");
        }
      });

      if (id) {
        summaryContainerProduct.classList.add("active");
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

  console.log("sorted data", dailySaleSummary);
  loadingComponent(dailySaleSummary);
  return dailySaleSummary;
};

const dateSearching = () => {
  fetchData();
  console.log(dateStartValue);
  console.log(dateEndValue);
};

searchDate.addEventListener("click", dateSearching);

/*
[
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 32,
    "isDiscounted": false,
    "shop": "Maja",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 18,
    "isDiscounted": false,
    "shop": "Kowalskiego",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 17,
    "isDiscounted": false,
    "shop": "Nowomiejska",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 39,
    "isDiscounted": false,
    "shop": "Lityńskiego",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 40,
    "isDiscounted": false,
    "shop": "Stankiewicza",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 29,
    "isDiscounted": false,
    "shop": "Buczka",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 29,
    "isDiscounted": false,
    "shop": "Świerkowa",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 2.2,
    "isDiscounted": false,
    "shop": "Maja",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 6.2,
    "isDiscounted": false,
    "shop": "Kowalskiego",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 2.9,
    "isDiscounted": false,
    "shop": "Nowomiejska",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 3.6,
    "isDiscounted": false,
    "shop": "Lityńskiego",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 3.2,
    "isDiscounted": false,
    "shop": "Stankiewicza",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 2.2,
    "isDiscounted": false,
    "shop": "Buczka",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Babka",
    "quantity": 3.9,
    "isDiscounted": false,
    "shop": "Świerkowa",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kiszka",
    "quantity": 4.6,
    "isDiscounted": false,
    "shop": "Lityńskiego",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kiszka",
    "quantity": 2.8,
    "isDiscounted": false,
    "shop": "Stankiewicza",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kiszka",
    "quantity": 3.2,
    "isDiscounted": false,
    "shop": "Buczka",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 13,
    "isDiscounted": false,
    "shop": "Maja",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 8,
    "isDiscounted": false,
    "shop": "Kowalskiego",
    "date": "2023-08-25"
  },
  {
    "id": null,
    "product": "Kartacze",
    "quantity": 9,
    "isDiscounted": false,
    "shop": "Nowomiejska",
    "date": "2023-08-25"
  }
]
   */
