import * as express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as compression from 'compression';
import * as passport from 'passport';
import routes from './routes';
import config from './config';
import './middlewares/local-strategy';
import './middlewares/jwt-strategy';

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.listen(config.app.port, () => console.log(`Server listening on port: ${config.app.port}`));