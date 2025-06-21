class Order{
    constructor({creationD, products, address, paymenMethod, total, shippingDate }){
        this.creationD= creationD
        this.products= products
        this. address= address
        this.paymenMethod= paymenMethod
        this.total= total
        this.shippingDate= shippingDate

    }
}

module.exports= Order;