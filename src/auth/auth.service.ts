import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dtos/auth.dto';
import { verifyPassword } from 'src/common/utils/password.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    configService: any;
    constructor(private readonly jwtService: JwtService, @InjectRepository(User) private userEntity: Repository<User>) { }
    async login(authDto: AuthDto) {
        console.log('AuthDto', authDto.email);

        const user = await this.userEntity.findOneBy({ email: authDto.email });
        console.log('user', user);

        if (!user) {
            throw new BadGatewayException('Invalid credentials');
        }
        console.log(user.password, authDto.password);

        const isMatch = await verifyPassword(authDto.password, user.password);
        if (!isMatch) {
            throw new BadGatewayException('Invalid credentials');
        }
        let token;
        if (isMatch) {
            token = await this.jwtService.signAsync(
                { id: user.id, email: user.email },
                { secret: process.env.JWT_SECRET_KEY, expiresIn: '1h' } // ✅ custom secret here
            );
        }

        return { token, user }
    }
}
