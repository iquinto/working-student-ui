import axios from 'axios';
import authenticationHeader from "@/services/AuthenticationHeader";

const API_URL = process.env.VUE_APP_ROOT_API + 'schedule/';


class ScheduleDataService{
    getSlots() {
        let uri = API_URL + 'slots/'
        console.log("[s:schedule] [m:slots] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() });
    }
    listSlotsByDay() {
        let uri = API_URL + 'slotsByDay/'
        console.log("[s:schedule] [m:listSlotsByDay] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() });
    }

    slotsByStartTime() {
        let uri = API_URL + 'slotsByStartTime/'
        console.log("[s:schedule] [m:listSlotsByDay] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() });
    }


    listSchedules(username) {
        let uri = API_URL + 'list/' + username
        console.log("[s:schedule] [m:listSchedules] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() });
    }

    getScheduleByUserNameAndSlot(username, slotId) {
        let uri = API_URL + 'get/username/' + username +'/slot/' + slotId
        console.log("[s:schedule] [m:getScheduleByUserNameAndSlot] uri: " + uri)
        return axios.get(uri, { headers: authenticationHeader() });
    }


    setToSchedules(data){
        console.log("[setToSchedules] schedules: " + data.selected)
        return axios.post(API_URL + 'saveAll/' + data.username, {
            slots: data.selected,
        },{ headers: authenticationHeader() });
    }

}

export default new ScheduleDataService();

