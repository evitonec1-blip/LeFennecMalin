import { checkApiHealth } from "./src/utils/checkApiHealth.js";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fs from "fs";
import { getInsurerDisplayName, getInsurerModelFallbackName, lookupPremium, getAgeCategoryFromYob, ACTIVE_INSURER_IDS } from "./src/utils/premiumLookupService.js";

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

    // Try to send email via Nodemailer if SMTP configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    const subject = `🔒 Votre code de sécurité Le Fennec Malin : ${generatedCode}`;
    const textBody = `Bonjour ${firstName || ''},\n\nVotre code de vérification pour accéder à votre comparatif d'assurances est : ${generatedCode}\n\nCe code est valable pendant 10 minutes.\n\nCordialement,\nL'équipe Le Fennec Malin`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; padding: 24px; color: #2F2921; max-width: 500px; border: 1px solid #ECE1D4; border-radius: 12px; background-color: #FCFAF8; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:fenneclogo" alt="Le Fennec Malin" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 2px solid #D36D53; display: inline-block; margin-bottom: 8px;" />
          <h2 style="color: #D36D53; margin: 0; font-size: 20px; font-weight: bold;">Code de vérification de sécurité</h2>
          <p style="margin: 4px 0 0; font-size: 12px; color: #7F7366; font-weight: 600;">LE FENNEC MALIN - COMPARATEUR NEUTRE</p>
        </div>
        <p style="margin-top: 0; font-size: 14px;">Bonjour ${firstName || ''},</p>
        <p style="font-size: 14px; color: #4A4036;">Voici votre code de sécurité unique à 4 chiffres pour valider votre demande et afficher les tarifs officiels :</p>
        <div style="text-align: center; margin: 24px 0; padding: 18px; background-color: #2F2921; color: #FFF; font-size: 36px; font-weight: 900; letter-spacing: 10px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          ${generatedCode}
        </div>
        <p style="font-size: 12px; color: #7F7366; margin-bottom: 0;">Ce code expire dans 10 minutes. Si vous n'avez pas demandé ce code, vous pouvez ignorer cet e-mail.</p>
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

        const logoPath = path.join(process.cwd(), "public", "fennec-logo.jpg");
        const attachments = fs.existsSync(logoPath) ? [
          {
            filename: "fennec-logo.jpg",
            path: logoPath,
            cid: "fenneclogo"
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
            <img src="cid:fenneclogo" alt="Le Fennec Malin" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #D36D53; margin-bottom: 6px;" />
            <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px;">FENY - LE FENNEC MALIN</h2>
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
            <img src="cid:fenneclogo" alt="Le Fennec Malin" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover; border: 2px solid #D36D53; margin-bottom: 6px;" />
            <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px;">FENY - LE FENNEC MALIN</h2>
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

      const logoPath = path.join(process.cwd(), "public", "fennec-logo.jpg");
      const attachments = fs.existsSync(logoPath) ? [
        {
          filename: "fennec-logo.jpg",
          path: logoPath,
          cid: "fenneclogo"
        }
      ] : [];

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Feny Leads" <${smtpUser}>`,
        to: recipientEmail,
        subject: subject,
        text: textBody,
        html: htmlBody,
        attachments
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
            modelName: record.modelName || getInsurerModelFallbackName(insurerId, modelType),
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