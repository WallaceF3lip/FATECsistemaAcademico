const AlunoModel = {
    alunos: [],

    normalizarTexto(valor){
        if(valor === null || valor === undefined)
            return '';
        return String(valor).trim();
    },

    validarEmail(email){
        return email.includes('@') && email.includes('.');
    },

    localzarPorRA(ra){
        return AlunoModel.alunos.find(aluno => 
            aluno.ra === ra);
    },

    cadastrar(dados){
        const ra = AlunoModel.normalizarTexto (dados.ra);
        const nome = AlunoModel.normalizarTexto(dados.nome);
        const email = AlunoModel.normalizarTexto(dados.email);
        const curso = AlunoModel.normalizarTexto(dados.curso);
        const turma = AlunoModel.normalizarTexto(dados.turma);

        if(
            ra.length === '' ||
            nome.length === '' ||
            email.length === '' ||
            curso.length === '' ||
            turma.length === ''
        ){
            return {
                sucesso: false,
                message: 'Todos os campos são obrigatórios',
            };
        }

        if(!AlunoModel.validarEmail(email)){
            return {
                sucesso: false,
                message: 'E-mail inválido',
            };
        }

        if(AlunoModel.localzarPorRA(ra)){
            return {
                sucesso: false,
                message: 'Já existe um aluno com esse RA',
            };
        }

        const aluno = {
            id: AlunoModel.alunos.length + 1,

            ra: ra,
            nome: nome,
            email: email,
            curso: curso,
            turma: turma,

            ativo: true,
        };

        AlunoModel.alunos.push(aluno);

        return {
            sucesso: true,
            message: aluno
        };
    },

    listar(){
        return [...AlunoModel.alunos];
    }
}