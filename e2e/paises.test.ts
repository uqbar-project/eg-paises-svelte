import { expect, test, type Page } from '@playwright/test'

test('flujo principal: buscamos un país y al hacer click nos dirige a la página con la información de dicho país', async ({
  page
}) => {
  async function irAPaisYVolver(page: Page, codigoPais: string, nombrePais: string) {
    const unPais = await page.getByTestId(`pais-${codigoPais}`)
    await expect(unPais).toBeVisible()
    unPais.click()
    await expect(page).toHaveURL(`/pais/${codigoPais}`)
    await expect(page.locator('h2')).toHaveText(nombrePais)
    // podríamos eventualmente testear otros atributos
    await page.getByTestId('volver').click()
    await expect(page).toHaveURL('/')
    await expect(page.getByTestId('paisBusqueda')).toHaveText('')
  }

  await page.goto('/')
  await expect(page.locator('h2')).toBeVisible()

  // Probamos la búsqueda disparada por el botón
  await page.getByTestId('paisBusqueda').fill('ARGENTINA')
  await page.getByTestId('buscar').click()
  await irAPaisYVolver(page, 'ARG', 'Argentina')

  // Probamos la búsqueda automática desde el input
  await page.getByTestId('busquedaAutomatica').check()
  await page.getByTestId('paisBusqueda').fill('ARGEN')
  // necesitamos disparar el evento keyup
  await page.keyboard.up('T')
  await irAPaisYVolver(page, 'ARG', 'Argentina')
})
