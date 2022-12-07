const router = require('express').Router();
const {blog,user,comment}= require('../Models');
const sequelize = require('../config/connection');
const withAuth=  require('../utils/auth')



router.get('/', withAuth ,async(req,res)=>{
    try{
        const getBlogdash= await blog.findAll({where:{userName_id:req.session.userName_id},include:[{Model:comment},{Model:user,attributes:['userName']}]})
        if(!getBlogdash){
            res.status(404).json({message:'Invalid'});
        }
        res.render('dashboar',{blog,loggedIn:true});
    } catch(err){
        res.status(500).json(err);
    }
})

router.get('/edit/:id',withAuth, async(req,res)=>{ try{
    const editBlog= await blog.findByPk(req.params.id)

    if(!editBlog){
        res.status(404).json({message:'Enter A VALID iD'})
    } res.render('edit-post',{blog,loggedIn:true});
} catch(err){
    res.status(500).json(err)
}

});

router.get('new-post', (req,res)=>{
    res.render('new-post')
});

module.exports=router;