import { test, expect } from '@playwright/test';

test('Cadastrar livro com sucesso', async ({ page }) => {
  await page.goto('file://' + process.cwd() + '/index.html');

  await page.fill('#titulo', 'Livro de Teste');
  await page.fill('#autor', 'Autor Teste');

  await page.click('#btnCadastrar');

  const mensagem = page.locator('#mensagem');
  await expect(mensagem).toContainText('Livro cadastrado');
});

