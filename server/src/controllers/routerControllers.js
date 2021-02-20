const controllers = {};

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.USER_POSGRE,
    host: process.env.HOST_POSGRE,
    password: process.env.PASSWORD_POSGRE,
    database: process.env.DATABASE_POSGRE,
    port: process.env.PORT_POSGRE
});

controllers.main = (req, resp) => {
    resp.send('Hello World');
}

controllers.getCard = async (req, resp) => {
    const response = await pool.query('SELECT * FROM Card1 ORDER BY idCard ASC');
    resp.status(200).json({ cards: response.rows });
}

controllers.addCard = (req, resp) => {

    const addCardP = async () => {
        const numeroaleatorio = Math.round(Math.random() * 5000000000000000);
        const numCardDB = await pool.query('SELECT * FROM Card1 WHERE numTargeta = $1', [numeroaleatorio]);
        if(numeroaleatorio < 999999999999999) {
            console.log("Error al generar el número de targeta de crédito.")
            addCardP();
        }
        if(numCardDB.rows[0] !== undefined){
            console.log("Error al generar el número de targeta de crédito.")
            addCardP();
        } else if(numeroaleatorio > 999999999999999 && numCardDB.rows[0] === undefined) {
            const cv = Math.round(Math.random() * 999);
            const { firstName, lastName, typeT, colorT, dateExp } = req.body;
            pool.query('INSERT INTO Card1 (firstName, lastName, numTargeta, cvTarget, typeT, colorT, dateExp) VALUES ($1, $2, $3, $4, $5, $6, $7)', [firstName, lastName, numeroaleatorio, cv, typeT, colorT, dateExp], (err, resp1) => {
                if(err){
                    return resp.status(200).json({ message: {
                        msgBody: 'Unable to Add Card.',
                        msgError: true
                    }});
                } else {
                    return resp.status(200).json({ message: {
                        msgBody: 'Successfully Added Card.',
                        msgError: false
                    }});
                }
            });
        }
    }

    addCardP();
}

controllers.getCardById = async (req, resp) => {
    const { id } = req.params;
    const response = await pool.query('SELECT * FROM Card1 WHERE idCard = $1', [id]);
    resp.status(200).json(response.rows[0]);
}

controllers.updateCard = (req, resp) => {
    const { firstName, lastName, typeT, colorT, dateExp } = req.body;
    const { id } = req.params;
    pool.query('UPDATE Card1 SET firstName = $1, lastName = $2, typeT = $3, colorT = $4, dateExp = $5 WHERE idCard = $6', [firstName, lastName, typeT, colorT, dateExp, id], (err, data) => {
        if(err){
            return resp.status(200).json({ message: {
                msgBody: 'Unable to Update Card.',
                msgError: true
            }});
        } else {
            return resp.status(200).json({ message: {
                msgBody: 'Successfully Updated Card.',
                msgError: false
            }});
        }
    });
}

controllers.deleteCard = (req, resp) => {
    const { id } = req.params;
    pool.query('DELETE FROM Card1 WHERE idCard = $1', [id], (err, data) => {
        if(err){
            return resp.status(200).json({ message: {
                msgBody: 'Unable to Delete Card.',
                msgError: true
            }});
        } else {
            return resp.status(200).json({ message: {
                msgBody: 'Successfully Deleted Card.',
                msgError: false
            }});
        }
    });
}

module.exports = controllers;