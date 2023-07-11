import express from 'express'
import multer from 'multer'
import { handleFileUpload } from '../controllers/tools.js'
import { join } from 'path'
const router = express.Router()
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'upload/')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	}
})
const rootDirectory = process.cwd()
console.log(rootDirectory)
const upload = multer({ storage })
router.use('/upload', express.static(join(rootDirectory,'/upload')))
router.post('/upload',upload.single('file'), handleFileUpload)
export default router
