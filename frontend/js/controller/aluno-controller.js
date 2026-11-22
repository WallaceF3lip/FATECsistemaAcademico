const AlunoController = {
    idEmEdicao: null,

    async iniciar() {
        AlunoView.iniciar();

        AlunoView.configurarFormulario(
            AlunoController.salvar
        );

        AlunoView.configurarBotaoCancelar(
            AlunoController.cancelarEdicao
        );

        AlunoView.configurarAcoesTabela(
            AlunoController.iniciarEdicao,
            AlunoController.excluir
        );

        AlunoView.exibirMensagem(
            "Carregando alunos...",
            "informacao"
        );

        try {
            await AlunoController.atualizarVisualizacao();

            AlunoView.exibirMensagem(
                "Dados carregados com sucesso.",
                "sucesso"
            );
        } catch (erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        }
    },

    async salvar(evento) {
        evento.preventDefault();

        const dadosInformados = AlunoView.lerDados();

        const validacao = AlunoModel.validar(
            dadosInformados
        );

        if (!validacao.sucesso) {
            AlunoView.exibirMensagem(
                validacao.mensagem,
                "erro"
            );

            return;
        }

        AlunoView.alterarEstadoFormulario(true);

        try {
            let resultado;

            if (AlunoController.idEmEdicao === null) {
                AlunoView.exibirMensagem(
                    "Cadastrando aluno...",
                    "informacao"
                );

                resultado = await AlunoService.cadastrar(
                    validacao.dados
                );
            } else {
                AlunoView.exibirMensagem(
                    "Atualizando aluno...",
                    "informacao"
                );

                resultado = await AlunoService.atualizar(
                    AlunoController.idEmEdicao,
                    validacao.dados
                );
            }

            await AlunoController.atualizarVisualizacao();

            AlunoController.idEmEdicao = null;

            AlunoView.limparFormulario();
            AlunoView.alterarModoEdicao(false);

            AlunoView.exibirMensagem(
                resultado.mensagem,
                "sucesso"
            );
        } catch (erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        } finally {
            AlunoView.alterarEstadoFormulario(false);
        }
    },

    async iniciarEdicao(id) {
        AlunoView.exibirMensagem(
            "Carregando dados do aluno...",
            "informacao"
        );

        try {
            const aluno = await AlunoService.buscarPorId(id);

            AlunoController.idEmEdicao = id;

            AlunoView.preencherFormulario(aluno);
            AlunoView.alterarModoEdicao(true);
            AlunoView.irParaFormulario();

            AlunoView.exibirMensagem(
                "Altere os dados e clique em Atualizar aluno.",
                "informacao"
            );
        } catch (erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        }
    },

    cancelarEdicao(evento) {
        evento?.preventDefault();

        AlunoController.idEmEdicao = null;

        AlunoView.limparFormulario();
        AlunoView.alterarModoEdicao(false);

        AlunoView.exibirMensagem(
            "Edição cancelada.",
            "informacao"
        );
    },

    async excluir(id) {
        const confirmou = AlunoView.confirmarExclusao();

        if (!confirmou) {
            return;
        }

        AlunoView.exibirMensagem(
            "Excluindo aluno...",
            "informacao"
        );

        try {
            const resultado = await AlunoService.remover(id);

            if (AlunoController.idEmEdicao === id) {
                AlunoController.idEmEdicao = null;

                AlunoView.limparFormulario();
                AlunoView.alterarModoEdicao(false);
            }

            await AlunoController.atualizarVisualizacao();

            AlunoView.exibirMensagem(
                resultado.mensagem,
                "sucesso"
            );
        } catch (erro) {
            AlunoView.exibirMensagem(
                erro.message,
                "erro"
            );
        }
    },

    async atualizarVisualizacao() {
        const alunos = await AlunoService.listar();

        AlunoView.exibirLista(alunos);

        AlunoView.exibirJson(alunos);
    }
};

AlunoController.iniciar();
