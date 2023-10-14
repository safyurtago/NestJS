import * as request from 'supertest'
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";

import { AppModule } from "../src/app.module";

describe('User (e2e)', () => {
    let app: INestApplication;
    let token: String;

    beforeAll(async() => {
        const moduleFixture: TestingModule = await Test.createTestingModule({ imports: [AppModule] }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        app.setGlobalPrefix('api')

        await app.init();

        const response = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({
                email: 'xasan777@gmail.com',
                password: 'qWERTY!2345'
            });
        token = response.body.token;
        console.log(token);
    });

    it('/users (Get) --> 200 OK', () => {
        return request(app.getHttpServer())
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
    });

    it('/users (Get) --> 401 "Unauthorized error', () => {
        return request(app.getHttpServer())
            .get('/api/users')
            // .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(401)
    });

    // it('/auth/registration (Post) --> 201 ', () => {
    //     return request(app.getHttpServer())
    //         .post('/api/auth/registration')
    //         .send({
    //             name: 'user232',
    //             email: 'user@gmail.com',
    //             password: 'password',
    //         })
    //         .expect(201)
    //         .then((response) => {
    //             expect(response.body).toMatchObject({
    //                 token: expect.any(String),
    //             })
    //         })
    // });

    it('/auth/registration (Post) --> 400 ', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/auth/registration')
            .send({
                name: 'user232',
                email: 'user@gmail.com',
                password: 'password',
            })
            .expect('Content-Type', /json/)
            .expect(400);
            expect({
                statCode: 400,
                message: 'User not found',
            });
    });

    



    afterAll(async () => {
        await app.close()
    });
});