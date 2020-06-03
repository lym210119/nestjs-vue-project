import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    // 注入 User 模型
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() dto: RegisterDto) {
    // data transfer object 数据传输对象
    const { username, password } = dto;
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  // @UseGuards 将策略绑定到控制器或方法范围的装饰器，具体取决于其上下文。
  // 使用本地策略 local 就是 local.strategy.ts 里定义的名字
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    // data transfer object 数据传输对象
    return {
      token: this.jwtService.sign(String(user._id)),
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取个人信息' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth() // 表示这个接口需要传递 token
  async user(@CurrentUser() user: DocumentType<User>) {  // @Req() req 没有代码提示 所以需要自定义装饰器 @CurrentUser
    return user;
  }
}
