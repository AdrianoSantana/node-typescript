import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import { Product } from "../typeorm/entities/product"
import { ProductRepository } from "../typeorm/repositories/product.repository"

interface IRequest {
  name: string,
  price: number,
  quantity: number
}
export class CreateProductService {
  public async execute(data: IRequest): Promise<Product> {
    const { name, price, quantity } = data
    const productRepository = getCustomRepository(ProductRepository)
    const productExists = await productRepository.findByName(name)
    if (productExists) {
      throw new AppError(
        'There is already a product with this name',
        400
      )
    }
    const product = productRepository.create({
      name,
      price,
      quantity
    })
    await productRepository.save(product)
    return product
  }
}