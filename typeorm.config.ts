import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'P@ssw0rd',
    database: 'auth_test',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true
}