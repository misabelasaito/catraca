const baseUrl = "https://projeto-academia-nu.vercel.app/clientes/cpf/";
const input = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const ok = document.getElementById('ok');
const clear = document.getElementById('clear');

// Botões numéricos (0–9)
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.id !== 'ok' && btn.id !== 'clear') {
      input.value += btn.textContent;
    }
  });
});

// Botão OK (valida CPF na API)
ok.addEventListener('click', async () => {
  const cpf = input.value.trim();

  if (cpf.length === 0) {
    alert("Por favor, digite um CPF.");
    return;
  }

  try {
    const response = await fetch(`${baseUrl}${cpf}`);
    if (!response.ok) {
      throw new Error("Cliente não encontrado");
    }

    const data = await response.json();
    console.log("Resposta da API:", data);

    if (data.length > 0) {
      const cliente = data[0];
      if (cliente.status === true) {
        const nome = encodeURIComponent(cliente.nome);
        const foto = encodeURIComponent(cliente.foto_url);
        window.location.href = `bemvindo.html?nome=${nome}&foto=${foto}`;
        return;
      }
    }

    // Cliente encontrado mas não liberado
    alert("Acesso proibido. CPF não autorizado ou cliente inativo.");
  } catch (error) {
    console.error("Erro na verificação do CPF:", error);
    alert("Acesso proibido. CPF não encontrado.");
  }

  input.value = '';
});

// Botão "←" (clear)
clear.addEventListener('click', () => {
  input.value = input.value.slice(0, -1);
});
