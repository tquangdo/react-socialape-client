import axios from 'axios'

class AxiosService {
    constructor() {
        const inst = axios.create({
            baseURL: "https://asia-east2-socialape-efcc4.cloudfunctions.net/api",
        })
        inst.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        inst.interceptors.response.use(function (response) {
            return response
        }, function (error) {
            return Promise.reject(error)
        })
        this.instance = inst
    }

    get(url) { return this.instance.get(url) }
    post(url, data) { return this.instance.post(url, data) }
    put(url, data) { return this.instance.put(url, data) }
    delete(url) { return this.instance.delete(url) }
    authorize(token) {
        this.instance.defaults.headers.common['Authorization'] = token
    }
    delAutho() {
        delete this.instance.defaults.headers.common['Authorization']
    }
}

export default new AxiosService()