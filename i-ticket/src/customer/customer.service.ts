import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MailService } from './../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Customer } from './models/customer.model';
import { v4 } from 'uuid';
import { Op } from 'sequelize';

@Injectable()
export class CustomerService {
  constructor (
    @InjectModel(Customer) private customerRepository: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService
  ) {}


  // Customer - Registration Part
  async registration (
    createCustomerDto: CreateCustomerDto,
    res: Response,
  ) {
    const customer = await this.customerRepository.findOne({where: {email: createCustomerDto.email}})
    if (customer) { throw new BadRequestException('Customer already registered') }
    if (createCustomerDto.password !== createCustomerDto.confirm_password) {
      throw new BadRequestException('Customer passwords must match')
    }
    const hashed_password = await bcrypt.hash(createCustomerDto.password, 12)
    const newCustomer = await this.customerRepository.create({
      ...createCustomerDto,
      hashed_password,
    })

    const tokens = await this.getTokens(newCustomer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)
    const uniqueKey: string = v4()

    const updatedCustomer = await this.customerRepository.update(
      {
        hashed_refresh_token,
        activation_link: uniqueKey,
      },
      {where: {id: newCustomer.id}, returning: true}
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendCustomerConfirmation(updatedCustomer[1][0])
    } catch (error) {
      console.log(error);
      
      throw new BadRequestException('Error while sending email confirmation')
    }

      return {
        message: 'Customer registered successfully',
        customer: updatedCustomer[1][0],
        tokens
      }
  }

  // Customer -  Login Part
  async login (
    loginCustomerDto: LoginCustomerDto,
    res: Response
  ) {
    const {email, password} = loginCustomerDto;
    const customer = await this.customerRepository.findOne({where: {email}})
    if (!customer) throw new BadRequestException('Customer Not Registered')
    if (!customer.is_active) throw new BadRequestException('Customer is not active')
    const isMatchPass = await bcrypt.compare(password, customer.hashed_password);
    if (!isMatchPass) throw new BadRequestException('Customer Not registered')
    const tokens = await this.getTokens(customer);
    
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)
    const updatedCustomer = await this.customerRepository.update(
      {hashed_refresh_token},
      {where: {id: customer.id}, returning: true}
    )
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    
    return {
      message: "Customer Logged In Successfully",
      customer: updatedCustomer[1][0],
      tokens
    }
  }

  // Customer - Activation Email Part
  async activate (link: string) {
    if (!link) throw new BadRequestException('Activation link not found')
    const updatedCustomer = await this.customerRepository.update(
      {is_active: true},
      {where: {activation_link: link, is_active: false}, returning: true}
    )
    if (!updatedCustomer) throw new BadRequestException('Customer already activated')
    return {
      message: "Customer activated",
      customer: updatedCustomer[1][0]
    }
  }

  async refreshToken (customerId: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken)
    if (customerId != decodedToken['id']) {
      throw new BadRequestException('Customer Not Found')
    }
    const customer = await this.customerRepository.findOne({where: {id: customerId}})
    if (!customer || !customer.hashed_refresh_token ) 
      throw new BadRequestException('Customer not found')
    const tokenMatch = await bcrypt.compare(refreshToken, customer.hashed_refresh_token)
    if (!tokenMatch) throw new ForbiddenException('Forbidden')

    const tokens = await this.getTokens(customer)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12)
    const updatedCustomer = await this.customerRepository.update(
      {hashed_refresh_token},
      {where: {id: customerId}, returning: true}
    )
    
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })
    return {
      message: "Token refreshed",
      customer: updatedCustomer[1][0],
      tokens
    }

  }

  async logout (
    refresh_token: string,
    res: Response
    ) {
      const customerData = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      })
      if (!customerData) {
        throw new ForbiddenException('Customer not found')
      }
      
      const updatedCustomer = await this.customerRepository.update(
        {hashed_refresh_token: null},
        {where: {id: customerData.id}, returning: true}
        )
      res.clearCookie('refresh_token')
      return {
        message: "Customer Logout",
        customer: updatedCustomer[1][0]
      }
  }

  // Find customers
  async findAll(findCustomerDto: FindCustomerDto) {
    const where = {}
    
    // if (findCustomerDto.birth_date) where['birth_date'] = {[Op.like]: `%${findCustomerDto.birth_date}%`}
    if (findCustomerDto.first_name) where['first_name'] = {[Op.like]: `%${findCustomerDto.first_name}%`}
    if (findCustomerDto.last_name) where['last_name'] = {[Op.like]: `%${findCustomerDto.last_name}%`}
    // if (findCustomerDto.gender_id) where['gender_id'] = {[Op.like]: `%${findCustomerDto.gender_id}%`}
    if (findCustomerDto.phone) where['phone'] = {[Op.like]: `%${findCustomerDto.phone}%`}
    // if (findCustomerDto.language_id) where['language_id'] = {[Op.like]: `%${findCustomerDto.language_id}%`}

    const customer = await this.customerRepository.findAll({where})
    if (!customer) throw new BadRequestException(`Customer not found`)
    return customer;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }


  // Token - Acces/Refresh Tokens Part
  async getTokens (customer: Customer) {
    const jwtPayload = {
      id: customer.id,
      is_active: customer.is_active,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ])
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

}
