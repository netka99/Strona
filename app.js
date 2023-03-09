dataMain = [
  {
    name: "Sprzedaż",
    products: [
      {
        name: "Kartacze",
        image: "./images/Kartacze-Small.jpg",
        shops: [
          {
            name: "Sklep Maya",
          },
          {
            name: "Sklep Kowalskiego",
          },
          {
            name: "Sklep Nowomiejska",
          },
          {
            name: "Sklep Lityńskiego",
          },
          {
            name: "Sklep Stankiewicza",
          },
          {
            name: "Sklep Buczka",
          },
          {
            name: "Sklep Świerkowa",
          },
        ],
      },
      {
        name: "Babka",
        image: "./images/Babka-Small.jpg",
        shops: [
          {
            name: "Sklep Maya",
          },
          {
            name: "Sklep Kowalskiego",
          },
          {
            name: "Sklep Nowomiejska",
          },
          {
            name: "Sklep Lityńskiego",
          },
          {
            name: "Sklep Stankiewicza",
          },
          {
            name: "Sklep Buczka",
          },
          {
            name: "Sklep Świerkowa",
          },
        ],
      },
      {
        name: "Kiszka",
        image: "./images/Kiszka-Small.jpg",
        shops: [
          {
            name: "Sklep Maya",
          },
          {
            name: "Sklep Kowalskiego",
          },
          {
            name: "Sklep Nowomiejska",
          },
          {
            name: "Sklep Lityńskiego",
          },
          {
            name: "Sklep Stankiewicza",
          },
          {
            name: "Sklep Buczka",
          },
          {
            name: "Sklep Świerkowa",
          },
        ],
      },
    ],
  },
  {
    name: "Zwrot",
    products: [
      {
        name: "Kartacze",
        image: "./images/Kartacze-Small.jpg",
        shops: [
          {
            name: "Sklep Maya",
          },
          {
            name: "Sklep Kowalskiego",
          },
          {
            name: "Sklep Nowomiejska",
          },
          {
            name: "Sklep Lityńskiego",
          },
          {
            name: "Sklep Stankiewicza",
          },
          {
            name: "Sklep Buczka",
          },
          {
            name: "Sklep Świerkowa",
          },
        ],
      },
      {
        name: "Babka",
        image: "./images/Babka-Small.jpg",
        shops: [
          {
            name: "Sklep Maya",
          },
          {
            name: "Sklep Kowalskiego",
          },
          {
            name: "Sklep Nowomiejska",
          },
          {
            name: "Sklep Lityńskiego",
          },
          {
            name: "Sklep Stankiewicza",
          },
          {
            name: "Sklep Buczka",
          },
          {
            name: "Sklep Świerkowa",
          },
        ],
      },
      {
        name: "Kiszka",
        image: "./images/Kiszka-Small.jpg",
        shops: [
          {
            name: "Sklep Maya",
          },
          {
            name: "Sklep Kowalskiego",
          },
          {
            name: "Sklep Nowomiejska",
          },
          {
            name: "Sklep Lityńskiego",
          },
          {
            name: "Sklep Stankiewicza",
          },
          {
            name: "Sklep Buczka",
          },
          {
            name: "Sklep Świerkowa",
          },
        ],
      },
    ],
  },
];

const headerButtons = [];

const totalKartacze = [];
const totalBabka = [];
const totalKartaczeReturn = [];
const totalBabkaReturn = [];
let priceKartacze = 4;
let priceBabka = 23;

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

