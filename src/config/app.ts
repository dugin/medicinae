import * as express from 'express';
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as morgan from 'morgan';
import * as methodOverride from 'method-override';
import * as exphbs from 'express-handlebars';
import * as path from 'path';
import * as session from "express-session";
import posts from '../routes/posts';


const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(cors({credentials: true, origin: 'http://localhost:8001'}));

app.use(methodOverride());

// app.use(express.static('', {redirect: false}));

app.use(session({
        secret: "medicinae",
        resave: true,
        saveUninitialized: true,
    }
));

app.use(express.static(path.join(__dirname, "../../public")));

app.set("views", path.join(__dirname, '../../views'));
app.engine(".hbs", exphbs({
    defaultLayout: 'index',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../../views', 'layouts')
}));
app.set("view engine", ".hbs");


app.use(posts);


app.get('*', (req, res, next) => {

    res.render('main');

});

export default app;





