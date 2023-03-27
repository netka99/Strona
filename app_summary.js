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

    // function sumObjectsByKey(obj1, obj2, key) {
    //     const result = {};
    //     for (const prop in obj1) {
    //       if (prop in obj2) {
    //         const propValues = {};
    //         for (const subprop in obj1[prop]) {
    //           if (subprop in obj2[prop]) {
    //             propValues[subprop] = obj1[prop][subprop] + obj2[prop][subprop];
    //           }
    //         }
    //         result[prop] = propValues;
    //       }
    //     }
    //     return result;
    //   }

// console.log(filteredReturns);




// console.log("Sale:",filteredByDate(dataSale,"2023-03-24"));
// console.log("Return",filteredByDate(dataReturn,"2023-03-24"));
// Sale: {
//     Kartacze: {
//       Maja: 57,
//       Kowalskiego: 20,
//       Nowomiejska: 14,
//       'Lityńskiego': 33,
//       Stankiewicza: 50,
//       Buczka: 26,
//       'Świerkowa': 20
//     },
//     Babka: {
//       Maja: 3.2,
//       Kowalskiego: 4.2,
//       Nowomiejska: 2.1,
//       'Lityńskiego': 5.6,
//       Stankiewicza: 1.2,
//       Buczka: 3.2,
//       'Świerkowa': 2.5
//     },
//     Kiszka: { 'Lityńskiego': 7.6, Stankiewicza: 2.1, Buczka: 5.1 }
//   }
//   Return 
//      { Kartacze:
//      {   Kowalskiego: 2,   
//          Nowomiejska: 5 } }   