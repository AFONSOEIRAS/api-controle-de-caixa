const router = require("express").Router()

const Revenue = require("../models/Revenue")
//rotas de receita
router.post("/", async (req, res) =>{

    // req.body
    //destructuring nodejs
    const {name, money} = req.body;

    if(!name) {
        res.status(422).json({error:"O nome é obrigatório!"})
        return
    }
    const revenue = {
        name,
        money
    }

    try {
        //criando dados
        await Revenue.create(revenue)

        res.status(201).json({message: "Receita inserida no sistema com sucesso!"})

    } catch(error) {
        res.status(500).json({error:error})
    }
})

//Read - Leitura de dados

router.get("/", async(req, res) =>{
try{
    const revenues = await Revenue.find()

    res.status(200).json(revenues)
} catch(error){
    res.status(500).json({error:error})
}

})

//Read - Total de soma das receitas
router.get("/totalMoney", async(req, res) =>{
    try{
        const revenues = await Revenue.find()

        let soma = revenues.reduce(getSum, 0);

        function getSum(total, item) {
               return total + parseFloat(item.money);
         }
        
        soma = soma.toString().replace(".", ",")

        res.status(200).json("Soma total das receitas: R$" +soma)
    } catch(error){
        res.status(500).json({error:error})
    }
})


router.get("/:id", async(req, res) =>{

    const id = req.params.id;

    try{
        const revenue = await Revenue.findOne({_id: id})

        if(!revenue){
            res.status(422).json({message:"O receita não foi encontrada!"})
            return
        }

        res.status(200).json(revenue)
    } catch (error) {
        res.status(500).json({error:error})
    }
})

// Update - atualização de dados (PUT, PATCH)
router.patch("/:id", async (req, res) =>{
    const id = req.params.id

    const {name, money} = req.body
    
    const revenue = {
        name, 
        money
    }

    try{
        const updatedRevenue = await Revenue.updateOne({_id:id}, revenue)

        console.log(updatedRevenue)
        
        if(updatedRevenue === 0){
            res.status(422).json({message:"a receita não foi encontrada!"})
            return
        }

        res.status(200).json(revenue)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

// Delete - deletar dados
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const revenue = await Revenue.findOne({_id: id})

    if(!revenue){
        res.status(422).json({message:"a receita não foi encontrada!"})
        return
    }

    try{
        await Revenue.deleteOne({_id: id})

        res.status(200).json({message:"Receita removida com sucesso!"})
    } catch (error) {
        res.status(500).json({error:error})
    }
})


module.exports = router