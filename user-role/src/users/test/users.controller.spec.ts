import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from '@nestjs/testing'
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../models/user.model";
import { userStub } from "./stubs/user.stub";
// import { AppModule } from "../../app.module";




jest.mock('../users.service');
describe('Users Controller', () => {
    let usersController: UsersController;                   // create a new controller type
    let usersService: UsersService;                         // create a new service type 
    beforeAll( async () => {                                // Before all tests
        const moduleRef = await Test.createTestingModule({
            // imports: [AppModule],
            controllers: [UsersController],                 // controllers
            providers: [UsersService, JwtService],          // providing providers / services
        }).compile();
        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();                               // remove
    });
    it('should be defined UserController', () => {          // test Controller
        expect(usersController).toBeDefined();
    });
    it('should be defined UserService', () => {             // test Service
        expect(usersService).toBeDefined();
    });
    describe('create', () => {
        describe('when create is called', () => {
            let user: User;
            let createUserDto: CreateUserDto;
            beforeAll(async () => {
                createUserDto = {
                    name: userStub().name,
                    email: userStub().email,
                    password: userStub().password
                };
                user = await usersController.create(createUserDto);
            })

            it('then should call UserService', () => {
                expect(usersService.create).toHaveBeenCalledWith(createUserDto);
            });
            it('then should return the created user', () => {
                expect(user).toEqual(userStub())
            });
        })
    })
    




});

