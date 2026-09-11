/* ============================================================
   Configuração do Supabase (AINDA NÃO ATIVADO)
   ============================================================
   Quando você tiver o projeto Supabase pronto:

   1. Preencha os dois valores abaixo com os dados do seu projeto
      (Project Settings → API, no painel do Supabase).

   2. No index.html, descomente a linha que carrega o SDK do
      Supabase (procure o comentário "SUPABASE SDK" no <head>).

   3. Peça para eu trocar loadComments()/persistComment() em
      js/main.js pelas chamadas reais ao Supabase — é só me
      avisar que os dados abaixo já estão preenchidos.
   ============================================================ */

const SUPABASE_URL = 'https://gmhzgdhsxujalkamwulj.supabase.co/rest/v1/'; // ex: 'https://xxxxxxxxxxxx.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtaHpnZGhzeHVqYWxrYW13dWxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNjA0ODksImV4cCI6MjEwNDczNjQ4OX0.dT50XtSXp3dN3MwyxftgXAYTVaTVdqSD7kkgqptGgTs'; // chave "anon public"

// Só cria o cliente se as duas informações acima já tiverem sido preenchidas
let supabase = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase) {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
