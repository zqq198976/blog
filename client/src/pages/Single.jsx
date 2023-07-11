import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import Menu from '../components/Menu.jsx'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext.jsx'
import moment from 'moment'
import { getText } from '../../../api/controllers/tools.js'
const Single = () => {
	const [post, setPost] = useState({})
	const location = useLocation()
	const navigate = useNavigate()
	const postId = location.pathname.split('/')[2]
	const { currentUser } = useContext(AuthContext)
	const fetchData = async () => {
		try {
			const res = await axios.get(`/api/posts/${postId}`)
			setPost(res.data)
		} catch (e) {
			console.log(e)
		}
	}
	useEffect(() => {
		fetchData()
	}, [postId])
	const handleDelete = async () => {
		try {
			await axios.delete(`/api/posts/${postId}`)
			navigate('/')
		} catch (e) {
			console.log(e)
		}
	}
	return (
		<div className='single'>
			<div className='content'>
				<img src={post?.img} alt=''/>
				<div className='user'>
					{post?.userImg && <img src={post.userImg} alt=''/>}
					<div className='info'>
						<span>{post?.username}</span>
						<p>Posted {moment(post?.date).fromNow()}</p>
					</div>
					{currentUser.id === post.uid && (
						<div className='edit'>
							<Link to={`/write?edit=${post.id}`}>
								<img src={Edit} alt=''/>
							</Link>
							<img onClick={handleDelete} src={Delete} alt=''/>
						</div>
					)}
				</div>
				<h1>{post?.title}</h1>
				<p>{getText(post?.desc)}</p>
			</div>
			<Menu cat={post.cat}/>
		</div>
	)
}

export default Single
