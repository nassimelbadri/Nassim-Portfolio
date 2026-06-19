const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public/assets/documents');
const outputFile = path.join(outputDir, 'Nassim_Elbadri_CV.pdf');

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create PDF
const doc = new PDFDocument({
  size: 'Letter',
  margin: 36
});

// Pipe to file
const stream = fs.createWriteStream(outputFile);
doc.pipe(stream);

// Header
doc.fontSize(24).font('Helvetica-Bold').text('Nassim Elbadri', { align: 'center' });
doc.fontSize(11).font('Helvetica').text('Full-Stack Developer | AI & Cloud Enthusiast', { align: 'center' });
doc.fontSize(9).text('nassimelbadri19@gmail.com | 0698898618 | Fes, Morocco', { align: 'center' });
doc.text('linkedin.com/in/nassim-elbadri | github.com/nassimelbadri', { align: 'center' });
doc.moveDown(0.3);

// Summary
doc.fontSize(12).font('Helvetica-Bold').text('SUMMARY', { underline: true });
doc.fontSize(10).font('Helvetica').text(
  'Full-Stack Developer passionate about building modern web applications, AI-powered solutions, and scalable digital products. ' +
  'Skilled in web development, cloud computing, and problem-solving through hands-on projects and continuous learning. ' +
  'Currently seeking internship and junior developer opportunities to contribute, learn, and grow in a professional environment.',
  { align: 'left' }
);
doc.moveDown(0.2);

// Skills
doc.fontSize(12).font('Helvetica-Bold').text('SKILLS', { underline: true });
doc.fontSize(9).font('Helvetica').text(
  'HTML5, CSS3, JavaScript, PHP, MySQL, Git & GitHub, Linux, Artificial Intelligence, Cloud Computing, UI/UX Design'
);
doc.moveDown(0.2);

// Projects
doc.fontSize(12).font('Helvetica-Bold').text('PROJECTS', { underline: true });

const projects = [
  {
    title: 'Lumina Health',
    date: '02/2026 – 05/2026',
    desc: 'AI-powered healthcare platform focused on health scoring, clinical interpretation, and intelligent healthcare workflows.',
    tech: 'Python, Databases, AI Concepts, Data Processing'
  },
  {
    title: 'Cafe Finder Fes',
    date: '10/2025 – 01/2026',
    desc: 'Platform helping users discover and compare cafés across Fes through categorized listings and location-based experiences.',
    tech: 'HTML, CSS, JavaScript, UI/UX Design'
  },
  {
    title: 'Car Rental Management System',
    date: '01/2025 – 02/2025',
    desc: 'Vehicle rental platform for reservations, customer management, and fleet operations.',
    tech: 'HTML, CSS, JavaScript, PHP, MySQL'
  }
];

projects.forEach(project => {
  doc.fontSize(10).font('Helvetica-Bold').text(`${project.title} (${project.date})`);
  doc.fontSize(9).font('Helvetica').text(project.desc);
  doc.text(`Technologies: ${project.tech}`, { oblique: true });
  doc.moveDown(0.15);
});

// Education
doc.fontSize(12).font('Helvetica-Bold').text('EDUCATION', { underline: true });
doc.fontSize(10).font('Helvetica-Bold').text('Digital Development – Full-Stack Web Development (09/2025 – 09/2027)');
doc.fontSize(9).font('Helvetica').text(
  'Institute of Digital Technologies, Fes, Morocco. Focused on web development, databases, software engineering, and real-world project development.'
);
doc.moveDown(0.2);

// Certifications
doc.fontSize(12).font('Helvetica-Bold').text('CERTIFICATIONS', { underline: true });
const certs = [
  'CS50 SQL (Harvard) - Database design, SQL queries, joins, relationships',
  'AWS Cloud Practitioner Essentials - Cloud fundamentals, AWS services, security',
  'Front-End Developer Professional Certificate (Meta) - Responsive design, JavaScript, UI',
  'Python for Data Science, AI & Development (IBM) - Python programming, AI concepts',
  'Google Project Management - Project planning, Agile methodologies'
];

certs.forEach(cert => {
  doc.fontSize(9).font('Helvetica').text(`• ${cert}`, { characterSpacing: 0.5 });
});
doc.moveDown(0.2);

// Languages
doc.fontSize(12).font('Helvetica-Bold').text('LANGUAGES', { underline: true });
doc.fontSize(9).font('Helvetica').text('Arabic (Native) | French (Professional) | English (Professional) | German (Basic)');

// Finalize
doc.end();

stream.on('finish', () => {
  const fileSize = fs.statSync(outputFile).size;
  console.log(`✅ PDF created successfully: ${outputFile}`);
  console.log(`📊 File size: ${(fileSize / 1024).toFixed(2)} KB`);
});

stream.on('error', (err) => {
  console.error('Error creating PDF:', err);
  process.exit(1);
});
