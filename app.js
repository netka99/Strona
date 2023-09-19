
const headerButtons = [];

let totals = {};
totals.Kartacze = [];
totals.Babka = [];
totals.Kiszka = [];

let totalsReturn = {};
totalsReturn.Kartacze = [];
totalsReturn.Babka = [];
totalsReturn.Kiszka = [];

let totalsExtraDelivery = [];

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
  let counterExtraSale = 0; //counter of button's clicks

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
      arrowEl.className = "arrow";

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
        containerMain.setAttribute("id", prod[0] + "_" + item + "_" + indexes);
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
        returnInput.setAttribute("id", `${item}_${prod[0]}_return`);
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
        addContainer.setAttribute("data-extrasale", prod[0]);

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
      formTab.style.height = 750 + "px";

      accordionEl.addEventListener("click", (e) => {
        let wrapperEl =
          e.currentTarget.parentElement.parentElement.nextElementSibling;
        let arrow = e.currentTarget.children[0];
        let currentHeight = formTab.style.height;
        if (wrapperEl.style.height) {
          wrapperEl.style.height = null;
          arrow.style = "transform:rotate(" + 0 + "-180deg)";
          if (counterExtraSale >= 1) {
            formTab.style.height =
              parseInt(currentHeight) -
              (160 + (counterExtraSale * 140) / counterExtraSale) +
              "px";
          }
          if (counterExtraSale === 0) {
            formTab.style.height = parseInt(currentHeight) - 160 + "px";
          }
        } else {
          wrapperEl.style.height = wrapperEl.scrollHeight + "px";
          arrow.style = "transform:rotate(" + 0 + "180deg)";
          if (counterExtraSale >= 1) {
            formTab.style.height =
              parseInt(currentHeight) +
              (160 + (counterExtraSale * 140) / counterExtraSale) +
              "px";
          }
          if (counterExtraSale === 0) {
            formTab.style.height = parseInt(currentHeight) + 160 + "px";
          }
          // formTab.style.height = parseInt(currentHeight) + 160 + "px";
          //formTab.style.height = formTab.scrollHeight + "px";
        }
      });
    });
  });

  const addContainerButton = document.querySelectorAll(".add-container");

  //container for extra delivery
  addContainerButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      counterExtraSale += 1;

      const extraSaleContainer = document.createElement("div");
      const wrapperElCont =
        e.currentTarget.parentElement.parentElement.parentElement;
      wrapperElCont.append(extraSaleContainer);

      const extraSaleId =
        e.currentTarget.parentElement.parentElement.parentElement.children[0]
          .id;
      const extraSaleProductId = extraSaleId.split("_")[1];

      extraSaleContainer.className = "extra-sale-container";
      wrapperElCont.style.height = wrapperElCont.scrollHeight + "px";
      let currentHeight = formTab.style.height;
      formTab.style.height = parseInt(currentHeight) + 145 + "px";

      const extraSaleWrapper = document.createElement("div");
      extraSaleContainer.append(extraSaleWrapper);
      extraSaleWrapper.classList = "extra-Sale-Wrapper";

      const extraSaleTitle = document.createElement("div");
      extraSaleWrapper.append(extraSaleTitle);
      extraSaleTitle.className = "extra-sale-title";
      const extraSaleTitleImage = document.createElement("img");
      extraSaleTitle.append(extraSaleTitleImage);
      extraSaleTitleImage.src = "./images/delivery-truck.svg";
      extraSaleTitleImage.setAttribute("alt", "basket image");

      const extraSaleTitleText = document.createElement("p");
      extraSaleTitleText.textContent = "Extra dowóz";
      extraSaleTitle.append(extraSaleTitleText);

      const extraSaleInputContainer = document.createElement("div");
      extraSaleWrapper.append(extraSaleInputContainer);
      extraSaleInputContainer.className = "extra-sale-input";
      const extraSaleLabel = document.createElement("label");
      extraSaleInputContainer.append(extraSaleLabel);
      extraSaleLabel.setAttribute("for", "sold");
      extraSaleLabel.textContent = "Sprzedaż";
      const extraSaleInput = document.createElement("input");
      extraSaleInputContainer.append(extraSaleInput);
      extraSaleInput.setAttribute("type", "number");
      extraSaleInput.setAttribute("min", "0");
      extraSaleInput.setAttribute("id", `${extraSaleProductId}_Kartacze_Extra`);
      const extraSaleItemsQuant = document.createElement("p");
      extraSaleInputContainer.append(extraSaleItemsQuant);
      extraSaleItemsQuant.textContent = "szt.";
      extraSaleItemsQuant.className = "itemsQuantities";

      //button
      const extraSaleButtonCont = document.createElement("div");
      extraSaleContainer.append(extraSaleButtonCont);
      extraSaleButtonCont.classList = "extra-sale";

      const extraSaleButton = document.createElement("button");
      extraSaleButtonCont.append(extraSaleButton);
      extraSaleButton.className = "extra-sale-button";
      extraSaleButton.innerHTML = "Zapisz dowóz";

      extraSaleButton.addEventListener("click", function extraSale(e) {
        e.currentTarget.classList.add("active");
        extraSaleButton.innerHTML = "Zapisana";

        totalsExtraDelivery.push(Number(extraSaleInput.value));
        extraSaleInput.disabled = true;

        e.currentTarget.removeEventListener("click", extraSale)

        summarySaleReturn()
      })
    });
  });

  async function postDataToApi() {
    // Your JSON data
    const data = {
      "id": null,
      "product": "Kartacze",
      "quantity": 15,
      "isDiscounted": false,
      "shop": "Maja",
      "date": "2023-08-29"
    };
  
    // API endpoint URL
    const apiUrl = "https://www.smacznykaseksuwalki.com/api/sales"; // Replace with your actual API URL
  
    try {
      // Prepare the request headers
      const headers = {
        "Content-Type": "application/json",
        // Add any other headers you may need (e.g., authorization token)
      };
  
      // Create the request options
      const requestOptions = {
        method: "POST", // Use the appropriate HTTP method (e.g., POST, PUT, GET, etc.)
        headers: headers,
        body: JSON.stringify(data) // Convert the JSON data to a string
      };
  
      // Send the POST request to the API and await the response
      const response = await fetch(apiUrl, requestOptions);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response JSON (if the API returns JSON)
      const responseData = await response.json();
  
      // Handle the API response data here
      console.log("API Response:", responseData);
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error("Error:", error);
    }
  }
  
  // Call the function to post data to the API
  postDataToApi();
  
  
  // async function fetchDataFromApi() {
  //   // API endpoint URL
  //   const apiUrl = "https://www.smacznykaseksuwalki.com/api/sales"; // Replace with your actual API URL
  
  //   try {
  //     // Send the GET request to the API and await the response
  //     const response = await fetch(apiUrl);
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     // Parse the response JSON
  //     const responseData = await response.json();
  
  //     // Handle the API response data here
  //     console.log("API Response:", responseData);
  //   } catch (error) {
  //     // Handle any errors that occurred during the fetch
  //     console.error("Error:", error);
  //   }
  // }
  
  // // Call the function to fetch data from the API
  // fetchDataFromApi();
  
  

  //Saving button - sending data to summary container, summary of sale and returns
  let sumSaleKartacze, sumSaleBabka, sumSaleKiszka, sumReturnKartacze, sumReturnBabka, sumReturnKiszka, sumExtraDelivery;
  sumSaleKartacze = sumSaleBabka = sumSaleKiszka = sumReturnKartacze = sumReturnBabka = sumReturnKiszka = sumExtraDelivery = 0;
  const sumQuantKartacze = document.querySelector(".sumQuantityFirst");
  const sumQuantBabka = document.querySelector(".sumQuantitySecond");
  const sumQuantKiszka = document.querySelector(".sumQuantityThird");
  const sumQuantExtra = document.querySelector("#quantityFirstExtra");
  const saveSaleButtons = document.querySelectorAll(".save-sale-button");
  const saveReturnButtons = document.querySelectorAll(".save-return-button");
  const initialValue = 0;

  


