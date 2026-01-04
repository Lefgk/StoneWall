#!/usr/bin/env node
/**
 * Stonewall Audit PDF Generator
 * Converts all markdown audit files to PDF with Stonewall branding
 */

const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

const AUDITS_DIR = __dirname;
const CSS_FILE = path.join(AUDITS_DIR, 'assets', 'pdf-style.css');

// Stonewall logo as base64 SVG for embedding
const LOGO_SVG = `<svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6B7280"/>
      <stop offset="100%" stop-color="#4B5563"/>
    </linearGradient>
    <linearGradient id="gg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="100%" stop-color="#C9A227"/>
    </linearGradient>
  </defs>
  <g transform="translate(0, 5)">
    <rect x="2" y="15" width="32" height="18" rx="2" fill="url(#wg)"/>
    <rect x="2" y="6" width="9" height="12" rx="1" fill="url(#wg)"/>
    <rect x="25" y="6" width="9" height="12" rx="1" fill="url(#wg)"/>
    <rect x="2" y="3" width="3" height="5" fill="url(#wg)"/>
    <rect x="8" y="3" width="3" height="5" fill="url(#wg)"/>
    <rect x="25" y="3" width="3" height="5" fill="url(#wg)"/>
    <rect x="31" y="3" width="3" height="5" fill="url(#wg)"/>
    <circle cx="18" cy="11" r="5" fill="url(#gg)"/>
  </g>
  <text x="45" y="28" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#374151">Stone</text>
  <text x="109" y="28" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#D4AF37">wall</text>
  <text x="45" y="42" font-family="Arial, sans-serif" font-size="9" fill="#6B7280">Smart Contract Security</text>
</svg>`;

const LOGO_BASE64 = Buffer.from(LOGO_SVG).toString('base64');

async function generatePdf(mdFile) {
  const fileName = path.basename(mdFile, '.md');
  const pdfFile = path.join(AUDITS_DIR, `${fileName}.pdf`);

  console.log(`Converting: ${fileName}.md -> ${fileName}.pdf`);

  try {
    // Read the markdown content
    let content = fs.readFileSync(mdFile, 'utf8');

    // Add logo header at the top
    const header = `<div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #D4AF37;">
  <img src="data:image/svg+xml;base64,${LOGO_BASE64}" style="height: 50px;" alt="Stonewall"/>
</div>\n\n`;

    content = header + content;

    // Read CSS
    const css = fs.existsSync(CSS_FILE) ? fs.readFileSync(CSS_FILE, 'utf8') : '';

    const pdf = await mdToPdf(
      { content },
      {
        stylesheet: CSS_FILE,
        pdf_options: {
          format: 'A4',
          margin: {
            top: '20mm',
            bottom: '25mm',
            left: '15mm',
            right: '15mm'
          },
          printBackground: true,
          displayHeaderFooter: true,
          headerTemplate: '<div></div>',
          footerTemplate: `<div style="width: 100%; font-size: 9px; padding: 10px 20px; color: #6B7280; display: flex; justify-content: space-between;">
            <span>Stonewall Security Audit</span>
            <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
          </div>`
        },
        launch_options: {
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    );

    if (pdf) {
      fs.writeFileSync(pdfFile, pdf.content);
      console.log(`  ✓ Created: ${fileName}.pdf`);
      return true;
    }
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('\n🏰 Stonewall Audit PDF Generator\n');
  console.log('─'.repeat(40));

  // Find all markdown files in audits directory
  const files = fs.readdirSync(AUDITS_DIR)
    .filter(f => f.endsWith('.md') && f !== 'README.md')
    .map(f => path.join(AUDITS_DIR, f));

  console.log(`Found ${files.length} audit files\n`);

  let success = 0;
  let failed = 0;

  for (const file of files) {
    if (await generatePdf(file)) {
      success++;
    } else {
      failed++;
    }
  }

  console.log('\n' + '─'.repeat(40));
  console.log(`Done! ✓ ${success} converted, ✗ ${failed} failed\n`);
}

main().catch(console.error);
