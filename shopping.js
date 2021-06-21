// For this task we have 2 classes: Product and Basket.
// Add as many products as you want: each product should have a name, price and quantity.
// 1.   Display the available products in the html - include at least the name and the quantity.
// 2.   When the user clicks on one product, you should add the product to the basked (Hint: create a method in the
//      Basket class that pushes the product into the products array).
// 3.   When a user adds a product to the basket, the total quantity of this product should decrease (should this
//      be a method of the Basket or of the Product class?)
// 4.   Everytime a user adds something in its basket, show the content of the basket in the html and show the
//      decreased amount of the product.
// 5.   If a product goes to 0, show that is sold out and don't let anyone clicking on it.
// 6.   Show the total price of the basket (when a user adds something in the basket, the total should be updated).
// 7.   Apply some discount: if a user buys 4 products of the same kind, one is free.
// 8.   Add as many features as you want

class Product {
  constructor(name, price, quantity, kind) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.kind = kind;
  }

  reduceQuan() {
    if (this.quantity - 1 >= 0) {
      this.quantity -= 1;
    } else {
      this.quantity = 0;
    }
  }

  increaseQuan(amount) {
    this.quantity += amount;
  }
}

class Basket {
  constructor() {
    this.products = [];
  }

  // This method is called when a product is added to basket
  //  1. Find index of the product
  //  2. If found (found != -1), use the index (found) to add the quantity of the product in the basket
  //  3. If NOT found (found == -1), just push the product into the basket
  //  4. prduct is an object that is created at the time of adding
  pushProduct(product) {
    if (this.products.length > 0) {
      const found = this.products.findIndex((p) => p.name == product.name);
      if (found >= 0) {
        this.products[found].quantity += 1;
      } else {
        this.products.push(product);
      }
    } else {
      this.products.push(product);
    }
  }

  // This method returns the array of products
  status() {
    return this.products;
  }
}

let myProducts = [
  new Product('Apples', 40, 2, 'fruits'),
  new Product('Lemons', 32, 18, 'fruits'),
  new Product('Mangos', 44, 24, 'fruits'),
  new Product('Pineapples', 32, 15, 'fruits'),
  new Product('Melons', 100, 4, 'fruits'),
  new Product('Bananas', 12, 10, 'fruits'),
  new Product('Papayas', 9, 7, 'fruits'),
  new Product('Guavas', 15, 10, 'fruits'),
  new Product('Potatoes', 12, 10, 'vegetables'),
  new Product('Beets', 20, 4, 'vegetables'),
  new Product('Eggplant', 5, 9, 'vegetables'),
  new Product('Onions', 23, 7, 'vegetables'),
  new Product('Pumpkins', 40, 10, 'vegetables'),
  new Product('Leeks', 17, 3, 'vegetables'),
  new Product('Carrots', 2, 40, 'vegetables'),
  new Product('Peppers', 10, 5, 'vegetables'),
];

let basket = new Basket();

window.onload = () => {
  displayProducts();
};

const displayProducts = () => {
  displayFruits(myProducts.filter((p) => p.kind === 'fruits'));
  displayVegetables(myProducts.filter((p) => p.kind === 'vegetables'));
};

const displayFruits = (arr) => {
  const fruitsContainer = document.getElementById('fruits-container');
  fruitsContainer.innerHTML = '';
  createProductsDom(arr, fruitsContainer);
};

const displayVegetables = (arr) => {
  const vegeContainer = document.getElementById('vegetables-container');
  vegeContainer.innerHTML = '';
  createProductsDom(arr, vegeContainer);
};

const createProductsDom = (arr, container) => {
  arr.forEach((product) => {
    const cardPanel = document.createElement('div');
    const color = product.kind === 'fruits' ? 'green' : 'teal';
    cardPanel.classList.add(
      'card-panel',
      color,
      'lighten-1',
      'card-width',
      'flex-column'
    );
    container.appendChild(cardPanel);

    const productName = document.createElement('h4');
    productName.classList.add('white-text');
    productName.setAttribute('id', 'product-name');
    productName.innerHTML = product.name;
    cardPanel.appendChild(productName);

    const productPrice = document.createElement('p');
    productPrice.classList.add('white-text', 'p-font');
    productPrice.setAttribute('id', 'product-price');
    productPrice.innerHTML = `Price: € ${product.price}`;
    cardPanel.appendChild(productPrice);

    const productQuan = document.createElement('p');
    productQuan.classList.add('white-text', 'p-font');
    productQuan.setAttribute('id', 'product-quantity');
    productQuan.innerHTML = `In Stock: ${product.quantity}`;
    cardPanel.appendChild(productQuan);

    const addBtn = document.createElement('a');

    addBtn.setAttribute('id', product.name);
    if (product.quantity > 0) {
      addBtn.classList.add(
        'waves-effect',
        color,
        'darken-2',
        'waves-light',
        'btn'
      );
      addBtn.innerHTML = 'Add 1';
      const addBtnIcon = document.createElement('i');
      addBtnIcon.classList.add('material-icons', 'left');
      addBtnIcon.innerHTML = 'add_shopping_cart';
      addBtn.appendChild(addBtnIcon);
      addBtn.addEventListener('click', () => handleAddProduct(product));
    } else {
      addBtn.classList.add('disabled', 'btn');
      addBtn.innerHTML = 'Sold Out';
    }

    cardPanel.appendChild(addBtn);
  });
};

