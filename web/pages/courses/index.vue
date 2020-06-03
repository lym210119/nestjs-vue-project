<template>
  <div class="pa-3">
    <h3>热门视频</h3>
    <v-row>
      <v-col v-for="(item, index) in courses" :key="index">
        <v-card class="mx-auto" max-width="400" :to="`/courses/${item._id}`">
          <v-img class="white--text align-end" height="200px" :src="item.cover">
            <v-card-title>{{ item.name }}</v-card-title>
          </v-img>

          <v-card-subtitle class="pb-0">{{ item.createdAt }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="orange" text>
              分享
            </v-btn>

            <v-btn color="orange" text>
              探索
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return { courses: data.data }
  }
}
</script>

<style></style>
