import { checkApiHealth } from "./src/utils/checkApiHealth.js";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import { fileURLToPath } from "url";
import { getInsurerDisplayName, getInsurerModelFallbackName, translateModelNameToFrench, lookupPremium, getAgeCategoryFromYob, ACTIVE_INSURER_IDS } from "./src/utils/premiumLookupService.js";

// Polyfill __filename and __dirname for ESM environments
const __filename_esm = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename_esm);

// Load environment variables
dotenv.config();

console.log(`[Startup Check] Environment status:
- PRIMINFO_API_KEY is ${process.env.PRIMINFO_API_KEY ? "DEFINED" : "MISSING"}
- SWISS_API_KEY is ${process.env.SWISS_API_KEY ? "DEFINED" : "MISSING"}
- VERCEL environment is ${process.env.VERCEL ? "TRUE" : "FALSE"}`);

const app = express();

const PORT = 3000;


app.use(express.json());

// Enable CORS for all routes (important for Vercel Serverless)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});


// Verification code storage (in-memory map)
const verificationCodes = new Map<string, { code: string; expiresAt: number; phone?: string; firstName?: string; lastName?: string }>();

// Helper to get Fennec logo buffer and base64 URI across Vercel/Node environments
function getLogoData() {
  const possiblePaths = [
    path.join(process.cwd(), "public", "fennec-logo.jpg"),
    path.join(process.cwd(), "dist", "fennec-logo.jpg"),
    path.join(__dirname, "public", "fennec-logo.jpg"),
    path.join(__dirname, "..", "public", "fennec-logo.jpg"),
    path.join(process.cwd(), "src", "assets", "images", "feny_logo_1783331214351.jpg"),
    path.join(__dirname, "src", "assets", "images", "feny_logo_1783331214351.jpg"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      try {
        const buffer = fs.readFileSync(p);
        const base64Uri = `data:image/jpeg;base64,${buffer.toString("base64")}`;
        return { buffer, base64Uri, path: p };
      } catch (err) {
        // continue search
      }
    }
  }
  return null;
}

