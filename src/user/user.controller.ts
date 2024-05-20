import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { SignInBodyDTO } from './user.dto';
import { ERole } from 'src/auth/role/role.enum';
import { sendSuccessRes } from 'src/common/generateResponse';

@Controller('user')
export class UserController {
  constructor(
    private service: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signin')
  async signin(@Body() body: SignInBodyDTO) {
    const { isp, ispId } = body;

    let userId: string;
    const found = await this.service.findOne({ isp, ispId });

    userId = found?.id;
    if (!found) {
      const created = await this.service.create({ isp, ispId });
      userId = created[0].id;
    }

    const token = this.authService.generateToken({
      id: userId,
      role: ERole.USR,
    });

    this.service.update({ id: userId }, { lastLoginAt: new Date() });

    return sendSuccessRes({ accessToken: token });
  }
}
