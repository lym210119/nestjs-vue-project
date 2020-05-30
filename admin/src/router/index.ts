import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Main.vue';
import Home from '../views/Home.vue';
import CourseList from '../views/courses/CourseList.vue';
import CourseEdit from '../views/courses/CourseEdit.vue';
import CourseCrud from '../views/courses/CourseCrud.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      { name: 'course-crud', path: '/courses/list', component: CourseCrud },
      // { name: 'course-list', path: '/courses/list', component: CourseList },
      // { name: 'course-create', path: '/courses/create', component: CourseEdit },
      // {
      //   name: 'course-edit',
      //   path: '/courses/edit/:id',
      //   component: CourseEdit,
      //   props: true,
      // },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
