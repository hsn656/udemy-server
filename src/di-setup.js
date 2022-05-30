const awilix = require('awilix');
const AuthController = require('./controller/auth');
const AuthService = require('./service/auth');


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  lifetime: awilix.Lifetime.SINGLETON,
});

function setup() {
  container.register({

    //controllers    
    authController: awilix.asClass(AuthController),

    // services
    authService: awilix.asClass(AuthService),

  });
}

module.exports = {
  container,
  setup,
};
