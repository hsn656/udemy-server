const ApiError = require('../error/api-error');
const AuthService = require('../service/auth');

class AuthController {
    constructor({ authService }) {
        this.authService = authService;
    }

    getUsers = async (req,res)=>{
        const users= await this.authService.getUsers("hsn@hsn.com");
        res.json(users);
    }

    login = async (req, res, next)=> {
        try {
            const user = await this.authService.login(req.body);
            res.send(user);
        } catch (err) {
            next(err);
        }
    }

    register = async (req, res, next)=> {
        try {
            const user = await this.authService.register(req.body);
            res.send(user);
        } catch (err) {
            next(err);
        }
    }
}   

module.exports = AuthController;