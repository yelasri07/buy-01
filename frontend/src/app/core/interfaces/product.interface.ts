import { User } from "./user.interface"

export interface Product {
    id: string,
    name: string,
    price: number,
    description: string,
    quantity: number
    user: User
}
