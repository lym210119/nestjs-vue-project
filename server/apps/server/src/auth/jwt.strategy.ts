import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    // @InjectModel 注入模型 
    // private 表示这个类的私有成员在这个类中可以使用 也可以用 public
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    // as 明确标记 as 前面是什么类型
    super({
      // 取出 token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET
    } as StrategyOptions);
  }

  async validate(id) {
    return this.userModel.findById(id);
  }
}