// API endpoint to send real verification code via email
app.post("/api/send-verification-code", async (req, res) => {
  try {
    const { email, firstName, lastName, phone } = req.body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Adresse e-mail valide requise." });
    }

    const cleanEmail = email.trim().toLowerCase();
    
    // Generate random 4-digit code
    const generatedCode = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    verificationCodes.set(cleanEmail, {
      code: generatedCode,
      expiresAt,
      phone,
      firstName,
      lastName
    });

    console.log(`[Verification] Code generated for ${cleanEmail}: ${generatedCode}`);

    // Get logo data
    const logoData = getLogoData();
    const logoImgSrc = "cid:fenneclogo";

    // Try to send email via Nodemailer if SMTP configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const subject = `🔒 Votre code de sécurité Le Fennec Malin : ${generatedCode}`;
    const textBody = `Bonjour ${firstName || ''},\n\nVotre code de vérification pour accéder à votre comparatif d'assurances est : ${generatedCode}\n\nCe code est valable pendant 10 minutes.\n\nCordialement,\nL'équipe Le Fennec Malin`;
    const htmlBody = `
      <div style="font-family: Arial, Helvetica, sans-serif; padding: 0; color: #2F2921; max-width: 500px; border: 1px solid #ECE1D4; border-radius: 16px; background-color: #FCFAF8; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
        <div style="background-color: #2F2921; color: #FFFFFF; padding: 20px; text-align: center; border-bottom: 3px solid #D36D53;">
          <div style="margin-bottom: 8px;">
            <img src="${logoImgSrc}" alt="Le Fennec Malin" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; border: 2px solid #D36D53; display: inline-block; vertical-align: middle;" />
          </div>
          <h2 style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 800; letter-spacing: 1px;">LE FENNEC MALIN 🇨🇭</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #ECE1D4; font-weight: 500;">Code de vérification de sécurité</p>
        </div>
        <div style="padding: 24px;">
          <p style="margin-top: 0; font-size: 14px; color: #2F2921;">Bonjour <strong>${firstName || ''}</strong>,</p>
          <p style="font-size: 14px; color: #4A4036; line-height: 1.5;">Voici votre code de sécurité unique à 4 chiffres pour valider votre demande et débloquer vos résultats comparatifs :</p>
          <div style="text-align: center; margin: 24px 0; padding: 18px; background-color: #2F2921; color: #D36D53; font-size: 38px; font-weight: 900; letter-spacing: 12px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.12);">
            ${generatedCode}
          </div>
          <p style="font-size: 12px; color: #7F7366; margin-bottom: 0; text-align: center;">Ce code expire dans 10 minutes. Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail.</p>
        </div>
      </div>
    `;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: parseInt(smtpPort || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: smtpUser, pass: smtpPass }
        });

        const attachments = logoData ? [
          {
            filename: "fennec-logo.jpg",
            content: logoData.buffer,
            cid: "fenneclogo",
            contentDisposition: "inline" as const
          }
        ] : [];

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"Le Fennec Malin" <${smtpUser}>`,
          to: cleanEmail,
          subject,
          text: textBody,
          html: htmlBody,
          attachments
        });
        console.log(`[Verification] Email successfully sent to ${cleanEmail}`);
      } catch (mailErr: any) {
        console.error(`[Verification] SMTP failed to send email to ${cleanEmail}:`, mailErr.message);
      }
    } else {
      console.log(`[Verification] SMTP not configured. Code logged for development: ${generatedCode}`);
    }

    return res.json({ 
      success: true, 
      message: `Code de vérification envoyé à ${cleanEmail}`,
      devCodeNotice: !smtpHost ? generatedCode : undefined
    });
  } catch (error: any) {
    console.error("[SendVerificationError]", error);
    return res.status(500).json({ error: error.message || "Impossible d'envoyer le code de vérification." });
  }
});

// API endpoint to verify code
app.post("/api/verify-code", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: "L'adresse e-mail et le code sont obligatoires." });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanCode = String(code).trim();

    const record = verificationCodes.get(cleanEmail);

    if (!record) {
      return res.status(400).json({ 
        success: false, 
        error: "Aucun code trouvé pour cet e-mail. Veuillez demander un nouveau code." 
      });
    }

    if (Date.now() > record.expiresAt) {
      verificationCodes.delete(cleanEmail);
      return res.status(400).json({ 
        success: false, 
        error: "Ce code a expiré. Veuillez cliquer sur 'Recevoir mon code' à nouveau." 
      });
    }

    if (record.code !== cleanCode) {
      return res.status(400).json({ 
        success: false, 
        error: "Code de vérification incorrect. Veuillez vérifier votre e-mail." 
      });
    }

    // Code verified! Remove code from store
    verificationCodes.delete(cleanEmail);

    return res.json({ success: true, verified: true });
  } catch (error: any) {
    console.error("[VerifyCodeError]", error);
    return res.status(500).json({ error: error.message || "Erreur lors de la vérification du code." });
  }
});

// API endpoint for form lead submission
app.post("/api/submit-lead", async (req, res) => {
  try {
    const { type, lead, filters, caisse, details, assureur } = req.body;
    
    if (!lead || !lead.firstName || !lead.lastName || !lead.email || !lead.phone) {
      return res.status(400).json({ error: "Missing required lead contact fields." });
    }

    const recipientEmail = "lefennecmalin@gmail.com";
    const isHealth = type && (type.startsWith("health") || type === "health");
    const isVerified = type && type.includes("verified");

    const logoData = getLogoData();
    // Always use CID for inline email images so email clients don't block base64
    const logoImgSrc = "cid:fenneclogo";

    const timeSlotLabel = 
      lead.timeSlot === "morning" ? "Matin (8h - 12h)" :
      lead.timeSlot === "afternoon" ? "Après-midi (12h - 17h)" :
      lead.timeSlot === "evening" ? "Soir (17h - 20h)" : "N'importe quand";

    let subject = "";
    let textBody = "";
    let htmlBody = "";
    let userConfirmationHtml = "";
    let userConfirmationText = "";

    if (isHealth) {
      const isAdult = filters?.ageCategory === "adult";
      const isYoung = filters?.ageCategory === "young";
      const ageCatLabel = isAdult ? "Adulte (26 ans et +)" : isYoung ? "Jeune adulte (19-25 ans)" : "Enfant (0-18 ans)";
      const modelLabel = 
        filters?.model === "telemed" ? "Télémédecine (Telmed)" :
        filters?.model === "family" ? "Médecin de famille" :
        filters?.model === "hmo" ? "HMO / Réseau de soins" : "Standard (Choix libre)";
      
      const suppInsurancesLabel = Array.isArray(filters?.supplementaryInsurances) && filters.supplementaryInsurances.length > 0
        ? filters.supplementaryInsurances.join(", ")
        : "Aucune / Non demandée";

      const currentPrem = filters?.currentPremium ? Number(filters.currentPremium) : null;
      const computedPrem = caisse?.computedPremium ? Number(caisse.computedPremium) : null;
      
      let monthlySavingsStr = "A valider avec conseiller";
      let annualSavingsStr = "A valider avec conseiller";
      if (currentPrem && computedPrem && currentPrem > computedPrem) {
        monthlySavingsStr = `CHF ${(currentPrem - computedPrem).toFixed(2)} / mois`;
        annualSavingsStr = `CHF ${((currentPrem - computedPrem) * 12).toFixed(2)} / an`;
      }

      const fullAddress = [
        lead.street && lead.houseNumber ? `${lead.street} ${lead.houseNumber}` : lead.street || null,
        (filters?.npa || lead.zipCode) && (filters?.commune || lead.commune) 
          ? `${filters?.npa || lead.zipCode} ${filters?.commune || lead.commune}` 
          : (filters?.npa || lead.zipCode) || (filters?.commune || lead.commune) || null,
        filters?.canton ? `Canton : ${filters.canton}` : null
      ].filter(Boolean).join(", ") || "Non spécifiée";

      subject = `${isVerified ? "✅ [LEAD VÉRIFIÉ]" : "🔥 [NOUVEAU LEAD]"} Assurance Maladie (LAMal) - ${lead.firstName} ${lead.lastName}`;

      textBody = `
=== DEMANDE D'OFFRE ASSURANCE MALADIE (LAMal) ===
Status: ${isVerified ? "VÉRIFIÉ PAR CODE E-MAIL" : "En cours"}

--- 1. INFORMATIONS ET COORDONNÉES DU PROSPECT ---
Nom complet : ${lead.firstName} ${lead.lastName}
E-mail : ${lead.email}
Téléphone : ${lead.phone}
Créneau de rappel : ${timeSlotLabel}
Adresse complète : ${fullAddress}
Année de naissance : ${filters?.yearOfBirth || lead.birthYear || "Non spécifiée"}
Tranche d'âge LAMal : ${ageCatLabel}
Couverture Accident (SLA) : ${filters?.accident === false ? "Exclue (Sans accident)" : "Incluse (Avec accident)"}

--- 2. SITUATION ET CRITÈRES DE SIMULATION ---
Canton de résidence : ${filters?.canton || "N/A"}
NPA / Commune : ${filters?.npa || "N/A"} - ${filters?.commune || "N/A"}
Caisse actuelle : ${filters?.currentCaisse || lead.currentCaisse || "Non renseignée"}
Prime actuelle payée : ${currentPrem ? `CHF ${currentPrem.toFixed(2)} / mois` : "Non renseignée"}
Franchise choisie : CHF ${filters?.franchise || "300"}.- / an
Modèle choisi : ${modelLabel}
Assurances complémentaires souhaitées : ${suppInsurancesLabel}

