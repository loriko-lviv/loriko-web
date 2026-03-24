/**
 * Migration: pricing/services document → new PricingState shape
 *
 * Old shape (v1):
 *   { prices: Record<string, string> }
 *
 * New shape (v2):
 *   {
 *     prices:  Record<string, string>   // price overrides by item id
 *     removed: string[]                 // ids of removed catalog items
 *     custom:  CustomItem[]             // user-added positions
 *   }
 *
 * The migration is safe to run multiple times (idempotent):
 *   - If `removed` / `custom` already exist, they are left untouched.
 *   - If the document does not exist yet, `prices` is initialised from the
 *     catalog defaults so the public price list renders correctly.
 *
 * Usage:
 *   node scripts/migrate-pricing.js
 *   node scripts/migrate-pricing.js --dry-run
 *   node scripts/migrate-pricing.js --reset-prices      ← overwrite prices with new catalog defaults
 *   node scripts/migrate-pricing.js --key loriko-service-key.json
 */

/* eslint-disable no-console */
"use strict";

const admin = require("firebase-admin");
const path = require("path");

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const keyIndex = args.indexOf("--key");
const isDryRun = args.includes("--dry-run");
const resetPrices = args.includes("--reset-prices");

const keyPath =
  keyIndex !== -1
    ? path.resolve(args[keyIndex + 1])
    : path.resolve(__dirname, "../loriko-service-key.json");

// ─── Catalog defaults (mirrors services-catalog.ts) ─────────────────────────

const SERVICES_CATALOG = [
  {
    type: "Отоларинголога",
    list: [
      {
        title: "Консультація отоларинголога провідного спеціаліста",
        price: "950",
      },
      {
        title: "Повторна консультація отоларинголога провідного спеціаліста",
        price: "800",
      },
      { title: "Консультація отоларинголога", price: "800" },
      { title: "Повторна консультація отоларинголога", price: "650" },
      {
        title: "Консультація отоларинголога провідного спеціаліста зі знижкою",
        price: "800",
      },
      { title: "Консультація отоларинголога зі знижкою", price: "650" },
      {
        title:
          "Тимпанометрія (визначення стану слухової труби і середнього вуха)",
        price: "350",
      },
      { title: "Проколювання вух System 75 (з сережками)", price: "1000" },
      {
        title: "Видалення стороннього тіла з ЛОР органів",
        list: [
          { title: "I рівня складності", price: "800" },
          { title: "II рівня складності", price: "1000" },
        ],
      },
      { title: "Промивання носової порожнини по Проетцу", price: "300" },
      {
        title: "Туалет слухового ходу (при гнійних захворюваннях вух)",
        price: "350",
      },
      { title: "Промивання лакун мигдаликів", price: "450" },
      {
        title: "Промивання лакун мигдаликів + фонофорез на підщелепову ділянку",
        price: "500",
      },
      {
        title: "Вимивання сірчаного корка",
        list: [
          { title: "1 вухо", price: "450" },
          { title: "2 вуха", price: "550" },
        ],
      },
      {
        title:
          "Продування вух балоном Політцера + масаж барабанної перетинки + фонофорез лідази",
        price: "450",
      },
      { title: "Парацентез (розріз барабанної перетинки)", price: "1400" },
      { title: "Репозиція кісток носа з місцевим знечуленням", price: "1500" },
      { title: "Забір матеріалу на гістологічне обстеження", price: "500" },
      { title: "Видалення кист мигдалика", price: "1000" },
      { title: "Пункція гайморової пазухи", price: "1500" },
      { title: "Підслизова кобляційна вазотомія", price: "12500" },
    ],
  },
  {
    type: "Косметолога",
    list: [
      {
        title: "Гігієнічна чистка обличчя для всіх типів шкіри",
        price: "1000",
      },
      { title: "Гіг. чистка + пілінг по типу шкіри", price: "1300" },
      { title: "Гіг. чистка спини", price: "1600" },
      {
        title: "Пілінги (мигдалевий / азелаїновий / відбілюючий)",
        price: "900",
      },
      {
        title: "Серединний пілінг YELLOW PEEL (SIMILDIET Іспанія)",
        price: "1800",
      },
      { title: "Карбоксітерапія від LAMIC", price: "1500" },
      { title: "Серединний пілінг PRX T-33", price: "1800" },
      { title: "Серединний пілінг PRX T-33+", price: "2100" },
      { title: "Мікродермоабразія обличчя", price: "1200" },
      {
        title: "Мікродермоабразія обличчя + пілінг по типу шкіри",
        price: "1600",
      },
      {
        title:
          "Догляд за обличчям ANTI-AGE з фонофорезом і ампульними сироватками",
        price: "1700",
      },
      { title: "Процедура з екзосомами SSEDAM", price: "2400" },
      { title: "Класичний масаж обличчя", price: "800" },
      { title: "Ліфтинговий, лімфодренажний масаж обличчя", price: "800" },
      { title: "Терапія мікротоками + догляд по типу шкіри", price: "1700" },
      {
        title: "Мезотерапія волосистої частини голови Plinest (2 ml)",
        price: "5000",
      },
      {
        title: "Мезотерапія полінуклеотидами препаратом VITARAN (2 ml)",
        price: "5000",
      },
      {
        title: "Мезотерапія полінуклеотидами препаратом Plinest (2 ml)",
        price: "5000",
      },
      {
        title: "Мезотерапія полінуклеотидами препаратом Plinest NEWEST (2 ml)",
        price: "5300",
      },
      {
        title:
          "Терапія Lift UP (полінуклеотиди Plinest 2 ml + пілінг MCA 35-1 ml)",
        price: "6000",
      },
      {
        title: "Мезотерапія препаратом FILL UP (INNOAESTHETICS)",
        price: "2000",
      },
      {
        title: "Мезотерапія препаратом HYDRO DELUXE (NEAUVIA) (2.5 ml)",
        price: "4700",
      },
      {
        title:
          "Біоревіталізація препаратом SKIN BOOSTER HA20 (2 ml), безболісний метод 5 вколів",
        price: "4300",
      },
      {
        title: "Мезотерапія зони навколо очей препаратом REJURAN I (1 ml)",
        price: "3600",
      },
      {
        title: "Аугментація губ INTENSE LIPS (NEAUVIA) (1x1 ml)",
        price: "6500",
      },
      {
        title: "Плазмотерапія",
        list: [
          { title: "обличчя", price: "1700" },
          { title: "волосистої частини голови", price: "1400" },
          { title: "кисті рук", price: "1200" },
          { title: "обличчя, шия, декольте", price: "2800" },
        ],
      },
      {
        title: "Ботулінотерапія: препарат : NEURONOX (MEDYTOX):",
        list: [
          { title: "ділянка міжбрів\u02bcя (16-20од.)", price: "1900-2250" },
          { title: "чоло (36-40од.)", price: "3400-3700" },
          { title: "«гусячі лапки» (24од.)", price: "2700" },
          { title: "пахви", price: "8000" },
        ],
      },
    ],
  },
];

