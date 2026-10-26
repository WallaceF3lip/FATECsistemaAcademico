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

    validar(dados) {
        const aluno = {
            ra: AlunoModel.normalizarTexto(dados.ra),
            nome: AlunoModel.normalizarTexto(dados.nome),

            email: AlunoModel
                .normalizarTexto(dados.email)
                .toLowerCase(),

            curso: AlunoModel.normalizarTexto(dados.curso),
            turma: AlunoModel.normalizarTexto(dados.turma)
        };

        if (
            aluno.ra === "" ||
            aluno.nome === "" ||
            aluno.email === "" ||
            aluno.curso === "" ||
            aluno.turma === ""
        ) {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }

        if (!AlunoModel.validarEmail(aluno.email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }

        return {
            sucesso: true,
            dados: aluno
        };
    }
};
