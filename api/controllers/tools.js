export const handleFileUpload = (req, res) => {
	const protocol = req.protocol
	const host = req.get('host')
	const path = req.originalUrl
	const fullUrl = `${protocol}://${host}${path}`
	const file = req.file
	console.log(file)
	res.status(200).json(fullUrl+'/'+file.filename)
}
export const getText = (html) =>{
	const doc = new DOMParser().parseFromString(html, 'text/html')
	return doc.body.textContent
}
