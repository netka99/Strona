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

   console.log (sumSalesReturns(filteredSales,filteredReturns));

   
