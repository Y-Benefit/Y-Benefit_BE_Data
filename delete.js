const { sequelize } = require('./models');
const db = require("./models");
const Policy = db.Policy;
const { Op } = require('sequelize');



sequelize.sync({ force: false }).then(() => {
    console.log("DB Connected Success");
}).catch((err) => {
    console.error(err);
    
});

removeP()


async function removeP() {

    const now = new Date();

    const today = new Date(now.setDate(now.getDate()))
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const date = ('0' + today.getDate()).slice(-2);

    const todayString = year + '-' + month  + '-' + date;

    const overdate = await Policy.findAll({
        attributes : [ 'policyNum', 'title'],
        where : { apply_end : { [Op.lt]: todayString } }
    })

    for (let i of overdate) {
    
        console.log(await Policy.update({ state : "게제종료" }, { where : { apply_end : { [Op.lt]: todayString } }, policyNum : i.policyNum} ));

    }
    

}

