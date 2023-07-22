//Экспорт модуля

console.log('Экспорт модуля');

const shippingCost = 20;
const cart = [];

export const addProductToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(
    `${product} в количестве ${quantity} шт добавлено в корзину, цена доставки ${shippingCost}`
  );
};
