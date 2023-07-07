const { Category } = require('../../db/models');

module.exports = {
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await Category.findAll({
                where: { user: req.user.id },
                attributes: ['id', 'name','user',],
            });

            res.status(200).json({
                message: 'Succes Get All Categories',
                data: categories,
            })
        } catch (err) {
            next(err);
        }
    },
    createCategories: async (req, res, next) => {
        try {
            const { name } = req.body;

            const categories = await Category.create({
                name: name,
                user: req.user.id,
            });

            res.status(201).json({
                message: 'Sukses Membuat Kategori',
                data: categories,
            });
        } catch (err) {
            next(err);
        }
    },
    updateCategories: async(req, res, next) => {
        try {
            const {id} =req.params;
            const {name} = req.body;

            const categories=await Category.update(
                {name},
                {
                    where: {
                        id:id,
                        user:req.user.id,
                    },
                }
            );
            res.status(201).json({
                message: 'Sukses Update Kategori',
                data: categories,
            });
        } catch (err) {
            next(err)
        }
    },
    deleteCatergories: (req, res, next)=>{
        Category.findOne({
            where: {id: req.params.id, user: req.user.id},
        })
        .then((categories) =>{
            if (categories) {
                categories.destroy();

                res.status(200).json({
                    message: 'Sukses Hapus Kategori',
                    data: categories
                })
            }
        })
        .catch((err)=> next(err));
    }
}