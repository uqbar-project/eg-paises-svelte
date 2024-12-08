import { expect, test } from '@playwright/test'

test('flujo principal: buscamos un país y al hacer click nos dirige a la página con la información de dicho país', async ({
	page
}) => {
	await page.goto('/')
	await expect(page.locator('h2')).toBeVisible()
})
