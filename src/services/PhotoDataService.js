import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'photo/';
const FILE_URI = process.env.VUE_APP_ROOT_API + 'files/';

class PhotoDataService {
  getAvatar() {
      let uri = API_URL + 'avatar'
      console.log("[s:file] [m:getAvatar] uri: " + uri)
      return axios.get(uri,
          { headers: authenticationHeader() }
      );
    }

    getAvatarByUsername(username) {
        let uri = API_URL + 'avatar/'+ username
        console.log("[s:file] [m:getAvatarByUsername] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }

    setAvatar(formData, onUploadProgress){
        let uri = API_URL + 'setProfilePicture'
        console.log("[s:file] [m:setAvatar] uri: " + uri)
        return axios
            .post(API_URL + 'setProfilePicture',
                formData,{headers: authenticationHeader(), onUploadProgress})
            .then(response => {
                return response.data;
            });
    }

    getFile(id) {
        let uri = FILE_URI + 'photo/'+ id
        console.log("[s:file] [m:getFile] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }

}

export default new PhotoDataService();
