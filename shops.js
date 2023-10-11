let shops = [
  'Maja',
  'Kowalskiego',
  'Nowomiejska',
  'Lityńskiego',
  'Stankiewicza',
  'Buczka',
  'Świerkowa',
];

const shopContainer = document.getElementById('shopsList');

shops.forEach((shop, index) => {
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
