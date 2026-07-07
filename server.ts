import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoint for form lead submission
app.post("/api/submit-lead", async (req, res) => {
  try {
    const { type, lead, filters, caisse, details, assureur } = req.body;
    
    if (!lead || !lead.firstName || !lead.lastName || !lead.email || !lead.phone) {
      return res.status(400).json({ error: "Missing required lead contact fields." });
    }

    const recipientEmail = "evitonec1@gmail.com";
    let subject = "";
    let textBody = "";
    let htmlBody = "";

    if (type === "health") {
      subject = `🔥 Nouveau Lead Assurance Maladie (LAMal) - ${lead.firstName} ${lead.lastName}`;
      
      textBody = `
=== NOUVELLE DEMANDE D'OFFRE MALADIE (LAMal) ===
Nom du Prospect: ${lead.firstName} ${lead.lastName}
E-mail: ${lead.email}
Téléphone: ${lead.phone}
Créneau de rappel souhaité: ${lead.timeSlot || "N'importe quand"}

--- Détails de l'Assurance ---
Caisse choisie: ${caisse?.name || "N/A"}
Prime mensuelle calculée: CHF ${caisse?.computedPremium?.toFixed(2) || "N/A"}.-

--- Critères de Simulation ---
Canton: ${filters?.canton || "N/A"}
Franchise: CHF ${filters?.franchise || "N/A"}.-
Tranche d'âge: ${filters?.ageCategory === "adult" ? "Adulte (26+)" : filters?.ageCategory === "young" ? "Jeune (19-25)" : "Enfant (0-18)"}
Modèle: ${filters?.model === "family" ? "Médecin de famille" : filters?.model === "telemed" ? "Télémédecine" : filters?.model === "hmo" ? "HMO" : "Standard"}
Caisse actuelle: ${filters?.currentCaisse || "Non renseignée"}
      `;

      htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ECE1D4; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #2F2921; color: #FFF; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px;">🦊 FENY - LE FENNEC MALIN</h2>
            <p style="margin: 5px 0 0; font-size: 13px; color: #ECE1D4; opacity: 0.9;">Nouveau Lead Assurance Maladie (LAMal)</p>
          </div>
          <div style="padding: 24px; background-color: #FCFAF8;">
            <h3 style="color: #D36D53; border-bottom: 2px solid #ECE1D4; padding-bottom: 8px; margin-top: 0;">Coordonnées du Prospect</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 40%;">Prénom & Nom :</td>
                <td style="padding: 6px 0;">${lead.firstName} ${lead.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Adresse E-mail :</td>
                <td style="padding: 6px 0;"><a href="mailto:${lead.email}" style="color: #D36D53; text-decoration: none;">${lead.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Téléphone Mobile :</td>
                <td style="padding: 6px 0;"><a href="tel:${lead.phone}" style="color: #D36D53; text-decoration: none;">${lead.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Créneau de rappel :</td>
                <td style="padding: 6px 0; text-transform: capitalize;">${lead.timeSlot || "N'importe quand"}</td>
              </tr>
            </table>

            <h3 style="color: #D36D53; border-bottom: 2px solid #ECE1D4; padding-bottom: 8px; margin-top: 0;">Offre Sélectionnée</h3>
            <div style="background-color: #FFF; border: 1px solid #ECE1D4; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7F7366; font-weight: bold;">Caisse Choisie</span>
              <div style="font-size: 22px; font-weight: bold; color: #2F2921; margin: 4px 0;">${caisse?.name || "N/A"}</div>
              <div style="font-size: 28px; font-weight: 900; color: #D36D53; margin: 10px 0;">
                CHF ${caisse?.computedPremium?.toFixed(2) || "N/A"}<span style="font-size: 14px; font-weight: normal; color: #2F2921;"> / mois</span>
              </div>
            </div>

            <h3 style="color: #D36D53; border-bottom: 2px solid #ECE1D4; padding-bottom: 8px; margin-top: 0;">Détails de la Simulation</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 40%;">Canton suisse :</td>
                <td style="padding: 6px 0;">${filters?.canton || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Franchise annuelle :</td>
                <td style="padding: 6px 0;">CHF ${filters?.franchise || "N/A"}.-</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Tranche d'âge :</td>
                <td style="padding: 6px 0;">${filters?.ageCategory === "adult" ? "Adulte (26+)" : filters?.ageCategory === "young" ? "Jeune (19-25)" : "Enfant (0-18)"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Modèle choisi :</td>
                <td style="padding: 6px 0; text-transform: capitalize;">${filters?.model || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Caisse d'origine :</td>
                <td style="padding: 6px 0;">${filters?.currentCaisse || "Non spécifiée"}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #2F2921; color: #ECE1D4; font-size: 11px; text-align: center; padding: 12px; opacity: 0.8;">
            © FENY SA - Comparateur Neutre de Prévoyance et d'Assurances en Suisse
          </div>
        </div>
      `;
    } else {
      subject = `💎 Nouveau Lead Prévoyance (3ème Pilier) - ${lead.firstName} ${lead.lastName}`;
      const totalTaxSavings = (assureur?.taxSavingsPerYear || 0) * (details?.duration || 0);

      textBody = `
=== NOUVELLE DEMANDE D'ÉTUDE PRÉVOYANCE (3e PILIER) ===
Nom du Prospect: ${lead.firstName} ${lead.lastName}
E-mail: ${lead.email}
Téléphone: ${lead.phone}
Activité: ${lead.profession === "independent" ? "Indépendant" : "Salarié"}

--- Détails de l'Assureur ---
Compagnie choisie: ${assureur?.name || "N/A"}
Épargne mensuelle prévue: CHF ${details?.monthlyAmount || "N/A"}.-
Durée du contrat: ${details?.duration || "N/A"} ans
Type de Pilier: Pilier ${details?.pillarType || "3a"}
Caisse actuelle: ${details?.currentPillar || "Aucune"}

--- Résultats Estimés ---
Capital final estimé (fonds): CHF ${assureur?.expectedSum?.toLocaleString() || "N/A"}.-
Économie fiscale moyenne/an: CHF ${assureur?.taxSavingsPerYear?.toLocaleString() || "N/A"}.-
Total économie fiscale sur le terme: CHF ${totalTaxSavings.toLocaleString()}.-
      `;

      htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #ECE1D4; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #2F2921; color: #FFF; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px;">🦊 FENY - LE FENNEC MALIN</h2>
            <p style="margin: 5px 0 0; font-size: 13px; color: #ECE1D4; opacity: 0.9;">Nouveau Lead Prévoyance 3ème Pilier</p>
          </div>
          <div style="padding: 24px; background-color: #FCFAF8;">
            <h3 style="color: #D36D53; border-bottom: 2px solid #ECE1D4; padding-bottom: 8px; margin-top: 0;">Coordonnées du Prospect</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 40%;">Prénom & Nom :</td>
                <td style="padding: 6px 0;">${lead.firstName} ${lead.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Adresse E-mail :</td>
                <td style="padding: 6px 0;"><a href="mailto:${lead.email}" style="color: #D36D53; text-decoration: none;">${lead.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Téléphone Mobile :</td>
                <td style="padding: 6px 0;"><a href="tel:${lead.phone}" style="color: #D36D53; text-decoration: none;">${lead.phone}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Statut professionnel :</td>
                <td style="padding: 6px 0; text-transform: capitalize;">${lead.profession === "independent" ? "Indépendant" : "Salarié"}</td>
              </tr>
            </table>

            <h3 style="color: #D36D53; border-bottom: 2px solid #ECE1D4; padding-bottom: 8px; margin-top: 0;">Compagnie Sélectionnée</h3>
            <div style="background-color: #FFF; border: 1px solid #ECE1D4; border-radius: 8px; padding: 16px; margin-bottom: 24px; text-align: center;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #7F7366; font-weight: bold;">Compagnie de Prévoyance</span>
              <div style="font-size: 22px; font-weight: bold; color: #2F2921; margin: 4px 0;">${assureur?.name || "N/A"}</div>
              <div style="font-size: 28px; font-weight: 900; color: #D36D53; margin: 10px 0;">
                CHF ${assureur?.expectedSum?.toLocaleString() || "N/A"}<span style="font-size: 14px; font-weight: normal; color: #2F2921;"> de capital projeté</span>
              </div>
            </div>

            <h3 style="color: #D36D53; border-bottom: 2px solid #ECE1D4; padding-bottom: 8px; margin-top: 0;">Détails du Contrat & Gain Fiscal</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 40%;">Épargne mensuelle :</td>
                <td style="padding: 6px 0; font-weight: bold;">CHF ${details?.monthlyAmount || "N/A"}.-</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Durée de capitalisation :</td>
                <td style="padding: 6px 0;">${details?.duration || "N/A"} ans</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">Type de Pilier :</td>
                <td style="padding: 6px 0;">Pilier ${details?.pillarType || "3a"}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold;">3e pilier actuel :</td>
                <td style="padding: 6px 0;">${details?.currentPillar || "Aucun"}</td>
              </tr>
              <tr style="background-color: #E6F4EA;">
                <td style="padding: 8px; font-weight: bold; color: #137333;">Économie d'impôt / an :</td>
                <td style="padding: 8px; font-weight: bold; color: #137333;">CHF ${assureur?.taxSavingsPerYear?.toLocaleString() || "N/A"}.-</td>
              </tr>
              <tr style="background-color: #E6F4EA;">
                <td style="padding: 8px; font-weight: bold; color: #137333;">Économie fiscale totale :</td>
                <td style="padding: 8px; font-weight: bold; color: #137333;">CHF ${totalTaxSavings.toLocaleString()}.- sur la durée</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #2F2921; color: #ECE1D4; font-size: 11px; text-align: center; padding: 12px; opacity: 0.8;">
            © FENY SA - Comparateur Neutre de Prévoyance et d'Assurances en Suisse
          </div>
        </div>
      `;
    }

    // SMTP configuration check
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`[SMTP] Configuration found. Attempting to send real email to ${recipientEmail}...`);
      
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Feny Leads" <${smtpUser}>`,
        to: recipientEmail,
        subject: subject,
        text: textBody,
        html: htmlBody
      });

      console.log(`[SMTP] Email successfully sent to ${recipientEmail}!`);
      return res.json({ success: true, method: "smtp" });
    } else {
      console.log("\n=======================================================");
      console.log("⚠️  SMTP NOT YET CONFIGURED IN ENV VARIABLES.");
      console.log("Logging generated email contents for review below:\n");
      console.log(`Recipient: ${recipientEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Text Body:\n${textBody}`);
      console.log("=======================================================\n");

      return res.json({ 
        success: true, 
        method: "console_log", 
        info: "Lead logged to server console. To receive actual emails, configure your SMTP environment variables in your workspace settings."
      });
    }

  } catch (error: any) {
    console.error("[SubmitLeadError]", error);
    res.status(500).json({ error: error.message || "An error occurred while saving the lead." });
  }
});

import fs from "fs";
import { resolveZipCode } from "./src/utils/swissZipCodes";
import { 
  getRegionCode, 
  getInsurerDisplayName, 
  getInsurerModelFallbackName, 
  lookupPremium 
} from "./src/utils/premiumLookupService";

// Load 2026 premiums database from the public folder
let premiumsDb: Record<string, { premium: number; modelName: string }> = {};

try {
  const dbPath = path.join(process.cwd(), "public", "premiums_2026.json");
  if (fs.existsSync(dbPath)) {
    console.log("[Server] Loading local official 2026 premiums database...");
    premiumsDb = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
    console.log(`[Server] Successfully loaded ${Object.keys(premiumsDb).length} premium records.`);
  } else {
    console.warn("[Server] WARNING: Local premiums database not found at:", dbPath);
  }
} catch (err) {
  console.error("[Server] Error loading local premiums database:", err);
}

// API endpoint for fetching local official premiums
app.get("/api/priminfo/praemien", async (req, res) => {
  try {
    const { zipCode, franchise, ageCategory, accident } = req.query;

    if (!zipCode) {
      return res.status(400).json({ error: "zipCode is required" });
    }

    const cleanZip = String(zipCode).trim();
    const cleanFranchise = franchise ? parseInt(String(franchise), 10) : 2500;
    const cleanAgeCategory = ageCategory ? String(ageCategory) : "adult";
    const cleanAccident = accident === "0" ? false : true;

    const zipInfo = resolveZipCode(cleanZip);
    if (!zipInfo) {
      return res.status(404).json({ error: "Invalid or unsupported ZIP code" });
    }

    const canton = zipInfo.canton;
    const zone = zipInfo.zone;
    const region = getRegionCode(canton, zone);

    const activeInsurers = [
      'assura', 'css', 'helsana', 'swica', 'visana', 
      'sanitas', 'concordia', 'kpt', 'mutuel', 'okk', 
      'sympany', 'atupri'
    ];

    const modelTypes: ('standard' | 'family' | 'hmo' | 'telemed')[] = [
      'standard', 'family', 'hmo', 'telemed'
    ];

    const results: any[] = [];

    for (const insurerId of activeInsurers) {
      for (const modelType of modelTypes) {
        const record = lookupPremium(premiumsDb, {
          insurerId,
          canton,
          region,
          ageCategory: cleanAgeCategory,
          deductible: cleanFranchise,
          model: modelType,
          accidentCoverage: cleanAccident
        });

        if (record) {
          results.push({
            insurerId,
            insurerName: getInsurerDisplayName(insurerId),
            modelName: record.modelName || getInsurerModelFallbackName(insurerId, modelType),
            modelType,
            premium: record.premium
          });
        }
      }
    }

    console.log(`[PremiumLookup] Resolved ${results.length} official records for ZIP ${cleanZip} (${canton}, Region: ${region}, Franchise: ${cleanFranchise}, Category: ${cleanAgeCategory}, Accident: ${cleanAccident})`);
    res.json({ success: true, count: results.length, data: results });

  } catch (error: any) {
    console.error("[PremiumLookupError]", error);
    res.status(500).json({ error: error.message || "An error occurred while resolving premiums." });
  }
});

// Serve frontend assets & mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Running in DEVELOPMENT mode. Mounting Vite Dev Server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Running in PRODUCTION mode. Serving prebuilt static assets...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Core running successfully on http://0.0.0.0:${PORT}`);
  });
}

startServer();
