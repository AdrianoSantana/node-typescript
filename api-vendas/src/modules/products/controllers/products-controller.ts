import { Request, response, Response } from 'express'
import { CreateProductService } from '../services/create-product.service'
import { DeleteProductService } from '../services/delete-product.service'
import { ListProductService } from '../services/list-product.service'
import { ShowProductService } from '../services/show-product.service'
import { UpdateProductService } from '../services/update-product.service'

export class ProductController {
  public async index(request: Request, response: Response): Promise<Response>  {
    const products = await new ListProductService().execute()
    return response.status(200).json(products)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const product = await new ShowProductService().execute({ id })
    return response.status(200).json({ product })
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const product = await new CreateProductService().execute({ name, price, quantity })
    return response.status(201).json({ product })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body
    const { id } = request.params
    const product = await new UpdateProductService().execute({ id, name, price, quantity })
    return response.status(200).json({ product })
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    await new DeleteProductService().execute({ id })
    return response.status(200).json()
  }
}