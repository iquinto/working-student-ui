import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'student/';


class StudentDataService{
    list(page, size, params) {
        let uri = API_URL + 'list?page=' + (page-1) + '&size='+size
        if(params.city) uri += '&city='+ params.city
        if(params.jobPosition) uri += '&jobPosition='+ params.jobPosition
        if(params.day) uri += '&day='+ params.day
        if(params.startTime) uri += '&startTime='+ params.startTime
        if(params.endTime) uri += '&endTime='+ params.endTime

        console.log("[s:student] [m:list] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }

    listContractred(page) {
        let modifiedPage = page -1
        let uri = API_URL + 'list/contracted?page='+ modifiedPage
        console.log("[s:student] [m:listContractred] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }

    show(username) {
        let uri = API_URL + 'show/' + username
        console.log("[s:student] [m:show] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }
}

export default new StudentDataService();

