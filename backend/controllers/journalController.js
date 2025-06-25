const Journal = require('../models/journalEntry')
const mongoose = require('mongoose')

async function createJournal(req, res){
    const { _id } = req.user
    const { title, body} = req.body
    if(!title || !body ){
        throw Error ('All fields must be field!')
    }
    
    const entry =  await Journal.create(
        {
            title,
            body,
            user_id: _id
        }
    )

    res.status(200).json(entry)
}

async function getAllJournal(req, res){
  const { _id } = req.user
    const entries = await Journal.find({user_id: _id}).sort({createdAt: -1})
    res.status(200).json(entries)
}

async function editJournal(req, res){
    const { _id } = req.user
  const { id } = req.params;

  if(!mongoose.isValidObjectId(id)){
     return res.status(404).json({error: 'Journal does not exist'})
  }

  const entry = await Journal.findOneAndUpdate({user_id: _id, _id: id},{...req.body})
  

  if(!entry){
   res.status(400).json({error: 'Journal does not exist'})
 }
  res.status(200).json({entry})
}

async function deleteJournal(req, res){
    const { _id } = req.user
     const { id } = req.params;
     console.log(id)

  if(!mongoose.isValidObjectId(id)){
     return res.status(404).json({error: 'Journal does not exist'})
  }

  const entry = await Journal.findOneAndDelete({user_id: _id, _id: id})

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