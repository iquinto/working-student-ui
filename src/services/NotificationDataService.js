import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'notification/';

class NotificationDataService {
  listNotifications(all) {
      return axios.get(API_URL + 'list?all=' + all,
          { headers: authenticationHeader() }
      );
  }
  show(id) {
        return axios.get(API_URL + 'show/' + id,
            { headers: authenticationHeader() }
        );
  }

  markAsRead(id){
      return axios.put(API_URL + 'markAsRead/' + id, 
          {
              id: id,
              read: true
          },{ headers: authenticationHeader() }
      );
  }

  delete(id) {
    return axios.delete(API_URL + 'delete/' + id,
        { headers: authenticationHeader() }
    );
  }
}

export default new NotificationDataService();
