import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ShopsModule } from './shops/shops.module';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: true,
    }),
    // TypeOrmModule Configuration with PostgreSQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('TYPEORM_DB_URI'), 
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
      }),
    }),
    UsersModule,
    ProductModule,
    CategoryModule,
    ShopsModule,
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
