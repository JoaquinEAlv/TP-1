import express from 'express';
import fs, { read } from 'fs';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());

const readData = () => {
    try
    {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    }
    catch (error)
    {
        console.log(error);
    }
    
};

const writeData = (data) => {
    try
    {
        fs.writeFileSync("./db.json",JSON.stringify(data));
    }
    catch (error)
    {
        console.log(error);
    }
};


app.get("/", (req,res) => {
    res.send("Welcome to Miami");
});


app.get("/Libros",(req,res) => {
    const data = readData();
    res.json(data.Libros);

});

app.get("/Libros/:id",(req,res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const libro = data.Libros.find((libro) => libro.id === id);
    res.json(libro);
});

app.post("/Libros", (req,res) => {
    const data = readData();
    const body = req.body;
    const nuevoLibro = {
        id: data.Libros.length + 1,
        ...body,
    };
    data.Libros.push(nuevoLibro);
    writeData(data);
    res.json(nuevoLibro);
});

app.put("/Libros/:id", (req,res)=>{
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const libroIndex = data.Libros.findIndex((libro)=>libro.id === id);
    data.Libros[libroIndex] = {
        ...data.Libros[libroIndex],
        ...body
    };
    writeData(data);
    res.json({message: "Libro actualizado correctamente"})
});

app.delete("/Libros/:id",(req,res)=>
{
    const data = readData();
    const id = parseInt(req.params.id);
    const libroIndex = data.Libros.findIndex((libro)=>libro.id === id);
    data.Libros.splice(libroIndex,1);
    writeData(data);
    res.json({message:"Libro eliminado correctamente"});
});

app.listen(3000, () => {
    console.log('Server conectado a puerto 3000');
});


