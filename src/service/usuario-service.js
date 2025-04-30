import bcrypt from 'bcrypt';
import  Usuario  from '../models/usuario.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';


const registrar = async (req, res) => {
    const emailConfirm = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    if (!validarSenha(password)) {
        return res.status(400).json({ message: 'A senha deve ter no mínimo 8 caracteres e conter pelo menos um número.' });
    }
    if (!emailConfirm.test(email)) {
        return res.status(400).json({ message: 'Email inválido.' });
    }
    const usuarioRegistrado = await Usuario.findOne({ email});
    if (usuarioRegistrado) {
        return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);


    try {
        const usuario = new Usuario({
            name,
            email,
            password: passwordHash,
        });
        await usuario.save();
        return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
    }catch (error) {
        return res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }


}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        return res.status(400).json({ message: 'Email ou senha inválidos.' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token, usuario: { id: usuario._id, name: usuario.name, email: usuario.email } });
}

export default {
    registrar,
    login,
}

function validarSenha(password) {
    const regex = /^(?=.*\d).{8,}$/;
    return regex.test(password);
}
