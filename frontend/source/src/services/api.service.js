import Vue from 'vue'
import VueResource from 'vue-resource'
import ENDPOINT from '@/services/catalogs/router.catalog.service'
import URLService from '@/services/url.service.js'

Vue.use(VueResource)

class ApiService {
    async get(url, key, data) {
        console.log('GET', url, key, data)
        const value = data && data.value ? data.value : null;
        const endpoint = await ENDPOINT.ROUTER(url, key, value);
        return new Promise((resolve, reject) => {
            let paramPath = '';
            let queryPath = '';
            if (data) {
                if (data.param) {
                    paramPath = `/${data.param}`
                }
                if (data.query) {
                    queryPath = data.query;
                }
            }
            Vue.http.get(endpoint + paramPath + URLService.path(data), {
                    withCredentials: url.startsWith('INTERNAL'),
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.status !== 440) {
                        reject(error);
                    }
                })
        })
    }
    async getFileExport(url, key, data) {
        const endpoint = await ENDPOINT.ROUTER(url, key);
        let paramPath = '';
        let queryPath = '';
        if (data) {
            if (data.param) {
                paramPath = `/${data.param}`
            }
            if (data.query) {
                queryPath = data.query;
            }
        }
        return new Promise((resolve, reject) => {
            Vue.http.get(endpoint + paramPath + queryPath, {
                    responseType: 'arraybuffer',
                    withCredentials: true,
                })
                .then(response => {
                    let fileName = ''
                    if (response.headers.map['content-disposition']) {
                        fileName = response.headers.map['content-disposition'][0].replace('attachment; filename=', '');
                    } else {
                        throw new Error(`Filename and content-disposition are not defined!`)
                    }
                    const url = URL.createObjectURL(
                        new Blob([response.data], {
                            type: data.fileType
                        }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName);
                    document.body.appendChild(link);
                    link.click();
                    resolve(response);
                })
                .catch(error => {
                    if (error.status !== 440) {
                        reject(error);
                    }
                })
        })
    }
    async post(url, object) {
        const key = object && object.key || '';
        const data = object && object.data || '';
        const endpoint = await ENDPOINT.ROUTER(url, key);
        return new Promise((resolve, reject) => {
            Vue.http.post(endpoint, data, {
                    withCredentials: url.startsWith('INTERNAL'),
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.status !== 440) {
                        reject(error);
                    }
                })
        })
    }
    async put(url, body) {
        const endpoint = await ENDPOINT.ROUTER(url);
        return new Promise((resolve, reject) => {
            Vue.http.put(endpoint + '/' + body, {
                    withCredentials: true,
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.status !== 440) {
                        reject(error);
                    }
                })
        })
    }
    async delete(url, id) {
        const endpoint = await ENDPOINT.ROUTER(url);
        return new Promise((resolve, reject) => {
            Vue.http.delete(endpoint + '/' + id, {
                    withCredentials: true,
                })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    if (error.status !== 440) {
                        reject(error);
                    }
                })
        })
    }
}

export default Vue.prototype.$ApiService = new ApiService();