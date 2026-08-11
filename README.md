# Martin Base — Site institucional

Site estático (HTML/CSS/JS puro), sem build, com conteúdo editável via Decap CMS.

```
index.html          Página única
data/site.json      TODO o conteúdo do site (editado pelo painel)
admin/index.html    Painel de edição — acessível em /admin
admin/config.yml    Definição dos campos editáveis
images/             Imagens do portfólio
images/uploads/     Onde o painel salva imagens novas
```

**Como funciona:** o `index.html` já vem com o conteúdo escrito (funciona mesmo sem JavaScript), e ao carregar busca `data/site.json` para sobrescrever com o que estiver no painel. Editar o JSON pelo `/admin` muda o site sem tocar em código.

---

## Passo a passo do deploy

### 1. GitHub

```bash
cd martinbase-site
git remote add origin https://github.com/SEU-USUARIO/martinbase.git
git branch -M main
git push -u origin main
```

Se o repositório ainda não existir, crie em github.com/new com o nome `martinbase` (pode ser privado).

### 2. Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. Autorize o GitHub e selecione o repositório `martinbase`
3. Configuração de build:
   - **Framework preset:** `None`
   - **Build command:** *(deixe vazio)*
   - **Build output directory:** `/`
4. **Save and Deploy**

Sai no ar em `martinbase.pages.dev`. Todo `git push` na branch `main` republica sozinho.

### 3. Domínio (comprado na Hostinger)

**No Cloudflare Pages:** aba **Custom domains** → **Set up a domain** → digite `martinbase.com` → repita para `www.martinbase.com`. O Cloudflare mostra os registros DNS a criar.

**Na Hostinger** (painel do domínio → DNS / Nameservers), há dois caminhos:

- **Recomendado — apontar os nameservers para o Cloudflare.** O Cloudflare informa dois nameservers (algo como `xxx.ns.cloudflare.com`). Troque os da Hostinger por esses. Leva de minutos a algumas horas para propagar, e depois todo o DNS passa a ser gerenciado no Cloudflare.
- **Alternativa — manter o DNS na Hostinger** e criar apenas os registros `CNAME` que o Cloudflare Pages indicar.

O certificado HTTPS é emitido automaticamente pelo Cloudflare depois que o domínio valida.

### 4. Painel de edição (Decap CMS via DecapBridge)

1. Acesse **decapbridge.com** e crie um site novo, conectando o repositório `martinbase` do GitHub
2. Copie o **ID do site** que ele gerar
3. Abra `admin/config.yml` e substitua nas duas linhas do topo:
   - `repo:` → `SEU-USUARIO/martinbase`
   - `identity_url:` → cole o ID no lugar de `COLE-AQUI-O-ID-DO-SITE`
4. Faça commit e push dessa alteração
5. Cadastre seu usuário pelo DecapBridge e acesse **martinbase.com/admin**

> `publish_mode: editorial_workflow` está ativo: alterações viram rascunho e só vão ao ar quando você aprova. Para publicar direto ao salvar, remova essa linha do `config.yml`.

---

## Pendências antes de divulgar o site

- [ ] **Trocar os depoimentos.** Os três atuais são exemplos com nomes fictícios e carregam o selo verde *"Exemplo — substituir antes de publicar"*. Ao inserir os reais, apague o conteúdo do campo **Selo de aviso** para o selo sumir.
- [ ] Conferir se `200+ empresas atendidas` e `15+ anos` refletem os números que você quer divulgar.
- [ ] Registrar `martinbase.com.br` (ainda livre na última verificação) e apontar para o mesmo site.
- [ ] Busca de marca no INPI, classes 35 e 42.

## Editar sem o painel

`data/site.json` é um arquivo de texto comum — dá para editar direto pelo GitHub e o site republica em seguida.