--- 3. OFFRE ET CAISSE SÉLECTIONNÉE ---
Caisse choisie : ${caisse?.name || "N/A"}
Prime mensuelle calculée : ${computedPrem ? `CHF ${computedPrem.toFixed(2)} / mois` : "N/A"}
Économie mensuelle estimée : ${monthlySavingsStr}
Économie annuelle estimée : ${annualSavingsStr}
      `;

      htmlBody = `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #2F2921; max-width: 650px; border: 1px solid #ECE1D4; border-radius: 16px; overflow: hidden; margin: 0 auto; background-color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          <!-- Header Banner -->
          <div style="background-color: #2F2921; color: #FFFFFF; padding: 24px; text-align: center; border-bottom: 4px solid #D36D53;">
            <div style="margin-bottom: 10px;">
              <img src="${logoImgSrc}" alt="Le Fennec Malin" style="width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 3px solid #D36D53; display: inline-block; vertical-align: middle;" />
            </div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF;">LE FENNEC MALIN 🇨🇭</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #ECE1D4; font-weight: 500;">
              ${isVerified ? "✅ LEAD VÉRIFIÉ — Assurance Maladie (LAMal)" : "🔥 NOUVELLE DEMANDE — Assurance Maladie (LAMal)"}
            </p>
          </div>

          <div style="padding: 28px; background-color: #FCFAF8;">
            <!-- Prospect Details -->
            <div style="margin-bottom: 24px; background-color: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 12px; padding: 20px;">
              <h3 style="color: #D36D53; font-size: 15px; margin-top: 0; margin-bottom: 14px; border-bottom: 2px solid #F7F1EB; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                👤 1. Coordonnées & Adresse du Prospect
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366; width: 42%;">Prénom & Nom :</td>
                  <td style="padding: 6px 0; font-weight: 800; color: #2F2921;">${lead.firstName} ${lead.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Adresse E-mail :</td>
                  <td style="padding: 6px 0;"><a href="mailto:${lead.email}" style="color: #D36D53; font-weight: bold; text-decoration: none;">${lead.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Téléphone Mobile :</td>
                  <td style="padding: 6px 0;"><a href="tel:${lead.phone}" style="color: #D36D53; font-weight: bold; text-decoration: none;">${lead.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Créneau de rappel :</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #2F2921;">${timeSlotLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Adresse complète :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${fullAddress}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Année de naissance :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.yearOfBirth || lead.birthYear || "Non spécifiée"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Tranche d'âge LAMal :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${ageCatLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Accidents (SLA) :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.accident === false ? "Exclue (Sans accident)" : "Incluse (Avec accident)"}</td>
                </tr>
              </table>
            </div>

            <!-- Simulation Criteria -->
            <div style="margin-bottom: 24px; background-color: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 12px; padding: 20px;">
              <h3 style="color: #D36D53; font-size: 15px; margin-top: 0; margin-bottom: 14px; border-bottom: 2px solid #F7F1EB; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                ⚙️ 2. Situation & Critères de la Simulation
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366; width: 42%;">Canton de résidence :</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #2F2921;">${filters?.canton || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">NPA / Localité :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.npa || "N/A"} ${filters?.commune || ""}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Caisse actuelle :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.currentCaisse || lead.currentCaisse || "Non renseignée"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Prime actuelle payée :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${currentPrem ? `CHF ${currentPrem.toFixed(2)} / mois` : "Non renseignée"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Franchise annuelle choisie :</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #D36D53;">CHF ${filters?.franchise || "300"}.- / an</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Modèle d'assurance :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${modelLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Assurances complémentaires :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${suppInsurancesLabel}</td>
                </tr>
              </table>
            </div>

            <!-- Chosen Offer -->
            <div style="background-color: #2F2921; color: #FFFFFF; border-radius: 12px; padding: 20px; text-align: center;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #ECE1D4; font-weight: bold;">Caisse Maladie Sélectionnée</span>
              <div style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 6px 0;">${caisse?.name || "Non choisie / Simulation générale"}</div>
              <div style="font-size: 32px; font-weight: 900; color: #D36D53; margin: 8px 0;">
                ${computedPrem ? `CHF ${computedPrem.toFixed(2)}` : "A calculer"}<span style="font-size: 15px; font-weight: normal; color: #ECE1D4;"> / mois</span>
              </div>
              ${currentPrem && computedPrem && currentPrem > computedPrem ? `
                <div style="background-color: rgba(211, 109, 83, 0.2); border: 1px solid #D36D53; border-radius: 8px; padding: 10px; margin-top: 12px; font-size: 13px; color: #FFF;">
                  💰 <strong>Économie estimée :</strong> ${monthlySavingsStr} (${annualSavingsStr})
                </div>
              ` : ''}
            </div>
          </div>

          <div style="background-color: #2F2921; color: #ECE1D4; font-size: 12px; text-align: center; padding: 14px; border-top: 1px solid rgba(255,255,255,0.1);">
            © FENY SA — Le Fennec Malin 🇨🇭 | Système Lead Automatique
          </div>
        </div>
      `;

      // User confirmation HTML template
      userConfirmationText = `Bonjour ${lead.firstName},\n\nNous avons bien reçu votre demande d'offre comparative d'Assurance Maladie (LAMal) auprès de ${caisse?.name || "nos caisses partenaires"}.\n\nUn conseiller Feny étudie votre dossier pour optimiser votre tarif.\n\nCordialement,\nL'équipe Le Fennec Malin`;

      userConfirmationHtml = `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #2F2921; max-width: 600px; border: 1px solid #ECE1D4; border-radius: 16px; overflow: hidden; margin: 0 auto; background-color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          <div style="background-color: #2F2921; color: #FFFFFF; padding: 24px; text-align: center; border-bottom: 4px solid #D36D53;">
            <div style="margin-bottom: 10px;">
              <img src="${logoImgSrc}" alt="Le Fennec Malin" style="width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 3px solid #D36D53; display: inline-block; vertical-align: middle;" />
            </div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF;">LE FENNEC MALIN 🇨🇭</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #ECE1D4; font-weight: 500;">Confirmation de votre demande d'offre comparative</p>
          </div>

          <div style="padding: 28px; background-color: #FCFAF8;">
            <p style="font-size: 16px; color: #2F2921; margin-top: 0;">Bonjour <strong>${lead.firstName}</strong>,</p>
            <p style="font-size: 14px; color: #4A4036; margin-bottom: 20px;">
              Nous avons bien enregistré votre demande d'étude comparative d'assurance maladie pour <strong>${caisse?.name || "Assurance Maladie LAMal"}</strong>.
            </p>

            <!-- Recap Box -->
            <div style="background-color: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <h3 style="color: #D36D53; font-size: 14px; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid #F7F1EB; padding-bottom: 6px; text-transform: uppercase;">
                📋 Récapitulatif de vos critères
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #4A4036;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold; width: 45%;">Caisse demandée :</td>
                  <td style="padding: 5px 0; font-weight: 700; color: #2F2921;">${caisse?.name || "LAMal 2026"}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Prime calculée :</td>
                  <td style="padding: 5px 0; font-weight: 800; color: #D36D53;">${computedPrem ? `CHF ${computedPrem.toFixed(2)} / mois` : "Selon offre officielle"}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Canton & Commune :</td>
                  <td style="padding: 5px 0;">${filters?.canton || "N/A"} ${filters?.commune ? `(${filters.commune})` : ""}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Franchise annuelle :</td>
                  <td style="padding: 5px 0;">CHF ${filters?.franchise || "300"}.- / an</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Modèle :</td>
                  <td style="padding: 5px 0;">${modelLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Téléphone de contact :</td>
                  <td style="padding: 5px 0;">${lead.phone}</td>
                </tr>
              </table>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #FFF3F0; border: 1px solid #FAD1C7; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 10px; color: #D36D53; font-size: 14px; text-transform: uppercase; font-weight: bold;">
                🚀 Que va-t-il se passer maintenant ?
              </h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4A4036; line-height: 1.7;">
                <li>Un conseiller accrédité vérifie vos réductions de prime cantonales et subventions.</li>
                <li>Votre dossier d'offre officiel et personnalisé vous sera transmis par e-mail en format PDF.</li>
                <li>Si souhaité, notre conseiller vous recontactera au <strong>${lead.phone}</strong> (${timeSlotLabel}) sans aucun engagement.</li>
              </ul>
            </div>

            <p style="font-size: 13px; color: #7F7366; margin-bottom: 6px;">
              Des questions sur vos assurances ? Contactez-nous à <a href="mailto:contact@lefennecmalin.ch" style="color: #D36D53; font-weight: bold;">contact@lefennecmalin.ch</a>.
            </p>
            <p style="font-size: 14px; color: #2F2921; font-weight: bold; margin-top: 16px; margin-bottom: 0;">
              L'équipe de Fenny, Le Fennec Malin 🦊🇨🇭
            </p>
          </div>

          <div style="background-color: #2F2921; color: #ECE1D4; font-size: 11px; text-align: center; padding: 14px;">
            © FENY SA — Comparateur neutre & certifié en Suisse
          </div>
        </div>
      `;

    } else {
      // 3rd Pillar (Prévoyance)
      const isIndep = lead.profession === "independent" || filters?.employmentStatus === "independent";
      const pillarLabel = (details?.pillarType || filters?.type) === "3b" ? "3b (Libre)" : "3a (Lié Déductible)";
      const monthlyAmt = details?.monthlyAmount ? Number(details.monthlyAmount) : null;
      const annualAmt = monthlyAmt ? monthlyAmt * 12 : null;
      const dur = details?.duration || filters?.duration ? Number(details?.duration || filters?.duration) : null;
      const taxSavingsYr = assureur?.taxSavingsPerYear ? Number(assureur.taxSavingsPerYear) : null;
      const totalTaxSavings = taxSavingsYr && dur ? taxSavingsYr * dur : null;

      const objLabel = 
        filters?.objective === "fiscal" ? "Réduction d'impôts" :
        filters?.objective === "epargne" ? "Constituer un capital" :
        filters?.objective === "protection" ? "Protection de la famille" : "Préparation retraite";

      const riskLabel = 
        filters?.riskProfile === "prudent" ? "Prudent (Garantie de capital)" :
        filters?.riskProfile === "dynamique" ? "Dynamique (Fonds de placement)" : "Équilibré";

      subject = `${isVerified ? "✅ [LEAD VÉRIFIÉ]" : "💎 [NOUVEAU LEAD]"} Prévoyance (3ème Pilier) - ${lead.firstName} ${lead.lastName}`;

      textBody = `
=== DEMANDE D'ÉTUDE PRÉVOYANCE (3e PILIER) ===
Status: ${isVerified ? "VÉRIFIÉ PAR CODE E-MAIL" : "En cours"}

--- 1. INFORMATIONS ET COORDONNÉES DU PROSPECT ---
Nom complet : ${lead.firstName} ${lead.lastName}
E-mail : ${lead.email}
Téléphone : ${lead.phone}
Créneau de rappel : ${timeSlotLabel}
Statut professionnel : ${isIndep ? "Indépendant (Sans 2e pilier)" : "Salarié (Affilié LPP)"}
Âge : ${filters?.age || lead.age || "N/A"} ans
Canton : ${filters?.canton || "N/A"}
Revenu annuel brut : ${filters?.grossIncome || filters?.income ? `CHF ${Number(filters.grossIncome || filters.income).toLocaleString()}.- / an` : "Non renseigné"}

--- 2. DÉTAILS DU CONTRAT & SIMULATION ---
Type de Pilier : Pilier ${pillarLabel}
Épargne mensuelle : ${monthlyAmt ? `CHF ${monthlyAmt}.- / mois` : "N/A"}
Épargne annuelle : ${annualAmt ? `CHF ${annualAmt}.- / an` : "N/A"}
Durée du contrat : ${dur ? `${dur} ans` : "N/A"}
3ème pilier actuel : ${details?.currentPillar || filters?.currentPillar || "Aucun"}
Objectif principal : ${objLabel}
Profil de risque / Stratégie : ${riskLabel}

--- 3. OFFRE ET COMPAGNIE SÉLECTIONNÉE ---
Compagnie choisie : ${assureur?.name || "N/A"}
Capital projeté à terme : ${assureur?.expectedSum ? `CHF ${Number(assureur.expectedSum).toLocaleString()}.-` : "N/A"}
Gain fiscal annuel estimé : ${taxSavingsYr ? `CHF ${taxSavingsYr.toLocaleString()}.- / an` : "N/A"}
Gain fiscal total estimé : ${totalTaxSavings ? `CHF ${totalTaxSavings.toLocaleString()}.- sur ${dur} ans` : "N/A"}
      `;

      htmlBody = `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #2F2921; max-width: 650px; border: 1px solid #ECE1D4; border-radius: 16px; overflow: hidden; margin: 0 auto; background-color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          <!-- Header Banner -->
          <div style="background-color: #2F2921; color: #FFFFFF; padding: 24px; text-align: center; border-bottom: 4px solid #D36D53;">
            <div style="margin-bottom: 10px;">
              <img src="${logoImgSrc}" alt="Le Fennec Malin" style="width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 3px solid #D36D53; display: inline-block; vertical-align: middle;" />
            </div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF;">LE FENNEC MALIN 🇨🇭</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #ECE1D4; font-weight: 500;">
              ${isVerified ? "✅ LEAD VÉRIFIÉ — Prévoyance 3ème Pilier" : "💎 NOUVELLE DEMANDE — Prévoyance 3ème Pilier"}
            </p>
          </div>

          <div style="padding: 28px; background-color: #FCFAF8;">
            <!-- Prospect Details -->
            <div style="margin-bottom: 24px; background-color: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 12px; padding: 20px;">
              <h3 style="color: #D36D53; font-size: 15px; margin-top: 0; margin-bottom: 14px; border-bottom: 2px solid #F7F1EB; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                👤 1. Coordonnées du Prospect
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366; width: 42%;">Prénom & Nom :</td>
                  <td style="padding: 6px 0; font-weight: 800; color: #2F2921;">${lead.firstName} ${lead.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Adresse E-mail :</td>
                  <td style="padding: 6px 0;"><a href="mailto:${lead.email}" style="color: #D36D53; font-weight: bold; text-decoration: none;">${lead.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Téléphone Mobile :</td>
                  <td style="padding: 6px 0;"><a href="tel:${lead.phone}" style="color: #D36D53; font-weight: bold; text-decoration: none;">${lead.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Créneau de rappel :</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #2F2921;">${timeSlotLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Statut professionnel :</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #2F2921;">${isIndep ? "Indépendant (Sans 2e pilier)" : "Salarié (Affilié LPP)"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Âge :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.age || lead.age || "N/A"} ans</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Canton de résidence :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.canton || "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Revenu annuel brut :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${filters?.grossIncome || filters?.income ? `CHF ${Number(filters.grossIncome || filters.income).toLocaleString()}.- / an` : "Non renseigné"}</td>
                </tr>
              </table>
            </div>

            <!-- Contract & Simulation Details -->
            <div style="margin-bottom: 24px; background-color: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 12px; padding: 20px;">
              <h3 style="color: #D36D53; font-size: 15px; margin-top: 0; margin-bottom: 14px; border-bottom: 2px solid #F7F1EB; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">
                ⚙️ 2. Détails du Contrat & Préférences
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366; width: 42%;">Type de Pilier :</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #2F2921;">Pilier ${pillarLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Épargne mensuelle :</td>
                  <td style="padding: 6px 0; font-weight: 700; color: #D36D53;">${monthlyAmt ? `CHF ${monthlyAmt}.- / mois` : "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Épargne annuelle :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${annualAmt ? `CHF ${annualAmt}.- / an` : "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Durée du placement :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${dur ? `${dur} ans` : "N/A"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">3ème pilier actuel :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${details?.currentPillar || filters?.currentPillar || "Aucun"}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Objectif principal :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${objLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #7F7366;">Profil de risque :</td>
                  <td style="padding: 6px 0; color: #2F2921;">${riskLabel}</td>
                </tr>
              </table>
            </div>

            <!-- Chosen Company & Tax Gains -->
            <div style="background-color: #2F2921; color: #FFFFFF; border-radius: 12px; padding: 20px; text-align: center;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #ECE1D4; font-weight: bold;">Compagnie Sélectionnée</span>
              <div style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 6px 0;">${assureur?.name || "Solution Optimisée 3e Pilier"}</div>
              <div style="font-size: 28px; font-weight: 900; color: #D36D53; margin: 8px 0;">
                ${assureur?.expectedSum ? `CHF ${Number(assureur.expectedSum).toLocaleString()}.-` : "N/A"}<span style="font-size: 14px; font-weight: normal; color: #ECE1D4;"> de capital projeté</span>
              </div>
              ${taxSavingsYr ? `
                <div style="background-color: rgba(19, 115, 51, 0.3); border: 1px solid #137333; border-radius: 8px; padding: 12px; margin-top: 12px; font-size: 13px; color: #E6F4EA;">
                  🍃 <strong>Économie d'impôts :</strong> CHF ${taxSavingsYr.toLocaleString()}.- / an
                  ${totalTaxSavings ? `(soit <strong>CHF ${totalTaxSavings.toLocaleString()}.-</strong> au terme)` : ''}
                </div>
              ` : ''}
            </div>
          </div>

          <div style="background-color: #2F2921; color: #ECE1D4; font-size: 12px; text-align: center; padding: 14px; border-top: 1px solid rgba(255,255,255,0.1);">
            © FENY SA — Le Fennec Malin 🇨🇭 | Système Lead Automatique
          </div>
        </div>
      `;

      // User confirmation HTML template
      userConfirmationText = `Bonjour ${lead.firstName},\n\nNous avons bien reçu votre demande d'étude de Prévoyance (3ème Pilier) pour ${assureur?.name || "votre 3e pilier"}.\n\nUn conseiller spécialisé étudie vos données afin d'optimiser vos déductions fiscales.\n\nCordialement,\nL'équipe Le Fennec Malin`;

      userConfirmationHtml = `
        <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #2F2921; max-width: 600px; border: 1px solid #ECE1D4; border-radius: 16px; overflow: hidden; margin: 0 auto; background-color: #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.06);">
          <div style="background-color: #2F2921; color: #FFFFFF; padding: 24px; text-align: center; border-bottom: 4px solid #D36D53;">
            <div style="margin-bottom: 10px;">
              <img src="${logoImgSrc}" alt="Le Fennec Malin" style="width: 68px; height: 68px; border-radius: 50%; object-fit: cover; border: 3px solid #D36D53; display: inline-block; vertical-align: middle;" />
            </div>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 1px; color: #FFFFFF;">LE FENNEC MALIN 🇨🇭</h1>
            <p style="margin: 6px 0 0; font-size: 13px; color: #ECE1D4; font-weight: 500;">Confirmation de votre simulation 3ème Pilier</p>
          </div>

          <div style="padding: 28px; background-color: #FCFAF8;">
            <p style="font-size: 16px; color: #2F2921; margin-top: 0;">Bonjour <strong>${lead.firstName}</strong>,</p>
            <p style="font-size: 14px; color: #4A4036; margin-bottom: 20px;">
              Nous avons bien enregistré votre demande de simulation et d'optimisation fiscale pour votre <strong>3ème Pilier (${pillarLabel})</strong> auprès de <strong>${assureur?.name || "nos partenaires prévoyance"}</strong>.
            </p>

            <!-- Recap Box -->
            <div style="background-color: #FFFFFF; border: 1px solid #ECE1D4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <h3 style="color: #D36D53; font-size: 14px; margin-top: 0; margin-bottom: 12px; border-bottom: 1px solid #F7F1EB; padding-bottom: 6px; text-transform: uppercase;">
                📋 Récapitulatif de votre projet
              </h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #4A4036;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold; width: 45%;">Compagnie sélectionnée :</td>
                  <td style="padding: 5px 0; font-weight: 700; color: #2F2921;">${assureur?.name || "3e Pilier Suisse"}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Épargne mensuelle :</td>
                  <td style="padding: 5px 0; font-weight: 800; color: #D36D53;">${monthlyAmt ? `CHF ${monthlyAmt}.- / mois` : "Selon contrat"}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Gain fiscal estimé :</td>
                  <td style="padding: 5px 0; font-weight: 700; color: #137333;">${taxSavingsYr ? `CHF ${taxSavingsYr.toLocaleString()}.- / an` : "Optimisé"}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Durée prévue :</td>
                  <td style="padding: 5px 0;">${dur ? `${dur} ans` : "Jusqu'à la retraite"}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Téléphone de contact :</td>
                  <td style="padding: 5px 0;">${lead.phone}</td>
                </tr>
              </table>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #FFF3F0; border: 1px solid #FAD1C7; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
              <h4 style="margin: 0 0 10px; color: #D36D53; font-size: 14px; text-transform: uppercase; font-weight: bold;">
                🚀 Prochaines étapes :
              </h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #4A4036; line-height: 1.7;">
                <li>Un expert certifié en prévoyance suisse calcule votre déduction fiscale maximale selon votre canton (${filters?.canton || "Suisse"}).</li>
                <li>Votre projet d'épargne complet avec tableaux d'amortissement vous sera envoyé par e-mail au format PDF.</li>
                <li>Votre conseiller est disponible au <strong>${lead.phone}</strong> (${timeSlotLabel}) pour ajuster votre plan sans engagement.</li>
              </ul>
            </div>

            <p style="font-size: 13px; color: #7F7366; margin-bottom: 6px;">
              Une question sur la fiscalité ou vos contrats ? Écrivez-nous à <a href="mailto:contact@lefennecmalin.ch" style="color: #D36D53; font-weight: bold;">contact@lefennecmalin.ch</a>.
            </p>
            <p style="font-size: 14px; color: #2F2921; font-weight: bold; margin-top: 16px; margin-bottom: 0;">
              L'équipe de Fenny, Le Fennec Malin 🦊🇨🇭
            </p>
          </div>

          <div style="background-color: #2F2921; color: #ECE1D4; font-size: 11px; text-align: center; padding: 14px;">
            © FENY SA — Comparateur neutre de prévoyance & assurances
          </div>
        </div>
      `;
    }

    // SMTP sending
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      console.log(`[SMTP] Sending lead emails... Admin: ${recipientEmail}, Prospect: ${lead.email}`);

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass }
      });

      const attachments = logoData ? [
        {
          filename: "fennec-logo.jpg",
          content: logoData.buffer,
          cid: "fenneclogo",
          contentDisposition: "inline" as const
        }
      ] : [];

      // 1. Send Admin Lead Email
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Feny Leads" <${smtpUser}>`,
        to: recipientEmail,
        subject: subject,
        text: textBody,
        html: htmlBody,
        attachments
      });
      console.log(`[SMTP] Admin lead email sent to ${recipientEmail}`);

      // 2. Send User Confirmation Email (if valid prospect email provided)
      if (lead.email && lead.email.toLowerCase() !== recipientEmail.toLowerCase()) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Le Fennec Malin" <${smtpUser}>`,
            to: lead.email,
            subject: `✅ Confirmation de votre demande — Le Fennec Malin`,
            text: userConfirmationText,
            html: userConfirmationHtml,
            attachments
          });
          console.log(`[SMTP] Prospect confirmation email sent to ${lead.email}`);
        } catch (userErr: any) {
          console.error(`[SMTP] Failed sending prospect confirmation:`, userErr.message);
        }
      }

      return res.json({ success: true, method: "smtp" });
    } else {
      console.log("\n=======================================================");
      console.log("⚠️ SMTP NOT YET CONFIGURED IN ENV VARIABLES.");
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


// Load 2026 premiums database and NPA region map from data or public folder.
interface NpaEntry {
  npa: string;
  locality: string;
  canton: string;
  premium_region: string;
  bfs_number: string;
  commune: string;
  district: string;
  npa_spans_multiple_regions_flag: number;
  locality_spans_multiple_communes_flag: number;
}

let npaMap: Record<string, NpaEntry[]> = {};

function loadNpaToRegionMap() {
  if (Object.keys(npaMap).length > 0) return npaMap;
  const cwd = process.cwd();
  const candidatePaths = [
    path.join(cwd, "data", "npa_to_region_2026.csv"),
    path.join(cwd, "public", "npa_to_region_2026.csv"),
  ];
  if (typeof __dirname !== "undefined") {
    candidatePaths.push(path.join(__dirname, "data", "npa_to_region_2026.csv"));
    candidatePaths.push(path.join(__dirname, "..", "data", "npa_to_region_2026.csv"));
  }
  const existingPath = candidatePaths.find(p => fs.existsSync(p));
  if (existingPath) {
    try {
      const raw = fs.readFileSync(existingPath, "utf-8");
      const lines = raw.split("\n");
      npaMap = {};
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(",");
        if (parts.length >= 4) {
          const npa = parts[0].trim();
          const locality = parts[1].trim();
          const canton = parts[2].trim();
          const premium_region = parts[3].trim();
          const bfs_number = parts[4] ? parts[4].trim() : "";
          const commune = parts[5] ? parts[5].trim() : "";
          const district = parts[6] ? parts[6].trim() : "";
          const npa_spans_multiple_regions_flag = parts[7] ? parseInt(parts[7].trim(), 10) : 0;
          const locality_spans_multiple_communes_flag = parts[8] ? parseInt(parts[8].trim(), 10) : 0;

          if (!npaMap[npa]) npaMap[npa] = [];
          npaMap[npa].push({
            npa, locality, canton, premium_region, bfs_number, commune, district,
            npa_spans_multiple_regions_flag, locality_spans_multiple_communes_flag
          });
        }
      }
      console.log(`[Server] Loaded ${Object.keys(npaMap).length} NPAs from ${existingPath}`);
    } catch (err) {
      console.error("[Server] Error loading npa_to_region_2026.csv:", err);
    }
  }
  return npaMap;
}

