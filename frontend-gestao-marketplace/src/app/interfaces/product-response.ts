import { EnumProductStatus } from "./product-status-enum"

export interface IProductResponse {
			id: number,
			title: string
			price: string
			description: string
			category: string
			status: EnumProductStatus
			imageBase64: string
}
