const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || "*",
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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0VWM3BnL09JclJESUViU2xRM1Q0N20yQ3I0REFDckVqN3lSajlJT0tscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTXB2R29sNmZ3VHBNb3pXOXVkYVJQUjY0aGxjUkZJL3RrNC9DSkwwTi9IMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjSElyS1ZNSnBOUTJMOE5mM3licWxWbzg2R29naDQrYkwyK0dNU0ZoMlZzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJreTZidjg5UUVDS0lyNUVTc0lMR1N3b2x0R2twdXNHYytnUVpoVG4rNno0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9Ba283Q0JUU2NBOGRJaS80NGIxTm5ZMjVsUnk1YXVPbTg1SHExeWt5MmM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InIzaURxRXQrQ04yc2VBaU9xT0wvT2tlTzJVZFplKzlhd2tuSEtsU2IvV1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0dPcEExRzFIblpPOGFqMkVTRHZWUXZYeFZ0VlRsdytjaEI3aHB3azAxOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicGZNcStTQTc5SnlEMlFuek82OHBDYjJEOXQyRVZ5SHUrM0xHclpYZEduND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjR1OFA2ZE5mSjhnbWlnS0tMNVoyQUNaeGh4TGhXVEo3cXNCYTNlTGFDTnRyUFB3bXJTT2JrUVQ1NFFwWFo4ZEZPMjM0bk00UmljOUxVNkUveUtwaENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE1LCJhZHZTZWNyZXRLZXkiOiI0WGxjVjZ5T1c4aFZyc2U5Y0pQazY4ZVNkaVpIRjdGVks0Qks5c09iVy9RPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJCNTZOU0RCUSIsIm1lIjp7ImlkIjoiMjM0NzA0MDY5NDg0Nzo0MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJmYW1vdXNibGVzc2VkOCIsImxpZCI6IjIxMjUxOTg5NzU0Mjc0ODo0MUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xLbHNNb0ZFTFhIN01BR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ikt1KzExbkc1Y2VBRnBTS05EeDRaVGlFdXFHNGVkUGVJTmZIZjY5WHVUR0U9IiwiYWNjb3VudFNpZ25hdHVyZSI6InFWa24xT0VPeHBiZEN3WXBFUFBRMmxldVMzNWVxM3FQd0tuN256TjArL0FsVTk2eXV6Wk9SNW54ZlpEOWMwU1FwdlMrZlJMRXFzaXdLQW5taDlnNEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJCLzdWRnNpenVDbTFEd1gzdG9Ic1BqUVpyck5iZ01yb1NLbkJrQVZtOTVHUWkzK053RXY2Y28yWTl0Um1sOWlLY2s0VlFPOVErOFRzVS9FTXVJblZEdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDA2OTQ4NDc6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU3J2dGRaeHVYSGdCYVVpalE4ZUdVNGhMcWh1SG5UM2lEWHgzK3ZWN2t4aCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUFnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2NjA5MDkwLCJsYXN0UHJvcEhhc2giOiJubTNCYiJ9",
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
