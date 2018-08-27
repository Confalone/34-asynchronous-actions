'use strict';

import mongoose from 'mongoose';
import Team from './team';

const playersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  number: {
    type: Number,
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'team', 
    required: true,
  },
});

playersSchema.pre('save', function(next) {
  let playerId = this._id;
  let teamId = this.team;
  Team.findById(teamId)
    .then(team => {
      if(!team) {
        return Promise.reject('Invalid team');
      } else {
        Team.findOneAndUpdate(
          {_id: teamId},
          {$addToSet: {players: playerId}}
        )
          .then(Promise.resolve())
          .catch(err => Promise.reject(err));
      }
    })
    .then(next())
    .catch(next);

});

export default mongoose.model('players', playersSchema);