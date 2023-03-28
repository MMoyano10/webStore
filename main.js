const mainSection = document.querySelector('.main-container');
const menuEmail = document.querySelector('.navbar-email');
const menuHamIcon = document.querySelector('.menu');
const menuCartIcon = document.querySelector('.navbar-shopping-cart');
const productDetailCloseIcon = document.querySelector('.product-detail-close');
const desktopMenu = document.querySelector('.desktop-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const shoppingCartContainer = document.querySelector('#shoppingCartContainer');
const titleCartContainer = document.querySelector('.title-container');
const productDetailContainer = document.querySelector('#productDetail');
const productDetailImage = document.querySelector('.product-detail__image');
const productDetailPrice = document.querySelector('.product-info__price');
const productDetailName = document.querySelector('.product-info__name');
const cardsContainer = document.querySelector('.cards-container');
const productsCartContainer = document.querySelector('.my-order-content');
const addToCartButton = document.querySelector('.add-to-cart-button');
const itemsCartBubble = document.querySelector('#itemsCart');

/* Variables a usar en el codigo */
const productList = [];
let shoppingCartList = [];
let itemsCartQuantity = shoppingCartList.length; 
let tempValueTotal = 0;
let idItemCart = 0;

/* Disparadores de Funciones para renderizar elementos dinamicamente */
renderQuantityItemsCart();
mainSection.addEventListener('click', closeMenus);
menuEmail.addEventListener('click', toggleDesktopMenu);
menuHamIcon.addEventListener('click', toggleMobileMenu);
menuCartIcon.addEventListener('click', toggleCartAside);
titleCartContainer.addEventListener('click', toggleCartAside);
productDetailCloseIcon.addEventListener('click', closeProductDetailAside);
addToCartButton.addEventListener('click', addProductToCartList);

/* Funciones para renderizar elementos dinamicamente */
function closeMenus() {
  shoppingCartContainer.classList.add('inactive');
  desktopMenu.classList.add('inactive');
  mobileMenu.classList.add('slide-right');
}
function toggleDesktopMenu() {
  desktopMenu.classList.toggle('inactive');
  shoppingCartContainer.classList.add('inactive');
  productDetailContainer.classList.add('inactive');
}
function toggleMobileMenu() {
  mobileMenu.classList.toggle('slide-right');
  shoppingCartContainer.classList.add('inactive');
  productDetailContainer.classList.add('inactive');
}
function toggleCartAside() {
  shoppingCartContainer.classList.toggle('inactive');
  mobileMenu.classList.add('slide-right');
  desktopMenu.classList.add('inactive');
  productDetailContainer.classList.add('inactive');
}
function openProductDetailAside(event) {
  productDetailContainer.classList.remove('inactive');
  productDetailImage.setAttribute('src', event.target.src);
  productDetailPrice.innerText = event.target.parentElement.childNodes[1].childNodes[0].childNodes[0].innerText;
  productDetailName.innerText = event.target.parentElement.childNodes[1].childNodes[0].childNodes[1].innerText;
}
function closeProductDetailAside() {
  productDetailContainer.classList.add('inactive');
}

/* Agregar dinamicamente los elementos a la pagina principal */
productList.push ({
  name:'Bike',
  price: 12700,
  image: 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
});
productList.push ({
  name:'Bicycle helmet',
  price: 1200,
  image: 'https://assets.specialized.com/i/specialized/60821-104_HLMT_ALIGN-II-HLMT-MIPS-CE-BLK-BLKREFL-S-M_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto'
});
productList.push ({
  name:'Bicycle helmet',
  price: 1600,
  image: 'https://m.media-amazon.com/images/I/61eExL-rIAL._AC_SL1001_.jpg'
});
productList.push ({
  name:'Bicycle helmet',
  price: 1500,
  image: 'https://assets.specialized.com/i/specialized/60822-140_HLMT_CHAMONIX-HLMT-MIPS-CE-MRN-M-L_HERO?bg=rgb(241,241,241)&w=1600&h=900&fmt=auto'
});
productList.push ({
  name:'Seat',
  price: 300,
  image: 'https://m.media-amazon.com/images/I/61e+sZ9rgNL._AC_SL1500_.jpg'
});
productList.push ({
  name:'Tennis Montain Bike',
  price: 2200,
  image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8ea578f6c07847fca2d0ac85011d7f1f_9366/Tenis_para_Mountain_Bike_Five_Ten_Freerider_Negro_FW2835_01_standard.jpg'
});
productList.push ({
  name:'Sunglasses',
  price: 800,
  image: 'https://cdn.siroko.com/s/files/1/1220/6874/products/gafas-siroko-tech-k3s-london-lateral/1200x/crop_center.jpg?v=1635209602'
});
productList.push ({
  name:'Sunglasses',
  price: 600,
  image: 'https://cdn.siroko.com/s/files/1/1220/6874/products/siroko-tech-k3s-clearfog-lente-antiniebla-frontal/1200x/crop_center.jpg?v=1635209603'
});
productList.push ({
  name:'Bicycle seat bag',
  price: 876,
  image: 'https://m.media-amazon.com/images/I/81k2Gmal+VL._AC_SL1500_.jpg'
}); 

/* Dibujar los elementos en HTML en la pagina principal */
function renderProducts(arr) {
  for (const product of arr) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
  
    const productImg = document.createElement('img');
    productImg.setAttribute('src', product.image);
    productImg.classList.add('product-img');
    productImg.addEventListener('click', openProductDetailAside);
  
    const productInfo = document.createElement('div');
    productInfo.classList.add('product-info');
  
    const productInfoDiv = document.createElement('div');
  
    const productPrice = document.createElement('p');
    productPrice.innerText = '$' + product.price;
    const productName = document.createElement('p');
    productName.innerText = product.name;
  
    productInfoDiv.append(productPrice, productName);
  
    const productInfoFigure = document.createElement('figure');
    productInfoFigure.classList.add('add-to-cart-card-button');
    productInfoFigure.addEventListener('click', addProductToCartListFromCard);
    const productImgCart = document.createElement('img');
    productImgCart.setAttribute('src', './icons/bt_add_to_cart.svg');
  
    productInfoFigure.append(productImgCart);
  
    productInfo.append(productInfoDiv, productInfoFigure);
  
    productCard.append(productImg, productInfo);
  
    cardsContainer.appendChild(productCard);
  }
}

