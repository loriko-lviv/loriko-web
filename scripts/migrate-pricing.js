/**
 * Migration: pricing/services document → new PricingState shape
 *
 * Old shape (v1):
 *   { prices: Record<string, string> }
 *
 * New shape (v2):
 *   {
 *     prices:  Record<string, string>   // unchanged
 *     removed: string[]                 // NEW – ids of removed catalog items
 *     custom:  CustomItem[]             // NEW – user-added positions
 *   }
 *
 * The migration is safe to run multiple times (idempotent):
 *   - If `removed` / `custom` already exist, they are left untouched.
 *   - If the document does not exist yet `prices` is initialised from the
 *     hard-coded catalog defaults so the public price list still renders.
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=loriko-service-key.json \
 *     node scripts/migrate-pricing.js
 *
 *   -- or with an explicit key path --
 *   node scripts/migrate-pricing.js --key loriko-service-key.json
 *
 *   -- dry-run (reads & prints, does not write) --
 *   node scripts/migrate-pricing.js --dry-run
 */

/* eslint-disable no-console */
"use strict";

const admin = require("firebase-admin");
const path = require("path");

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const keyIndex = args.indexOf("--key");
const isDryRun = args.includes("--dry-run");

const keyPath =
  keyIndex !== -1
    ? path.resolve(args[keyIndex + 1])
    : path.resolve(__dirname, "../loriko-service-key.json");

// ─── Catalog defaults (mirrors services-catalog.ts) ─────────────────────────
// Used only when the document does not exist yet, to pre-populate prices.

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
      { title: "Гігієнічна чиста обличчя для всіх типів шкіри", price: "900" },
      { title: "Гіг. чистка + пілінг по типу шкіри", price: "1200" },
      { title: "Гіг. чистка спини", price: "1600" },
      { title: "Пілінги: мигдалевий, азелаїновий, відбілюючий", price: "850" },
      {
        title: "Серединний пілінг YELLOW PEEL (SIMILDIET Іспанія)",
        price: "1350",
      },
      { title: "Карбоксітерапія від LAMIC", price: "1100" },
      { title: "Серединний пілінг PRX Т-33", price: "1800" },
      { title: "Мікродермобразія обличчя", price: "1000" },
      {
        title: "Мікродермобразія обличчя + пілінг по типу шкіри",
        price: "1500",
      },
      {
        title:
          "Догляд за обличчям ANTI-AGE з фонофорезом і ампульними сироватками (апаратна методика)",
        price: "1400",
      },
      { title: "Процедура з екзосомами SSEDAM ", price: "2300" },
      { title: "Класичний масаж обличчя ", price: "700" },
      { title: "Лівтинговий, лімфодренажний масаж обличчя", price: "700" },
      { title: "Терапія мікротоками + догляд по типу шкіри", price: "1500" },
      {
        title: "Мезотерапія кисті рук (препаратами SIMILDIET Іспанія)",
        price: "900",
      },
      {
        title: "Мезотерапія волосистої частини голови HAIR + REVITALIZING",
        price: "1000",
      },
      {
        title: "Мезотерапія волосистої частини голови Plinest (2ml)",
        price: "5000",
      },
      {
        title: "Мезотерапія полінуклеотидами препаратом VITARAN (2ml)",
        price: "4300",
      },
      {
        title: "Мезотерапія препаратом FILL UP (INNOAESTHETICS)",
        price: "1800",
      },
      {
        title: "Мезотерапія препаратом HYDRO DELUXE (NEAUVIA) (2.5 ml)",
        price: "4300",
      },
      {
        title: "Мезотерапія зони навколо очей препаратом REJURAN 1 (1ml)",
        price: "3400",
      },
      {
        title: "Аугментація губ INTENSE LIPS (NEAUVIA) (1x1 ml)",
        price: "6000",
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
          { title: "пахви", price: "10000" },
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

  if (!snap.exists) {
    console.log("  Document does not exist. Creating with catalog defaults.");

    const newDoc = {
      prices: buildDefaultPrices(),
      removed: [],
      custom: [],
    };

    console.log(`  prices: ${Object.keys(newDoc.prices).length} entries`);
    console.log("  removed: []");
    console.log("  custom:  []");

    if (isDryRun) {
      console.log("\n[DRY RUN] No write performed.");
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
    `    removed: ${Array.isArray(data.removed) ? data.removed.length + " entries (already migrated)" : "missing"}`,
  );
  console.log(
    `    custom:  ${Array.isArray(data.custom) ? data.custom.length + " entries (already migrated)" : "missing"}`,
  );

  const alreadyMigrated =
    Array.isArray(data.removed) && Array.isArray(data.custom);

  if (alreadyMigrated) {
    console.log("\n✓ Document is already on v2 schema. Nothing to do.");
    return;
  }

  // Build the update payload — only set the missing fields via merge
  const update = {};
  if (!Array.isArray(data.removed)) update.removed = [];
  if (!Array.isArray(data.custom)) update.custom = [];

  console.log("\nFields to add:", Object.keys(update));

  if (isDryRun) {
    console.log("[DRY RUN] No write performed.");
  } else {
    await docRef.set(update, { merge: true });
    console.log("\n✓ Migration complete. Document is now on v2 schema.");
  }
}

migrate().catch((err) => {
  console.error("\n✗ Migration failed:", err.message);
  process.exit(1);
});
