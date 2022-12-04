dataMain = [
  {
    name: "sales",
    products: [
      {
        name: "Babka",
        image: "images/babka.jpg",
        shops: [
          {
            name: "Sklep Maya",
            value: 42,
          },
        ],
      },
      {
        name: "Kartacze",
        image: "images/kartacze.jpg",
        shops: [
          {
            name: "Sklep Maya",
            value: 42,
          },
          {
            name: "Sklep Lila",
            value: 421,
          },
        ],
      },
    ],
  },
  {
    name: "returns",
    products: [
      {
        name: "Babka",
        image: "images/babka.jpg",
        shops: [
          {
            name: "Sklep Maya",
            value: 42,
          },
        ],
      },
      {
        name: "Kartacze",
        image: "images/kartacze.jpg",
        shops: [
          {
            name: "Sklep Maya",
            value: 42,
          },
          {
            name: "Sklep Lila",
            value: 421,
          },
        ],
      },
    ],
  },
];

function main() {
  dataMain.forEach((type) => {
    type.products.forEach((product) => {
      console.log(product);
      document.appendChild();
    });
  });
}

window.addEventListener("load", main);
