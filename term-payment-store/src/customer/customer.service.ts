import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import {v4} from 'uuid';
import { Op } from 'sequelize';
import { LoginCustomerDto } from './dto/customer-login.dto';
import { FindFilteredCustomersDto } from './dto/find-filtered-customers.dto';

const {env} = process;

@Injectable()
export class CustomerService {
  constructor (
    @InjectModel(Customer) private customerRepository: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  
  // Customer REGISTRATION account
  async registration (
    createCustomerDto: CreateCustomerDto,
    res: Response,
  ) {
    // Find the username
    const findCustomer = await this.customerRepository.findOne({where: {username: createCustomerDto.username}})
    if (findCustomer) throw new BadRequestException('This Username Already Registered!')

    // Matching Passwords
    if (createCustomerDto.password !== createCustomerDto.confirm_password) 
      throw new BadRequestException('Passwords do not match');

    // Hashing the password
    const hashed_password = await bcrypt.hash(createCustomerDto.password, 12);

    // Create the new customer
    const newCustomer = await this.customerRepository.create({
      ...createCustomerDto,
      hashed_password
    })

    const tokens = await this.getCustomerTokens(newCustomer);
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const activation_key: string = v4();

    const updatedCustomer = await this.customerRepository.update(
      {hashed_refresh_token,
      activation_link: activation_key},
      {where: {id: newCustomer.id}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    try {
      await this.mailService.sendCustomerConfirmation(updatedCustomer[1][0])
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Mail Confirmation Error')
    }

    const response = {
      message: 'Customer created successfully',
      customer: updatedCustomer[1][0],
      tokens,
    }
    return response;
  }

  // Customer ACTIVATION account
  async activate (link: string){
    if (!link) throw new BadRequestException("Activation link not found")

    const updatedCustomer = await this.customerRepository.update(
      {status: true},
      {where: {activation_link: link, status: false}, returning: true}
    )
    if (!updatedCustomer) throw new BadRequestException('customer already activated')

    const response = {
      message: "Customer activated successfully",
      customer: updatedCustomer[1][0],
    }
    return response;
  }



  // customer LOGIN account
  async login (
    loginCustomerDto: LoginCustomerDto,
    res: Response,
  ) {
    const {username, password} = loginCustomerDto

    const findCustomer = await this.customerRepository.findOne({where: {username}});
    if (!findCustomer) throw new BadRequestException('Customer is not Found'); 
    const isMatchPass = await bcrypt.compare(password, findCustomer.hashed_password);
    if (!isMatchPass) throw new BadRequestException('Customer is not Found');
    if (!findCustomer.status) throw new BadRequestException('Customer is not activated');

    const tokens = await this.getCustomerTokens(findCustomer)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);

    const updatedCustomer = await this.customerRepository.update(
      {hashed_refresh_token},
      {where: {id: findCustomer.id}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const response = {
      message: "Logged In Successfully",
      customer: updatedCustomer[1][0],
      tokens,
    }
    return response
  }

  // Customer LOGOUT
  async logout(
    refreshToken: string,
    res: Response
  ) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: env.REFRESH_TOKEN_KEY,
    })
    if (!customerData) throw new UnauthorizedException("customer not found")

    const updatedCustomer = await this.customerRepository.update(
      {hashed_refresh_token: null},
      {where: {id: customerData.id}, returning: true}
    )

    res.clearCookie('refresh_token');
    
    const response = {
      message: "Logged Out Successfully",
      customer: updatedCustomer[1][0],
    }
    return response;
  }

  // REFRESH TOKEN
  async refreshToken(
    customer_id: number,
    refreshToken: string,
    res: Response
  ) {
    const decodedToken = await this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) throw new BadRequestException('customer not found');

    const findCustomer = await this.customerRepository.findByPk(customer_id);
    if (!findCustomer || !findCustomer.hashed_refresh_token) throw new BadRequestException('customer not found');

    const tokenMatch = await bcrypt.compare(refreshToken, findCustomer.hashed_refresh_token);
    if (!tokenMatch) throw new ForbiddenException("Forbidden Token");

    const tokens = await this.getCustomerTokens(findCustomer)
    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 12);
    const updatedCustomer = await this.customerRepository.update(
      {hashed_refresh_token},
      {where: {id: customer_id}, returning: true}
    )

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15*24*60*60*1000,
      httpOnly: true
    })

    const resoponse = {
      message: "Token refreshed succesfully",
      customer: updatedCustomer[1][0],
      tokens,
    }
    return resoponse;
  }

  // FIND customerS
  async findFilteredCustomers (findFilteredCustomersDto: FindFilteredCustomersDto) {
    let where = {}

    if (findFilteredCustomersDto.email) where['email'] = { [Op.like]: `%${findFilteredCustomersDto.email}%`};
    if (findFilteredCustomersDto.username) where['username'] = { [Op.like]: `%${findFilteredCustomersDto.username}%`};

    // if (findFilteredCustomersDto.role) {
    //   where = {
    //     ...where,
    //     role: {
    //       [Op.like]: `%${findFilteredCustomersDto.role}%`,
    //     }
    //   }
    // }

    // if (findFilteredCustomersDto.role) where['role'] = { [Op.iLike]: `%${findFilteredCustomersDto.role}%`};
    // console.log(where);

    const filteredCustomers = await this.customerRepository.findAll({where, include: {all: true}})
    return filteredCustomers;
  }

  // FIND Customer BY ID
  async findOneById (id: number, req: Request) {
    const findCustomer = await this.customerRepository.findByPk(id, {include: {all: true}})
    return findCustomer
  }

  // DELETE Customer BY ID
  async deleteCustomerById (id: number) {
    await this.customerRepository.destroy({where: {id}});
    return {
      message: "Successfully deleted"
    }
  }

  // UPDATE customer BY ID
  async updateCustomerById (
    updatecustomerDto: UpdateCustomerDto,
    id: number
  ) {
    const updatedCustomer = await this.customerRepository.update(
      {...updatecustomerDto},
      {where: {id}, returning: true}
    )
    return updatedCustomer[1][0]
  }


   // get tokens customer method
   async getCustomerTokens (customer: Customer) {
    const jwtPayload = {
        id: customer.id,
        status: customer.status,
    };
    const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(jwtPayload, {
            secret: env.ACCESS_TOKEN_KEY,
            expiresIn: env.ACCESS_TOKEN_TIME,
        }),
        this.jwtService.signAsync(jwtPayload, {
            secret: env.REFRESH_TOKEN_KEY,
            expiresIn: env.REFRESH_TOKEN_TIME,
        }),
    ]);
    return {
        access_token,
        refresh_token,
    };
  }
}
