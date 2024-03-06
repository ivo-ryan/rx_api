
const express = require ("express");
const mongoose = require('mongoose');
const  cors = require('cors');


const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    app.use(cors());
    next();
});

const port = process.env.PORT || 3000;

const User = mongoose.model('User', {

    email: String || Number,
    senha: String ,
});

const Animes = mongoose.model('Animes', {
    name: String,
    description: String,
    image_url: String,
    epsodios: [] ,
});

const Filmes = mongoose.model('Filmes' , {
    name: String,
    description: String,
    image_url: String,
    filme_url: String,
})

app.get("/" , async (req , res) => {
    const animes = await Animes.find();
   return  res.send( animes )
});

app.get("/filmes", async (req , res) => {
    const filmes = await Filmes.find();
    return res.send( filmes )
});


app.put("/filmes/:id", async ( req, res ) => {
    const filme = await Filmes.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image_url: req.body.image_url,
        description: req.body.description,
        filme_url: req.body.filme_url,
    })

    return res.send(filme)
})

app.post("/user", async (req , res) => {
        const user = new User({
            email: req.body.email,
            senha: req.body.senha,
        })

       await user.save()
       return res.send(user)
});

app.get("/user" , async (req , res) => {
    const user = await User.find()
   return  res.send(user)
});

app.get("/:id" , async (req , res) => {
    const animes = await Animes.findById(req.params.id);
   return  res.send( animes )
});

app.get("/filmes/:id", async (req , res) => {
    const filmes = await Filmes.findById(req.params.id);
    return res.send( filmes )
});

app.delete('/user/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    return res.send(user)
})

app.post("/animes", async (req , res) => {
    const animes = new Animes({
        name: req.body.name,
        image_url: req.body.image_url,
        description: req.body.description,
        epsodios: req.body.epsodios,
    })

    await animes.save()
    return res.send(animes)
});

app.put("/animes/:id", async (req, res) => {
    const anime = await Animes.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image_url: req.body.image_url,
        description: req.body.description,
        epsodios: req.body.epsodios
    })

    return res.send(anime)
})


app.post("/filmes", async (req , res) => {
    const filme = new Filmes({
        name: req.body.name,
        image_url: req.body.image_url,
        description: req.body.description,
        filme_url: req.body.filme_url,
    })

    await filme.save()
    return res.send(filme)
});

app.listen(port, async () => {
    await mongoose.connect('mongodb+srv://ryan3000:AnimesRX2.0@animesrx.ko9cf6y.mongodb.net/?retryWrites=true&w=majority');
    console.log("App running");
});


