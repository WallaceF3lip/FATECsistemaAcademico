const alunos = [];
const AlunoModel = {
  normalizarTexto(valor) {
    if (valor === null || valor === undefined) {
      return "";
    }

    return String(valor).trim();
  },

  validarEmail(email) {
    return email.includes("@") && email.includes(".");
  },

  converterId(id) {
    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
      return null;
    }

    return idNumerico;
  },

  localizarIndicePorId(id) {
    const idNumerico = AlunoModel.converterId(id);

    if (idNumerico === null) {
      return -1;
    }

    return alunos.findIndex((aluno) => aluno.id === idNumerico);
  },

  localizarPorRa(ra, idIgnorado = null) {
    return alunos.find((aluno) => aluno.ra === ra && aluno.id !== idIgnorado);
  },

  gerarProximoId() {
    if (alunos.length === 0) {
      return 1;
    }

    const ids = alunos.map((aluno) => aluno.id);
    const maiorId = Math.max(...ids);

    return maiorId + 1;
  },

  validarDados(dados, idIgnorado = null) {
    const alunoValidado = {
      ra: AlunoModel.normalizarTexto(dados?.ra),
      nome: AlunoModel.normalizarTexto(dados?.nome),

      email: AlunoModel.normalizarTexto(dados?.email).toLowerCase(),

      curso: AlunoModel.normalizarTexto(dados?.curso),
      turma: AlunoModel.normalizarTexto(dados?.turma),
    };

    if (
      alunoValidado.ra === "" ||
      alunoValidado.nome === "" ||
      alunoValidado.email === "" ||
      alunoValidado.curso === "" ||
      alunoValidado.turma === ""
    ) {
      return {
        sucesso: false,
        status: 400,
        mensagem: "Todos os campos são obrigatórios.",
      };
    }

    if (!AlunoModel.validarEmail(alunoValidado.email)) {
      return {
        sucesso: false,
        status: 400,
        mensagem: "Informe um e-mail válido.",
      };
    }

    if (AlunoModel.localizarPorRa(alunoValidado.ra, idIgnorado)) {
      return {
        sucesso: false,
        status: 409,
        mensagem: "Já existe um aluno com esse RA.",
      };
    }

    return {
      sucesso: true,
      dados: alunoValidado,
    };
  },

  cadastrar(dados) {
    const validacao = AlunoModel.validarDados(dados);

    if (!validacao.sucesso) {
      return validacao;
    }

    const aluno = {
      id: AlunoModel.gerarProximoId(),
      ...validacao.dados,

      ativo: true,
    };

    alunos.push(aluno);

    return {
      sucesso: true,
      status: 201,
      aluno: { ...aluno },
    };
  },

  listar() {
    return alunos.map((aluno) => ({ ...aluno }));
  },

  buscarPorId(id) {
    const indice = AlunoModel.localizarIndicePorId(id);

    if (indice === -1) {
      return {
        sucesso: false,
        status: 404,
        mensagem: "Aluno não encontrado.",
      };
    }

    return {
      sucesso: true,
      status: 200,
      aluno: { ...alunos[indice] },
    };
  },

  atualizar(id, dados) {
    const indice = AlunoModel.localizarIndicePorId(id);

    if (indice === -1) {
      return {
        sucesso: false,
        status: 404,
        mensagem: "Aluno não encontrado.",
      };
    }

    const alunoAtual = alunos[indice];

    const validacao = AlunoModel.validarDados(dados, alunoAtual.id);

    if (!validacao.sucesso) {
      return validacao;
    }

    alunos[indice] = {
      ...alunoAtual,
      ...validacao.dados,
    };

    return {
      sucesso: true,
      status: 200,
      aluno: { ...alunos[indice] },
    };
  },

  remover(id) {
    const indice = AlunoModel.localizarIndicePorId(id);

    if (indice === -1) {
      return {
        sucesso: false,
        status: 404,
        mensagem: "Aluno não encontrado.",
      };
    }

    const removidos = alunos.splice(indice, 1);

    const alunoRemovido = removidos[0];

    return {
      sucesso: true,
      status: 200,
      aluno: { ...alunoRemovido },
    };
  },
};

export default AlunoModel;
