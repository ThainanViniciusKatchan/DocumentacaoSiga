import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the local server
        page.goto("http://localhost:8000/index.html")

        # Wait for the initial content to load
        expect(page.locator("h1")).to_have_text("Introdução")

        # Click on the "Primeiros Passos" link
        page.get_by_role("link", name="Primeiros Passos").click()
        expect(page.locator("h1")).to_have_text("Primeiros Passos")

        # Click on the "Formulários" dropdown
        page.get_by_role("link", name="Formulários").click()

        # Click on the "Macro Entrevista e Grupo" link
        page.get_by_role("link", name="Macro Entrevista e Grupo").click()
        expect(page.locator("h1")).to_have_text("Macro [@entrevista]")

        # Take a screenshot
        page.screenshot(path="jules-scratch/verification/verification.png")

        browser.close()

if __name__ == "__main__":
    run_verification()