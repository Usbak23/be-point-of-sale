const { Transaction, DetailTransaction, Barang } = require('../../db/models');
const { Op } = require('sequelize');
const sequelize = require('../../db/models').sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await Transaction.create(
        {
          invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date(),
          user: user,
        },
        { transaction: t }
      );

      let errorBarangIdNotFound = [],
        errorBarangIdStock = [],
        updateStock = [];

      for (let i = 0; i < payload.length; i++) {
        const checkingBarang = await Barang.findOne({
          where: { id: payload[i].barangId, user: user },
        });

        // add field create detail transaction
        payload[i].transaction = transaction.id;
        payload[i].nameMerk = checkingBarang?.merk;
        payload[i].barang = checkingBarang.id;
        payload[i].imageBarang = checkingBarang?.image;
        payload[i].priceBarang = checkingBarang?.price;
        payload[i].user = user;

        updateStock.push({
          id: payload[i].barangId,
          stock: checkingBarang?.stock - payload[i].quantity,
          user: user,
        });

        if (payload[i]?.quantity > checkingBarang?.stock) {
          errorBarangIdStock.push(
            `${payload[i]?.quantity} - ${checkingBarang?.stock}`
          );
        }

        if (!checkingBarang) {
          errorBarangIdNotFound.push(payload[i]?.barangId);
        }
      }

      if (errorBarangIdStock.length !== 0) {
        return res.status(400).json({
          message: `Barang stock is not enough with id : ${errorBarangIdStock.join(
            ', '
          )} and user : ${user}`,
        });
      }

      if (errorBarangIdNotFound.length !== 0) {
        return res.status(400).json({
          message: `no barang with id :  ${errorBarangIdNotFound.join(
            ', '
          )} and user : ${user}`,
        });
      }

      console.log(payload);
      console.log(updateStock);
      await Barang.bulkCreate(
        updateStock,
        {
          updateOnDuplicate: ['stock'],
        },
        { transaction: t }
      );

      console.log(payload);

      const detailTranscation = await DetailTransaction.bulkCreate(payload, {
        transaction: t,
      });

      await t.commit();

      res
        .status(201)
        .json({ message: 'Success checkout', data: detailTranscation });
    } catch (err) {
      if (t) await t.rollback();
      next(err);
    }
  },
};
