import AppError from "@shared/errors/AppError"
import { getCustomRepository } from "typeorm"
import { Product } from "../typeorm/entities/product"
import { ProductRepository } from "../typeorm/repositories/product.repository"

interface IRequest {
  id: string
}

export class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)
    if (!product) {
      throw new AppError('Product not found', 400)
    }
    return product
  }
}