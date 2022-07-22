const express = require('express')
const app = express()
const multer = require('multer')

const upload = multer({dest: 'uploads/'})


app.get('/',(req,res)=>{
	res.send("hello world")
})

app.post('/images', upload.single('image'), (req, res) => {
	const file = req.file
	console.log(file)
	res.send("image is uploading...")
})

app.listen(5000,()=> console.log("application running on port 5000"))

