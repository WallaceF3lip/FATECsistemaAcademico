const AlunoView = {
    
    lerDados() {
        return {
        ra: prompt("Digite o RA do aluno:"),
        nome: prompt("Digite o nome do aluno:"),
        email: prompt("Digite o e-mail do aluno:"),
        curso: prompt("Digite o curso:"),
        turma: prompt("Digite a turma:")

        };
    },

    exibirAluno(aluno){
        console.log("Aluno Cadastrado com sucesso.");
        
        console.table(aluno);        
    },

    exibirErro(mensagem){
        console.error("Erro: ",mensagem);
    },

    perguntarNovoCadastro(){
        return confirm("Deseja cadastrar um novo aluno?");
    },

    exibirLista(alunos){
        console.log("Quantidade de alunos cadastrados: ",alunos.length);

        if(alunos.length === 0){
            console.log("Nenhum aluno foi cadastrado.");
            return;
        };

        console.table(alunos);
    },

    exibirJson(textJson){
        console.log("Alunos em formato JSON: ");
        console.log(textJson);        
    },

    exibirDadosRecuperados(dados){
        console.log("Dados recuperados com JSOn.parse(): ");

        console.table(dados);
    },
}