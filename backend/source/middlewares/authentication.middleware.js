//import { login } from '../services/login.service';
//import apiKeys from '../config/api.key';

const authenticationMiddleware = async (req, res, next) => {
    //req.log.info('Authorization Middleware!');

    const endpoint = req.path;

    console.log(`Request passport: ${req.session.passport}`);

    if (/^(\/api)(\/)(internal-auth\/login)((\/|\?)([^\s]+))?/.test(endpoint)) {
        next();
        return;
    }

    /* endpoints permissions */
    //if (/.*/.test(endpoint)) {
    //if (/^(\/api)(\/v1)(\/)(internal-get-warning-message)((\/|\?)([^\s]+))?/.test(endpoint)) {
        //next();
        //return;
    //}


    //user has access to javascript and css files
    /*
    if (/\.(js|css|ico|woff|woff2|png|jpg|jpeg|json)$/.test(endpoint)) {
        next();
        return;
    }
    */

    /*if (!req.session.passport) {
        if (/^\/like/.test(endpoint)) {
            res.status(401);
            res.json({
                success: false,
                message: 'Authentication need!',
            });
            next();
            return;
        }
    }*/

    // TODO check permission of user!!!
    //req.log.info(`User access granted with profile ${JSON.stringify(req.session.passport.user)}`);
    next();
};

module.exports = {
    authenticationMiddleware,
};