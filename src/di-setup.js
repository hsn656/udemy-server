const awilix = require('awilix');
const AuthController = require('./controller/auth');
const CourseController = require('./controller/course');
const AuthService = require('./service/auth');
const CourseService = require('./service/course');


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
  lifetime: awilix.Lifetime.SINGLETON,
});

function setup() {
  container.register({

    //controllers    
    authController: awilix.asClass(AuthController),
    courseController: awilix.asClass(CourseController),

    // services
    authService: awilix.asClass(AuthService),
    courseService: awilix.asClass(CourseService),

  });
}

module.exports = {
  container,
  setup,
};