// This func is called every time when the user clicks 'add 1' button on a product
const displayInsideCart = (arr) => {
  let totalPrice = 0;
  const totalPriceText = document.getElementById('total-price');
  totalPriceText.innerHTML = totalPrice;
  const cartUl = document.getElementById('cart-ul');
  cartUl.innerHTML = '';
  arr.forEach((product, index) => {
    const colItem = document.createElement('li');
    colItem.classList.add('collection-item', 'phone-padding');
    colItem.setAttribute('id', `col-${product.name}`);
    cartUl.appendChild(colItem);

    const proDiv = document.createElement('div');
    proDiv.classList.add('flex');
    colItem.appendChild(proDiv);

    const proTitle = document.createElement('h5');
    proTitle.innerHTML = product.name;
    proDiv.appendChild(proTitle);

    const proAmount = document.createElement('h5');
    proAmount.innerHTML = `✖️ ${product.quantity}`;
    proDiv.appendChild(proAmount);

    if (product.quantity >= 4) {
      const dicountTimes = Math.trunc(product.quantity / 4);

      const priceDiv = document.createElement('div');
      priceDiv.classList.add('price');
      proDiv.appendChild(priceDiv);

      const priceFlex = document.createElement('div');
      priceFlex.classList.add('flex');
      priceDiv.appendChild(priceFlex);

      const priceTitle = document.createElement('p');
      priceTitle.classList.add('margin-right10');
      priceTitle.innerHTML = 'Price: ';
      priceFlex.appendChild(priceTitle);

      const price = document.createElement('h5');
      let priceProduct =
        product.price * product.quantity - product.price * dicountTimes;
      price.innerHTML = `€ ${priceProduct}`;
      priceFlex.appendChild(price);

      totalPrice += priceProduct;

      const discountP = document.createElement('p');
      discountP.classList.add('red-font');
      discountP.innerHTML = `(disount: - € ${product.price * dicountTimes})`;
      priceDiv.appendChild(discountP);
    } else {
      const priceDiv = document.createElement('div');
      priceDiv.classList.add('price', 'flex');
      proDiv.appendChild(priceDiv);

      const priceTitle = document.createElement('p');
      priceTitle.classList.add('margin-right10');
      priceTitle.innerHTML = 'Price: ';
      priceDiv.appendChild(priceTitle);

      const price = document.createElement('h5');
      let priceProduct = product.price * product.quantity;
      price.innerHTML = `€ ${priceProduct}`;
      priceDiv.appendChild(price);

      totalPrice += priceProduct;
    }
    const deleteBtn = document.createElement('a');
    deleteBtn.classList.add('secondary-content', 'to-right');
    proDiv.appendChild(deleteBtn);

    deleteBtn.addEventListener('click', () => deleteFromCart(product, index));

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('material-icons', 'pointer');
    deleteIcon.innerHTML = 'delete';
    deleteBtn.appendChild(deleteIcon);
  });
  totalPriceText.innerHTML = `€ ${totalPrice}`;
};

// This func is called when each button on product is created
// (only when the product quantity is more than 1)
// This function makes the button possible to push the product to basket or add the quantity of the product in the basket
// When adding,
// 1, the total amount of the product in stock is reduced -> need to update
// 2, the basket content is also changed -> need to update
const handleAddProduct = (product) => {
  if (product.quantity > 0) {
    const productObj = {
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    addProduct(basket, productObj);
    reduceProQuan(product);
    displayProducts();
    displayInsideCart(basket.status());
    console.log(basket.status());
  }
};

const addProduct = (basket, productObj) => {
  basket.pushProduct(productObj);
};

const reduceProQuan = (product) => {
  product.reduceQuan();
};

const increaseProQuan = (product, amount) => {
  const found = myProducts.findIndex((p) => p.name === product.name);
  myProducts[found].increaseQuan(amount);
};

const deleteFromCart = (product, index) => {
  basket.status().splice(index, 1);
  increaseProQuan(product, product.quantity);
  displayInsideCart(basket.status());
  displayProducts();
};
