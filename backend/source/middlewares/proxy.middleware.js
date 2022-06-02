import httpProxy from 'http-proxy';

let proxy = httpProxy.createProxyServer({
  target: {
    host: 'http://mch-backend-api',
    port: 8080
  },
  changeOrigin: true,
});


const proxyMiddleware = async (req, res, next) => {
    //req.log.info('Authorization Middleware!');

    const endpoint = req.path;




    /*console.log(`Request passport: ${req.session.passport}`);*/

    if (/^(\/api)(\/)(.*)((\/|\?)([^\s]+))?/.test(endpoint)) {
        const path = req.path.replace('/api/v1', '').split('/');
        console.log('endpoint', endpoint, path[1])

        req.url = '/api/ping';
        //http://mch-backend-api:8080/api/ping

        req.headers.authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.5mhBHqs5_DTLdINd9p5m7ZJ6XD0Xc55kIaCRY5r6HRA';
        const option = {
            target: 'http://mch-backend-api:8080',
            selfHandleResponse : true,
            changeOrigin: true,
        };
        proxy.on('error', function (err, req, res) {
            res
            .status(500)
            .end(JSON.stringify({
                message: err,
            }));
            return;
        });
        proxy.on('proxyRes', function (proxyRes, req, res) {
            let body = [];
            if (proxyRes.statusCode !== 200) {
                res
                .status(proxyRes.statusCode)
                .end(JSON.stringify({
                    message: proxyRes.statusMessage,
                }));
                return
            }
            proxyRes.on('data', function (chunk) {
                body.push(chunk);
            });
            proxyRes.on('end', function () {
                body = Buffer.concat(body).toString();
                if (body) {
                    console.log("res from proxied server:", JSON.parse(body));
                    const tmdb = JSON.parse(body);
                    const response = {
                        movie: {
                            originalTitle: tmdb.original_title || null,
                            imdbId: tmdb.imdb_id || null,
                            tmdbId: tmdb.id || null,
                            releaseDate: tmdb.release_date || null,
                            runtime: tmdb.runtime || null,
                            poster: tmdb.poster_path ? `https://image.tmdb.org/t/p/w500/${tmdb.poster_path}` : null,
                        }
                    };
                    res.end(JSON.stringify(response));
                }
            });
        });
        proxy.web(req, res, option);

    } else {
        next()
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
    //next();
};

module.exports = {
    proxyMiddleware,
};