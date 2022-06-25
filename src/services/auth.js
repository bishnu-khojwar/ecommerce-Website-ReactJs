import { httpPOst } from "./axios";

export const login = async (username, password) => {
    try {
        let response = await httpPOst('login', {
            email: username,
            password: password
        });
        console.log("I am in login: ", response)
        let token = response.result.token;
        let user = response.result.user;
        let storage_user = {
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image
        }
        localStorage.setItem("login_token", token);
        localStorage.setItem('login_user_info', JSON.stringify(storage_user));
        return response;
    } catch (error) {
        throw error
    }
}

export const register = async (data) => {
    try {
        let formData = new FormData();
        //console.log(data)
        let file = data.image;
        delete data.image;
        // console.log(data)

        Object.keys(data).forEach((key, index) => {
            formData.append(key, data[key])
        })
        formData.append('image', file, file.name);

        let response = await httpPOst('/register', formData, false, true)
        //console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}

export const changePassword = async (data) => {
    console.log(data);
    try {
        let response = await httpPOst('/change-pwd', data, true);
        if(response){
            return response;

        }else {
            throw response.data.result.msg;
        }
    } catch (error) {
        //console.log("Error:", error)
        throw error.msg;
    }

}