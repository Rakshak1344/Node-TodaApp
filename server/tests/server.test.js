const expect = require('expect');
const request = require('supertest');
const {ObjectID}= require('mongodb');
const {app}=require('./../server');
const {Toda}= require('./../models/toda');

const todas = [{
    _id: new ObjectID(),
    text: "First TEST"
},{
    _id: new ObjectID(),
    text: "Second TEST"
}];

//testing life cycle method
beforeEach((done)=>{
    Toda.remove().then(()=>{
        return Toda.insertMany(todas);
        // done();
    }).then(()=>done());
});

describe('POST /todas',()=>{
    it('should create a new toda',(done)=>{
        var text= 'Testing todas';

        request(app)
        .post('/todas')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err)=>{
            if(err){
                return done(err);
            }

            Toda.find({text}).then((todas)=>{
                expect(todas.length).toBe(1);
                expect(todas[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));        
        });
    });

    it('should not create toda with invalid data',(done)=>{
        request(app)
        .post('/todas')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            Toda.find().then((todas)=>{
                expect(todas.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
    });
});

describe('GET /todas',()=>{
    it('Should Get all todas',(done)=>{
        request(app)
        .get('/todas')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todas.length).toBe(2);
        })
        .end(done);
    });
});

// "test": "echo \"Error: no test specified\" && exit 1"

describe('GET /todas/:id',()=>{
    if('should return toda doc',(done)=>{
        request(app)
        .get(`/todas/${todas[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.toda.text).toBe(todas[0].text)
        })
        .end(done);
    });
});