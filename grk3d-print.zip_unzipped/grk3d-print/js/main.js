/* ============================================================
   GRK3D PRINT — main.js
   Scripts do site: menu, animações de entrada, formulário de
   pedido (WhatsApp) e comentários.

   INTEGRAÇÃO COM SUPABASE
   -----------------------
   Os comentários hoje são salvos em localStorage (guardados só
   no navegador de quem comentou). Para virarem comentários REAIS,
   visíveis para todo mundo que acessa o site, é só substituir as
   duas funções marcadas com "SUPABASE AQUI" mais abaixo:
     - loadComments()   → buscar comentários do banco
     - persistComment() → salvar um novo comentário no banco
   Veja js/supabase-config.js para colocar a URL e a chave do
   projeto Supabase.
   ============================================================ */

/* ---------- Toast (aviso flutuante) ---------- */
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------- Animação de entrada ao rolar a página ---------- */
const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  }),
  { threshold: .12 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---------- Menu mobile: fecha ao clicar em um link ---------- */
document.querySelectorAll('nav a').forEach(a =>
  a.addEventListener('click', () => document.querySelector('nav').classList.remove('open'))
);

/* ============================================================
   FORMULÁRIO DE PEDIDO → WHATSAPP
   ============================================================ */
document.getElementById('budgetForm').addEventListener('submit', async e => {
  e.preventDefault();
  const d = new FormData(e.target);
  const arquivo = d.get('referencia');
  const temArquivo = arquivo && arquivo.size > 0;

  let texto = `🛍️ *NOVO PEDIDO DE ORÇAMENTO — GRK3D PRINT*\n\n` +
    `📋 *Dados do Cliente*\n` +
    `• *Nome:* ${d.get('nome')}\n` +
    `• *E-mail:* ${d.get('email')}\n` +
    `• *WhatsApp:* ${d.get('whatsapp') || 'Não informado'}\n\n` +
    `🧩 *Detalhes da Peça*\n` +
    `• *Tipo:* ${d.get('tipo')}\n` +
    `• *Descrição:* ${d.get('descricao')}`;

  // Se o navegador suportar, compartilha o texto + a foto direto para o WhatsApp
  if (temArquivo && navigator.canShare && navigator.canShare({ files: [arquivo] })) {
    try {
      await navigator.share({ text: texto, files: [arquivo] });
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
  }

  // Fallback: abre o WhatsApp só com o texto (a pessoa envia a foto por lá)
  if (temArquivo) {
    texto += `\n\n📎 *Referência/imagem:* vou enviar aqui na conversa (arquivo: ${arquivo.name})`;
  }
  window.location.href = 'https://wa.me/5541997370838?text=' + encodeURIComponent(texto);
});

/* ============================================================
   COMENTÁRIOS
   ============================================================ */
const commentForm = document.getElementById('commentForm');
const commentsFeed = document.getElementById('commentsFeed');

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[m]));
}

function renderComment(c) {
  const article = document.createElement('article');
  article.className = 'youtube-comment';
  article.innerHTML = `<div class="avatar">${escapeHtml(c.name.charAt(0).toUpperCase())}</div>
  <div class="comment-body">
   <div class="comment-meta"><strong>${escapeHtml(c.name)}</strong><span>${c.when || 'agora'}</span></div>
   <div class="stars">${'★'.repeat(c.rating)}${'☆'.repeat(5 - c.rating)}</div>
   <p>${escapeHtml(c.text)}</p>
   <button class="like-comment" type="button">♡ Curtir</button>
  </div>`;
  commentsFeed.prepend(article);
}

/* ---------- SUPABASE AQUI: buscar comentários salvos ----------
   Hoje: lê do localStorage (só neste navegador).
   Depois: trocar por uma consulta ao Supabase, por exemplo:
     const { data } = await supabase.from('comments').select('*').order('created_at');
     return data;
*/
function loadComments() {
  return JSON.parse(localStorage.getItem('grk3d_comments') || '[]');
}

/* ---------- SUPABASE AQUI: salvar um novo comentário ----------
   Hoje: grava no localStorage (só neste navegador).
   Depois: trocar por um insert no Supabase, por exemplo:
     await supabase.from('comments').insert([c]);
*/
function persistComment(c) {
  const saved = loadComments();
  saved.push(c);
  localStorage.setItem('grk3d_comments', JSON.stringify(saved));
}

// Carrega e mostra os comentários já salvos
loadComments().forEach(renderComment);

commentForm.addEventListener('submit', e => {
  e.preventDefault();
  const c = {
    name: document.getElementById('commentName').value.trim(),
    rating: Number(document.getElementById('commentRating').value),
    text: document.getElementById('commentText').value.trim(),
    when: 'agora'
  };
  if (!c.name || !c.text) return;
  renderComment(c);
  persistComment(c);
  commentForm.reset();
  showToast('Comentário publicado!');
});
