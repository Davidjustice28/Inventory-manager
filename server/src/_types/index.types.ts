export interface InventoryItem {
  name:string
  stock:number
  supplier:string
  salesPrice:number
  cost:number
  category:string
  sku:string
}

export interface Project {
  name: string,
  deadline: string,
  estimatedCost: number,
  notes: string
}

export interface User {
  Name:string,
  Username:string,
  Password:string,
  Inventory: Array<InventoryItem>,
  Projects: Array<Project>
}