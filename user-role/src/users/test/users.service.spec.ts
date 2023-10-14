
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";

import { User } from "../models/user.model";

import { UsersService } from "../users.service"
import { Role } from "../../roles/models/role.model";
import { RolesService } from "../../roles/roles.service";
import { userStub } from "./stubs/user.stub";
import { CreateUserDto } from "../dto/create-user.dto";


describe('Users service', () => {
    let usersService: UsersService;

    const mockUsersRepo = {
        create: jest.fn().mockImplementation(userStub),
        findOne: jest.fn().mockImplementation(userStub),
        findByPk: jest.fn().mockImplementation(userStub),
        findAll: jest.fn().mockImplementation(() => [userStub()]),
        destroy: jest.fn().mockImplementation(() => 1),
    };
    const mockRolesRepository = {
        findOne: jest.fn().mockImplementation((value: string) => 'ADMIN')
    };

    beforeAll(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [],
            providers: [ 
                UsersService, JwtService, RolesService,
                {
                    provide: getModelToken(User),
                    useValue: mockUsersRepo
                },
                {
                    provide: getModelToken(Role),
                    useValue: mockRolesRepository
                }
            ]
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(usersService).toBeDefined();
    });

    describe('createUser', () => {
      describe('when createUser is called', () => {
          let createUsersDto: CreateUserDto;
          let newUser: User;

          beforeEach(async () => {
              createUsersDto = {
                  name: userStub().name,
                  email: userStub().email,
                  password: userStub().password
              };
              newUser = await usersService.create(createUsersDto);
              console.log(newUser);
          });

          it('should be create new user', async () => {
              expect(newUser).toMatchObject({ ...userStub(), roles: ['ADMIN'] });
          });
      });
  });


  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      test('then it should call usersService.getOneUser method',async () => {
        expect(await usersService.findOneID(userStub().id)).toEqual(userStub(),) 
      })
    })
  })

  describe('getAllUsers', () => {
    describe('when getAllUsers is called', () => {
      test('then it should call usersService.findAll method', async () => {
        expect(await usersService.findAll()).toEqual([userStub()])
      })
    })
  })
 
  describe('deleteOneUser', () => {
    describe('when deleteOneUser is called', () => {
      test('then it should call usersService.remove method', async () => {
        expect(await usersService.remove(userStub().id)).toEqual(1)
      })
    })
  })
});
