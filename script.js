// USUÁRIOS
const usuarios = [
    { username: "pascoal edgar", password: "123" },
    { username: "deodato alfredo", password: "456" }
];


// DADOS
let autores = [];
let livros = [];
let leitores = [];
let emprestimos = [];

// LOGIN
function login() {
    const user = document.getElementById("username").value.trim().toLowerCase();
    const pass = document.getElementById("password").value.trim();

    const ok = usuarios.find(u => u.username === user && u.password === pass);
    if (!ok) {
        alert("Credenciais inválidas!");
        return;
    }

    document.getElementById("loginImagem").style.display = "none";
    document.getElementById("principal").classList.remove("hidden");
}

function login() {
    const user = username.value.trim().toLowerCase();
    const pass = password.value.trim();

    const ok = usuarios.find(u => u.username === user && u.password === pass);
    if (!ok) {
        alert("Credenciais inválidas!");
        return;
    }

    window.location.href = "index.html";
}

// AUTOR
function addAutor() {
    const nome = autor.value.trim();
    if (!nome) return;

    autores.push(nome);
    atualizarAutores();
    autor.value = "";

}


// LIVRO
function addLivro() {
    const nome = livro.value.trim();
    const autor = autorLivro.value;
    if (!nome || !autor) return;

    livros.push({ nome, autor, status: "Disponível" });
    atualizarLivros();
    livro.value = "";
}

// LEITOR
function addLeitor() {
    const nome = leitor.value.trim();
    if (!nome) return;

    leitores.push(nome);
    atualizarLeitores();
    leitor.value = "";
}

// EMPRÉSTIMO
function emprestar() {
    const livroNome = livroEmprestimo.value;
    const leitorNome = leitorEmprestimo.value;

    const livro = livros.find(l => l.nome === livroNome);
    if (!livro || livro.status === "Emprestado") return;

    livro.status = "Emprestado";

    emprestimos.push({
        livro: livroNome,
        leitor: leitorNome,
    });

    atualizarLivros();
    atualizarEmprestimos();
}


// DEVOLUÇÃO
function devolver(index) {
    const emp = emprestimos[index];
    const livro = livros.find(l => l.nome === emp.livro);
    livro.status = "Disponível";
    emprestimos.splice(index, 1);
    atualizarLivros();
    atualizarEmprestimos();
}

// ATUALIZAÇÕES
// ATUALIZAR AUTORES
function atualizarAutores() {
    listaAutores.innerHTML = "";
    autorLivro.innerHTML = "<option value=''>Autor</option>";

    autores.forEach((a, i) => {
        listaAutores.innerHTML += `
            <li>${a}
                <button class="btn-eliminar" onclick="eliminarAutor(${i})">❌</button>
            </li>`;
        autorLivro.innerHTML += `<option>${a}</option>`;
    });
}

function eliminarAutor(index){
    autores.splice(index,1);
    atualizarAutores();
}

// ATUALIZAR LIVROS
function atualizarLivros() {
    listaLivros.innerHTML = "";
    livroEmprestimo.innerHTML = "<option value=''>Livro</option>";

    livros.forEach((l, i) => {
        listaLivros.innerHTML += `
            <li>${l.nome} (${l.status})
                <button class="btn-eliminar" onclick="eliminarLivro(${i})">❌</button>
            </li>`;

        if (l.status === "Disponível") {
            livroEmprestimo.innerHTML += `<option>${l.nome}</option>`;
        }
    });
}

function eliminarLivro(index){
    livros.splice(index,1);
    atualizarLivros();
}


// ATUALIZAR LEITORES
function atualizarLeitores() {
    listaLeitores.innerHTML = "";
    leitorEmprestimo.innerHTML = "<option value=''>Leitor</option>";

    leitores.forEach((l, i) => {
        listaLeitores.innerHTML += `
            <li>${l}
                <button class="btn-eliminar" onclick="eliminarLeitor(${i})">❌</button>
            </li>`;
        leitorEmprestimo.innerHTML += `<option>${l}</option>`;
    });
}

function eliminarLeitor(index){
    leitores.splice(index,1);
    atualizarLeitores();
}


// ATUALIZAR EMPRESTIMO
function atualizarEmprestimos() {
    listaEmprestimos.innerHTML = "";
    emprestimos.forEach((e, i) => {
        listaEmprestimos.innerHTML += `
            <li>
                ${e.livro} → ${e.leitor}
                <button class="btn-devolver" onclick="devolver(${i})">↩</button>
            </li>`;
    });
}

function logout() {
    if (confirm("Deseja realmente sair da aplicação?")) {
        window.location.href = "login.html";
    }
}



