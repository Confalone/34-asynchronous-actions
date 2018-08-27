'use strict';

// import team from './models/team.js';
// import player from './models/players.js';
import express from 'express';
const router = express.Router();

import modelFinder from '../middleware/models.js';
router.param('model', modelFinder);

router.get('/api/v1/:model', (req,res,next) => {
  req.model.find({})
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.get('/api/v1/:model/:id', (req,res,next) => {
  req.model.findOne({_id:req.params.id})
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.post('/api/v1/:model', (req,res,next) => {
  let record = new req.model(req.body);
  record.save()
    .then( data => sendJSON(res,data) )
    .catch( next );
});

router.put('/api/v1/:model/:id', (req, res, next) => {

  req.model.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(model => sendJSON(res, model))
    .catch(next);

});

router.delete('/api/v1/:model/:id', (req, res, next) => {

  req.model.findByIdAndDelete(req.params.id)
    .then(data => sendJSON(res, data))
    .catch(next);

});

let sendJSON = (res,data) => {
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write( JSON.stringify(data) );
  res.end();
};

// router.post('/player', (req, res, next) => {
  
//   player
//     .create(req.body)
//     .then(player => {
//       res.send(player);
//     }).catch(next);
// });

// router.get('/player', (req, res, next) => {
//   player
//     .find()
//     .then(player => {
//       player.find().populate('team'.exec().then(fullplayer => {
//         res.send(fullplayer);
//       }).catch(next);
//       // res.send(player);
//     }).catch(next);
// });
export default router;