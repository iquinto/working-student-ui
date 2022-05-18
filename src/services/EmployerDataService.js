import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'employer/';


class EmployerDataService{
/*    list(page, size, extraData) {
        let uri = API_URL + 'list?page=' + (page-1) + '&&size='+size
        if(extraData.city) uri += '&&city='+ extraData.city
        if(extraData.day) uri += '&&day='+ extraData.day

        console.log("StudentDataService.list >>> " + uri)
        return axios.get(uri,
            { headers: authenticationHeader() }
        );
    }*/

    listContractred(page) {
        let modifiedPage = page -1
        let url = API_URL + 'list/contracted?page='+ modifiedPage
        console.log("listContractred URL >>> " + url)
        return axios.get(url,
            { headers: authenticationHeader() }
        );
    }

    show(username) {
        return axios.get(API_URL + 'show/' + username,
            { headers: authenticationHeader() }
        );
    }
}

export default new EmployerDataService();

