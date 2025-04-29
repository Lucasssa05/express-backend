import usuarioService from "../service/usuario-service.js";

const salvarBanco = async (req, res) => {
    usuarioService.registrar(req, res);
}

const loginBanco = async (req, res) => {
    usuarioService.login(req, res);
}

export default {
    salvarBanco,
    loginBanco,
}