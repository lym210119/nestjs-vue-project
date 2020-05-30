import { Prop, ModelOptions, arrayProp, Ref } from '@typegoose/typegoose';
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

  @ApiProperty({ description: '课时' })
  @arrayProp({ ref: 'Episode' }) // 数组中每个元素参考的类型
  episodes: Ref<Episode>[]; // Ref 参考类型（泛型）参考的具体类型是 Episode
}
