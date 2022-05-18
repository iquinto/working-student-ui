import { createWebHistory, createRouter } from "vue-router";
import Home from "./components/statics/Home.vue";
import About from "./components/statics/About.vue";
import Recursos from "./components/statics/Recursos.vue";
import Login from "./components/authentication/Login.vue";
import RegisterEmployer from "./components/authentication/RegisterEmployer.vue";
import RegisterStudent from "./components/authentication/RegisterStudent.vue";
import ScheduleList from "./components/reservation/ScheduleList.vue";
import ScheduleCreate from "./components/reservation/ScheduleCreate.vue";
import ReservationEdit from "./components/reservation/ReservationEdit.vue";
import ReservationCreate from "./components/reservation/ReservationCreate.vue";
import StudentList from "./components/student/StudentList.vue";
import StudentShow from "./components/student/StudentShow.vue";
import EmployerShow from "./components/employer/EmployerShow.vue";
import JobPostInternshipList from "./components/job/JobPostInternshipList.vue";
import JobPostTemporaryList from "./components/job/JobPostTemporaryList.vue";
import JobPostShow from "./components/job/JobPostShow.vue";
import JobPostCreate from "./components/job/JobPostCreate.vue";
import JobPostEdit from "./components/job/JobPostEdit.vue";
import NotificationShow from "./components/notification/NotificationShow.vue";
import NotificationTable from "./components/notification/NotificationTable.vue";

const ProfileEdit = () => import("./components/authentication/ProfileEdit.vue")

// lazy-loaded
const Profile = () => import("./components/authentication/Profile.vue")



const routes = [

  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/resources",
    component: Recursos,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register/student",
    component: RegisterStudent,
  },
  {
    path: "/register/employer",
    component: RegisterEmployer,
  },
/*
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
*/

  {
    path: "/profile/:username",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },


  {
    path: "/profile/edit",
    name: "ProfileEdit",
    // lazy-loaded
    component: ProfileEdit,
  },

  {
    path: "/student/list",
    name: "studentList",
    // lazy-loaded
    component: StudentList,
  },

  {
    path: "/reservation/list",
    name: "scheduleList",
    component: ScheduleList,
  },

  {
    path: "/schedule/:username/edit",
    name: "scheduleCreate",
    component: ScheduleCreate,
  },

  {
    path: "/reservation/edit/:idreservation/:studentusername",
    name: "reservationEdit",
    component: ReservationEdit,
  },

  {
    path: "/reservation/:username/contract",
    name: "reservationCreate",
    component: ReservationCreate,
  },

  {
    path: "/student/list",
    name: "studentList",
    component: StudentList,
  },

  {
    path: "/job/list/internship",
    name: "jobPostInternshipList",
    component: JobPostInternshipList,
  },

  {
    path: "/job/list/temporary",
    name: "jobPostTemporaryList",
    component: JobPostTemporaryList,
  },

  {
    path: "/job/show/:id",
    name: "jobPostShow",
    component: JobPostShow,
  },
  {
    path: "/job/create",
    name: "jobPostCreate",
    component: JobPostCreate,
  },
  {
    path: "/job/edit/:id",
    name: "jobPostEdit",
    component: JobPostEdit,
  },



  {
    path: "/student/show/:username",
    name: "studentShow",
    component: StudentShow,
  },
  {
    path: "/employer/show/:username",
    name: "employerShow",
    component: EmployerShow,
  },
  {
    path: "/notification/list",
    name: "notificationTable",
    component: NotificationTable,
  },

  {
    path: "/notification/show/:id",
    name: "notificationShow",
    component: NotificationShow,
  },



];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  },
  routes,
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('authentication');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });

export default router;