# Automating the Annual Premium Dataset Update (OFSP / FOPH)

Every year, typically in the **second half of September**, the Federal Office of Public Health (OFSP) publishes the official health insurance premiums for the upcoming calendar year on the [opendata.swiss](https://opendata.swiss) portal.

This project includes a fully automated parser utility (`/scripts/download-premiums.js`) that retrieves the raw CSV, maps it to our optimized format, and writes a consolidated JSON database (`/public/premiums_2026.json`).

This guide outlines how to automate this annual update using different execution models (cron, GitHub Actions, or serverless triggers).

---

## The Data Lifecycle & Schema

The OFSP publishes premium data under the dataset title: **"health-insurance-premiums"** on the CKAN API.

Our utility works by:
1. Fetching CKAN metadata from: `https://ckan.opendata.swiss/api/3/action/package_show?id=health-insurance-premiums`
2. Identifying the latest CSV resource representing the premiums nationwide (usually named `Prämien_CH` or `praemien_ch`).
3. Streaming and parsing the CSV line-by-line using a memory-efficient `TextDecoder` stream reader.
4. Filtering records to include only the relevant year (e.g., `2026`), active insurers, categories, and franchises.
5. Saving a highly optimized JSON hash map to `public/premiums_2026.json` for $O(1)$ fast lookups.

### Database JSON Schema Key Format:
```
"${insurerId}_${canton}_${region}_${ageCategory}_${deductible}_${modelType}_${accidentCoverage}"
```
Example key: `css_GE_PR-REG CH1_adult_2500_telemed_true`

---

## 1. Automated Updating via GitHub Actions

If this repository is hosted on GitHub, you can set up a GitHub Actions workflow that runs automatically on a cron schedule or on-demand to fetch new premiums, update the file, and commit the changes back to the repository.

Create a file named `.github/workflows/update-premiums.yml`:

```yaml
name: "Update Health Insurance Premiums"

on:
  # Run automatically every week in September & October to catch the initial release and corrections
  schedule:
    - cron: '0 4 * 9,10 *'
  # Allow manual trigger via GitHub UI
  workflow_dispatch:

jobs:
  update-dataset:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Premium Update Utility
        run: node scripts/download-premiums.js

      - name: Commit and Push if updated
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action Bot"
          if [ -n "$(git status --porcelain public/premiums_2026.json)" ]; then
            git add public/premiums_2026.json
            git commit -m "chore(data): auto-update 2026 OFSP health premiums dataset"
            git push
          else
            echo "No changes in premium dataset detected."
          fi
```

---

## 2. Automated Updating via Linux Cron Job

To automate the update directly on an active VM/server hosting the application:

1. Open your server's crontab editor:
   ```bash
   crontab -e
   ```

2. Add a cron job to run the script on a schedule (e.g., weekly at 4 AM):
   ```bash
   # Run the premiums update every Sunday at 4:00 AM
   0 4 * * 0 /usr/bin/node /path/to/your/app/scripts/download-premiums.js >> /path/to/your/app/logs/premiums-update.log 2>&1
   ```

---

## 3. Triggering Updates via Webhook (Serverless / Cloud Run)

In high-availability setups, you can define an administrative endpoint in `server.ts` protected by an API Token to trigger the fetch programmatically:

```typescript
// Example endpoint to update premiums on the fly (requires writing download-premiums.js as an exportable function)
app.post("/api/admin/update-premiums", async (req, res) => {
  const adminToken = req.headers["x-admin-token"];
  if (adminToken !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // Run update logic here...
    res.json({ success: true, message: "Dataset updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

With this, an external scheduler (like Cloud Scheduler or Google Cloud Tasks) can dispatch an authorized POST request once a week to guarantee the app remains perfectly up-to-date.
