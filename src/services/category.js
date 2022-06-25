import { httpGet, httpPOst, httpDelete } from "./axios";
import { httpPut } from "./axios";
export const addCategory = async (data) => {
    try {
        let formData = new FormData();
        let file = data.image;
        delete data.image;

        Object.keys(data).forEach((key, index) => {
            if (Array.isArray(data[key])) {
                data[key].forEach((i, index) => {
                    formData.append(`${key}[` + [index] + "]", i)
                })

            } else {
                formData.append(key, data[key])
            }
        })
        formData.append('image', file, file.name);
        let response = await httpPOst('/category', formData, true, true)
        return response;
        //console.log(response)
    } catch (error) {
        throw error;
    }
}
export const getCategory = async () => {

    try {
        let response = await httpGet('/category', {}, true);
        return response

    } catch (error) {
        throw error;
    }

}

export const deleteCategoryById = async (id) => {
    try {
        let response = await httpDelete("/category/" + id, true);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getCategoryByID = async (id) => {
    try {
        let response = await httpGet('/category/' + id, true);
        return response

    } catch (error) {
        throw error;
    }
}

export const updateCategoryById = async (data, id) => {
    try {
        let formData = new FormData();
        let file = data.image;
        delete data.image;

        Object.keys(data).forEach((key, index) => {
            if (Array.isArray(data[key])) {
                data[key].forEach((i, index) => {
                    formData.append(`${key}[`+[index]+"]", i)
                })

            } else {
                formData.append(key, data[key])
            }
        })
        if (file) {
            formData.append('image', file, file.name);
        }

        let response = await httpPut('/category/' + id, formData, true, true)
        return response;
        //console.log(response)
    } catch (error) {
        throw error;
    }
}