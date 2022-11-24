import express  from "express";
import  {PrismaClient}  from "@prisma/client";

const prisma = new PrismaClient()
const app = express();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hola Mundo')
})
//-----------{Crear un registro}
app.post(`/post`, async(req, res)=>{
    const {name, profile} = req.body
    const result = await prisma.user.create({
        data: {
            name,
            profile
        }
    })
    res.json(result)
})
//_------------{Mostrar Datos}
app.get(`/posts`, async(req, res)=>{
    const showData= await prisma.user.findMany()
    res.json(showData)
})
//-------------------{UPDATE REGISTRO}
app.put(`/post/:id`, async(req, res)=>{
    const {id} = req.params
    const {name} = req.body 
    const userUpdate = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data: {
            name
        }
    })
    res.json(userUpdate)
})
app.delete(`/post/:id`, async(req, res)=>{
    const {id} = req.params
    const deleteUser = await prisma.user.delete({
        where:{
            id: Number(id)
        }
    })
    res.json(deleteUser)
})
//creAR RESGRISTRO DE USER
// app.post(`/post`, async(req, res)=>{
//     const {userId}= req.body
//     const result = await prisma.profile.create({
//         data: {
//             userId
//         }
//     })
//     res.json(result)
// })

app.listen(3000, ()=>{
    console.log('Puerto 3000');
})