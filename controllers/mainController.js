
const controller = {
    index: (req,res) => {
        return res.send ('index');
    },
    registro: (req, res) => {
        return res.send ('register-user');
    },
    registroRestaurante: (req, res) => {
        return res.send ('register-restarurant');
    }
}

module.exports = controller;