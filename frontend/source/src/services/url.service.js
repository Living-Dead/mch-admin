import Vue from 'vue'

class URLService {

    startRequest(request, type) {
        const symbols = {
            query: '?',
            ampersand: '&',
            slash: '/',
        };

        switch (type) {
            case 'query':
                return request === '' ? symbols[type] : symbols.ampersand;
            case 'params':
                return symbols[type];
        }
    }

    query(options) {
        let request = '';
        let path = '';

        for (const option in options) {
            request = path;
            path = path.concat(`${this.startRequest(request, 'query')}${option}=${options[option]}`);
        }

        return path;
    }

    path(data) {
        let path = '';
        if (data && data.query) {
            path = this.query(data.query)
        }
        return path;
    }
}

export default Vue.prototype.$URLService = new URLService();