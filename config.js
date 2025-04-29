const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0Y2L0UycWVOK2dUOVh2d3lrYUI2cGc2bGdIQ3p6bm1XWFNrVk1VYXcwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmU1MzMzMU8zWFp1ZnliclVrMUxRU08vRWRha0xKcC8wbWZHcjdjaWZuVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4R2dKMjA1UzRuSWJNZUEycVNqUGE1NXFMYVJLZjZLckhscmtSSWhyNEhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5NGg3SkFlU2hrbXpRcU9hc3ozYVdBM0ZySm5mOTBNQitiT3FhM1NkYWhrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNEaHExMUxVQTl5blpSZkY5aVBPNklhV0dBU3VBYW0xU1YrNmlxTllTbU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVmbnpDeHBSNURDV3hHWVYxakMrL0hMSkxqMERoZEtNSUdDR2h6TjFZMUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia05HV1c2dDZadFdvMDIzTWpwVnZ5d3lCSUIweFdaNzR5YVlUWCt5K3FHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVHFFL0k5Vkg0cWYyTWk0a0dVU3g4Z3EySldLeml0dWlLR251bi9NZWdTWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpMNFJINXE4VkxDNFdhWTBSVXFiVkxUcW4zS1YyZElsQlBUUnJOZDRzdkUrMmVBN1NRL3F0WFhrM0FWNWhmWDArM2VkMjVpZnlQcDNpNHdRMjhTbWp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk2LCJhZHZTZWNyZXRLZXkiOiJBUS90SjRkVnBFbGlpWUVJcmxYRWpjZGFJeGNkMkRyMlUwaEFQMmU1S3JRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJBM0hFS1I0QSIsIm1lIjp7ImlkIjoiMjM0NzA0MDY5NDg0Nzo0MEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJmYW1vdXNibGVzc2VkOCIsImxpZCI6IjIxMjUxOTg5NzU0Mjc0ODo0MEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xLbHNNb0ZFS21LdzhBR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikt1KzExbkc1Y2VBRnBTS05EeDRaVGlFdXFHNGVkUGVJTmZIZjY5WHVUR0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlMxTWduVHBHQXRWaTk0aHhkT2pWa1dHRFBqRU9QWERSeFdMY292WXVLWVhSU0xpUVMraUlycGtWdzJtUjFBRWtJRXlzM21YbzB3a3B5ZGM2OGxRbEFBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJyL29lUEVEVC9rMUtTM0xkU3I1NEoxNWwyNmI1a0hUcHZVaktIbForYldOVHE0cFI2YW9VZU5pZjR1OTNLTlgxOUF6QjkrdjlhcEs1TkJjNndZMDhpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDA2OTQ4NDc6NDBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU3J2dGRaeHVYSGdCYVVpalE4ZUdVNGhMcWh1SG5UM2lEWHgzK3ZWN2t4aCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1OTI5NTI3LCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
