import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext.jsx'

function Login () {
	const [ inputs, setInputs] = useState({
		username: '',
		password: ''
	})
	const [err, setError] = useState(null)
	const navigate = useNavigate()
	const handleChange = (e) => {
		setInputs(prevState => ({
			...prevState,
			[e.target.name]: e.target.value
		}))
	}
	const { login } = useContext(AuthContext)
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await login(inputs)
			navigate('/')
		} catch (e) {
			setError(e.response.data)
		}
	}
	return (
		<div className='auth'>
			<h1>Login</h1>
			<form>
				<input required type='text' placeholder='username' name='username' onChange={handleChange}/>
				<input required type='password' placeholder='password' name='password' onChange={handleChange}/>
				<button onClick={handleSubmit}>Login</button>
				{err && <p>{err}</p>}
				<span>Do you have an account?<Link to='/register'>Register</Link></span>
			</form>
		</div>
	)
}

export default Login
