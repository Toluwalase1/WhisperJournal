const Journal = require('../models/journalEntry')
const mongoose = require('mongoose')

async function createJournal(req, res){
    const { title, body, user_id} = req.body
    if(!title || !body || !user_id ){
        throw Error ('All fields must be field!')
    }
    
    const entry =  await Journal.create(
        {
            title,
            body,
            user_id
        }
    )

    res.send({entry})
}

async function getAllJournal(req, res){
    const entries = await Journal.find().sort({createdAt: -1})
    res.status(200).send({ entries})
}

async function editJournal(req, res){
  const { id } = req.params;

  if(!mongoose.isValidObjectId(id)){
     return res.status(404).json({error: 'Journal does not exist'})
  }

  
  const entry = await Journal.findByIdAndUpdate(id, {...req.body})
  
  if(!entry){
   res.status(400).json({error: 'Journal does not exist'})
 }
  res.status(200).json({entry})
}

async function deleteJournal(req, res){
     const { id } = req.params;

  if(!mongoose.isValidObjectId(id)){
     return res.status(404).json({error: 'Journal does not exist'})
  }

  const entry = await Journal.findByIdAndDelete(id)

  if(!entry){
    res.status(400).json({error: 'Journal does not exist'})
  }
  res.status(200).json({entry})
}
module.exports = {
    createJournal,
    getAllJournal,
    editJournal,
    deleteJournal
}