//import INTERNAL from '@/services/catalogs/internal/internal.endpoints.service'
import EXTERNAL from '@/services/catalogs/external/external.endpoints.service'
import INTERNAL from '@/services/catalogs/internal/internal.endpoints.service'
//import { store } from '@/store'

export default {
    async ROUTER(url, key, value) {

        /* call config endpoints */
        /*
        const frontendConfig = await store.dispatch('getConfig');
        const backendConfig = await store.dispatch('getBackendConfig', frontendConfig.VUE_APP_API_EXTERNAL_URL)

        const config = Object.assign({},
            frontendConfig,
            backendConfig,
        );

        const API_EXTERNAL_URL = config.VUE_APP_API_EXTERNAL_URL;
        const API_EXTERNAL_INVOICE_DOWNLOAD_URL = config.VUE_APP_API_EXTERNAL_INVOICE_DOWNLOAD_URL;
        const API_PREFIX = config.VUE_APP_API_PREFIX;
        const API_VERSION = config.VUE_APP_API_VERSION;
        const API_VERSION_BACKEND = config.M2M_BACKEND_API_VERSION;
        */

        /* frontend endpoints list */
        const ENDPOINTS = Object.assign({},
            //INTERNAL.ENDPOINTS(),
            EXTERNAL.ENDPOINTS(key, value),
            INTERNAL.ENDPOINTS(key, value),
        );

        if (typeof ENDPOINTS[url] !== 'undefined' && ENDPOINTS[url] !== '') {
            /*if (url.startsWith('INTERNAL')) {
                return `${API_PREFIX}/${API_VERSION}${ENDPOINTS[url]}`
            }*/
            return ENDPOINTS[url]
        } else {
            throw new Error(`Endpoint is not defined`)
        }
    }
}