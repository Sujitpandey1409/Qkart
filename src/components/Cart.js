import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} qty - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, qty: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */
export const generateCartItemsFrom = (cartData, productsData) => {
  if (!productsData || !cartData) { return null }
  // const cart_dataId = cartData.map((el) => el.productId)
  // const req_data = productsData.filter((el) => cart_dataId.includes(el._id))
  const cartDataMap = cartData.reduce((map, item) => {
    map[item.productId] = item.qty;
    return map;
  }, {});

  const req_data = productsData
    .filter((el) => cartDataMap.hasOwnProperty(el._id))
    .map((el) => ({ ...el, qty: cartDataMap[el._id] }));
  // console.log('cartData', cartData, 'productsData', productsData, 'cart_dataMap', cartDataMap, 'req_data', req_data);
  return req_data
};

/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items) => {
  let sum = 0
  items.forEach((el) => { sum += (el.cost * el.qty) })
  return sum
};
export const getTotalItems = (items) => {
  let sum = 0
  items.forEach((el) => { sum += (el.qty) })
  return sum
};


/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * 
 */
const ItemQuantity = ({
  value,
  id,
  handleAdd,
  handleDelete,
  isReadOnly,
}) => {
  // const Qty = 'Qty:'
  return (
    <Stack id={id} direction="row" alignItems="center">
      {!isReadOnly && <IconButton id={id} size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined id={id} />
      </IconButton>}
      <Box padding="0.5rem" data-testid="item-qty">
        {isReadOnly && <span>Qty:</span>}{value}
      </Box>
      {!isReadOnly && <IconButton id={id} size="small" color="primary" onClick={handleAdd}>
        <AddOutlined id={id} />
      </IconButton>}
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * 
 */
const Cart = ({
  products,
  // items = [],
  items,
  // handleQuantity,
  handleAddToCart,
  handleDelete,
  handleAdd,
  isReadOnly,
}) => {
  const history = useHistory()
  const { enqueueSnackbar } = useSnackbar();
  // useEffect(() => {
  //   if (isAlertAdd) {
  //     // enqueueSnackbar('Item already in cart. Use the cart sidebar to update quantity or remove item.', { variant: "warning" })}
  //     document.getElementById('CartsContainer').setAttribute('role', 'alert')
  //     setTimeout(() => {
  //       document.getElementById('CartsContainer').removeAttribute('role')
  //     }, 5000);}
  //   })

  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart" id='CartsContainer'>
        {/* TODO: CRIO_TASK_MODULE_CART - Display view for each cart item with non-zero quantity */}
        {items.map((el) => {
          return (
            <Box key={el._id} display="flex" alignItems="flex-start" padding="1rem">
              <Box className="image-container">
                <img
                  // Add product image
                  src={el.image}
                  // Add product name as alt eext
                  alt={el.name}
                  width="100%"
                  height="100%"
                />
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                height="6rem"
                paddingX="1rem"
              >
                <div>{el.name}</div>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <ItemQuantity
                    // Add required props by checking implementation
                    isReadOnly={isReadOnly}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                    value={el.qty}
                    id={el._id}
                  />
                  <Box padding="0.5rem" fontWeight="700">
                    ${el.cost}
                  </Box>
                </Box>
              </Box>
            </Box>)
        }
        )}
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>

        {!isReadOnly && <Box display="flex" justifyContent="flex-end" className="cart-footer">
          <Button
            color="primary"
            variant="contained"
            startIcon={<ShoppingCart />}
            className="checkout-btn"
            onClick={() => history.push('/checkout')}
          >
            Checkout
          </Button>
        </Box>}
      </Box>
      {isReadOnly && <Box display="flex" flexDirection="column"  className="cart cart-footer" style={{"marginTop":"4px"}}>
              <h3>Order Details</h3>
              <div className="check-out-productData">
              <p>Products</p><p>{getTotalItems(items)}</p>
              </div>
              <div className="check-out-productData">
              <p>Subtotal</p><p>${getTotalCartValue(items)}</p>
              </div>
              <div className="check-out-productData">
              <p>Shipping Charges</p><p>$0</p>
              </div>
              <div className="check-out-productData">
              <h4>Total</h4><h4>${getTotalCartValue(items)}</h4>
              </div>
          </Box>}
    </>
  );
};

export default Cart;
