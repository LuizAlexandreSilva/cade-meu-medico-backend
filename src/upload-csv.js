const csv = require('csvtojson')

function localValido(local) {
  return local && local.length > 4 && !local.includes('+');
}

async function uploadCsv(arquivo) {
  return csv().fromString(arquivo.data.toString())
    .then(data => {
      return data.map((pessoa) => {
        const descNaturezaJuridica = pessoa['DESCRICAO NATUREZA JURIDICA'];
        const naturezaJuridica = pessoa['NATUREZA JURIDICA'];
        
        let local;
        if (localValido(naturezaJuridica)) {
          local = naturezaJuridica;
        } else if (localValido(descNaturezaJuridica)) {
          local = descNaturezaJuridica;
        } else {
          return;
        }

        const nome = pessoa['NOME'];
        const cnes = pessoa['CNES'];

        return {
          nome,
          cnes,
          local,
        }
      })
    });
}

module.exports = {
  uploadCsv
};
