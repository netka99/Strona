const dataSale = [
  {
    id: 1,
    product: "Kartacze",
    quantity: 42,
    isDiscounted: false,
    shop: "Maja",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 15,
    isDiscounted: false,
    shop: "Kowalskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 10,
    isDiscounted: false,
    shop: "Nowomiejska",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 33,
    isDiscounted: false,
    shop: "Lityńskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 50,
    isDiscounted: false,
    shop: "Stankiewicza",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 26,
    isDiscounted: false,
    shop: "Buczka",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 20,
    isDiscounted: false,
    shop: "Świerkowa",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 3.2,
    isDiscounted: false,
    shop: "Maja",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 4.2,
    isDiscounted: false,
    shop: "Kowalskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 2.1,
    isDiscounted: false,
    shop: "Nowomiejska",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 5.6,
    isDiscounted: false,
    shop: "Lityńskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 1.2,
    isDiscounted: false,
    shop: "Stankiewicza",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 3.2,
    isDiscounted: false,
    shop: "Buczka",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Babka",
    quantity: 2.5,
    isDiscounted: false,
    shop: "Świerkowa",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kiszka",
    quantity: 7.6,
    isDiscounted: false,
    shop: "Lityńskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kiszka",
    quantity: 2.1,
    isDiscounted: false,
    shop: "Stankiewicza",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kiszka",
    quantity: 5.1,
    isDiscounted: false,
    shop: "Buczka",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 15,
    isDiscounted: false,
    shop: "Maja",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 5,
    isDiscounted: false,
    shop: "Kowalskiego",
    date: "2023-03-24",
  },
  {
    id: 1,
    product: "Kartacze",
    quantity: 4,
    isDiscounted: false,
    shop: "Nowomiejska",
    date: "2023-03-24",
  }
];

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

// "https://virtserver.swaggerhub.com/zedr/shop-manager/1.0.0/sales?start=2023-10-11&end=2023-10-15"

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
    "Kartacze": 5,
    "Babka": 52,
    "Kiszka":41
  }
//filtering data based on date
let date = "2023-03-24";


const filteredByDate = (data,chosenData) => {
   const dailySale = data.filter((saleReturn) => saleReturn.date === chosenData);

   const dailySaleSummary = dailySale.reduce((acc,sale) => {
    const {product,quantity,shop} = sale;
    
    if(!acc[product]){
        acc[product] = {};
    }
    if(!acc[product][shop]){
        acc[product][shop] = 0;
    }
    acc[product][shop] += quantity;
        return acc;
    },{});

    return dailySaleSummary;
};

    const filteredSales = filteredByDate(dataSale, date);
    const filteredReturns = filteredByDate(dataReturn, date);
  
    //summary of Sale and Return per date
    const sumSalesReturns = (sumSale, sumReturn)  => {
        const summary = {};
        for (const product in sumSale){
            summary[product] = {};
            for(const shop in sumSale[product]){
                summary[product][shop] = sumSale[product][shop];
                if(sumReturn[product] && sumReturn[product][shop]){
                    summary[product][shop] -= sumReturn[product][shop]
                }
            }

        }
        return summary
    };


   let summaryPerDay = sumSalesReturns(filteredSales,filteredReturns);

   window.addEventListener("load", () => {
    const summaryContainer = document.querySelector(".summary-output");

    for (const product in summaryPerDay){

        const productContainer = document.createElement("div");
        summaryContainer.append(productContainer);
        productContainer.className = "summary-container";
        productContainer.setAttribute("data-product",`${product}`)
        
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
        for(const shop in summaryPerDay[product]){
            const shopName = document.createElement("div");
            outputSubcontShops.appendChild(shopName);
            shopName.className = "summary-shop-name";
            shopName.textContent = `${shop}`

            const dailyPerShop = document.createElement("div");
            outputSubcontQuantities.appendChild(dailyPerShop);
            dailyPerShop.className = "summary-daily-sale";
            if(product == "Babka" || product == "Kiszka"  ){
                dailyPerShop.textContent = `${summaryPerDay[product][shop]} kg`;
            }else{
            dailyPerShop.textContent = `${summaryPerDay[product][shop]} szt.`;}

            sumQuantity += summaryPerDay[product][shop];

            let sumPricePerShop = summaryPerDay[product][shop]*productPrices[product];

            const dailyPricePerShop = document.createElement("div");
            outputSubcontValue.append(dailyPricePerShop);
            dailyPricePerShop.className = "summary-daily-price";
            dailyPricePerShop.textContent = sumPricePerShop.toFixed(2) +" zł";
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
        if(product == "Babka" || product == "Kiszka"  ){
            summaryQuantity.textContent = sumQuantity.toFixed(2) + " kg" ;
        }else{
            summaryQuantity.textContent = sumQuantity + " szt.";
        };

        let sumPrize = sumQuantity*productPrices[product];
        const summaryPrize = document.createElement("div");
        summaryPerProduct.append(summaryPrize);
        summaryPrize.className = "summary-total-prize";
        summaryPrize.textContent = sumPrize.toFixed(2)+" zł";

   }

   const hiddenBabkaContainer = document.querySelector("[data-product=Kartacze]");
   hiddenBabkaContainer.classList.add("active");


   const buttonsProductMenu = document.querySelectorAll(".summary-buttons-product");
   buttonsProductMenu.forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.currentTarget.dataset.id;
            const summaryContainerAll = document.querySelectorAll("[data-product]");
            const summaryContainerProduct = document.querySelector(`[data-product=${id}`);
        
            summaryContainerAll.forEach((container) => {
                if (container.classList.contains("active")) {
                  container.classList.remove("active");
                }
              });

            if(id){
                summaryContainerProduct.classList.add("active");
            }
        })
   })
   })
