const router = require('express').Router();
const {blog,user,comment}= require('../Models');
const sequelize = require('../config/connection');


router.get('/',async (req,res)=>{
    try{
        const getBlog= await blog.findAll({include:[{model:comment},{model:user,attributes:['userName']}]});

        res.render('homepage',{blog, loggedIn:true});
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
    }res.render('login');
})

router.get('/blog/:id', async (req,res)=>{ try{
    const findBlog= await blog.findByPk({where:{
        id:req.params.id
    },include:[{model:comment},{model:user,attributes:["userName"]}]})

    if(!findBlog){
        res.status(404).json({message:'Please enter a valid Id'})
    } res.render('single-post',{blog, loggedIn:true})
} catch(err){
    res.status(500).json(err)
}

});

module.exports=router;