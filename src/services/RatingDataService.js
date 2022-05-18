import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'rating/';

class RatingDataService {
  getRatingAverage(username){
    return axios.get(API_URL + 'average/' + username, { headers: authenticationHeader() });
  }
}

export default new RatingDataService();
