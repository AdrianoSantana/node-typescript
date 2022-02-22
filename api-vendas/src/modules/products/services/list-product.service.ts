import { getCustomRepository } from "typeorm"
import { Product } from "../typeorm/entities/product"
import { ProductRepository } from "../typeorm/repositories/product.repository"

export class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository)
    const products = await productRepository.find()
    return products
  }
}