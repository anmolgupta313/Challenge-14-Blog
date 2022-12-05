const router = require('express').Router();
const { blog, user, comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        const getUser = await user.findAll();
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(getUser)
        })
    } catch (err) {
        res.status(500).json(err)
    }

});

router.post('/', async (req,res)=>{ try{
    const postUser= await user.create({
        userName:req.body.userName,
        password: req.body.password
    })

    res.session.save(()=>{
        req.session.loggedIn = true;
        res.status(200).json(postUser);
    })
} catch(err){
    res.status(500).json(err)
}
    
});

router.post('/login', async (req,res)=>{
    try{
        const loginUser= await user.findOne({where:{
            userName:req.body.userName
        }})

        if(!loginUser){
            res.status(404).json({message:{Please enter valid User}})
            return;
        }

        const validPassword = await loginUser.checkPassword(req.body.password);

        if(!validPassword){
            res.status(404).json({message:"Enter Valid Password"})
            return;
        }

        req.session.save(()=>{
            req.session.loggedIn=true;

            res.status(200).json({user:loginUser, message:'You are now Logged In!'});
        });
    } catch(err){
        res.status(500).json(err)
    }
});

router.post('/logout', async(req,res)=>{
    if(req.session.loggedIn){
        req.session.destroy(()=>{
            res.status(204).end();
        })
    } res.status(404).end();
});

module.exports= router;