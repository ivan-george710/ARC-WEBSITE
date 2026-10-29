import sharp from 'sharp';
// Derivatives of the official source asset; logo geometry is never redrawn.
const source = 'public/brand/logo-white.png';
await sharp(source).resize(128,128,{fit:'contain'}).png().toFile('app/icon.png');
await sharp(source).resize(180,180,{fit:'contain'}).png().toFile('app/apple-icon.png');
const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g"><stop stop-color="#38200d"/><stop offset="1" stop-color="#050506"/></radialGradient></defs><rect width="1200" height="630" fill="url(#g)"/><text x="530" y="310" font-size="140" font-family="Arial" fill="#f4f1ea">ARC</text><text x="530" y="370" font-size="26" font-family="Arial" fill="#ff8a1f">Built around change.</text></svg>`);
await sharp(background).composite([{input: await sharp(source).resize(240,257).toBuffer(),left:240,top:170}]).png().toFile('public/brand/og.png');
