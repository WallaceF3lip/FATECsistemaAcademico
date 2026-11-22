const AlunoView = {
    elementos: {},

    modoEdicao: false,

    iniciar() {
        AlunoView.elementos.formulario =
            document.querySelector("#form-aluno");

        AlunoView.elementos.ra =
            document.querySelector("#ra");

        AlunoView.elementos.nome =
            document.querySelector("#nome");

        AlunoView.elementos.email =
            document.querySelector("#email");

        AlunoView.elementos.curso =
            document.querySelector("#curso");

        AlunoView.elementos.turma =
            document.querySelector("#turma");

        AlunoView.elementos.mensagem =
            document.querySelector("#mensagem");

        AlunoView.elementos.corpoTabela =
            document.querySelector("#corpo-tabela-alunos");

        AlunoView.elementos.totalAlunos =
            document.querySelector("#total-alunos");

        AlunoView.elementos.saidaJson =
            document.querySelector("#saida-json");

        AlunoView.elementos.botaoSalvar =
            document.querySelector("#botao-salvar");

        AlunoView.elementos.botaoCancelar =
            document.querySelector("#botao-cancelar");
    },

    configurarFormulario(aoEnviar) {
        AlunoView.elementos.formulario.addEventListener(
            "submit",
            aoEnviar
        );
    },

    configurarBotaoCancelar(aoCancelar) {
        AlunoView.elementos.botaoCancelar.addEventListener(
            "click",
            aoCancelar
        );
    },

    configurarAcoesTabela(aoEditar, aoExcluir) {
        AlunoView.elementos.corpoTabela.addEventListener(
            "click",
            evento => {
                const botao = evento.target.closest(
                    "button[data-acao]"
                );

                if (!botao) {
                    return;
                }

                const acao = botao.dataset.acao;
                const id = Number(botao.dataset.id);

                if (acao === "editar") {
                    aoEditar(id);
                    return;
                }

                if (acao === "excluir") {
                    aoExcluir(id);
                }
            }
        );
    },

    lerDados() {
        return {
            ra: AlunoView.elementos.ra.value,
            nome: AlunoView.elementos.nome.value,
            email: AlunoView.elementos.email.value,
            curso: AlunoView.elementos.curso.value,
            turma: AlunoView.elementos.turma.value
        };
    },

    preencherFormulario(aluno) {
        AlunoView.elementos.ra.value = aluno.ra;
        AlunoView.elementos.nome.value = aluno.nome;
        AlunoView.elementos.email.value = aluno.email;
        AlunoView.elementos.curso.value = aluno.curso;
        AlunoView.elementos.turma.value = aluno.turma;
    },

    exibirMensagem(mensagem, tipo) {
        AlunoView.elementos.mensagem.textContent = mensagem;

        AlunoView.elementos.mensagem.className =
            `mensagem ${tipo}`;
    },

    criarCelula(valor) {
        const celula = document.createElement("td");

        celula.textContent = valor;

        return celula;
    },

    criarBotao(texto, classe, acao, id) {
        const botao = document.createElement("button");

        botao.type = "button";

        botao.textContent = texto;
        botao.className = classe;

        botao.dataset.acao = acao;
        botao.dataset.id = id;

        return botao;
    },

    exibirLista(alunos) {
        AlunoView.elementos.corpoTabela.innerHTML = "";

        AlunoView.elementos.totalAlunos.textContent =
            `Total: ${alunos.length}`;

        if (alunos.length === 0) {
            const linha = document.createElement("tr");
            const celula = document.createElement("td");

            celula.colSpan = 8;
            celula.textContent =
                "Nenhum aluno foi cadastrado.";

            linha.appendChild(celula);

            AlunoView.elementos.corpoTabela.appendChild(
                linha
            );

            return;
        }

        alunos.forEach(aluno => {
            const linha = document.createElement("tr");

            linha.appendChild(
                AlunoView.criarCelula(aluno.id)
            );

            linha.appendChild(
                AlunoView.criarCelula(aluno.ra)
            );

            linha.appendChild(
                AlunoView.criarCelula(aluno.nome)
            );

            linha.appendChild(
                AlunoView.criarCelula(aluno.email)
            );

            linha.appendChild(
                AlunoView.criarCelula(aluno.curso)
            );

            linha.appendChild(
                AlunoView.criarCelula(aluno.turma)
            );

            linha.appendChild(
                AlunoView.criarCelula(
                    aluno.ativo ? "Sim" : "Não"
                )
            );

            const celulaAcoes = document.createElement("td");

            celulaAcoes.className = "acoes-tabela";

            const botaoEditar = AlunoView.criarBotao(
                "Editar",
                "botao-editar",
                "editar",
                aluno.id
            );

            const botaoExcluir = AlunoView.criarBotao(
                "Excluir",
                "botao-excluir",
                "excluir",
                aluno.id
            );

            celulaAcoes.appendChild(botaoEditar);
            celulaAcoes.appendChild(botaoExcluir);

            linha.appendChild(celulaAcoes);

            AlunoView.elementos.corpoTabela.appendChild(
                linha
            );
        });
    },

    exibirJson(alunos) {
        AlunoView.elementos.saidaJson.textContent =
            JSON.stringify(alunos, null, 2);
    },

    alterarModoEdicao(editando) {
        AlunoView.modoEdicao = editando;

        AlunoView.elementos.botaoCancelar.hidden = !editando;

        AlunoView.elementos.botaoSalvar.textContent =
            editando ? "Atualizar aluno" : "Cadastrar aluno";
    },

    alterarEstadoFormulario(processando) {
        AlunoView.elementos.botaoSalvar.disabled =
            processando;

        AlunoView.elementos.botaoCancelar.disabled =
            processando;

        if (processando) {
            AlunoView.elementos.botaoSalvar.textContent =
                AlunoView.modoEdicao
                    ? "Atualizando..."
                    : "Salvando...";

            return;
        }

        AlunoView.elementos.botaoSalvar.textContent =
            AlunoView.modoEdicao
                ? "Atualizar aluno"
                : "Cadastrar aluno";
    },

    limparFormulario() {
        AlunoView.elementos.formulario.reset();

        AlunoView.elementos.ra.focus();
    },

    confirmarExclusao() {
        return confirm(
            "Deseja realmente excluir este aluno?"
        );
    },

    irParaFormulario() {
        AlunoView.elementos.formulario.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        AlunoView.elementos.ra.focus();
    }
};
