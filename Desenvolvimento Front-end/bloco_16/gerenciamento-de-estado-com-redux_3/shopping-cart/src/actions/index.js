//ACTION FUNÇÃO QUE RETORNA UM OBJETO

const addItemToCart = (item) => ({
  type: 'ADD_ITEM_TO_CART',
  payload: {
    item,
  }
});

export default addItemToCart;
