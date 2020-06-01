import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
  model: User,
})
@Controller('users')
@ApiTags('用户管理')
export class UsersController {
  constructor(
    @InjectModel(User) private readonly model: ReturnModelType<typeof User>,
  ) {}

  @Get('option')
  option() {
    return {
      title: '用户管理',
      page: false,
      column: [
        {
          label: '用户名',
          prop: 'username',
        },
        {
          label: '密码',
          prop: 'password',
        },
        {
          label: '创建时间',
          prop: 'createAt',
        },
        {
          label: '更新时间',
          prop: 'uploadAt',
        },
      ],
    };
  }
}
