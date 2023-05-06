export class Item implements Item {
    name:string
    stock:number
    supplier:string
    salesPrice:number
    cost:number
    category:string
    sku:string
    constructor(name:string,stock = 0,supplier:string,salesPrice:number,cost:number,category:string) {
        this.name = name
        this.stock = stock
        this.supplier = supplier
        this.salesPrice = salesPrice
        this.cost = cost
        this.category = category
        this.sku = `SKU${name[0]+name[1]+name[2]}`
    }
}