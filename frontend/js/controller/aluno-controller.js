const AlunoController = {
  iniciar() {
    AlunoView.inicializar();

    AlunoView.configurarFormulario(function (dados) {
      AlunoController.cadastrar(dados);
    });

    AlunoView.configurarBotaoLimpar(function () {
      AlunoController.limparDados();
    });

    AlunoController.atualizarVisualizacao();
  },

  cadastrar(dados) {
    const resultado = AlunoService.cadastrar(dados);

    if (!resultado.sucesso) {
      AlunoView.exibirErro(resultado.mensagem);
      return;
    }

    AlunoView.exibirSucesso(
      `Aluno ${resultado.aluno.nome} cadastrado com sucesso.`,
    );

    AlunoView.limparFormulario();
    AlunoController.atualizarVisualizacao();
  },

  limparDados() {
    const alunos = AlunoService.listar();

    if (alunos.length === 0) {
      AlunoView.exibirErro("Não existem alunos para remover.");

      return;
    }

    const confirmou = AlunoView.confirmarLimpeza();

    if (!confirmou) {
      return;
    }

    AlunoService.limpar();

    AlunoView.exibirSucesso("Todos os alunos foram removidos.");

    AlunoController.atualizarVisualizacao();
  },

  atualizarVisualizacao() {
    const alunos = AlunoService.listar();

    AlunoView.exibirLista(alunos);

    const textoJson = JSON.stringify(alunos, null, 2);

    AlunoView.exibirJson(textoJson);
  },
};

AlunoController.iniciar();