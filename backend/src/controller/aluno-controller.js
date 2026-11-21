import AlunoModel from "../model/aluno-model.js";

const AlunoController = {
  listar(req, res) {
    const alunos = AlunoModel.listar();

    return res.status(200).json({
      total: alunos.length,
      dados: alunos,
    });
  },

  buscarPorId(req, res) {
    const id = req.params.id;

    const resultado = AlunoModel.buscarPorId(id);

    if (!resultado.sucesso) {
      return res.status(resultado.status).json({
        sucesso: false,
        mensagem: resultado.mensagem,
      });
    }

    return res.status(200).json({
      sucesso: true,
      dados: resultado.aluno,
    });
  },

  cadastrar(req, res) {
    const dados = req.body;

    const resultado = AlunoModel.cadastrar(dados);

    if (!resultado.sucesso) {
      return res.status(resultado.status).json({
        sucesso: false,
        mensagem: resultado.mensagem,
      });
    }

    return res.status(201).json({
      sucesso: true,
      mensagem: "Aluno cadastrado com sucesso.",
      dados: resultado.aluno,
    });
  },

  atualizar(req, res) {
    const id = req.params.id;

    const dados = req.body;

    const resultado = AlunoModel.atualizar(id, dados);

    if (!resultado.sucesso) {
      return res.status(resultado.status).json({
        sucesso: false,
        mensagem: resultado.mensagem,
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Aluno atualizado com sucesso.",
      dados: resultado.aluno,
    });
  },

  remover(req, res) {
    const id = req.params.id;

    const resultado = AlunoModel.remover(id);

    if (!resultado.sucesso) {
      return res.status(resultado.status).json({
        sucesso: false,
        mensagem: resultado.mensagem,
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: "Aluno excluído com sucesso.",
      dados: resultado.aluno,
    });
  },
};

export default AlunoController;
