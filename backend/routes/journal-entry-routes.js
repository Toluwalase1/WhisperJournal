const express = require('express')
const router = express.Router()
const {createJournal, getAllJournal, editJournal, deleteJournal} = require('../controllers/journalController')
const requireAuth = require('../middlewares/requireAuth')

router.use(requireAuth)
router.post('/new-journal',createJournal)
router.get('/journals',getAllJournal)
router.patch('/edit-journal/:id',editJournal)
router.delete('/delete-journal/:id',deleteJournal)


module.exports = router