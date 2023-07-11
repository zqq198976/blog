import {
	createBrowserRouter,
	RouterProvider,
	Outlet
} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Write from './pages/Write.jsx'
import Home from './pages/Home.jsx'
import Single from './pages/Single.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import './style.scss'
const Layout = () => {
	return(
		<div>
			<Navbar/>
			<Outlet/>
			<Footer/>
		</div>
	)
}
const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		// 这里children的内容对应的就是<Outlet/>，<Outlet/>相当于占位符，也就是为children准备好的一块地方
		children: [
			{
				path: '/write',
				element: <Write/>
			},
			{
				path: '/',
				element: <Home/>
			},
			{
				path: '/post/:id',
				element: <Single/>
			}
		]
	},
	{
		path: '/register',
		element: <Register/>
	},
	{
		path: '/login',
		element: <Login/>
	}
])
function App () {
	return (
		<div className='app'>
			<div className='container'>
				<RouterProvider router={router} />
			</div>
		</div>
	)
}

export default App
