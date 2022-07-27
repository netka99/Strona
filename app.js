const data = [
  {
    id: 1,
    shopName: "Sklep Maja",
    countKartacze: 0,
    countBabka: 0,
  },
  {
    id: 2,
    shopName: "Sklep Kowalskiego",
    countKartacze: 0,
    countBabka: 0,
  },
  {
    id: 3,
    shopName: "Sklep Nowomiejska",
    countKartacze: 0,
    countBabka: 0,
  },
  {
    id: 4,
    shopName: "Sklep Lityńskiego",
    countKartacze: 0,
    countBabka: 0,
  },
  {
    id: 5,
    shopName: "Sklep Stankiewicza",
    countKartacze: 0,
    countBabka: 0,
  },
  {
    id: 6,
    shopName: "Sklep Buczka",
    countKartacze: 0,
    countBabka: 0,
  },
  {
    id: 7,
    shopName: "Sklep Świerkowa",
    countKartacze: 0,
    countBabka: 0,
  },
];

const totalKartacze = [];
const totalBabka = [];
const totalKartaczeReturn = [];
const totalBabkaReturn = [];
let priceKartacze = 4;
let priceBabka = 23;


window.addEventListener("load", () => {
  //HTML of each section
  data.forEach(function (item, index) {
    const mainContent = document.getElementById("mainContent");
    const section = document.createElement("section");
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
    storeText.textContent = item.shopName;
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
    const containerMain = document.createElement("div");
    wrapper.append(containerMain);
    containerMain.className = "containerMain";
    containerMain.setAttribute("id", "containerMain");
    const containerItem = document.createElement("div");
    containerMain.append(containerItem);
    containerItem.className = "containerItem";
    const imageItem = document.createElement("div");
    containerItem.append(imageItem);
    imageItem.className = "imageItem";
    const itemPictureFirst = document.createElement("img");
    imageItem.append(itemPictureFirst);
    itemPictureFirst.className = "item-picture";
    itemPictureFirst.src = "./images/kartaczeSmall.jpg";
    itemPictureFirst.setAttribute("alt", "kartacze image");
    const itemFirstText = document.createElement("p");
    imageItem.append(itemFirstText);
    itemFirstText.textContent = "Kartacze";

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
    soldInput.setAttribute("id", "soldKartacze");
    const itemsQuantitiesF = document.createElement("p");
    soldItemsFirst.append(itemsQuantitiesF);
    itemsQuantitiesF.textContent = "szt.";
    itemsQuantitiesF.className = "itemsQuantities";

    const soldItemsSecond = document.createElement("div");
    items.append(soldItemsSecond);
    soldItemsSecond.className = "soldItems";
    const returnLabel = document.createElement("label");
    soldItemsSecond.append(returnLabel);
    returnLabel.setAttribute("for", "sold");
    returnLabel.textContent = "Zwrot";
    const returnInput = document.createElement("input");
    soldItemsSecond.append(returnInput);
    returnInput.setAttribute("type", "number");
    returnInput.setAttribute("min", "0");
    returnInput.setAttribute("id", "returnedKartacze");
    const itemsQuantitiesS = document.createElement("p");
    soldItemsSecond.append(itemsQuantitiesS);
    itemsQuantitiesS.textContent = "szt.";
    itemsQuantitiesS.className = "itemsQuantities";

    //second Item(product) listed
    const containerItemSec = document.createElement("div");
    containerMain.append(containerItemSec);
    containerItemSec.className = "containerItem";
    const imageItemSec = document.createElement("div");
    containerItemSec.append(imageItemSec);
    imageItemSec.className = "imageItem";
    const itemPictureSec = document.createElement("img");
    imageItemSec.append(itemPictureSec);
    itemPictureSec.className = "item-picture";
    itemPictureSec.src = "./images/babke-ziemniaczanaSmall.jpg";
    itemPictureSec.setAttribute("alt", "babka ziemniaczana image");
    const itemSecText = document.createElement("p");
    imageItemSec.append(itemSecText);
    itemSecText.textContent = "Babka";

    const itemsSec = document.createElement("div");
    containerItemSec.append(itemsSec);
    itemsSec.className = "items";
    const soldItemsSec = document.createElement("div");
    itemsSec.append(soldItemsSec);
    soldItemsSec.className = "soldItems";
    const soldLabelSec = document.createElement("label");
    soldItemsSec.append(soldLabelSec);
    soldLabelSec.setAttribute("for", "sold");
    soldLabelSec.textContent = "Sprzedaż";
    const soldInputSec = document.createElement("input");
    soldItemsSec.append(soldInputSec);
    soldInputSec.setAttribute("type", "number");
    soldInputSec.setAttribute("min", "0");
    soldInputSec.setAttribute("id", "soldBabka");
    soldInputSec.setAttribute("step", "any");
    const itemsQuantitiesSec = document.createElement("p");
    soldItemsSec.append(itemsQuantitiesSec);
    itemsQuantitiesSec.textContent = "kg";
    itemsQuantitiesSec.className = "weight";

    const returnItemsSecond = document.createElement("div");
    itemsSec.append(returnItemsSecond);
    returnItemsSecond.className = "soldItems";
    const returnLabelSed = document.createElement("label");
    returnItemsSecond.append(returnLabelSed);
    returnLabelSed.setAttribute("for", "returned");
    returnLabelSed.textContent = "Zwrot";
    const returnInputSec = document.createElement("input");
    returnItemsSecond.append(returnInputSec);
    returnInputSec.setAttribute("type", "number");
    returnInputSec.setAttribute("min", "0");
    returnInputSec.setAttribute("id", "returnedBabka");
    returnInputSec.setAttribute("step", "any");
    const itemsQuantitiesRet = document.createElement("p");
    returnItemsSecond.append(itemsQuantitiesRet);
    itemsQuantitiesRet.textContent = "kg";
    itemsQuantitiesRet.className = "weight";

    const containerSaving = document.createElement("div");
    wrapper.append(containerSaving);
    containerSaving.className = "containerSaving";
    containerSaving.setAttribute("id", "containerSaving");

    const correctButton = document.createElement("button");
    containerSaving.append(correctButton);
    correctButton.textContent = "Popraw";

    const addButton = document.createElement("button");
    containerSaving.append(addButton);
    addButton.innerHTML = "&#xFF0B";

    const submitButton = document.createElement("button");
    containerSaving.append(submitButton);
    submitButton.textContent = "Zapisz";

    //accordion to open and close wrapper
    accordionEl.addEventListener("click", (e) => {
      let wrapperEl =
        e.currentTarget.parentElement.parentElement.nextElementSibling;
      let arrow = e.currentTarget.children[0];
      if (wrapperEl.style.height) {
        wrapperEl.style.height = null;
        arrow.style = "transform:rotate(" + 0 + "-180deg)";
      } else {
        wrapperEl.style.height = wrapperEl.scrollHeight + "px";
        arrow.style = "transform:rotate(" + 0 + "180deg)";
      }
    });

    //Saving button - sending data to summary container, summary of sale and returns
    function SavingData(e) {
      buttonCheck.style.color = "white";
      totalKartacze.push(soldInput.value);
      totalBabka.push(soldInputSec.value);
      totalKartaczeReturn.push(returnInput.value);
      totalBabkaReturn.push(returnInputSec.value);
      item.countKartacze += Number(soldInput.value);
      item.countBabka += Number(soldInputSec.value).toFixed(2);
      item.countKartacze -= Number(returnInput.value);
      item.countBabka -= Number(returnInputSec.value).toFixed(2);

      let sumKartacze = Array.from(totalKartacze, Number).reduce(
        (v, i) => v + i
      );
      let sumBabka = Array.from(totalBabka, Number)
        .reduce((v, i) => v + i)
        .toFixed(2);
      let sumReturnsKartacze = Array.from(totalKartaczeReturn, Number).reduce(
        (v, i) => v + i
      );
      let sumReturnsBabka = Array.from(totalBabkaReturn, Number)
        .reduce((v, i) => v + i)
        .toFixed(2);

      const quantityFirstSold = document.getElementById("quantityFirstSold");
      quantityFirstSold.innerHTML = sumKartacze + " szt";
      const quantitySecondSold = document.getElementById("quantitySecondSold");
      quantitySecondSold.innerHTML = sumBabka + " kg";
      const quantityFirstReturned = document.getElementById(
        "quantityFirstReturned"
      );
      quantityFirstReturned.innerHTML = sumReturnsKartacze + " szt";
      const quantitySecondReturned = document.getElementById(
        "quantitySecondReturned"
      );
      quantitySecondReturned.innerHTML = sumReturnsBabka + " kg";

      const sumQuantKartacze = document.querySelector(".sumQuantityFirst");
      const summaryQuantKartacze =
        sumKartacze - parseInt(sumReturnsKartacze, 0);
      sumQuantKartacze.innerHTML = summaryQuantKartacze + " szt";

      const sumQuantBabka = document.querySelector(".sumQuantitySecond");
      const summaryQuantBabka = Number(sumBabka) - Number(sumReturnsBabka);
      sumQuantBabka.innerHTML = summaryQuantBabka.toFixed(2) + " kg";

      const priceFirstSold = document.getElementById("priceFirstSold");
      priceFirstSold.innerHTML = (sumKartacze * priceKartacze).toFixed(2) + " zł";

      const priceFirstReturned = document.getElementById("priceFirstReturned");
      priceFirstReturned.innerHTML = (sumReturnsKartacze * priceKartacze).toFixed(2) + " zł";

      const priceSecondSold = document.getElementById("priceSecondSold");
      priceSecondSold.innerHTML = (sumBabka * priceBabka).toFixed(2) + " zł";

      const priceSecondReturned = document.getElementById(
        "priceSecondReturned"
      );
      priceSecondReturned.innerHTML = (sumReturnsBabka * priceBabka).toFixed(2) + " zł";

      const sumPriceFirst = document.querySelector(".sumPriceFirst");
      sumPriceFirst.innerHTML = (summaryQuantKartacze * priceKartacze).toFixed(2) + " zł";

      const sumPriceSecond = document.querySelector(".sumPriceSecond");
      sumPriceSecond.innerHTML = (summaryQuantBabka * priceBabka).toFixed(2) + " zł";

      soldInput.disabled = true;
      soldInputSec.disabled = true;
      returnInput.disabled = true;
      returnInputSec.disabled = true;

      submitButton.removeEventListener("click", SavingData)
    };
    
  //Correct data - correctButton functionality
  function CorrectData() {
    buttonCheck.style.removeProperty('color');
    
    soldInput.disabled = false;
    soldInputSec.disabled = false;
    returnInput.disabled = false;
    returnInputSec.disabled = false;

    submitButton.addEventListener("click",SavingData);

  };


    correctButton.addEventListener("click", CorrectData);
    submitButton.addEventListener("click",SavingData);
  });



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
