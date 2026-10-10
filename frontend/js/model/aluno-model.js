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
    
    localizarPorRa(alunos, ra) {
        return alunos.find(
            aluno => aluno.ra === ra
        );
    },
    
    gerarProximoId(alunos) {
        if (alunos.length === 0) {
            return 1;
        }
        
        const ids = alunos.map(
            aluno => aluno.id
        );
        
        const maiorId = Math.max(...ids);

        return maiorId + 1;
    },
    
    criar(dados, alunos) {
        const ra = AlunoModel.normalizarTexto(dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);
        
        if (
            ra === "" ||
            nome === "" ||
            email === "" ||
            curso === "" ||
            turma === ""
        ) {
            return {
                sucesso: false,
                mensagem: "Todos os campos são obrigatórios."
            };
        }
        
        if (!AlunoModel.validarEmail(email)) {
            return {
                sucesso: false,
                mensagem: "Informe um e-mail válido."
            };
        }
        
        if (AlunoModel.localizarPorRa(alunos, ra)) {
            return {
                sucesso: false,
                mensagem: "Já existe um aluno com esse RA."
            };
        }
        
        const aluno = {
            id: AlunoModel.gerarProximoId(alunos),
            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,
            ativo: true
        };
        
        return {
            sucesso: true,
            aluno: aluno
        };
    }
};