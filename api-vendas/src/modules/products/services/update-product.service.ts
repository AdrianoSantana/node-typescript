import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import { Product } from "../typeorm/entities/product"
import { ProductRepository } from "../typeorm/repositories/product.repository"

interface IRequest {
  id: string
  name: string
  price: number
  quantity: number
}
export class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const productToUpdate = await productRepository.findOne(id)
    if (!productToUpdate) {
      throw new AppError(
        'Product to updated does not exists',
        400
      )
    }

    const productExists = await productRepository.findByName(name)
    if (productExists && name != productExists.name) {
      throw new AppError(
        'Already exists a product with this name',
        400
      )
    }
  
    productToUpdate.name = name
    productToUpdate.price = price
    productToUpdate.quantity = quantity

    await productRepository.save(productToUpdate)
    return productToUpdate
  }
}