const path = require('path');
const express = require('express');
const app = express();
const db = require('./db/index')
const { Friends } = db.model;
const morgan = require("morgan");


app.use(morgan("dev"));

app.use(require('body-parser').json());
app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/friends', async(req, res, next)=>{
    try{
        const friends = await Friends.findAll({
            order:[['rating','DESC']]
        });
        res.json(friends);
    }
    catch(ex){
        next(ex)
    }

})
app.put('/api/friends/:id', async(req, res, next)=> {
    try {
      const friend = await Friends.findByPk(req.params.id);
      await friend.update(req.body); 
      res.send(friend);
    }
    catch(ex){
      next(ex);
    }
  });
  app.post('/api/friends', async (req, res, next)=> {
    try {
      res.send(await Friends.create(req.body));
    }
    catch(ex){
      next(ex);
    }
  });
  app.delete('/api/friends/:id', async (req, res, next)=> {
    try {
      const friend = await Friends.findByPk(req.params.id);
      await friend.destroy();
      res.sendStatus(204);
    }
    catch(ex){
      next(ex);
    }
  });


const PORT = 5000;

const init = async function() {
    try{
    await db.syncAndSeed();
  app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}!`);
  });
    }
    catch(ex){
        console.log(ex);
      }
}

init();