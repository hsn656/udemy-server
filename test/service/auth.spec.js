const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../../src/models/user');
const AuthService = require('../../src/service/auth');


describe('Auth Service', () => {
        
    let service;
    let users=[
        {
            _id: '5d7b9f9f8f9f9f9f9f9f9f9',
            email: 'user@example.com',
            password: '$2a$10$4Xq/X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.',
            firstName: 'John',
            lastName: 'Doe'
        }
    ];

    sinon.stub(User, 'findByEmail').callsFake((email) => {
        return new Promise((resolve, reject) => {
            const user = users.find(u => u.email === email);
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
    });
    });

    beforeEach(() => {
        service = new AuthService();
    });

    it('should be defined', () => {
        expect(service).not.to.be.undefined;
    });

    describe('login', () => {

        it("should throw error if email does not exist",async ()=>{
            try{
                await service.login('hsn@hsn.com',"password");
            }catch(error){
                expect(error.message).to.equal('email or password is incorrect');
            }
        })

        it("should throw error if password is incorrect",async ()=>{
            sinon.stub(service, 'isPasswordValid').resolves(false);
            try{
                await service.login('hsn@hsn.com',"password");
            }catch(error){
                expect(error.message).to.equal('email or password is incorrect');
            }
            service.isPasswordValid.restore();
        })

        it("should return access token",async ()=>{
            sinon.stub(service, 'isPasswordValid').resolves(true);
            sinon.stub(service, 'generateToken').resolves('token');
            const result = await service.login('user@example.com',"password");
            expect(result.accessToken).to.equal('token');

            service.isPasswordValid.restore();
            service.generateToken.restore();
        })

    });

})