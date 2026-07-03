const btn = document.getElementById('btn');
const input = document.getElementById('url');
const erro = document.getElementById('erro');
const resultado = document.getElementById('resultado');
const linkCurtoEl = document.getElementById('link-curto');

btn.addEventListener('click', async () => {
  erro.style.display = 'none';
  resultado.style.display = 'none';

  const url = input.value.trim();
  if (!url) return;

  btn.disabled = true;
  btn.textContent = 'Chutando...';

  try {
    const resposta = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      erro.textContent = dados.erro || 'Foi pra fora! Tente de novo.';
      erro.style.display = 'block';
    } else {
      linkCurtoEl.href = dados.link;
      linkCurtoEl.textContent = dados.link;
      resultado.style.display = 'block';
    }
  } catch (e) {
    erro.textContent = 'Não rolou conectar com o servidor.';
    erro.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'CHUTAR! 🥅';
  }
});