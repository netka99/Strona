// Update of all data in the database
// fetch('https://smacznykaseksuwalki.com/api/settings/aneta', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     shops: [
//       'Eden - Noniewicza',
//       'Lewiatan - Waryńskiego',
//       'Lewiatan - Sikorskiego',
//       'Lewiatan - Putry',
//       'Lewiatan - Świerkowa',
//       'Lewiatan - W. Polskiego',
//       'Stan - Maja',
//     ],
//     prices: {
//       Kartacze: 7,
//       Babka: 14,
//       Kiszka: 20,
//     },
//   }),
// }).then((resp) => resp.json().then((data) => console.log(data)));

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
    const shopsData = await fetchData(
      'https://smacznykaseksuwalki.com/api/settings/aneta'
    );
    console.log(shopsData.shops);
    console.log(shopsData);

    showShops(shopsData.shops);
  } catch (error) {
    console.error('Error:', error);
  }
}

loadShops();

showShops(shops);
const addButton = document.getElementById('addShop');
const addShopValue = document.getElementById('shopName');

const addShop = () => {
  shops.push(addShopValue.value);

  console.log(addShopValue.value);
};

addButton.addEventListener('click', addShop);
