import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API;

class AuthenticationDataService {
  login(user) {
    let uri = API_URL + 'login'
    console.log("[s:authentication] [m:login] uri: " + uri)
    return axios.post(uri, {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  getJobPositions(name){
    let uri = API_URL + 'auth/jobpositions?name=' + name
    console.log("[s:authentication] [m:jobpositions] uri: " + uri)
    return axios.get(uri, { headers: authenticationHeader() });
  }

  getUniversities(name){
    let uri = API_URL + 'auth/universities?name=' + name
    console.log("[s:authentication] [m:universities] uri: " + uri)
    return axios.get(uri, { headers: authenticationHeader() });
  }

  getAreas(name){
    let uri = API_URL + 'auth/areas?name=' + name
    console.log("[s:authentication] [m:areas] uri: " + uri)
    return axios.get(uri, { headers: authenticationHeader() });
  }

  getProvinces(name){
    let uri = API_URL + 'auth/provinces?name=' + name
    console.log("[s:authentication] [m:provinces] uri: " + uri)
    return axios.get(uri, { headers: authenticationHeader() });
  }

  register(user) {
    let uri = API_URL + 'register'

    if(user.role === "ROLE_STUDENT"){
      console.log("[s:authentication] [m:getData] uri: " + uri + " role: " + user.role)
      return axios.post(uri, {
        name: user.name ,
        surname: user.surname,
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        birthday: user.birthday,
        sex: user.sex,
        description: user.description,
        university: user.university,
        studentId: user.studentId,
        role: user.role,
        address: {
          street : user.street,
          province : user.province,
          city : user.city,
          zipcode : user.zipcode,
        },
        jobPositions: user.jobPositions,
        hasCar: user.hasCar
      });
    }
    if(user.role === "ROLE_EMPLOYER"){
      console.log("[s:authentication] [m:getData] uri: " + uri + " role: " + user.role)
      return axios.post(uri, {
        name: user.name ,
        surname: user.surname,
        username: user.username,
        password: user.password,
        phone: user.phone,
        email: user.email,
        role: user.role,
        description: user.description,
        address: {
          street : user.street,
          province : user.province,
          city : user.city,
          zipcode : user.zipcode,
        },
        area: user.area,
        hasCompany: user.hasCompany,
        website:user.hasCompany,
        acceptInternship: user.acceptInternship

      });
    }
  }

  loadProfile(){
    let uri = API_URL + 'profile'
    console.log("[s:authentication] [m:loadProfile] uri: " + uri)
    return axios.get(uri, { headers: authenticationHeader() });
  }

  updateProfile(user) {
    let uri = API_URL + 'profile/update'

    if(user.role === "ROLE_STUDENT"){
      let jobPositionsId = []
      for (let i = 0; i < user.jobPositions.length; i++) {
        jobPositionsId[i] = user.jobPositions[i].id
      }
      console.log("[s:authentication] [m:updateProfile] uri: " + uri + " role: " + user.role)
      return axios.put(uri, {
        name: user.name ,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
        birthday: user.birthday,
        sex: user.sex,
        description: user.description,
        university: user.university.id,
        studentId: user.studentId,
        hasCar: user.hasCar,
        address: {
          id : user.address.id,
          street : user.address.street,
          province : user.address.province,
          city : user.address.city,
          zipcode : user.address.zipcode,
        },
        jobPositions: jobPositionsId,
      },{ headers: authenticationHeader() });
    }
    if(user.role === "ROLE_EMPLOYER"){
      console.log("[s:authentication] [m:updateProfile] uri: " + uri + " role: " + user.role)
      return axios.put(uri, {
        name: user.name ,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
        description: user.description,
        address: {
          id : user.address.id,
          street : user.address.street,
          province : user.address.province,
          city : user.address.city,
          zipcode : user.address.zipcode,
        },
        area: user.area.id,
        hasCompany: user.hasCompany,
        website: user.website,
        acceptInternship: user.acceptInternship
      }, { headers: authenticationHeader() });
    }
  }

  resetPassword(password, passwordConfirm){
        return axios.put(API_URL + 'reset', {
          password: password, passwordConfirm: passwordConfirm
        },
        { headers: authenticationHeader() });
  }

  getAllStudents(){
    return axios.get(API_URL + 'auth/student/list', { headers: authenticationHeader() });
  }


  logout() {
    localStorage.removeItem('user');
  }


}

export default new AuthenticationDataService();