// functionality for Sale Button
  function SaveSale(e) {
    const checkedButton =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .children[0].children[1].children[0];
    const soldInputValue =
      e.currentTarget.parentElement.parentElement.children[0].children[1]
        .children[0].children[1];
    checkedButton.style.color = "white";

    const soldInputId = soldInputValue.id;
    const soldInputIdProduct = soldInputId.split("_")[1];
    const soldInputIdName = `${soldInputIdProduct}`;
    totals[soldInputIdName].push(Number(soldInputValue.value));

    sumSaleKartacze = totals.Kartacze.reduce((v, i) => v + i, initialValue);
    sumSaleBabka = totals.Babka.reduce((v, i) => v + i, initialValue);
    sumSaleKiszka = totals.Kiszka.reduce((v, i) => v + i, initialValue);

    const quantityFirstSold = document.getElementById("quantityFirstSold");
    quantityFirstSold.innerHTML = sumSaleKartacze + " szt";
    const quantitySecondSold = document.getElementById("quantitySecondSold");
    quantitySecondSold.innerHTML = sumSaleBabka.toFixed(2) + " kg";
    const quantityThirdSold = document.getElementById("quantityThirdSold");
    quantityThirdSold.innerHTML = sumSaleKiszka.toFixed(2) + " kg";

    e.currentTarget.innerHTML = "Zapisana";
    soldInputValue.disabled = true;

    e.currentTarget.removeEventListener("click", SaveSale);

    summarySaleReturn()
      

  }

 // functionality for Return Button
  function SaveReturn(e) {
    const checkedButtonReturn =
      e.currentTarget.parentElement.parentElement.parentElement.parentElement
        .children[0].children[1].children[0];
    const returnInputValue =
      e.currentTarget.parentElement.parentElement.children[0].children[1]
        .children[1].children[1];
    checkedButtonReturn.style.color = "white";

    const returnInputId = returnInputValue.id;
    const returnInputIdProduct = returnInputId.split("_")[1];
    const returnInputIdName = `${returnInputIdProduct}`;
    totalsReturn[returnInputIdName].push(Number(returnInputValue.value));

    const initialValue = 0;
    sumReturnKartacze = totalsReturn.Kartacze.reduce(
      (v, i) => v + i,
      initialValue
    );
    sumReturnBabka = totalsReturn.Babka.reduce(
      (v, i) => v + i,
      initialValue
    );
    sumReturnKiszka = totalsReturn.Kiszka.reduce(
      (v, i) => v + i,
      initialValue
    );

    const quantityFirstReturned = document.getElementById(
      "quantityFirstReturned"
    );
    quantityFirstReturned.innerHTML = sumReturnKartacze + " szt";
    const quantitySecondReturned = document.getElementById(
      "quantitySecondReturned"
    );
    quantitySecondReturned.innerHTML = sumReturnBabka.toFixed(2) + " kg";
    const quantityThirdReturned = document.getElementById(
      "quantityThirdReturned"
    );
    quantityThirdReturned.innerHTML = sumReturnKiszka.toFixed(2) + " kg";

    returnInputValue.disabled = true;

    e.currentTarget.removeEventListener("click", SaveReturn);

    summarySaleReturn();
  };


 

  saveSaleButtons.forEach((button) => {
    button.addEventListener("click", SaveSale);
  });
  saveReturnButtons.forEach((button) => {
    button.addEventListener("click", SaveReturn);
  });


  function summarySaleReturn() {
    sumExtraDelivery = totalsExtraDelivery.reduce((v, i) => v + i, initialValue);
    sumQuantExtra.innerHTML = sumExtraDelivery + " szt";

    const sumSaleReturnKartacze =  sumSaleKartacze + sumExtraDelivery - sumReturnKartacze;
    sumQuantKartacze.innerHTML = sumSaleReturnKartacze + " szt";

    const sumSaleReturnBabka =  sumSaleBabka - sumReturnBabka;
    sumQuantBabka.innerHTML = sumSaleReturnBabka.toFixed(2) + " kg";

    const sumSaleReturnKiszka =  sumSaleKiszka - sumReturnKiszka;
    sumQuantKiszka.innerHTML = sumSaleReturnKiszka.toFixed(2) + " kg";
  }

  
  const wrapperContainers = document.querySelectorAll(".wrapper");
  const arrowElements = document.querySelectorAll(".arrow");

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
        tabButton.forEach((button) => {
          button.classList.remove("active");
        });

        e.currentTarget.classList.add("active");
        contents.forEach((content) => {
          content.classList.remove("active");
        });
        const element = document.getElementById(id);
        element.classList.add("active");
      }

      formTab.style.height = 750 + "px";
      wrapperContainers.forEach((item) => {
        item.style.height = null;
      });

      arrowElements.forEach((item) => {
        item.style = "transform:rotate(" + 0 + "-180deg)";
      });
     
    });
  });

  const contMainKart = document.querySelectorAll('[data-product="Kartacze"]');
  contMainKart.forEach((container) => {
    container.classList.add("active");
  });

  const returnItemsInput = document.querySelectorAll(".returnItems");
  returnItemsInput.forEach((item) => {
    item.classList.add("hide");
  });
  const saveReturnButton = document.querySelectorAll(".save-return-button");
  saveReturnButton.forEach((item) => {
    item.classList.add("invisible");
  });

  const activeButton = document.querySelectorAll(".tab-button");
  const returnKartaczeButton = document.querySelector(
    '[data-id="Kartacze_Return"]'
  );
  const kartaczeReturnContainer = document.querySelector("#Kartacze_Return");
  const kartaczeSaleContainer = document.querySelector("#Kartacze_Sale");
  const returnButton = document.querySelector(".return-button");
  const soldItemsInput = document.querySelectorAll(".soldItems");
  const saveSaleButton = document.querySelectorAll(".save-sale-button");
  const contMainAll = document.querySelectorAll("[data-product]");
  const contKartacze = document.querySelectorAll(`[data-product="Kartacze"]`);
  const extraSaleButtonBabka = document.querySelectorAll(
    '[data-extrasale="Babka"]'
  );
  const extraSaleButtonKiszka = document.querySelectorAll(
    '[data-extrasale="Kiszka"]'
  );

  //adding functionality to Sale and Return Button
  returnButton.addEventListener("click", () => {
    activeButton.forEach((button) => {
      button.classList.remove("active");
    });
    returnItemsInput.forEach((item) => {
      item.classList.remove("hide");
    });
    saveReturnButton.forEach((item) => {
      item.classList.remove("invisible");
    });
    soldItemsInput.forEach((item) => {
      item.classList.add("hide");
    });
    saveSaleButton.forEach((item) => {
      item.classList.add("invisible");
    });
    returnKartaczeButton.classList.add("active");
    addContainerButton.forEach((item) => {
      item.classList.add("invisible");
    });

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    kartaczeReturnContainer.classList.add("active");

    contMainAll.forEach((item) => {
      item.classList.remove("active");
    });

    contKartacze.forEach((cont) => {
      cont.classList.add("active");
    });

    formTab.style.height = 750 + "px";
    wrapperContainers.forEach((item) => {
      item.style.height = null;
    });

    arrowElements.forEach((item) => {
      item.style = "transform:rotate(" + 0 + "-180deg)";
    });
  });

  const saleButton = document.querySelector(".sale-button");
  const KartaczeSaleButton = document.querySelector(
    '[data-id="Kartacze_Sale"]'
  );

  saleButton.addEventListener("click", () => {
    returnItemsInput.forEach((item) => {
      item.classList.add("hide");
    });
    soldItemsInput.forEach((item) => {
      item.classList.remove("hide");
    });
    saveReturnButton.forEach((item) => {
      item.classList.add("invisible");
    });
    saveSaleButton.forEach((item) => {
      item.classList.remove("invisible");
    });
    returnKartaczeButton.classList.remove("active");
    KartaczeSaleButton.classList.add("active");
    addContainerButton.forEach((item) => {
      item.classList.remove("invisible");
    });

    contMainAll.forEach((item) => {
      item.classList.remove("active");
    });

    contKartacze.forEach((cont) => {
      cont.classList.add("active");
    });

    extraSaleButtonBabka.forEach((item) => {
      item.classList.add("invisible");
    });
    extraSaleButtonKiszka.forEach((item) => {
      item.classList.add("invisible");
    });

    contents.forEach((content) => {
      content.classList.remove("active");
    });
    kartaczeSaleContainer.classList.add("active");

    formTab.style.height = 750 + "px";
    wrapperContainers.forEach((item) => {
      item.style.height = null;
    });

    arrowElements.forEach((item) => {
      item.style = "transform:rotate(" + 0 + "-180deg)";
    });
  });

  //hide Button "+" from all products except "Kartacze"
  extraSaleButtonBabka.forEach((item) => {
    item.classList.add("invisible");
  });
  extraSaleButtonKiszka.forEach((item) => {
    item.classList.add("invisible");
  });

  

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

