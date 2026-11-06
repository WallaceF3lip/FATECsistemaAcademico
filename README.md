# FATEC - Sistema Academico
Projeto de um Sistema Academico para a matéria de Desenvolvimento de Servidores II

Documentação principal do projeto. Apresenta uma visão geral, instruções de execução e outras informações importantes.

## Instruções para executar o backend
```bash
# Acesse a pasta do backend
cd .\backend\

# Instale as dependências do projeto
npm install

# Inicie o servidor em modo de desenvolvimento
npm run dev
```

## Instruções para executar o frontend
Execute com *Live Server*

A forma recomendada é utilizar a extensão Live Server do Visual Studio Code.
Se ela ainda não estiver instalada:
1. Abra a opção Extensions;
2. pesquise por Live Server;
3. instale a extensão de Ritwick Dey;
4. abra o arquivo frontend/index.html;
5. clique com o botão direito dentro do arquivo;
6. selecione Open with Live Server.

## Relação dos endpoints disponíveis

| Método  | Endpoint    | Operação             |
|---------|-------------|----------------------|
| GET     | /api/health | Verificar o servidor |
| GET     | /api/alunos | Listar os alunos     |
| POST    | /api/alunos | Cadastrar um aluno   |

Na pasta Insomnia [`FATECsistemaAcademico\docs\Insomnia`] temos uma arquivo para importar todos os endpoints ja configurados.

## Indicação da pasta em que estão as evidências
```
FATECsistemaAcademico/
└── docs/
    └── evidencias/
        └── imgs.png
```
*FATECsistemaAcademico\docs\evidencias*

## Aluno

**Wallace Felipe - 2650832423017** - Sistema para Internet, 5º semestre.