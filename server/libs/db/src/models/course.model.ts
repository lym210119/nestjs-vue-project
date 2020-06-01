import { Prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Course {
  @ApiProperty({ description: '课程名称' })
  @Prop() // 表示这个字段是一个数据库的字段
  name: string;

  @ApiProperty({ description: '封面图' })
  @Prop()
  cover: string;
}
