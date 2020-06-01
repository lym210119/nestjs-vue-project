import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '@libs/db/models/episode.model';
import { ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly courseModel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  async option() {
    const courses = (await this.courseModel.find()).map(v => ({
      label: v.name,
      value: v._id,
    }));
    return {
      title: '课时管理',
      page: false,
      translate: false,
      column: [
        {
          label: '所属课程',
          prop: 'course',
          type: 'select',
          dicData: courses,
          row: true,
        },
        {
          label: '课时名称',
          prop: 'name',
          span: 24,
        },
        {
          label: '课时视屏',
          prop: 'file',
          type: 'upload',
          listType: 'picture-img',
          action: 'upload',
          width: 120,
        },
      ],
    };
  }
}
