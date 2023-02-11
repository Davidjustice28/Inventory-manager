function makeSku(name) {
    let sku = "SKU"
    for(let i =0; i < 3; i++) {
        sku+=name.charAt(i) 
    }
    return sku
}

class Item {
    constructor(name,price,cost,stock,category,supplier) {
        this.name = name
        this.SKU = makeSku(name)
        this.salesPrice = price
        this.cost = cost
        this.stock = stock
        this.category = category
        this.supplier = supplier
        this.image = ""
    }
}

export {Item}