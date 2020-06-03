import { Prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @Prop()
  username: string;

  @ApiProperty({ description: '密码', example: 'pass1' })
  @Prop({
    select: false, // 在常规的请求中不显示 password
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}
