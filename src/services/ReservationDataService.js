import axios from 'axios';
import authenticationHeader from "../services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'reservation/';


class ReservationDataService {

  save(username, data){
    return axios.post(API_URL  + 'save/' + username, {
      schedules: data.schedules,
      student: data.student,
      startDate: data.startDate,
      numberOfWeeks: data.numberOfWeeks
    },{ headers: authenticationHeader() });
  }

  editReservation(username, id, data){
    let uri = API_URL + 'edit/id/'+ id + '/user/'+ username
    return axios.put(uri, {
      schedules: data.schedules,
      student: data.student,
      startDate: data.startDate,
      numberOfWeeks: data.numberOfWeeks
    },{ headers: authenticationHeader() });
  }

  list(page, username) {
    let modifiedPage = page -1
    let uri = API_URL + 'list/'+ username + '?page='+ modifiedPage
    console.log("[s:reservation] [m:list] uri: " + uri)
    return axios.get(uri,{ headers: authenticationHeader() });

  }

  get(id) {
    let uri = API_URL + 'get/'+ id
    return axios.get(uri,{ headers: authenticationHeader() });
  }

  delete(id, rate, comment) {
    let uri = API_URL + 'delete/id/'+ id + '?rate=' + rate



    if (comment){
      uri = uri + '&comment=' + comment.toString()
    }

    return axios.delete(uri,{ headers: authenticationHeader() });
  }


  accept(id) {
    let uri = API_URL + 'accept/id/'+ id
    return axios.put(uri,{}, { headers: authenticationHeader() });
  }

  reject(id) {
    let uri = API_URL + 'reject/id/'+ id
    return axios.delete(uri,{ headers: authenticationHeader() });
  }



}

export default new ReservationDataService();