loadNpaToRegionMap();

let premiumsDb: Record<string, { premium: number; modelName: string }> = {};
let premiumsLoadError: string | null = null;

async function loadPremiums() {
  if (Object.keys(premiumsDb).length > 0) return premiumsDb;

  const cwd = process.cwd();
  const candidatePaths = [
    path.join(cwd, "public", "premiums_2026.json"),
    path.join(cwd, "dist", "premiums_2026.json"),
  ];
  if (typeof __dirname !== "undefined") {
    candidatePaths.push(path.join(__dirname, "public", "premiums_2026.json"));
    candidatePaths.push(path.join(__dirname, "..", "public", "premiums_2026.json"));
  }

  const existingPath = candidatePaths.find(p => fs.existsSync(p));

  if (!existingPath) {
    premiumsLoadError = `premiums_2026.json not found. Looked in: ${candidatePaths.join(", ")}`;
    console.error(`[Server] ${premiumsLoadError}`);
    return premiumsDb;
  }

  console.log(`[Server] Loading local official 2026 premiums database from ${existingPath}...`);
  const raw = fs.readFileSync(existingPath, "utf-8");

  try {
    premiumsDb = JSON.parse(raw);
    premiumsLoadError = null;
    console.log(`[Server] Successfully loaded ${Object.keys(premiumsDb).length} premium records.`);
  } catch (parseErr: any) {
    premiumsLoadError = `premiums_2026.json at ${existingPath} is not valid JSON (file length: ${raw.length} chars): ${parseErr.message}`;
    console.error(`[Server] ${premiumsLoadError}`);
  }

  return premiumsDb;
}

