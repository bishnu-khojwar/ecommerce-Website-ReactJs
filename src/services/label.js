import { httpGet, httpPOst, httpDelete} from "./axios";
import { httpPut } from "./axios";
export const addLabel = async (data) => {
    try {
        let formData = new FormData();
        let file = data.image;
        delete data.image;

        Object.keys(data).forEach((key, index) => {
            formData.append(key, data[key])
        })
        formData.append('image', file, file.name);

        let response = await httpPOst('/label', formData, true, true)
        return response;
        //console.log(response)
    } catch (error) {
        throw error;
    }
}
export const getLabelByType = async (type = "banner") => {

    try {
        let response = await httpGet('/label', { type: type }, true);
        return response
        
    } catch (error) {
        throw error;
    }

}

export const deleteLabelById = async (id) => {
    try{
        let response = await httpDelete("/label/"+ id, true);
        return response;
    }catch(error){
        throw error;
    }
}

export const getLabelByID = async (id) => {
    try {
        let response = await httpGet('/label/'+id, true);
        return response
        
    } catch (error) {
        throw error;
    }
}

export const updateLabelById = async (data, id) => {
    try {
        let formData = new FormData();
        let file = data.image;
        delete data.image;

        Object.keys(data).forEach((key, index) => {
            formData.append(key, data[key])
        })
        formData.append('image', file, file.name);

        let response = await httpPut('/label/'+id, formData, true, true)
        return response;
        //console.log(response)
    } catch (error) {
        throw error;
    }
}

export const showLabels = async (type, limit=5) => {
    try {
        let response = await httpGet('/label', {type: type , status: 'active' , limit: limit}, true);
        return response
        
    } catch (error) {
        throw error;
    }

}