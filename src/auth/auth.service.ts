import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  createUser(authCredentialDto: AuthCredentialDto): void {
    const { username, password } = authCredentialDto;
    const user = this.userRepository.create({username, password});
    this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
