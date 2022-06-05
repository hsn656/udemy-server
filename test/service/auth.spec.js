const expect = require('chai').expect;
const sinon = require('sinon');

const User = require('../../src/models/user');
const AuthService = require('../../src/service/auth');


describe('Auth Service', () => {

    const num1=1;
    const num2=2;

    it('should add two numbers', () => {
        expect(num1+num2).to.equal(3);
    });
        
    let service;
    
    beforeEach(() => {
        service = new AuthService();  
    });

    it('should be defined', () => {
        expect(service).not.to.be.undefined;
    });

    describe('login', () => {

        it("should throw error if email does not exist",async ()=>{
            sinon.stub(User, 'findByEmail').resolves(null);
            try{
                await service.login('hsn@hsn.com',"password");
            }catch(error){
                expect(error.message).to.equal('email or password is incorrect');
            }
            User.findByEmail.restore();
        })

        it("should throw error if password is incorrect",async ()=>{
            sinon.stub(User, 'findByEmail').resolves({
                email: 'hsn@hsn.com',
                password: 'password',
                firstName: 'hsn',
                lastName: 'hsn'
            });

            sinon.stub(service, 'isPasswordValid').resolves(false);
            try{
                await service.login('hsn@hsn.com',"password");
            }catch(error){
                expect(error.message).to.equal('email or password is incorrect');
            }
            User.findByEmail.restore();
            service.isPasswordValid.restore();
        })

        it("should return access token",async ()=>{
            sinon.stub(User, 'findByEmail').resolves({
                email: 'hsn@hsn.com',
                password: 'password',
                firstName: 'hsn',
                lastName: 'hsn'         
            });

            sinon.stub(service, 'isPasswordValid').resolves(true);
            sinon.stub(service, 'generateToken').resolves('token');
            const result = await service.login('hsn@hsn.com',"password");
            expect(result.accessToken).to.equal('token');

            User.findByEmail.restore();
            service.isPasswordValid.restore();
            service.generateToken.restore();
        })

    });

})