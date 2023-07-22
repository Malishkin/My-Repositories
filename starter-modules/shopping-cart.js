//Экспорт модуля
export default class ShoppingCart {
  constructor(shippingCost) {
    this.cart = [];
    this.shippingCost = shippingCost;
  }

  addProductToCart(product, quantity) {
    this.cart.push({ product, quantity });
    console.log(
      `${product} в количестве ${quantity} шт добавлено в корзину, цена доставки ${this.shippingCost}`
    );
  }

  productOrderedMessage(product, quantity) {
    console.log(`${product} в количестве ${quantity} шт заказан`);
  }
}
