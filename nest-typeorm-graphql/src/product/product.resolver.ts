import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';

@Resolver('product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('createProduct') createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Query(() => [Product])
  findAllProduct() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  findOneProduct(@Args('id', {type: () => ID}) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(@Args('id') id: number, @Args('updateProduct') updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Mutation(() => Number)
  removeProduct(@Args('id', {type: () => ID}) id: number) {
    return this.productService.remove(id);
  }
}
