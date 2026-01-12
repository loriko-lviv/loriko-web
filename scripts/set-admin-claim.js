/* eslint-disable no-console */
const admin = require('firebase-admin');

const args = process.argv.slice(2);
const emailIndex = args.indexOf('--email');
const adminIndex = args.indexOf('--admin');
const email = emailIndex !== -1 ? args[emailIndex + 1] : '';
const adminFlagRaw = adminIndex !== -1 ? args[adminIndex + 1] : 'true';
const adminFlag = adminFlagRaw !== 'false';

if (!email) {
  console.error('Usage: node scripts/set-admin-claim.js --email you@example.com [--admin true|false]');
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

admin
  .auth()
  .getUserByEmail(email)
  .then((user) => admin.auth().setCustomUserClaims(user.uid, {admin: adminFlag}))
  .then(() => {
    console.log(`Admin claim set to ${adminFlag} for ${email}.`);
  })
  .catch((error) => {
    console.error('Failed to set admin claim:', error.message);
    process.exit(1);
  });
