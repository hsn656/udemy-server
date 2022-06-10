const expect = require("chai").expect;
const sinon = require("sinon");

const User = require("../../src/models/user");
const AuthService = require("../../src/service/auth");

describe("Auth Service", () => {
  let service, users;
  before(() => {
    service = new AuthService();
    users = [];

    sinon.stub(User, "findByEmail").callsFake((email) => {
      return new Promise((resolve, reject) => {
        const user = users.find((u) => u.email === email);
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });

    sinon.stub(User, "create").callsFake((user) => {
      return new Promise((resolve, reject) => {
        users.push(user);
        resolve(user);
      });
    });

    sinon.stub(service, "generateToken").resolves("token");
  });

  afterEach(() => {
    users = [];
  });

  after(() => {
    User.findByEmail.restore();
    User.create.restore();
    service.generateToken.restore();
  });

  it("should be defined", () => {
    expect(service).not.to.be.undefined;
  });

  describe("login", () => {
    it("should throw error if email does not exist", async () => {
      try {
        await service.login("hsn@hsn.com", "password");
      } catch (error) {
        expect(error.message).to.equal("email or password is incorrect");
      }
    });

    it("should throw error if password is incorrect", async () => {
      sinon.stub(service, "isPasswordValid").resolves(false);
      try {
        users.push({ email: "hsn@hsn.com" });
        await service.login("hsn@hsn.com", "password");
      } catch (error) {
        expect(error.message).to.equal("email or password is incorrect");
      }
      service.isPasswordValid.restore();
    });

    it("should return access token", async () => {
      sinon.stub(service, "isPasswordValid").resolves(true);
      users.push({ email: "hsn@hsn.com" });
      const result = await service.login("hsn@hsn.com", "password");
      expect(result.accessToken).to.be.string;
      service.isPasswordValid.restore();
    });
  });

  describe("register", () => {
    it("should throw error if email already exists", async () => {
      users.push({ email: "hsn@hsn.com" });
      try {
        await service.register(
          "firstname",
          "lastname",
          "hsn@hsn.com",
          "password"
        );

        //to fail test if no catch error
        expect(true).to.be.false;
      } catch (error) {
        expect(error.message).to.equal("email already exists");
      }
    });

    it("register successfully", async () => {
      const result = await service.register(
        "firstname",
        "lastname",
        "hsn@hsn.com",
        "password"
      );
      expect(result.accessToken).to.be.string;
    });
  });
});
