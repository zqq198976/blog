import db from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = (req, res) => {
	// 检测我们的用户是否存在于数据库中
	const q = 'SELECT * from users WHERE email = ? OR username = ?'
	db.query(q, [req.body.email, req.body.username], (err, data) => {
		if (err) return res.json(err)
		if (data.length) return res.status(409).json('用户已经存在')
		// Hash the password
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(req.body.password, salt)
		// 注册用户
		const q = 'INSERT INTO users(`username`, `email`, `password`) VALUES (?)'
		const values = [req.body.username, req.body.email, hash]
		db.query(q, [values], (err, data) => {
			if (err) return res.status(500).json(err)
			return res.status(200).json('用户注册成功！')
		})
	})
}
export const login = (req, res) => {
	//检测我们的用户是否存于数据库中
	const q = 'SELECT * FROM users WHERE username = ?'
	db.query(q, [req.body.username], (err, data) => {
		if (err) return res.status(500).json(err)
		if (data.length === 0) return res.status(404).json('用户不存在')
		// 用户存在，对比密码
		const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password)
		if (!isPasswordCorrect) return res.status(400).json('用户名或者密码不正确')
		const token = jwt.sign({ id: data[0].id }, 'jwtkey')
		const { password, ...other } = data[0]
		res.cookie('accessToken', token, {
			httpOnly: true
		}).status(200).json(other)
	})
}
export const logout = (req, res) => {
	res.clearCookie('accessToken', {
		sameSite: 'none',
		secure: true
	}).status(200).json('用户已经成功登出！')
}
