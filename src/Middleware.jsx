import axios from "axios";

//Custom Hook Created by HARSH for AXIOS as middleware
export const useAxios = async ({ method, url, data }) => {

    const errObj = {
        displayMessage : "Server Down",
        isSuccess : false
    };

    //Default Setting for PMT server and header
    axios.defaults.baseURL = 'http://localhost:3000';
    try {
        return await axios({
            method: method,
            url: url,
            data: data ? { ...data } : {}
        })
        //Handle the "response" OR "error"
        .then(res => res.data)
        .catch(err => {
            //Set error message
            console.log(err.response.status)
            if (err.response.status == "404") {
                errObj.displayMessage = err.response.status + " ! Requested URL not found !"
            } else if (err.response.status == "403") {
                errObj.displayMessage = "Unauthorized Access Blocked !"
            } else if (err.response.status == "405") {
                errObj.displayMessage = "Request not allowed by server !"
            } else {
                errObj.displayMessage = "Internal Server error !";
            };
            return errObj
        });
    } catch (err) {
        console.log(err);
        return errObj
    }    
}