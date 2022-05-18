import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'history/';

class HistoryDataService {
    listHistory(year) {
        return axios.get(API_URL + 'list/' + year,
            { headers: authenticationHeader() }
        );
    }

}

export default new HistoryDataService();