// Ensure it's loaded at startup if possible
loadPremiums();

// API endpoint for resolving NPA to locality / region
app.get("/api/priminfo/npa-lookup", (req, res) => {
  const npaStr = String(req.query.npa || req.query.zipCode || "").trim();
  if (!npaStr) {
    return res.status(400).json({ error: "NPA param est requis" });
  }

  if (Object.keys(npaMap).length === 0) {
    loadNpaToRegionMap();
  }

  const entries = npaMap[npaStr];
  if (!entries || entries.length === 0) {
    // NPA not found in the official OFSP npa_to_region file.
    // We do NOT guess a canton/region from a ZIP-range heuristic —
    // an incorrect guess would mean a wrong premium region and wrong prices.
    return res.status(404).json({
      error: "Ce code postal n'a pas été trouvé dans le fichier officiel OFSP des régions de primes.",
      npa: npaStr
    });
  }

  const distinctRegions = new Set(entries.map(e => `${e.canton}_${e.premium_region}`));
  const distinctLocalities = new Set(entries.map(e => e.locality));
  const spansFlag = entries.some(e => e.npa_spans_multiple_regions_flag === 1);

  if (entries.length > 1 && (distinctRegions.size > 1 || distinctLocalities.size > 1 || spansFlag)) {
    return res.json({
      success: true,
      ambiguous: true,
      npa: npaStr,
      message: `Le code postal ${npaStr} correspond à plusieurs localités ou régions de primes. Veuillez préciser votre localité.`,
      localities: entries.map(e => ({
        locality: e.locality,
        canton: e.canton,
        premium_region: e.premium_region,
        premium_region_code: `PR-REG CH${e.premium_region}`,
        commune: e.commune
      }))
    });
  }

  const primary = entries[0];
  return res.json({
    success: true,
    ambiguous: false,
    npa: npaStr,
    locality: primary.locality,
    canton: primary.canton,
    premium_region: primary.premium_region,
    premium_region_code: `PR-REG CH${primary.premium_region}`
  });
});

