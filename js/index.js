// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = +product.querySelector('.price span').textContent;
  const quantity = +product.querySelector('.quantity input').value;
  const subtotalPrice = price * quantity;
  const subtotal = product.querySelector('.subtotal span');

  subtotal.innerHTML = subtotalPrice;

  return subtotalPrice;

}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  //const singleProduct = document.querySelector('.product');
  //updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  const products = document.querySelectorAll('.product');
  const total = document.querySelector('#total-value span');
  let totalPrice = 0;

  products.forEach(product => {
    updateSubtotal(product);

    totalPrice += updateSubtotal(product);

    console.log(totalPrice);
  });

  // ITERATION 3
  total.innerHTML = Math.round(totalPrice*100)/100;
  
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget.parentNode.parentNode;
  const targetParent = target.parentNode;
  
  console.log('The target in remove is:', target);
  targetParent.removeChild(target);
  
  calculateAll();
}

// ITERATION 5

function createProduct() {
  //get input values

  const productAdded = document.querySelectorAll('.create-product td input')[0].value;
  const priceAdded = document.querySelectorAll('.create-product td input')[1].value;

  //create html structure

  const newProd = document.createElement('tr');
  const tdName = document.createElement('td')
  
  newProd.append(tdName);
  
  const tdPrice = document.createElement('td');
  
  newProd.append(tdPrice);
  
  const tdQuant = document.createElement('td');

  newProd.append(tdQuant);
  tdQuant.append(document.createElement('input'));

  const tdSubtotal = document.createElement('td');

  newProd.append(tdSubtotal);

  const tdAction = document.createElement('td');

  newProd.append(tdAction);
  tdAction.append(document.createElement('button'));
  
  const tbodyParent = document.querySelector('tbody');

  tbodyParent.append(newProd);

  //set attributes

  const newProductTr = document.querySelectorAll('tbody tr')[document.querySelectorAll('tbody tr').length-1];

  newProductTr.setAttribute('class', 'product');

  const newProductTdArr = newProductTr.querySelectorAll('td');

  newProductTdArr[0].setAttribute('class', 'name');
  newProductTdArr[1].setAttribute('class', 'price');
  newProductTdArr[2].setAttribute('class', 'quantity');
  newProductTdArr[3].setAttribute('class', 'subtotal');
  newProductTdArr[4].setAttribute('class', 'action');

  newProductTr.querySelector('input').setAttribute('type', 'number');
  newProductTr.querySelector('input').setAttribute('value', '0');
  newProductTr.querySelector('input').setAttribute('min', '0');
  newProductTr.querySelector('input').setAttribute('placeholder', 'quantity');

  newProductTr.querySelector('button').setAttribute('class', 'btn');
  newProductTr.querySelector('button').classList.add('btn-remove');
  newProductTr.querySelector('button').innerHTML = `Remove`;

  newProductTr.querySelectorAll('.price')[newProductTr.querySelectorAll('.price').length-1].innerHTML = `$<span>0</span>`;
  newProductTr.querySelectorAll('.subtotal')[newProductTr.querySelectorAll('.subtotal').length-1].innerHTML = `$<span>0</span>`;
  newProductTr.querySelectorAll('.name')[newProductTr.querySelectorAll('.name').length-1].innerHTML = `<span>${productAdded}</span>`;
  newProductTr.querySelectorAll('.price span')[newProductTr.querySelectorAll('.price span').length-1].innerHTML = priceAdded;

  document.querySelectorAll('.create-product td input')[0].value = ``;
  document.querySelectorAll('.create-product td input')[1].value = ``;

  const btnArr = newProductTr.querySelectorAll('.btn-remove');
  btnArr.forEach(button => button.addEventListener('click', removeProduct));
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeBtnList = document.querySelectorAll(`.btn-remove`);
  removeBtnList.forEach(button => {
    button.addEventListener('click', removeProduct);
  });

  const createProductBtn = document.getElementById('create');
  createProductBtn.addEventListener('click', createProduct);

});
