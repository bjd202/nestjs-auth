import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials-dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    @Get('/')
    test(): Promise<User[]> {
        return this.authService.findAll();
    }

    // @Post('/signup')
    // signUp(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    //     return this.authService.signUp(authCredentialDto);
    // }

    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialDto): void {
        console.log(authCredentialDto.username)
        console.log(authCredentialDto.password)
        this.authService.createUser(authCredentialDto);
    }
}
