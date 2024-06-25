import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from 'src/member/member.service';
import { LoginDto } from './dto/logindto.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private memberService: MemberService,
        private jwtService: JwtService,
    ) { }

    async signIn(loginDto:LoginDto): Promise<{ access_token: string }> {
        const user = await this.memberService.findOne(loginDto.userid);

        if(!user) {
            throw new UnauthorizedException();
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
    
        if (!isMatch) {
          throw new UnauthorizedException();
        }
        
        const payload = { sub: user.id, userid:user.userid, name: user.name, birth: user.birth, is_parent: user.is_parent, child_id: user.child_id };
        const access_token = await this.jwtService.signAsync(payload)
        return {
          access_token: `Bearer ${access_token}`,
        };
      }
}
