const cabecalhosCors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
};

export function enviarJson(res, status, dados) {
    const textoJson = JSON.stringify(dados, null, 2);

    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        ...cabecalhosCors
    });

    res.end(textoJson);
}

export function enviarSemConteudo(res) {
    res.writeHead(204, cabecalhosCors);

    res.end();
}

export function lerCorpoJson(req) {
    return new Promise((resolve, reject) => {
        let corpo = "";

        req.on("data", parte => {
            corpo += parte;
        });

        req.on("end", () => {
            if (corpo.trim() === "") {
                resolve({});
                return;
            }

            try {
                const dados = JSON.parse(corpo);

                resolve(dados);
            } catch (erro) {
                reject(erro);
            }
        });

        req.on("error", erro => {
            reject(erro);
        });
    });
}
