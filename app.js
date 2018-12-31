require('dotenv').config()
const express = require('express')
const getDistrict = require('./helpers/getDistrict')
const addValue = require('./helpers/addValue')
const app = express()
const port = process.env.PORT
const path = require('path')
const Model = require('./models')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(express.json())  
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('pages/home.ejs')
})

app.get('/kingdoms', (req, res) => {
    Model.Kingdom.findAll({
        order: [['id', 'ASC']]
    })
        .then((kingdoms => {
            res.render('pages/kingdoms', {
                kingdoms: kingdoms
            })
        }))

        .catch((err) => {
            res.send(err)
        })
})

app.get('/kingdoms/:kingdomId', (req, res) => {
    let id = req.params.kingdomId
    let dataKingdom = {}
    let dataDistricts = []
    Model.Kingdom.findOne({
        include : {
            model: Model.District
        },
        where: {
            id: id
        }
    })
        .then((kingdom => {
            dataKingdom = kingdom
            return Model.District.findAll()
        }))
        
        .then((districts) => {
            dataDistricts = districts
            return Model.Soldier.getSoldiers(id)
        })
        .then((count) => {
            // res.send(dataDistricts)
            res.render('pages/kingdom_details', {
                kingdom: dataKingdom,
                jumlahPasukan: count,
                district: getDistrict(dataKingdom.District),
                districts: dataDistricts,
                err : req.query.err || null
            })
        })

        .catch((err) => {
            res.send(err)
        })
})

app.get('/soldiers', (req, res) => {
    let sort = req.query.sort
    let query = null
    if (sort === 'attack') {
        query = 'COALESCE(SUM("Soldiers"."attack"), 0)'
    } else {
        query = 'COALESCE(COUNT("Soldiers"."id"), 0)'
    }
    Model.Kingdom.findAll({
        attributes: ['id', 'kingdomName', [Model.sequelize.literal('COALESCE(SUM("Soldiers"."attack"), 0)'), 'totalAttack'],[Model.sequelize.fn('count', Model.sequelize.col('Soldiers.id')), 'totalSoldier']],
        include: {
          model:Model.Soldier,
          attributes: []
        },
        group: ['Kingdom.id'],
        order: [[Model.sequelize.literal(query), 'DESC']]
      })
        .then((kingdoms) => {
            let dataKingdoms = []
            kingdoms.forEach(kingdom => {
                dataKingdoms.push(kingdom.dataValues)
            });
            // res.send(dataKingdoms)
            res.render('pages/soldiers', {
                kingdoms: dataKingdoms
            })
        })

        .catch((err) => {
          res.send(err)
        })
})

app.post('/soldiers/:kingdomId', (req, res) => {
    let newSoldier = {
        name: req.body.soldierName,
        attack: req.body.attack,
        kingdomId: req.params.kingdomId
    }

    Model.Soldier.create(newSoldier)
        .then((data) => {
            res.redirect(`/kingdoms/${newSoldier.kingdomId}`)
        })

        .catch((err) => {
            res.redirect(`/kingdoms/${newSoldier.kingdomId}?err=${err}`)
        })
})

app.post('/kingdoms/:kingdomId', (req, res) => {
    let districtId = req.body.districtId
    Model.Kingdom.update({
        districtId: districtId
    },{
        where: {
            id: req.params.kingdomId
        },
        individualHooks: true
    })
    .then((data) => {
        res.redirect(`/kingdoms/${req.params.kingdomId}`)
    })

    .catch((err) => {
        res.redirect(`/kingdoms/${req.params.kingdomId}?err=${err}`)
    })
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))