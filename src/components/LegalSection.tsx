/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Key, HelpCircle, FileText } from 'lucide-react';

interface LegalSectionProps {
  mode: 'legal' | 'privacy';
}

export default function LegalSection({ mode }: LegalSectionProps) {
  if (mode === 'legal') {
    return (
      <div className="bg-white rounded-3xl border border-fennec-cream p-8 md:p-12 space-y-8 max-w-4xl mx-auto shadow-sm">
        <div className="flex items-center space-x-4 border-b border-fennec-cream/40 pb-6">
          <div className="p-3 bg-red-50 text-fennec-red rounded-2xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-display font-black text-3xl text-fennec-dark">
              Mentions Légales
            </h2>
            <p className="text-sm text-fennec-brown font-semibold">
              Conformité suisse, éditeur et politique de responsabilité
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-fennec-dark/80 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">1. Éditeur du site</h3>
            <p>
              Le site internet <strong>lefennecmalin.ch</strong> est édité par la société fictive de démonstration et développement <strong>Le Fennec Malin Sàrl</strong>, dont le siège social est situé à Lausanne, Suisse.
            </p>
            <p className="font-mono text-xs text-fennec-brown">
              Registre du commerce du canton de Vaud : CHE-458.120.588 MWST / IDE<br />
              Email : contact@lefennecmalin.ch<br />
              Téléphone : +41 (0) 21 588 05 20
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">2. Hébergement</h3>
            <p>
              Le site est hébergé en Suisse/Europe sur des infrastructures sécurisées Cloud Run de démonstration. L'ensemble des données transitant par le biais de nos formulaires de comparaison est chiffré de bout en bout (SSL/TLS).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">3. Propriété intellectuelle</h3>
            <p>
              La marque <strong>FENY</strong>, le logo Feny, sa charte graphique, les expressions faciales, les poses et l'univers du mascot "Feny le fennec malin" ainsi que l'ensemble des textes originaux rédigés sur le site sont la propriété exclusive de Le Fennec Malin Sàrl. Toute reproduction sans accord écrit préalable est interdite.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">4. Limitation de responsabilité</h3>
            <p>
              Les simulations de primes d'assurance maladie sont fournies à titre purement informatif sur la base des données publiques de l'Office Fédéral de la Santé Publique (OFSP) extraites de <em>priminfo.admin.ch</em>. Bien que Feny s'efforce de maintenir ces données à jour avec la plus grande diligence helvétique, de légères divergences peuvent survenir selon les critères de souscription spécifiques des caisses.
            </p>
            <p>
              Les calculs de prévoyance (3ème pilier) constituent des projections financières basées sur des hypothèses de rendement et ne valent pas garantie de capital à terme. Seul le contrat d'assurance définitif signé avec l'assureur partenaire fait foi.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-display font-bold text-lg text-fennec-dark">5. Indépendance et neutralité</h3>
            <p>
              Conformément à l'esprit de notre mascotte, Le Fennec Malin est un comparateur indépendant. Nous n'avons aucune participation au capital d'un quelconque assureur ni d'obligation d'affaires exclusive. L'ordre d'affichage de nos tableaux est modifiable selon les critères du visiteur (Prix croissant, satisfaction client, ordre alphabétique).
            </p>
          </section>
        </div>
      </div>
    );
  }

  // Privacy Statement Mode
  return (
    <div className="bg-white rounded-3xl border border-fennec-cream p-8 md:p-12 space-y-8 max-w-4xl mx-auto shadow-sm">
      <div className="flex items-center space-x-4 border-b border-fennec-cream/40 pb-6">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Key className="w-8 h-8" />
        </div>
        <div>
          <h2 className="font-display font-black text-3xl text-fennec-dark">
            Politique de Confidentialité
          </h2>
          <p className="text-sm text-fennec-brown font-semibold">
            Protection stricte de vos données privées selon la nouvelle loi suisse (LPD)
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-fennec-dark/80 leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">1. Notre engagement de transparence</h3>
          <p>
            Chez Le Fennec Malin, nous accordons une importance capitale à la vie privée de nos utilisateurs suisses. En parfaite conformité avec la <strong>Nouvelle Loi fédérale sur la Protection des Données (nLPD)</strong> entrée en vigueur en Suisse, nous collectons vos données uniquement de manière légitime et transparente.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">2. Données collectées</h3>
          <p>
            Dans le cadre de l'utilisation de nos comparateurs d'assurance, nous pouvons recueillir les informations suivantes afin d'établir un devis ou une simulation :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Assurance Maladie :</strong> Canton de résidence, tranche d'âge (adulte, jeune adulte, enfant), franchise désirée, modèle d'assurance souhaité et couverture accident.</li>
            <li><strong>3ème Pilier :</strong> Âge, statut professionnel (salarié ou indépendant), montant annuel d'investissement visé et objectifs de prévoyance (rendement, garantie de capital, baisse d'impôts).</li>
            <li><strong>Demande d'offre personnalisée :</strong> Nom, prénom, adresse e-mail, code postal et numéro de téléphone pour validation et transmission du dossier à l'assureur sélectionné.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">3. Usage et transmission des données</h3>
          <p>
            Vos données personnelles de simulation ne sont **jamais** vendues ou louées à des tiers à des fins publicitaires. 
          </p>
          <p>
            Elles sont transmises **uniquement** à l'assureur ou au courtier agréé partenaire officiel que vous avez expressément mandaté en cliquant sur "Obtenir une offre gratuite" afin de finaliser votre devis. Sans cette démarche de votre part, vos données restent confinées à notre simulateur client de manière anonyme.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">4. Vos Droits d'accès et d'effacement</h3>
          <p>
            Conformément à la nLPD, vous disposez d'un droit total d'accès, de rectification et d'effacement de l'ensemble de vos données stockées chez nous. Vous pouvez adresser votre demande simple par courriel à : <strong className="text-fennec-dark">privacy@lefennecmalin.ch</strong>. Notre délégué à la protection des données traitera votre demande sous 48 heures ouvrées.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="font-display font-bold text-lg text-fennec-dark">5. Cookies et statistiques anonymes</h3>
          <p>
            Nous utilisons de légers cookies techniques indispensables pour mémoriser votre sélection cantonale ou vos filtres de comparaison lorsque vous naviguez entre nos onglets. Aucune traçabilité intrusive ou pixel publicitaire tiers n'est implanté à votre insu.
          </p>
        </section>
      </div>
    </div>
  );
}
