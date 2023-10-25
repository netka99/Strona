// // Example usage:
// const newShops = [
//   'Eden - Noniewicza',
//   'Lewiatan - Waryńskiego',
//   'Lewiatan - Sikorskiego',
//   'Lewiatan - Putry',
//   'Lewiatan - Świerkowa',
//   'Lewiatan - W. Polskiego',
//   'Stan - Maja',
// ];
// const newPrices = {
//   Kartacze: 7,
//   Babka: 14,
//   Kiszka: 20,
// };

let shopsAmended = [];
let pricesAmended = {};

async function updateSettings(shops, prices) {
  try {
    const response = await fetch(APISettings, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shops,
        prices,
      }),
    });
    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

//Load dinamically list of shops
const shopContainer = document.getElementById('shopsListSettings');
const showShops = (data) => {
  data.forEach((shop, index) => {
    const shopElement = document.createElement('div');
    shopElement.classList.add('shop');
    shopContainer.appendChild(shopElement);

    const shopPicture = document.createElement('img');
    shopPicture.className = 'store-picture';
    shopPicture.src = './images/store-alt-solid.svg';
    shopElement.append(shopPicture);
    shopPicture.setAttribute('alt', 'shop image');

    const shopText = document.createElement('p');
    shopText.textContent = shop;
    shopElement.append(shopText);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    shopElement.append(buttonContainer);

    const editButton = document.createElement('button');
    buttonContainer.append(editButton);
    editButton.classList.add('edit-button');
    editButton.setAttribute('id', 'edit-button');
    editButton.setAttribute('data-index', index);
    editButton.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      const shopElement = e.currentTarget.parentNode.parentNode;
      shopElement.querySelector('p');
      // Create an input element and replace the p element with it
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.classList.add('inputFieldShop');
      inputField.value = shopText.textContent;
      shopElement.replaceChild(inputField, shopText);
      inputField.focus();

      inputField.addEventListener('blur', () => {
        const newShopName = inputField.value;
        if (newShopName) {
          const newShopText = document.createElement('p');
          newShopText.textContent = newShopName;
          shopElement.replaceChild(newShopText, inputField);
          shopsAmended[index] = newShopName;
          updateSettings(shopsAmended, pricesAmended);
        } else {
          shopElement.replaceChild(shopText, inputField);
        }
      });
    });

    const editImg = document.createElement('img');
    editButton.append(editImg);
    editImg.className = 'item-picture';
    editImg.src = './images/edit.png';
    editImg.setAttribute('alt', 'edit');

    const deleteButton = document.createElement('button');
    buttonContainer.append(deleteButton);
    deleteButton.classList.add('delete-button');
    deleteButton.setAttribute('id', 'delete-button');
    deleteButton.setAttribute('data-index', index);
    deleteButton.addEventListener('click', (e) => {
      const index = e.currentTarget.dataset.index;
      shopsAmended.splice(index, 1);
      clearShopsContainer();
      showShops(shopsAmended);
      updateSettings(shopsAmended, pricesAmended);
    });

    const deleteImg = document.createElement('img');
    deleteButton.append(deleteImg);
    deleteImg.className = 'item-picture';
    deleteImg.src = './images/delete.png';
    deleteImg.setAttribute('alt', 'delete');
  });
};

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function loadShops() {
  try {
    const shopsData = await fetchData(APISettings);
    shopsAmended = shopsData.shops;
    pricesAmended = shopsData.prices;
    console.log(pricesAmended);

    showShops(shopsData.shops);
  } catch (error) {
    console.error('Error:', error);
  }
}

loadShops();

//remove all instances of a shopContainer div
const clearShopsContainer = () => {
  while (shopContainer.firstChild) {
    shopContainer.removeChild(shopContainer.firstChild);
  }
};

const addButton = document.getElementById('addShop');
const addShopValue = document.getElementById('shopName');

//add shop to the list
const addShop = () => {
  shopsAmended.push(addShopValue.value);
  clearShopsContainer();
  showShops(shopsAmended);
  updateSettings(shopsAmended, pricesAmended);
};

addButton.addEventListener('click', addShop);

//========================================

//Prices functionality
