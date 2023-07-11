import { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import Zmage from 'react-zmage'
const Write = () => {
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [file, setFile] = useState(null)
	const [img, setImg] = useState('')
	const [cat, setCat] = useState('')
	const categories = [
		{ value: 'art', label: 'Art' },
		{ value: 'science', label: 'Science' },
		{ value: 'technology', label: 'Technology' },
		{ value: 'cinema', label: 'Cinema' },
		{ value: 'design', label: 'Design' },
		{ value: 'food', label: 'Food' }
	]
	const postId = useLocation().search.split('=')[1]
	const navigate = useNavigate()
	const fetchData = async () => {
		try {
			const res = await axios.get(`/api/posts/${postId}`)
			const { title:postTitle = '', desc:postDesc = '', img:postImgUrl = '', cat:postCat = '' } = res.data
			setTitle(postTitle)
			setDesc(postDesc)
			setImg(postImgUrl)
			setCat(postCat)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		if (postId) {
			fetchData()
		} else {
			setTitle('')
			setDesc('')
			setImg('')
			setCat('')
			setFile(null)
		}
	}, [postId])
	/*const upload = (e) => {
		setFile(async () => {
			const newFile = e.target.files[0]
			try {
				const formData = new FormData()
				console.log(newFile)
				formData.append('file', newFile)
				const res = await axios.post('/api/tools/upload', formData)
				setImg(res.data)
			} catch (err) {
				console.log(err)
			}
		})
	}*/
	const upload = async (e) => {
		const newFile = e.target.files[0]

		try {
			const formData = new FormData()
			formData.append('file', newFile)

			const res = await axios.post('/api/tools/upload', formData)
			const imageUrl = res.data

			setFile(newFile)
			setImg(imageUrl)
		} catch (err) {
			console.log(err)
		}
	}
	const handleClick = async (e) => {
		e.preventDefault()
		try {
			postId
				? await axios.put(`/api/posts/${postId}`, {
					title,
					desc,
					img,
					cat
				})
				: await axios.post('/api/posts', {
					title,
					desc,
					img,
					date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
					cat
				})
			navigate('/')
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className='write'>
			<div className='content'>
				<input type='text' placeholder='Please input the title' value={title} onChange={(e) => setTitle(e.target.value)}/>
				<div className='editorContainer'>
					<ReactQuill className='editor' theme='snow' value={desc} onChange={setDesc}></ReactQuill>
				</div>
			</div>
			<div className='menu'>
				<div className='item'>
					<h1>Public</h1>
					<span>
						<b>Status: </b> Draft
					</span>
					<span>
						<b>Visibility: </b> Public
					</span>
					{img && (<Zmage className='post-img' src={img} alt='' />)}
					<input style={{ display: 'none' }} type='file' name='file' id='file' onChange={upload}/>
					<label className='file' htmlFor='file'>Upload Image</label>
					<div className='buttons'>
						<button>Save as a draft</button>
						<button onClick={handleClick}>Publish</button>
					</div>
				</div>
				<div className='item'>
					<h1>Category</h1>
					{categories.map((category) => (
						<div className='cat' key={category.value}>
							<input type='radio' name='cat' checked={cat === category.value} value={category.value} id={category.value} onChange={(e) =>setCat(e.target.value)}/>
							<label htmlFor={category.value}>{category.value}</label>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Write
