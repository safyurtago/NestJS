import { Module } from '@nestjs/common';
import { CustomerCardService } from './customer_card.service';
import { CustomerCardController } from './customer_card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerCard } from './models/customer_card.model';
import { Customer } from '../customer/models/customer.model';

@Module({
  imports: [
    SequelizeModule.forFeature([CustomerCard, Customer])
  ],
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
})
export class CustomerCardModule {}