renderProducts(productList);

/* Agregar productos al carrito de compras desde el aside*/
function addProductToCartList(event) {
  let price;
  try {
    price = event.target.parentElement.childNodes[5].childNodes[1].innerText;
    price = parseFloat(price.slice(1));
    shoppingCartList.push({
      id: "item-value" + idItemCart,
      name: event.target.parentElement.childNodes[5].childNodes[3].innerText,
      price: price,
      image: event.target.parentElement.childNodes[3].src,
    });
  } catch (error) {
    price = event.target.parentElement.parentElement.childNodes[5].childNodes[1].innerText;
    price = parseFloat(price.slice(1));
    shoppingCartList.push({
      id: "item-value" + idItemCart,
      name: event.target.parentElement.parentElement.childNodes[5].childNodes[3].innerText,
      price: price,
      image: event.target.parentElement.parentElement.childNodes[3].src,
    });
  }
  
  tempValueTotal += price;
  idItemCart += 1;
  renderCartList(shoppingCartList);
  closeProductDetailAside();
}

/* Agregar productos al carrito de compras desde el boton de las cards*/
function addProductToCartListFromCard(event) {
  // console.log(event);
  let price;
  price = event.target.parentElement.parentElement.childNodes[0].childNodes[0].innerText;
  price = parseFloat(price.slice(1));
  shoppingCartList.push({
    id: "item-value" + idItemCart,
    name: event.target.parentElement.parentElement.childNodes[0].childNodes[1].innerText,
    price: price,
    image: event.target.parentElement.parentElement.parentElement.childNodes[0].src,
  });
  tempValueTotal += price;
  idItemCart += 1;
  renderCartList(shoppingCartList);
  closeProductDetailAside();
}

/* Funcion que elmina los elementos del carrito */
function deleteProductToCartList(event) {
  const idItemDeleted = event.target.id;
  let indexItemDeleted;
  shoppingCartList.forEach(function(item, idItem) {
    if (item.id === idItemDeleted) {
      indexItemDeleted = idItem;
      tempValueTotal -= item.price;
    }
  });
  shoppingCartList.splice(indexItemDeleted, 1);
  renderCartList(shoppingCartList);
}

/* Dibujar el carrito de compras */
function renderCartList(arr) {
  productsCartContainer.innerText = "";
  if (shoppingCartList.length === 0) {
    renderQuantityItemsCart();
    return;
  }
  for (const product of arr) {
    const figureContent = document.createElement('figure');
    const imageContent = document.createElement('img');
    imageContent.setAttribute('src', product.image);
    figureContent.append(imageContent);

    const nameContent = document.createElement('p');
    nameContent.innerText = product.name;

    const priceContent = document.createElement('p');
    priceContent.innerText = "$" + product.price;

    const closeIcon = document.createElement('img');
    closeIcon.classList.add('shopping-cart__close');
    closeIcon.setAttribute('src', './icons/icon_close.png');
    closeIcon.setAttribute('alt', 'close');
    closeIcon.setAttribute('id', product.id);
    closeIcon.addEventListener('click', deleteProductToCartList);

    const shoppingCart = document.createElement('div');
    shoppingCart.classList.add('shopping-cart');
    shoppingCart.append(figureContent, nameContent, priceContent, closeIcon);

    productsCartContainer.append(shoppingCart);
  }

  const totalCart = document.createElement('div');
  totalCart.classList.add('order');

  const nameTotal = document.createElement('p');
  const total = document.createElement('span');
  total.innerText = "Total"
  nameTotal.append(total);

  const valueTotal = document.createElement('p');
  
  valueTotal.innerText = "$" + tempValueTotal;

  totalCart.append(nameTotal, valueTotal);

  productsCartContainer.append(totalCart);

  const checkoutCartButton = document.createElement('button');
  checkoutCartButton.classList.add('primary-button');
  checkoutCartButton.innerText = 'Checkout';

  productsCartContainer.append(checkoutCartButton);
  renderQuantityItemsCart();
}

/* Actualizar la burbuja de cantidad de elementos en el carrito */
function renderQuantityItemsCart() {
  itemsCartQuantity = shoppingCartList.length;
  itemsCartBubble.innerText = itemsCartQuantity;
}