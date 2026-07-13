# Vercel Environment Variables Configuration Guide

To ensure that the **FENY (Le Fennec Malin)** application runs correctly on Vercel with all necessary backends, APIs, and mail integrations, follow these exact steps to configure your secrets in the Vercel dashboard:

### Step 1: Navigate to Project Settings
1. Open your project on the [Vercel Dashboard](https://vercel.com/).
2. Select the **Settings** tab from the top navigation bar.
3. In the left-hand sidebar, click on **Environment Variables**.

### Step 2: Add Required Keys
Add each key as specified in the `.env.example` file:
* **`PRIMINFO_API_KEY`**: The API key for the official Swiss health premium data source.
* **`SWISS_API_KEY`**: The API key for Swiss geolocation/ZIP-code mapping services.
* **`SMTP_HOST`**, **`SMTP_PORT`**, **`SMTP_USER`**, **`SMTP_PASS`**, **`SMTP_SECURE`**, **`SMTP_FROM`**: The SMTP server configuration keys for delivering lead notification emails to `lefennecmalin@gmail.com`.

### Step 3: Configure Environment Scopes
For **each** environment variable you add:
1. Ensure that the checkboxes for **Production**, **Preview**, and **Development** are all checked.
2. This guarantees that whether you are developing locally, testing in a PR preview, or running live in production, the secret keys are securely injected at runtime.

### Step 4: Redeploy the Project
Since Vercel environment variables are baked in during the build phase or initialized at runtime startup, you must trigger a redeploy of your project to apply the changes:
1. Go to the **Deployments** tab in your Vercel project.
2. Click the three dots next to the latest deployment and select **Redeploy**, or run a new deployment build via git push.
3. Verify the status at `/api/debug-config` to ensure all secrets are successfully defined and injected!
