import express from 'express';
import session from 'express-session';
import configs from './config';
import path from 'path';
import history from 'connect-history-api-fallback';
import expressLogger from 'express-bunyan-logger';
import i18n from 'i18n-2';
import routerCatalog from './routes/route.catalog';
/*
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import { passportInit } from './services/oAuthPassport.init.service';
import routerCatalog from './routes/catalog/router.catalog';
*/

const log = expressLogger({
    name: process.env.BUNYAN_LOGNAME,
    level: process.env.BUNYAN_LOGLEVEL,
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
        }),
        res: (res) => ({ statusCode: res.statusCode, }),
        body: () => ({}),
    },
});

const app = express();
const port = configs.express.port;
const staticFileMiddleware = express.static(
    path.join(__dirname, app.get('env') === 'development' ? 'fe/dist' : 'public/dist'));

app.use(express.json({ limit: '60mb' }));
app.use(log);

/* session */
app.set('trust proxy', 1);
app.use(session({
    name: 'mch_admin_session',
    secret: 'mch_admin',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: false,
        /* 3 hours */
        maxAge: 3 * 60 * 60 * 1000,
    }
}));

const router = routerCatalog;

// Initialize oauth routes
//passportInit(app, router);

app.use(router);

/* history */
app.use(history({
    htmlAcceptHeaders: ['text/html', '*/*'],
    verbose: true
}));

app.use(staticFileMiddleware);

// create 404 not found
app.use((req, res) => {
    const message = `${req.originalUrl} not found!`;
    req.log.error(message);
    res.status(404);
    res.json({
        success: false,
        message,
    });
});

//app.use(errorHandlerMiddleware);

// start application
app.listen(port, () => console.log(`mch admin app listening on port ${port}!`));
