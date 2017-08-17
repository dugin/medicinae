import * as express from 'express';
const posts = express.Router();
import * as Nightmare from 'nightmare';


function checkSession(req, res, next) {
    req.session.login ? next() : res.redirect('/');
}

posts.get('/posts', checkSession, (req, res, next) => {

    const nightmare = new Nightmare({
        show: true,
        waitTimeout: 7000
    });

    nightmare
        .goto('https://www.facebook.com/')
        .type('#email', req.session.login.email)
        .type('#pass', req.session.login.password)
        .click('#loginbutton')
        .wait('.fbUserPost')
        .scrollTo(350, 0)
        .wait(2000)
        .evaluate(() => {

            let cont = 0;

            return Array.from(document.querySelectorAll('._1dwg'))
                .filter(value => {
                        if (value.querySelector('.fsm > a > abbr > .timestampContent') && cont < 3) {
                            cont++;
                            return true;
                        }

                        return false
                    }
                )
                .map((value: Element) => {

                    const title = value.querySelector('.fwb > a');
                    const text = value.querySelector('.userContent > p');
                    const time = value.querySelector(' .fsm > a > abbr > .timestampContent');

                    return {
                        title: title ? title.textContent : '',
                        text: text ? text.textContent : 'Sem texto no post...',
                        time: time.textContent
                    };

                })
        })
        .end()
        .then((results: any[]) => {
            res.render("main", {results})
        })
        .catch((error) => {
            res.render("main", {error: 'Senha ou email inválido'})
        })

});


posts.post('/posts', (req, res, next) => {

    req.session.login = {
        email: req.body.email,
        password: req.body.password
    };

    res.redirect('/posts');
});

export default posts;