/**
 * Build the flat prices map from the catalog defaults.
 * Mirrors the TypeScript buildServicesWithIds / extractPrices logic.
 */
function buildDefaultPrices() {
  const prices = {};
  const visitItem = (item, id) => {
    if (item.price !== undefined) {
      prices[id] = item.price;
    }
    if (item.list) {
      item.list.forEach((child, ci) => visitItem(child, `${id}-${ci}`));
    }
  };
  SERVICES_CATALOG.forEach((service, si) => {
    service.list.forEach((item, ii) => visitItem(item, `${si}-${ii}`));
  });
  return prices;
}

// ─── Migration ───────────────────────────────────────────────────────────────

async function migrate() {
  admin.initializeApp({
    credential: admin.credential.cert(require(keyPath)),
  });

  const db = admin.firestore();
  const docRef = db.doc("pricing/services");

  console.log("Reading current document at pricing/services …");
  const snap = await docRef.get();

  const defaultPrices = buildDefaultPrices();
  console.log(
    `  Catalog default prices: ${Object.keys(defaultPrices).length} entries`,
  );

  if (!snap.exists) {
    console.log("  Document does not exist. Creating with catalog defaults.");

    const newDoc = {
      prices: defaultPrices,
      removed: [],
      custom: [],
    };

    if (isDryRun) {
      console.log(
        "\n[DRY RUN] Would create document with",
        Object.keys(newDoc.prices).length,
        "prices.",
      );
    } else {
      await docRef.set(newDoc);
      console.log("\n✓ Document created successfully.");
    }
    return;
  }

  const data = snap.data();
  console.log("  Document exists.");
  console.log(`    prices:  ${Object.keys(data.prices || {}).length} entries`);
  console.log(
    `    removed: ${Array.isArray(data.removed) ? data.removed.length + " entries" : "missing"}`,
  );
  console.log(
    `    custom:  ${Array.isArray(data.custom) ? data.custom.length + " entries" : "missing"}`,
  );

  const alreadyMigrated =
    Array.isArray(data.removed) && Array.isArray(data.custom);

  if (alreadyMigrated && !resetPrices) {
    console.log("\n✓ Document is already on v2 schema.");
    console.log(
      "  To overwrite prices with new catalog defaults, run with --reset-prices.",
    );
    return;
  }

  // Build update payload
  const update = {};

  if (!Array.isArray(data.removed)) update.removed = [];
  if (!Array.isArray(data.custom)) update.custom = [];

  if (resetPrices) {
    // Merge: keep any custom-item price overrides, reset all catalog item prices
    const existingCustomPrices = {};
    if (Array.isArray(data.custom)) {
      data.custom.forEach((c) => {
        if (data.prices && data.prices[c.id] !== undefined) {
          existingCustomPrices[c.id] = data.prices[c.id];
        }
      });
    }
    update.prices = { ...defaultPrices, ...existingCustomPrices };
    console.log(
      `\n  Resetting prices to catalog defaults (${Object.keys(defaultPrices).length} entries).`,
    );
    if (Object.keys(existingCustomPrices).length) {
      console.log(
        `  Preserving ${Object.keys(existingCustomPrices).length} custom-item price(s).`,
      );
    }
  }

  const fieldsChanged = Object.keys(update);
  if (fieldsChanged.length === 0) {
    console.log("\n✓ Nothing to update.");
    return;
  }

  console.log("\nFields to update:", fieldsChanged);

  if (isDryRun) {
    console.log("[DRY RUN] No write performed.");
  } else {
    await docRef.set(update, { merge: true });
    console.log("\n✓ Migration complete.");
  }
}

migrate().catch((err) => {
  console.error("\n✗ Migration failed:", err.message);
  process.exit(1);
});
