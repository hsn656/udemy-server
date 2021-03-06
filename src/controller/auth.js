class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }

  findByEmail = async (req, res) => {
    const user = await this.authService.findByEmail("hsn@hsn.com");
    res.json(user);
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      res.send(user);
    } catch (err) {
      next(err);
    }
  };

  register = async (req, res, next) => {
    try {
      const { firstName, email, password, lastName, image } = req.body;
      const user = await this.authService.register(
        firstName,
        lastName,
        email,
        password,
        image
      );
      res.send(user);
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
