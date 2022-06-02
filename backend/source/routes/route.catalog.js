import { authenticationMiddleware } from '../middlewares/authentication.middleware';
import { proxyMiddleware } from '../middlewares/proxy.middleware';
import express from 'express';
import axios from 'axios';

import httpProxy from 'http-proxy';

import AccountController from '../controllers/account.controller';
import OMDBController from '../controllers/OMDB.controller';
import TMDBController from '../controllers/TMDB.controller';

let proxy = httpProxy.createProxyServer({
  target: {
    host: 'http://mch-backend-api',
    port: 8080,
  },
});

const router = express.Router();

const startRequest = (request, type) => {
    const symbols = {
        query: '?',
        ampersand: '&',
        slash: '/',
    };

    switch (type) {
        case 'query':
            return request === '' ? symbols[type] : symbols.ampersand;
        case 'params':
            return symbols.slash;
    }
};

const setQueryPath = (options) => {
    let request = '';
    let path = '';

    for (const option in options) {
        request = path;
        path = path.concat(`${startRequest(request, 'query')}${option}=${options[option]}`);
    }

    return path;
};

const setParamsPath = (params) => {
    let request = '';
    let path = '';

    for (const param in params) {
        request = path;
        path = path.concat(`${startRequest(request, 'params')}${param}/${params[param]}`);
    }

    return path;
};

const setPath = (data) => {
    let path = '';
    if (data && data.query) {
        path = setQueryPath(data.query)
    }
    if (data && data.params) {
        path = setParamsPath(data.params)
    }
    return path;
};

// middleware
router.use((req, res, next) => authenticationMiddleware(req, res, next));
//router.use((req, res, next) => proxyMiddleware(req, res, next));

// authentication
router.post('/api/internal-authentication/logout', AccountController.logout);
router.post('/api/internal-authentication/login', AccountController.login);
router.get('/api/internal-authentication/account', AccountController.login);


// external
router.get('/api/omdb/:id', OMDBController.getOMDB);

// TMDB
//router.get('/api/tmdb-details/:tmdbMovieId/:movieType', TMDBController.getTMDBMovieDetails);
//router.use('/api/tmdb-details/:tmdbMovieId/:movieType', TMDBController.getTMDBMovieDetails);
router.use('/api/:type(tmdb|blog)/*', (req, res) => {

    console.log('path original base url', req.baseUrl , req.query, req.params['0']);
    // data check

    req.url = req.baseUrl + setPath({ query : req.query });
    //http://mch-backend-api:8080/api/ping

    req.headers.authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.5mhBHqs5_DTLdINd9p5m7ZJ6XD0Xc55kIaCRY5r6HRA';
    const option = {
        target: 'http://mch-backend-api:8080',
        selfHandleResponse : true,
        changeOrigin: true,
    };

    proxy.on('error', (err, req, res) => {
        res
        .status(500)
        .end(JSON.stringify({
            message: err,
        }));
        return;
    });

    proxy.on('proxyRes', (proxyRes, req, res) => {
        let body = [];
        if (proxyRes.statusCode !== 200) {
            res
            .status(proxyRes.statusCode)
            .end(JSON.stringify({
                message: proxyRes.statusMessage,
            }));
            return;
        }
        proxyRes.on('data', (chunk) => {
            body.push(chunk);
        });
        proxyRes.on('end', () => {
            console.log('END END req', req.url)
            body = Buffer.concat(body).toString();
            if (body) {
                if (req.query.type === 'details') {
                    TMDBController.getTMDBMovieDetails(body, res)
                } else {
                    res.end(body)
                }
            };
        });
    });

    proxy.web(req, res, option);
});
router.get('/api/tmdb-cast/:tmdbMovieId/:movieType', TMDBController.getTMDBMovieCast);
router.get('/api/tmdb-external-id/:tmdbMovieId', TMDBController.getTMDBMovieExternalId);


router.get('/api/showtimes', TMDBController.showtimes);



router.all(`/premiers`, (req, res) => {
    console.log('req search imdb', req.method);
    
    axios[req.method.toLowerCase()]('https://mozipremierek.hu/api/main/')
    .then(response => {
       console.log('PREMIERS AXIOS', response.data);
       res.send({
            success: true,
            premiers: response.data,
        });
    })
    .catch(error => {
        console.log('ERROR ERROR!!!', error)
    })

});

// blog crud
/*
router.post('/api/internal-blog/create', BlogController.create);
router.get('/api/internal-blog/list', BlogController.list);
router.put('/api/internal-blog/update', BlogController.update);
router.delete('/api/internal-blog/delete', BlogController.delete);
*/


// recommendation crud
/*
router.post('/api/internal-recommendation/create/movie', RecommendationController.create);
router.post('/api/internal-recommendation/series', RecommendationController.series);
router.post('/api/internal-recommendation/video', RecommendationController.video);
*/

module.exports = router;