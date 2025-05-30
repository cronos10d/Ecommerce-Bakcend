const CartRepository = require('../repositories/CartRepository');
const ProductRepository = require('../repositories/ProductRepository'); 

class CartUseCase {
    // Obtener el carrito de un usuario
    async getUserCart(userId) {
        try {
            const cart = await CartRepository.getCartByUserId(userId);
            if (!cart) throw new Error('Cart not found!');
            return cart;
        } catch (error) {
            throw new Error('Error getting cart: ' + error.message);
        }
    }

    // Crear un carrito nuevo para un usuario
    async createCart(cartData) {
        try {
            const cart = await CartRepository.createCart(cartData);
            return cart;
        } catch (error) {
            throw new Error('Error creating cart: ' + error.message);
        }
    }

    // Añadir un producto al carrito
    async addProductToCart(userId, productId, quantity) {
        const cart = await this.getUserCart(userId);

        // Lógica para agregar el producto al carrito
        const product = await ProductRepository.getProductById(productId);
        if (!product) throw new Error('Product not found');

        const productInCart = cart.products.find(item => item.productId.toString() === productId);
        if (productInCart) {
            productInCart.productQuantity += quantity;  
        } else {
            cart.products.push({ productId, productQuantity: quantity });
        }

        // Recalcular el total
        cart.total += product.price * quantity;
        cart.creationDate = new Date();

        return await CartRepository.updateCart(cart._id, cart);
    }

    // Eliminar un producto del carrito
    async removeProductFromCart(userId, productId) {
        const cart = await this.getUserCart(userId);
        const productInCart = cart.products.find(item => item.productId.toString() === productId);
        if (!productInCart) throw new Error('Product not in cart');

        cart.products = cart.products.filter(item => item.productId.toString() !== productId);
        cart.total -= productInCart.productQuantity * productInCart.price;
        cart.creationDate = new Date();

        return await CartRepository.updateCart(cart._id, cart);
    }
}

module.exports = new CartUseCase();
