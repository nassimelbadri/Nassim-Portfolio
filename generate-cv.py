#!/usr/bin/env python3
"""
Resume PDF Generator for Nassim Elbadri
Creates a professional PDF resume from structured data
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib import colors
from reportlab.pdfgen import canvas
import os

# Output path
output_dir = "/home/nassim/Nassim-Portfolio/public/assets/documents"
output_file = os.path.join(output_dir, "Nassim_Elbadri_CV.pdf")

# Ensure directory exists
os.makedirs(output_dir, exist_ok=True)

# Create PDF
doc = SimpleDocTemplate(output_file, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch)
story = []

# Styles
styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=24,
    textColor=colors.HexColor('#1a1a1a'),
    spaceAfter=2,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

subtitle_style = ParagraphStyle(
    'Subtitle',
    parent=styles['Normal'],
    fontSize=11,
    textColor=colors.HexColor('#444444'),
    alignment=TA_CENTER,
    spaceAfter=4
)

section_style = ParagraphStyle(
    'SectionTitle',
    parent=styles['Heading2'],
    fontSize=13,
    textColor=colors.HexColor('#1a1a1a'),
    spaceAfter=6,
    spaceBefore=6,
    fontName='Helvetica-Bold',
    borderColor=colors.HexColor('#3b82f6'),
    borderWidth=1,
    borderPadding=4
)

body_style = ParagraphStyle(
    'BodyText',
    parent=styles['Normal'],
    fontSize=10,
    textColor=colors.HexColor('#333333'),
    spaceAfter=4,
    leading=12
)

bold_style = ParagraphStyle(
    'Bold',
    parent=styles['Normal'],
    fontSize=10,
    textColor=colors.HexColor('#1a1a1a'),
    fontName='Helvetica-Bold',
    spaceAfter=2
)

# Header
story.append(Paragraph("Nassim Elbadri", title_style))
story.append(Paragraph("Full-Stack Developer | AI & Cloud Enthusiast", subtitle_style))
story.append(Paragraph(
    "nassimelbadri19@gmail.com | 0698898618 | Fes, Morocco | "
    "<a href='https://linkedin.com/in/nassim-elbadri'>LinkedIn</a> | "
    "<a href='https://github.com/nassimelbadri'>GitHub</a> | "
    "<a href='https://nassim-portfolio-liard.vercel.app'>Portfolio</a>",
    subtitle_style
))
story.append(Spacer(1, 0.15*inch))

# Summary
story.append(Paragraph("SUMMARY", section_style))
story.append(Paragraph(
    "Full-Stack Developer passionate about building modern web applications, AI-powered solutions, and scalable digital products. "
    "Skilled in web development, cloud computing, and problem-solving through hands-on projects and continuous learning. "
    "Currently seeking internship and junior developer opportunities to contribute, learn, and grow in a professional environment.",
    body_style
))
story.append(Spacer(1, 0.1*inch))

# Skills
story.append(Paragraph("SKILLS", section_style))
skills_data = [
    ["Frontend", "Backend", "Tools & Platforms", "Technologies"],
    [
        "• HTML5\n• CSS3\n• JavaScript\n• UI/UX Design",
        "• PHP\n• MySQL\n• Database Design",
        "• Git & GitHub\n• Linux\n• AWS",
        "• Artificial Intelligence\n• Cloud Computing\n• Web Development"
    ]
]
skills_table = Table(skills_data, colWidths=[1.5*inch, 1.5*inch, 1.5*inch, 1.5*inch])
skills_table.setStyle(TableStyle([
    ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, 0), 10),
    ('BOTTOMPADDING', (0, 0), (-1, 0), 6),
    ('FONTSIZE', (0, 1), (-1, -1), 9),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white])
]))
story.append(skills_table)
story.append(Spacer(1, 0.1*inch))

# Projects
story.append(Paragraph("PROJECTS", section_style))

projects = [
    {
        "title": "Lumina Health",
        "date": "02/2026 – 05/2026",
        "desc": "AI-powered healthcare platform focused on health scoring, clinical interpretation, and intelligent healthcare workflows.",
        "tech": "Python, Databases, AI Concepts, Data Processing"
    },
    {
        "title": "Cafe Finder Fes",
        "date": "10/2025 – 01/2026",
        "desc": "Platform helping users discover and compare cafés across Fes through categorized listings and location-based experiences.",
        "tech": "HTML, CSS, JavaScript, UI/UX Design"
    },
    {
        "title": "Car Rental Management System",
        "date": "01/2025 – 02/2025",
        "desc": "Vehicle rental platform for reservations, customer management, and fleet operations.",
        "tech": "HTML, CSS, JavaScript, PHP, MySQL"
    }
]

for project in projects:
    story.append(Paragraph(f"<b>{project['title']}</b> <i style='float:right'>{project['date']}</i>", body_style))
    story.append(Paragraph(project['desc'], body_style))
    story.append(Paragraph(f"<b>Technologies:</b> {project['tech']}", body_style))
    story.append(Spacer(1, 0.08*inch))

story.append(Spacer(1, 0.05*inch))

# Education
story.append(Paragraph("EDUCATION", section_style))
story.append(Paragraph(
    "<b>Digital Development – Full-Stack Web Development</b> <i style='float:right'>09/2025 – 09/2027</i><br/>"
    "Institute of Digital Technologies, Fes, Morocco<br/>"
    "Focused on web development, databases, software engineering, and real-world project development.",
    body_style
))
story.append(Spacer(1, 0.1*inch))

# Certifications
story.append(Paragraph("CERTIFICATIONS", section_style))
certs = [
    "CS50 SQL (Harvard University) – Database design, SQL queries, joins, relationships, data modeling",
    "AWS Cloud Practitioner Essentials (Amazon Web Services) – Cloud fundamentals, AWS services, security",
    "Front-End Developer Professional Certificate (Meta) – Responsive web design, JavaScript, UI development",
    "Python for Data Science, AI & Development (IBM) – Python, data analysis, AI concepts",
    "Google Project Management (Google) – Project planning, Agile, risk management"
]

for cert in certs:
    story.append(Paragraph(f"• {cert}", body_style))

story.append(Spacer(1, 0.1*inch))

# Languages
story.append(Paragraph("LANGUAGES", section_style))
story.append(Paragraph(
    "• <b>Arabic</b> – Native<br/>"
    "• <b>French</b> – Professional Working Proficiency<br/>"
    "• <b>English</b> – Professional Working Proficiency<br/>"
    "• <b>German</b> – Basic Conversational Proficiency",
    body_style
))

# Build PDF
doc.build(story)

print(f"✅ PDF created successfully: {output_file}")
print(f"📊 File size: {os.path.getsize(output_file) / 1024:.2f} KB")
