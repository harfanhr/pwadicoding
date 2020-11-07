let webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BPSG1ptDTEEhjFv-bNZqUzU4UkMdUNydj2Wnt60Bxgz-xz_6UyDizCLtX9GQAufZTV1qohLST0iUijLJ3man_mE",
   "privateKey": "fm18xf0IJTHqBcs95BxBzSPbYQM7qIEfk7tEDSAzCqo"
};


webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fKVvNmNoP7Y:APA91bF36ZMwRGhB3MBbQGcxTJUd7g_9On5LA09ILM-aDOExh0t9l17b-20xR2KOl0S5d8VgyaSbC9hZgqpPMhPGCbzgg5fQX2zxhJY3nhCWkV8rpjbkGvbz8vyFY-vfxaBgxeJZWCcR",
   "keys": {
       "p256dh": "BPLdHIHtCSyyt5MVpNdYBFomjUBNhvSaEHVz9JGVcNgvkKXnkw91GLlwWM8K8w4l3AINGAINcajqxPUMRFXfQio=",
       "auth": "rk7mjAzVLM8JFHJci7ySEg=="
   }
};
let payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

let options = {
   gcmAPIKey: '1061150061275',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
