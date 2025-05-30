const Cart = require('../models/Cart'); 

class CartRepository {
    // Obtener el carrito de un usuario
    async getCartByUserId(userId) {
        try {
            const cart = await Cart.findOne({ userId, estado: 'active' }); 
            return cart;
        } catch (error) {
            throw new Error('Error getting cart: ' + error.message);
        }
    }

    // Crear un carrito
    async createCart(cartData) {
        try {
            const newCart = new Cart(cartData);
            return await newCart.save();
        } catch (error) {
            throw new Error('Error creating cart: ' + error.message);
        }
    }

    // Actualizar el carrito (por ejemplo, agregar productos)
    async updateCart(cartId, updates) {
        try {
            const updatedCart = await Cart.findByIdAndUpdate(cartId, updates, { new: true });
            return updatedCart;
        } catch (error) {
            throw new Error('Error updating cart: ' + error.message);
        }
    }
}

module.exports = new CartRepository();
