import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
   
   @Post('login')
   login(@Body() authDto: AuthDto){
    console.log('AuthDto in controller', authDto);
    
     return this.authService.login(authDto);
   }
}

