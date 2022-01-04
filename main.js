
const express = require('express')
const fileUpload = require('express-fileupload');
const { Op } = require('sequelize');

const { Pessoa } = require('./database/models/Pessoa');
const { uploadCsv } = require('./src/upload-csv.js');
const { sequelize } = require('./database');

const app = express()
const port = 3000

app.use(fileUpload());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/search', async (req, res) => {
  const { q } = req.query;
  const resposta = await Pessoa.findAll({
    where: {
      [Op.or]: [
        { nome: { [Op.like]: '%' + q + '%' } },
        { cnes: { [Op.like]: '%' + q + '%' } },
      ],
    },
  });
  res.send(resposta);
})

app.post('/upload-csv', async (req, res) => {
  if (req.files) {
    const pessoas = await uploadCsv(req.files.file);
    try {
      await Pessoa.bulkCreate(pessoas, {
        fields: ['id', 'nome', 'cnes', 'local'],
      }) 
    } catch (err) {
      console.log(err.message)
    }
  }
  res.send('ok')
});

app.listen(port, async () => {
  console.log(`Aplicação rodando em http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    sequelize.sync({ force: true })
    console.log('Conexão com o banco de dados em memória realizada com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco:', error);
  }
})
