import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'resume/';

class ResumeDataService {
  listResumes(){
    let uri = API_URL + 'list/'
    //console.log("[s:resume] [m:listResumes] uri: " + uri)
    return axios.get(uri, { headers: authenticationHeader() });
  }


  saveResume(formData, onUploadProgress){
    let uri = API_URL + 'save'
    //console.log("[s:resume] [m:saveResume] uri: " + uri)
    return axios
        .post(uri,
            formData,{headers: authenticationHeader(), onUploadProgress})
        .then(response => {
          return response.data;
        });
  }

  downloadResume(id){
    return axios.get(API_URL + 'show/' + id, {headers: authenticationHeader()});
  }

  deleteResume(id){
    return axios.delete(API_URL + 'delete/' + id, {headers: authenticationHeader()});
  }

}

export default new ResumeDataService();
