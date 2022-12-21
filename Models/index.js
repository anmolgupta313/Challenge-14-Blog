const Blog= require('./Blog');
const Comments= require('./Comment');
const User= require('./User');



User.hasMany(Blog,{
    foreignKey:'userName_id',
    onDelete:'CASCADE'
})

Blog.belongsTo(User,{
    foreignKey:'userName_id'
})

User.hasMany(Comments,{
    foreignKey:'userName_id',
    onDelete:'CASCADE'
})

Comments.belongsTo(User,{
    foreignKey:'userName_id'
})

Blog.hasMany(Comments,{
    foreignKey:'blog_id',
    onDelete:'CASCADE'
})

Comments.belongsTo(Blog,{
    foreignKey:'blog_id'
})

module.exports={
    Comments,
    Blog,
    User

};