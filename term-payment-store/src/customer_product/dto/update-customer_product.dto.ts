import { PartialType } from '@nestjs/swagger';
import { CreateCustomerProductDto } from './create-customer_product.dto';

export class UpdateCustomerProductDto extends PartialType(CreateCustomerProductDto) {}
