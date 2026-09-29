const AlunoController = {
    iniciar(){
        let continuar = true;

        while(continuar){

            const dados = AlunoView.lerDados();
            
            const resultado = AlunoModel.cadastrar(dados);

            if(resultado.sucesso) {
                AlunoView.exibirAluno(resultado.aluno);
            } else{
                AlunoView.exibirErro(resultado.message);
            }

            continuar = AlunoView.perguntarNovoCadastro();
        };
        
        const alunos = AlunoModel.listar();

        AlunoView.exibirLista(alunos);

        const TextJSON = JSON.stringify(alunos, null, 2);

        AlunoView.exibirJson(TextJSON);

        const dadosRecuperados = JSON.parse(TextJSON);

        AlunoView.exibirDadosRecuperados(dadosRecuperados);
    }
};

AlunoController.iniciar();