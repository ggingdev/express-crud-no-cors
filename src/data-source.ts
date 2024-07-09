import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Table } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  synchronize: false, 
  logging: false,
  entities: [User],
});

AppDataSource.initialize().then(async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const hasTable = await queryRunner.hasTable('user');
  if (!hasTable) {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'email',
          type: 'varchar',
        },
      ],
    }));
  }

  await queryRunner.release();

  const userRepository = AppDataSource.getRepository(User);

  const mockUser = new User();
  mockUser.name = '테스트';
  mockUser.email = 'admin@cloudtype.co.kr';
  await userRepository.save(mockUser);

  console.log('Mock user created');
}).catch(error => console.log(error));
