import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    // @InjectModel 注入模型 
    // private 表示这个类的私有成员在这个类中可以使用 也可以用 public
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    // as 明确标记 as 前面是什么类型
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    // .select() 指定要包括或排除的文档字段（也称为查询“投影”）
    const user = await this.userModel.findOne({username}).select('+password')
    if (!user) {
      throw new BadRequestException('用户名不正确')
    }
    // compareSync 对比散列前和散列后是否相等
    // 注意这里 user.password 由于在 userModal 中设置了 select: false 默认不显示 password
    // 所以需要在查询 user 的时候加上 select: true
    if(!compareSync(password, user.password)) {
      throw new BadRequestException('密码不正确')
    }
    return user;
  }
}
