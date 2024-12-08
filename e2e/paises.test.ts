import { expect, test } from '@playwright/test'

test('flujo principal: buscamos un país y al hacer click nos dirige a la página con la información de dicho país', async ({
	page
}) => {
	await page.goto('/')
	await expect(page.locator('h2')).toBeVisible()
	await page.getByTestId('paisBusqueda').fill('ARGENTINA')
	await page.getByTestId('buscar').click()
	const unPais = await page.getByTestId('pais-0')
	await expect(unPais).toBeVisible()
	unPais.click()
	await expect(page).toHaveURL('/pais/ARG')
	await expect(page.locator('h2')).toHaveText('Argentina')
	// podríamos eventualmente testear otros atributos
	await page.getByTestId('volver').click()
	await expect(page).toHaveURL('/')
	await expect(page.getByTestId('paisBusqueda')).toHaveText('')
})
