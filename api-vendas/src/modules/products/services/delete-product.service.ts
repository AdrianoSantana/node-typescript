import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import { ProductRepository } from '../typeorm/repositories/product.repository'

interface IRequest {
  id: string
}
export class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('product not found', 400)
    }

    await productRepository.remove(product)
  }
}
