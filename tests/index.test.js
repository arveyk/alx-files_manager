const assert = require('assert');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const app = require('../routes/index.js');
const expect = chai.expect;

chai.use(chaiHttp);


describe('API endpoint test', function() {
  describe('Get /status/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/status')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

describe('API endpoint test', function() {
  describe('Get /stats/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/stats')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

describe('API endpoint test', function() {
  describe('Post /status/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.post('/status')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

describe('API endpoint test', function() {
  describe('Get connect/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/connect')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});
describe('API endpoint test', function() {
  describe('Get connect/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/connect')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});
describe('API endpoint test', function() {
  describe('Get users/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/users')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});
// router.get('/users/me', getMe);
describe('API endpoint test', function() {
  describe('Get disconnect/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/disconnect')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

// router.get('/files/:id', getShow);
describe('API endpoint test', function() {
  describe('Post /files/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.post('/files')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

// router.get('/files', getIndex);

describe('API endpoint test', function() {
  describe('Put /filest/', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.put('/files/:id/publish')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

describe('API endpoint test', function() {
  describe('Put /files/:id/publish', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.put('/connect')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});

describe('API endpoint test', function() {
  describe('Get /files/:id/data', function () {
    it('should return 200', function (done) {
      chai.request(app)
	.get('/files/:id/data')
	.end((err, res) => {
	  expect(res).to.have.status(200);
	  expect(res.body).to.be.an('object')
	});
    })  
  )}
});
