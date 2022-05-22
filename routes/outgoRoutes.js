const router = require("express").Router()

const Outgo = require("../models/Outgo")
//rotas de despesas
router.post("/", async (req, res) =>{

    // req.body
    //destructuring nodejs
    const {name, money} = req.body;

    if(!name) {
        res.status(422).json({error:"O nome é obrigatório!"})
        return
    }
    const outgo = {
        name,
        money
    }

    try {
        //criando dados
        await Outgo.create(outgo)

        res.status(201).json({message: "Despesa inserida no sistema com sucesso!"})

    } catch(error) {
        res.status(500).json({error:error})
    }
})

//Read - Leitura de dados

router.get("/", async(req, res) =>{
try{
    const outgoing = await Outgo.find()

    res.status(200).json(outgoing)
} catch(error){
    res.status(500).json({error:error})
}

})


//Read - Total de soma das despesas
router.get("/totalMoney", async(req, res) =>{
    try{
        const outgoing = await Outgo.find()

        let soma = outgoing.reduce(getSum, 0);

        function getSum(total, item) {
               return total + parseFloat(item.money);
         }
        
         soma = soma.toString().replace(".", ",")
         
         res.status(200).json("Soma total das despesas: R$" +soma)
    } catch(error){
        res.status(500).json({error:error})
    }
})

router.get("/:id", async(req, res) =>{

    const id = req.params.id;

    try{
        const outgo = await Outgo.findOne({_id: id})

        if(!outgo){
            res.status(422).json({message:"A despesa não foi encontrada!"})
            return
        }

        res.status(200).json(outgo)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// Update - atualização de dados (PUT, PATCH)
router.patch("/:id", async (req, res) =>{
    const id = req.params.id

    const {name, money} = req.body
    
    const outgo = {
        name, 
        money
    }

    try{
        const updatedOutgo = await Outgo.updateOne({_id:id}, outgo)

        console.log(updatedOutgo)
        
        if(updatedOutgo === 0){
            res.status(422).json({message:"A despesa não foi encontrada!"})
            return
        }

        res.status(200).json(outgo)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

// Delete - deletar dados
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const outgo = await Outgo.findOne({_id: id})

    if(!outgo){
        res.status(422).json({message:"A despesa não foi encontrada!"})
        return
    }

    try{
        await Outgo.deleteOne({_id: id})

        res.status(200).json({message:"Despesa removido com sucesso!"})
    } catch (error) {
        res.status(500).json({error:error})
    }
})


module.exports = router