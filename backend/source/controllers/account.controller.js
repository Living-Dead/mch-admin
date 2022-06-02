//import AccountService from '../services/account.service';

class AccountController {
    logout(req, res) {
        req.session.destroy(() => {
            res.json({
                success: true,
            });
        });
    }

    async login(req, res) {
        console.log('LOGIN LOGIN !!!', req.body);
        const { password, email } = req.body;
        const account = null;
        //await AccountService.login(password, email);
        if (account) {
            req.session.passport = account
            res.json({
                success: true,
                account: req.session.passport,
            });
        } else {
            res.status(403);
            res.send();
        }
    }

    account(req, res) {
        if (req.session.passport) {
            res.json({
                account: {
                    isLoggedIn: true,
                    account: req.session.passport,
                }
            });
        } else {
            res.json({
                account: {
                    isLoggedIn: false,
                    account: {},
                }
            });
        }
    }
}

module.exports = new AccountController();