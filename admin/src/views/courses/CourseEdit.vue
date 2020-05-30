<template>
  <div>
    <h3>{{ isEdit ? '编辑' : '创建' }}课程</h3>
    <ele-form v-model="data" :form-desc="fields" :request-fn="submit">
    </ele-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component({})
export default class CourseEdit extends Vue {
  @Prop(String) id!: string;
  data = {};

  fields = {
    name: { label: '课程名称', type: 'input' },
    cover: { label: '课程封面', type: 'input' },
  };

  get isEdit() {
    return this.id
  }

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`);
    this.data = res.data;
  }

  async submit(data: object) {
    console.log(data);
    const url = this.isEdit ? `courses/${this.id}` : 'courses'
    const method = this.isEdit ? 'put' : 'post'
    await this.$http[method](url, data);
    this.$message.success(this.isEdit ? '修改成功' : '创建成功');
    this.$router.go(-1);
  }
  created() {
    this.isEdit && this.fetch();
  }
}
</script>

<style></style>
