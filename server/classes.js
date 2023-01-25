class Item {
    constructor(name,stock = 0,supplier,salesPrice,cost,category) {
        this.name = name
        this.stock = stock
        this.supplier = supplier
        this.salesPrice = salesPrice
        this.cost = cost
        this.category = category
        this.sku = `SKU${name[0]+name[1]+name[2]}`
    }
}

module.exports.Item = Item