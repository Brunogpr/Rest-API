const express = require('express')
const router = express.Router()
const mysql = require('../mysql').pool

router.get('/', (req, res, next) => {
    /*res.status(200).send({
        mensagem: 'Retorna todos os produtos'
    })*/

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM produtos;',
            (error, resultado, field) => {
                if (error) {return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
})

router.post('/', (req, res, next) => {
    if (error) {return res.status(500).send({ error: error})}
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release()
                if (error) {return res.status(500).send({ error: error})}
                res.status(201).send({
                    mensagem: 'Produto criado com sucesso',
                    id_produto: resultado.insertId
                })

            }
        )
    })

})

router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({ error: error})}
                return res.status(200).send({response: resultado})
            }
        )
    })
})

router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto Alterado.'
    })
})

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'Produto Excluido.'
    })
})

module.exports = router