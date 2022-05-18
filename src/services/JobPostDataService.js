import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'job/';

class JobPostDataService {
    listTemporary(params) {
        let uri = API_URL + 'list/temporary?page=' + (params.page-1) + '&&size='+ params.size
        if(params.city) uri += '&&city='+ params.city
        if(params.category) uri += '&&category='+ params.category

        console.log(uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }

    listInternshp(params) {
        let uri = API_URL + 'list/internship?page=' + (params.page-1) + '&&size='+ params.size
        if(params.city) uri += '&&city='+ params.city
        if(params.category) uri += '&&category='+ params.category
        console.log(uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }

    list(params) {
        let uri = API_URL + 'list/' + params.type +'?page=' + (params.page-1) + '&size='+ params.size
        if(params.employer) uri += '&employer='+ params.employer
        if(params.category) uri += '&category='+ params.category
        if(params.query) uri += '&query='+ params.query.toLowerCase().trim()
        if(params.state) uri += '&state='+ params.state

        uri += '&minSalary=' +params.minSalary + '&maxSalary=' + params.maxSalary

        console.log(uri)
        return axios.get(uri, { headers: authenticationHeader() }
        );
    }


    show(id) {
        return axios.get(API_URL + 'show/' + id,
            { headers: authenticationHeader() }
        );
    }

    save(jobPost){
        return axios.post(API_URL + 'save', {
                type :jobPost.type, // temporary or internship
                title :jobPost.title,
                requirements :jobPost.requirements,
                description :jobPost.description,
                startDate :jobPost.startDate,
                category :jobPost.category,
                yearSalary :jobPost.yearSalary,
                expiration :jobPost.expiration,
            },{ headers: authenticationHeader() }
        );
    }

    delete(id) {
        return axios.delete(API_URL + 'delete/' + id,
            { headers: authenticationHeader() }
        );
    }

    update (jobPost){
        return axios.put(API_URL + 'update/' + jobPost.id, {
            type :jobPost.type, // temporary or internship
            title :jobPost.title,
            requirements :jobPost.requirements,
            description :jobPost.description,
            startDate :jobPost.startDate,
            category :jobPost.category,
            yearSalary :jobPost.yearSalary,
            expiration :jobPost.expiration,
            },{ headers: authenticationHeader() }
        );
    }

    findEmployerByJobPost(id) {
        return axios.get(API_URL + 'findEmployer/' + id,
            { headers: authenticationHeader() }
        );
    }


    sendCV(data) {
        return axios.get(API_URL + 'sendCV?idPost=' + data.idPost +  '&idResume=' + data.idResume,
            { headers: authenticationHeader() }
        );
    }


    checkCandidate(id) {
        return axios.get(API_URL + 'checkCandidate?idPost=' + id,
            { headers: authenticationHeader() }
        );
    }

}

export default new JobPostDataService();