window.addEventListener("load", () => {
  //controling buttons with products
  const tabButton = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".mainContent");
  const formTab = document.querySelector(".formTab");


  //logic for main content
  [...document.getElementsByClassName("mainContent")].forEach((el, indexes) => {
    const mainContent = document.createElement("div");
    el.append(mainContent);

    //HTML of each section
    shops.forEach(function (item, index) {
      const section = document.createElement("section");
      section.className = "containerProduct";
      const containerHeader = document.createElement("div");
      mainContent.append(section);
      section.append(containerHeader);
      containerHeader.className = "containerHeader";
      const storeName = document.createElement("div");
      storeName.className = "storeName";
      containerHeader.append(storeName);
      const storePicture = document.createElement("img");
      storePicture.className = "store-picture";
      storePicture.src = "./images/store-alt-solid.svg";
      storeName.append(storePicture);
      storeName.setAttribute("alt", "store image");
      const storeText = document.createElement("p");
      storeText.textContent = item;
      storeName.append(storeText);

      const buttons = document.createElement("div");
      containerHeader.append(buttons);
      buttons.className = "buttons";
      const buttonCheck = document.createElement("span");
      buttons.append(buttonCheck);
      buttonCheck.textContent = "✓";
      buttonCheck.className = "buttonCheck";
      const accordionEl = document.createElement("button");
      buttons.append(accordionEl);
      accordionEl.setAttribute("id", "accordion");
      accordionEl.className = "accordion";
      const arrowEl = document.createElement("p");
      accordionEl.append(arrowEl);
      arrowEl.innerHTML = "&#x2c5";
      arrowEl.setAttribute("id", "arrow");

      const wrapper = document.createElement("div");
      section.append(wrapper);
      wrapper.className = "wrapper";
      wrapper.setAttribute("id", "wrapper");

      //for each product created container
      let containerMain;


      products.forEach((prod, i) => {
        containerMain = document.createElement("div");
        wrapper.append(containerMain);
        containerMain.className = "containerMain";
        containerMain.setAttribute("id", prod[0] + "_" + item + indexes);
        containerMain.setAttribute("data-product", prod[0]);
        const containerItem = document.createElement("div");
        containerMain.append(containerItem);
        containerItem.className = "containerItem";
        const imageItem = document.createElement("div");
        containerItem.append(imageItem);
        imageItem.className = "imageItem";
        const itemPictureFirst = document.createElement("img");
        imageItem.append(itemPictureFirst);
        itemPictureFirst.className = "item-picture";
        itemPictureFirst.src = `./images/${prod[0]}-Small.jpg`;
        itemPictureFirst.setAttribute("alt", "kartacze image");
        const itemFirstText = document.createElement("p");
        imageItem.append(itemFirstText);
        itemFirstText.textContent = `${prod[0]}`;

        const items = document.createElement("div");
        containerItem.append(items);
        items.className = "items";
        const soldItemsFirst = document.createElement("div");
        items.append(soldItemsFirst);
        soldItemsFirst.className = "soldItems";
        const soldLabel = document.createElement("label");
        soldItemsFirst.append(soldLabel);
        soldLabel.setAttribute("for", "sold");
        soldLabel.textContent = "Sprzedaż";
        const soldInput = document.createElement("input");
        soldItemsFirst.append(soldInput);
        soldInput.setAttribute("type", "number");
        soldInput.setAttribute("min", "0");
        soldInput.setAttribute("id", `${item}_${prod[0]}_${i}`);
        const itemsQuantitiesF = document.createElement("p");
        soldItemsFirst.append(itemsQuantitiesF);
        itemsQuantitiesF.textContent = `${prod[1]}`;
        itemsQuantitiesF.className = "itemsQuantities";

        const soldItemsSecond = document.createElement("div");
        items.append(soldItemsSecond);
        soldItemsSecond.className = "returnItems";
        const returnLabel = document.createElement("label");
        soldItemsSecond.append(returnLabel);
        returnLabel.setAttribute("for", "return");
        returnLabel.textContent = "Zwrot";
        const returnInput = document.createElement("input");
        soldItemsSecond.append(returnInput);
        returnInput.setAttribute("type", "number");
        returnInput.setAttribute("min", "0");
        returnInput.setAttribute("id", "returnedKartacze");
        const itemsQuantitiesS = document.createElement("p");
        soldItemsSecond.append(itemsQuantitiesS);
        itemsQuantitiesS.textContent = `${prod[1]}`;
        itemsQuantitiesS.className = "itemsQuantities";

        const containerSave = document.createElement("div");
        containerMain.append(containerSave);
        containerSave.className = "containerSaving";

        const submitReturnBut = document.createElement("button");
        containerSave.append(submitReturnBut);
        submitReturnBut.textContent = "Zapisz zwrot";
        submitReturnBut.className = "save-return-button";
        submitReturnBut.setAttribute("id", index + "_" + prod[0] + "_Return");
        shops[index] = item;

        const addContainer = document.createElement("button");
        containerSave.append(addContainer);
        addContainer.innerHTML = "&#xFF0B";
        addContainer.className = "add-container";

        const submitSaleBut = document.createElement("button");
        containerSave.append(submitSaleBut);
        submitSaleBut.textContent = "Zapisz sprzedaż";
        submitSaleBut.className = "save-sale-button";
        submitSaleBut.setAttribute("id", index + "_" + prod[0] + "_Sale");
        shops[index] = item;
      });

      //accordion to open and close wrapper
      const summaryTab = document.querySelector(".summary");
      let heightFormTab = formTab.offsetHeight;
      formTab.style.height = 250 + "px";

      accordionEl.addEventListener("click", (e) => {
        let wrapperEl =
          e.currentTarget.parentElement.parentElement.nextElementSibling;
        let arrow = e.currentTarget.children[0];
        let currentHeight = formTab.style.height;
        if (wrapperEl.style.height) {
          wrapperEl.style.height = null;
          formTab.style.height = parseInt(currentHeight) - 156 + "px";
          arrow.style = "transform:rotate(" + 0 + "-180deg)";
        } else {
          wrapperEl.style.height = wrapperEl.scrollHeight + "px";
          formTab.style.height = parseInt(currentHeight) + 156 + "px";
          //formTab.style.height = formTab.scrollHeight + "px";
          arrow.style = "transform:rotate(" + 0 + "180deg)";
        }
      });


      //Saving button - sending data to summary container, summary of sale and returns
      let sumKartacze, sumBabka;
      const sumQuantKartacze = document.querySelector(".sumQuantityFirst");
      const sumQuantBabka = document.querySelector(".sumQuantitySecond");

      function SaveSale(e) {
        buttonCheck.style.color = "white";
        totalKartacze.push(soldInput.value);
        totalBabka.push(soldInputSec.value);
        item.countKartacze += Number(soldInput.value);
        item.countBabka += Number(soldInputSec.value).toFixed(2);

        sumKartacze = Array.from(totalKartacze, Number).reduce((v, i) => v + i);
        sumBabka = Array.from(totalBabka, Number)
          .reduce((v, i) => v + i)
          .toFixed(2);

        const quantityFirstSold = document.getElementById("quantityFirstSold");
        quantityFirstSold.innerHTML = sumKartacze + " szt";
        const quantitySecondSold =
          document.getElementById("quantitySecondSold");
        quantitySecondSold.innerHTML = sumBabka + " kg";
        const summaryQuantKartacze = sumKartacze;
        sumQuantKartacze.innerHTML = summaryQuantKartacze + " szt";

        const summaryQuantBabka = Number(sumBabka);
        sumQuantBabka.innerHTML = summaryQuantBabka.toFixed(2) + " kg";

        const priceFirstSold = document.getElementById("priceFirstSold");
        priceFirstSold.innerHTML =
          (sumKartacze * priceKartacze).toFixed(2) + " zł";

        const priceSecondSold = document.getElementById("priceSecondSold");
        priceSecondSold.innerHTML = (sumBabka * priceBabka).toFixed(2) + " zł";

        const sumPriceFirst = document.querySelector(".sumPriceFirst");
        sumPriceFirst.innerHTML =
          (summaryQuantKartacze * priceKartacze).toFixed(2) + " zł";

        const sumPriceSecond = document.querySelector(".sumPriceSecond");
        sumPriceSecond.innerHTML =
          (summaryQuantBabka * priceBabka).toFixed(2) + " zł";

        soldInput.disabled = true;
        soldInputSec.disabled = true;

        submitSaleButton.removeEventListener("click", SaveSale);
      }

      //Correct data - submitReturnButton functionality
      function SaveReturn(e) {
        totalKartaczeReturn.push(returnInput.value);
        totalBabkaReturn.push(returnInputSec.value);

        item.countKartacze -= Number(returnInput.value);
        item.countBabka -= Number(returnInputSec.value).toFixed(2);

        let sumReturnsKartacze = Array.from(totalKartaczeReturn, Number).reduce(
          (v, i) => v + i
        );
        let sumReturnsBabka = Array.from(totalBabkaReturn, Number)
          .reduce((v, i) => v + i)
          .toFixed(2);

        const quantityFirstReturned = document.getElementById(
          "quantityFirstReturned"
        );
        quantityFirstReturned.innerHTML = sumReturnsKartacze + " szt";
        const quantitySecondReturned = document.getElementById(
          "quantitySecondReturned"
        );
        quantitySecondReturned.innerHTML = sumReturnsBabka + " kg";

        const priceFirstReturned =
          document.getElementById("priceFirstReturned");
        priceFirstReturned.innerHTML =
          (sumReturnsKartacze * priceKartacze).toFixed(2) + " zł";

        const priceSecondReturned = document.getElementById(
          "priceSecondReturned"
        );
        priceSecondReturned.innerHTML =
          (sumReturnsBabka * priceBabka).toFixed(2) + " zł";

        const summaryQuantKartacze =
          sumKartacze - parseInt(sumReturnsKartacze, 0);
        sumQuantKartacze.innerHTML = summaryQuantKartacze + " szt";

        const summaryQuantBabka = Number(sumBabka) - Number(sumReturnsBabka);
        sumQuantBabka.innerHTML = summaryQuantBabka.toFixed(2) + " kg";

        returnInput.disabled = true;
        returnInputSec.disabled = true;

        submitReturnButton.removeEventListener("click", SaveReturn);
      }

      //CORRECT!!!
      // submitReturnButton.addEventListener("click", SaveReturn);
      // submitSaleButton.addEventListener("click", SaveSale);
    });
  });

  //===============================================================
  //Settings-shops page
  // const shopsFromDB = [
  //   "Sklep Maja",
  //   "Sklep Kowalskiego",
  //   "Sklep Nowomiejska",
  //   "Sklep Lityńskiego",
  //   "Sklep Stankiewicza",
  //   "Sklep Buczka",
  //   "Sklep Świerkowa",
  // ];

  // const shopsList = document.getElementById("shopsList");
  // shopsFromDB.forEach((el) => {
  //   const shopContainer = document.createElement("div");
  //   shopContainer.className = "shopContainer";
  //   shopsList.append(shopContainer);
  //   const storeIcon = document.createElement("img");
  //   storeIcon.className = "store-icon";
  //   storeIcon.src = "./images/store-alt-solid.svg";
  //   shopContainer.append(storeIcon);
  //   storeIcon.setAttribute("alt", "store image");
  //   const storeText = document.createElement("p");
  //   storeText.textContent = el;
  //   shopContainer.append(storeText);
  //   const trashButton = document.createElement("button");
  //   shopContainer.append(trashButton);
  //   trashButton.className = "trashButton";
  //   trashButton.title = "Usuń";
  //   const trashImage = document.createElement("img");
  //   trashImage.className = "trashImage";
  //   trashButton.append(trashImage);
  //   trashImage.src = "./images/icons8-trash-can.svg";
  // });

  tabButton.forEach((el) => {
    el.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      const productId = id.split("_")[0];
      const contMainAll = document.querySelectorAll("[data-product]");
      const contMainProd = document.querySelectorAll(
        `[data-product=${productId}]`
      );
      contMainAll.forEach((container) => {
        if (container.classList.contains("active")) {
          container.classList.remove("active");
        }
      });
      contMainProd.forEach((cont) => {
        cont.classList.add("active");
      });
      if (id) {
        tabButton.forEach((but) => {
          but.classList.remove("active");
        });

        e.currentTarget.classList.add("active");
        contents.forEach((content) => {
          content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
      }
    });
  });

  const contMainKart = document.querySelectorAll('[data-product="Kartacze"]');
  const contMainAll = document.querySelectorAll("[data-product]");
  contMainKart.forEach((container) => {
    container.classList.add("active");
  });

  const returnItemsInput = document.querySelectorAll('.returnItems');
  returnItemsInput.forEach((item) => {
    item.classList.add("hide");
  });
  const saveReturnButton = document.querySelectorAll('.save-return-button');
  saveReturnButton.forEach((item) => {
    item.classList.add("invisible");
  })

  const activeButton = document.querySelectorAll(".tab-button");
  const returnKartaczeButton = document.querySelector('[data-id="Kartacze_Return"]');
  const returnButton = document.querySelector('.return-button');
  const soldItemsInput = document.querySelectorAll('.soldItems');
  const saveSaleButton = document.querySelectorAll('.save-sale-button');
  const addContainerButton = document.querySelectorAll('.add-container');
  returnButton.addEventListener("click", ()=>{
    activeButton.forEach((button) => {
      button.classList.remove("active");
    })
    returnItemsInput.forEach((item) => {
      item.classList.remove("hide");
    });
    saveReturnButton.forEach((item) => {
      item.classList.remove("invisible");
    });
    soldItemsInput.forEach((item) =>{
      item.classList.add("hide")
    });
    saveSaleButton.forEach((item) => {
      item.classList.add("invisible");
    });
    returnKartaczeButton.classList.add("active");
    addContainerButton.forEach((item) => {
      item.classList.add("invisible");
    })
  });

  const saleButton = document.querySelector('.sale-button');
  const KartaczeSaleButton = document.querySelector('[data-id="Kartacze_Sale"]')

  saleButton.addEventListener("click", ()=>{
    returnItemsInput.forEach((item) => {
      item.classList.add("hide");
    });
    soldItemsInput.forEach((item) =>{
      item.classList.remove("hide")
    });
    saveReturnButton.forEach((item) => {
      item.classList.add("invisible");
    })
    saveSaleButton.forEach((item) => {
      item.classList.remove("invisible");
    });
    returnKartaczeButton.classList.remove("active");
    KartaczeSaleButton.classList.add("active");
    addContainerButton.forEach((item) => {
      item.classList.remove("invisible");
    })
  });

  
  addContainerButton.forEach((button) => {
    button.addEventListener("click",(e) => {
      console.log("hello");
      const extraSaleContainer = document.createElement("div");
      const wrapperElCont = e.currentTarget.parentElement.parentElement.parentElement;
      wrapperElCont.append(extraSaleContainer);
      extraSaleContainer.className = "extra-sale-container";
      wrapperElCont.style.height = wrapperElCont.scrollHeight + "px";
      let currentHeight = formTab.style.height;
      formTab.style.height = parseInt(currentHeight) + 100 + "px";
    })
  
  })
  

  //=============================================================
  //responsive nav menu
  const hamburger = document.querySelector(".hamburger");
  const siteNav = document.querySelector(".site-nav");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    siteNav.classList.toggle("active");
  });

  document.querySelectorAll("nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      siteNav.classList.remove("active");
    })
  );
});
