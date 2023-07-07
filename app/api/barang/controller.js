const { Barang, Category } = require("../../db/models");
const { Op } = require('sequelize')

module.exports = {
    getAllBarangs: async (req, res, next) => {
        try {
            const { keywoard = '' } = req.query;

            console.log(keywoard);

            let condition = {
                user: req.user.id,
            };

            if (keywoard !== '') {
                condition = { ...condition, merk: { [Op.like]: `%${keywoard}%` } };
            }
            const barangs = await Barang.findAll({
                where: condition,
                include: {
                    model: Category
                }

            });

            res.status(200).json({
                message: "Succes Get All Barangs",
                data: barangs,
            });
        } catch (err) {
            next(err);
        }
    },
    createBarangs: async (req, res, next) => {
        try {
            let user = req.user.id;
            const { merk, category, image, price, stock } =
                req.body;

            const checkCategory = await Category.findOne({
                where: {
                    id: category,
                    user: user,
                },
            });

            if (!checkCategory) {
                return res.status(404).json({ message: 'id category not found' });
            }

            const barangs = await Barang.create({
                merk,
                category,
                image,
                price,
                stock,
                user: user,
            });

            res.status(201).json({
                message: 'Success create barang',
                data: barangs,
            });
        } catch (err) {
            next(err);
        }
    },
    updateBarangs: async (req, res, next) => {
        try {
          let user = req.user.id;
          const { id } = req.params;
          const {merk, category, image, price, stock } =
            req.body;
    
          const checkCategory = await Category.findOne({
            where: {
              id: category,
              user: user,
            },
          });
    
          if (!checkCategory) {
            return res.status(404).json({ message: 'id category not found' });
          }
    
          const checkBarang = await Barang.findOne({
            where: { id: id },
          });
    
          if (!checkBarang) {
            return res.status(404).json({ message: 'id barang not found' });
          }
    
          const barangs = await checkBarang.update({
            merk,
            category,
            image,
            price,
            stock,
            user: user,
          });
    
          res.status(200).json({
            message: 'Success update barang',
            data: barangs,
          });
        } catch (err) {
          next(err);
        }
      },
      deleteBarangs: async (req, res, next) => {
        try {
          const barangs = await Barang.findOne({ where: { id: req.params.id } });
    
          if (!barangs) {
            return res.status(404).json({ message: 'id book not found' });
          }
    
          barangs.destroy();
    
          res.status(200).json({
            message: 'Success delete barang',
            data: barangs,
          });
        } catch (err) {
          next(err);
        }
      },
};
