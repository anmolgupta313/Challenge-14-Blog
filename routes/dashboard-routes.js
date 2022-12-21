const router = require('express').Router();
const {Blog,User,Comment}= require('../Models');
const sequelize = require('../config/connection');
const withAuth=  require('../utils/auth')



// router.get('/', withAuth ,async(req,res)=>{
//     try{
//         const getBlogdash= await Blog.findAll({where:{userName_id:req.session.userName_id},include:[{Model:Comment},{Model:User,attributes:['userName']}]})
//         if(!getBlogdash){
//             res.status(404).json({message:'Invalid'});
//         } const posts = getBlogdash.map((post) => post.get({ plain: true }));
        
//         res.render('dashboard',{posts,loggedIn:true});
//     } catch(err){
//         res.status(500).json(err);
//     }
// })


router.get('/', withAuth ,async(req,res)=>{
    try{
        await res.render('dashboard');
    } catch(err){
        res.status(500).json(err);
    }
})

router.get('/edit/:id',withAuth, async(req,res)=>{ try{
    const editBlog= await Blog.findByPk(req.params.id)

    if(!editBlog){
        res.status(404).json({message:'Enter A VALID iD'})
    }  const post = editBlog.get({ plain: true }); 
    res.render('edit-post',{post,loggedIn:true});
} catch(err){
    res.status(500).json(err)
}

});

router.get('/newpost', (req,res)=>{
    res.render('new-post')
});

module.exports=router;