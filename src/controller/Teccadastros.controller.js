const mongoose = require("mongoose")
const Cadastro = require("../models/tecnicos")



const resultadoCadastro= async (req, res) => {
    try {
        const Cadastro = await Cadastro.find()
        return res.status(200).json(Cadastro)
    }catch (err){
        res.status(500).json({ message: err.message })
    }
};

const IdCadastro= async(req, res)=>{
    try {
        const Cadastro = await Cadastro.findById(req.params.id)
        return res.status(200).json(Cadastro)
    }catch (err) {
        res.status(500).json({ message: err.message })
    }
};


const criarCadastro = async (req, res) => {
    console.log(req.body)

    const Cadastro = new Cadastro({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        email: req.body.email,
        contato: req.body.contato,
        especialidade: req.body.especialidade,
        estado: req.body.estado,
        datadecreation: req.body.datadecreation,
    })
    const cadastroJaExistir = await Cadastro.findOne({ nome: req.body.nome })
    if (cadastroJaExistir) {
        return res.status(409).json({ error: "Tecnico já cadastrado" })
    }
    try {
        const novoCadastro = await Cadastro.save()
        res.status(201).json(novoCadastro)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const putCadastro = async (req, res) => {
    const encontrarCadastro = await Cadastro.findById(req.params.id)
    if(encontrarCadastro == null){
        return res.status(400).json({message: "Cadastro não encontrado"})
    }
    try{
        const cadastroatualizado = await encontrarCadastro.save()
        res.status(200).json(cadastroatualizado)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
    
}

const deleteCadastro = async (req, res) => {
    try {
        const Cadastro = await Cadastro.findById(req.params.id)
        if (Cadastro == null) {
            return res.status(400).json({ message:"cadastro não encontrado" })
        }
        await Cadastro.remove()
        res.json({message: "cadastro deletado"})
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
}
}

       
module.exports= {
    resultadoCadastro,
    criarCadastro,
    putCadastro,
    IdCadastro,
    deleteCadastro
}