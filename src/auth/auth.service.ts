import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credentials-dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({username, password: hashedPassword});

    try {
        await this.userRepository.save(user);
    } catch (error) {
        console.log('error', error)
        if(error.code === 'ER_DUP_ENTRY'){
            throw new ConflictException('Existing username');
        }else{
            throw new InternalServerErrorException();
            
        }
    }
    
  }

  async signIn(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOneBy({username});

    if(user && (await bcrypt.compare(password, user.password))){
        // 유저 토큰 생성 (Secret + payload)
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);

        return {accessToken};
    }else{
        throw new UnauthorizedException('login failed');
        
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