// API endpoint for fetching local official premiums
app.get("/api/priminfo/praemien", async (req, res) => {
  try {
    if (Object.keys(premiumsDb).length === 0) {
      await loadPremiums();
    }

    if (Object.keys(premiumsDb).length === 0) {
       return res.status(500).json({
         error: "Could not load the premiums database.",
         reason: premiumsLoadError || "Unknown error while loading premiums_2026.json"
       });
    }

    const { zipCode, franchise, ageCategory, yob, accident, locality, region: customRegion } = req.query;
    console.log("[Priminfo API] Processing proxy request for Swiss open data...");

    if (!zipCode) {
      return res.status(400).json({ error: "zipCode is required" });
    }

    const cleanZip = String(zipCode).trim();
    const cleanFranchise = franchise ? parseInt(String(franchise), 10) : 2500;
    
    let cleanAgeCategory = ageCategory ? String(ageCategory) : "adult";
    if (yob) {
      const parsedYob = parseInt(String(yob), 10);
      if (!isNaN(parsedYob) && parsedYob > 1900) {
        cleanAgeCategory = getAgeCategoryFromYob(parsedYob);
      }
    }
    
    const cleanAccident = accident === "0" ? false : true;

    // Resolve canton and region strictly from the official npa_to_region data.
    let canton = "";
    let region = "";

    if (Object.keys(npaMap).length === 0) loadNpaToRegionMap();
    const npaEntries = npaMap[cleanZip];

    if (npaEntries && npaEntries.length > 0) {
      let matched = npaEntries[0];
      if (locality) {
        const foundLoc = npaEntries.find(e => e.locality.toLowerCase() === String(locality).toLowerCase());
        if (foundLoc) matched = foundLoc;
      } else if (npaEntries.length > 1) {
        const distinctRegions = new Set(npaEntries.map(e => `${e.canton}_${e.premium_region}`));
        if (distinctRegions.size > 1) {
          return res.status(409).json({
            error: "Ce code postal correspond à plusieurs régions de primes. Veuillez préciser la localité.",
            ambiguous: true,
            localities: npaEntries.map(e => ({ locality: e.locality, canton: e.canton, premium_region: e.premium_region }))
          });
        }
      }
      canton = matched.canton;
      // Use the real premium region straight from the official file — do NOT
      // re-derive it through the ZIP-range heuristic, which would discard the
      // exact official value we just looked up.
      region = `PR-REG CH${matched.premium_region}`;
    }

    if (!canton || !region) {
      // NPA not found in the official file: report it rather than guessing.
      return res.status(404).json({ error: "Code postal non trouvé dans le fichier officiel OFSP des régions de primes." });
    }

    if (customRegion) {
      const parsedRegNum = parseInt(String(customRegion).replace("PR-REG CH", ""), 10);
      if (!isNaN(parsedRegNum)) {
        region = `PR-REG CH${parsedRegNum}`;
      }
    }

    const activeInsurers = ACTIVE_INSURER_IDS;

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

        if (record && record.premium > 0) {
          results.push({
            insurerId,
            insurerName: getInsurerDisplayName(insurerId),
            modelName: translateModelNameToFrench(record.modelName || getInsurerModelFallbackName(insurerId, modelType), modelType),
            modelType,
            premium: record.premium,
            sourceNotice: "Source : OFSP/priminfo, primes 2026"
          });
        }
      }
    }

    // Sort by monthly premium ascending
    results.sort((a, b) => a.premium - b.premium);

    console.log(`[PremiumLookup] Resolved ${results.length} official records for ZIP ${cleanZip} (${canton}, Region: ${region}, Franchise: ${cleanFranchise}, Category: ${cleanAgeCategory}, Accident: ${cleanAccident})`);
    res.json({
      success: true,
      source: "Source : OFSP/priminfo, primes 2026",
      canton,
      region,
      count: results.length,
      data: results
    });

  } catch (error: any) {
    console.error("[PremiumLookupError]", error);
    res.status(500).json({ error: error.message || "An error occurred while resolving premiums." });
  }
});


