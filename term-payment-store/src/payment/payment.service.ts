import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';
import { ContractService } from '../contract/contract.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment) private paymentRepository: typeof Payment,
    private readonly contractService: ContractService
  ) {}

  async create(createPaymentDto: CreatePaymentDto, req: Request) {
    const customer_id = req['customer'].id;
    await this.contractService.payment(createPaymentDto.amount, createPaymentDto.contract_id)
    return this.paymentRepository.create({...createPaymentDto, customer_id});
  }

  findAll() {
    return this.paymentRepository.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.paymentRepository.findByPk(id, {include: {all: true}});
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto, req: Request) {
    const customer_id = req['customer'].id;
    return this.paymentRepository.update({...updatePaymentDto, customer_id}, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.paymentRepository.destroy({where: {id}});
  }
}