app.get("/api/health/priminfo", async (req, res) => {

  try {

    const result = await checkApiHealth();

    res.json({ success: true, ...result });

  } catch (error: any) {

    res.status(500).json({ success: false, error: error.message });

  }

});

app.get("/api/debug-priminfo", async (req, res) => {

  try {

    const result = await checkApiHealth();

    res.json({ success: true, ...result });

  } catch (error: any) {

    res.status(500).json({ success: false, error: error.message });

  }

});

app.get("/api/debug-config", (req, res) => {
  const priminfoApiKeyPresent = typeof process.env.PRIMINFO_API_KEY === "string" && process.env.PRIMINFO_API_KEY.length > 0;
  const swissApiKeyPresent = typeof process.env.SWISS_API_KEY === "string" && process.env.SWISS_API_KEY.length > 0;
  
  res.json({
    success: true,
    env: {
      PRIMINFO_API_KEY: priminfoApiKeyPresent,
      SWISS_API_KEY: swissApiKeyPresent,
      NODE_ENV: process.env.NODE_ENV || "not-set",
      VERCEL: !!process.env.VERCEL
    }
  });
});

export { app };

// Serve frontend assets & mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Running in DEVELOPMENT mode. Mounting Vite Dev Server...");
    const { createServer: createViteServer } = await import("vite");
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

if (!process.env.VERCEL) {
  startServer();
}