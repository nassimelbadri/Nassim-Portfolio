#!/usr/bin/env python3
"""
Simple Resume PDF Generator using fpdf2
"""
import sys
import os

try:
    from fpdf import FPDF
except ImportError:
    print("fpdf2 not installed. Installing...")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2", "-q"])
    from fpdf import FPDF

output_dir = "/home/nassim/Nassim-Portfolio/public/assets/documents"
output_file = os.path.join(output_dir, "Nassim_Elbadri_CV.pdf")
os.makedirs(output_dir, exist_ok=True)

pdf = FPDF()
pdf.add_page()
pdf.set_font("Helvetica", "B", 20)
pdf.cell(0, 10, "Nassim Elbadri", ln=True, align="C")

pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 5, "Full-Stack Developer | AI & Cloud Enthusiast", ln=True, align="C")
pdf.cell(0, 5, "nassimelbadri19@gmail.com | 0698898618 | Fes, Morocco", ln=True, align="C")
pdf.cell(0, 5, "linkedin.com/in/nassim-elbadri | github.com/nassimelbadri", ln=True, align="C")
pdf.ln(5)

# Summary
pdf.set_font("Helvetica", "B", 12)
pdf.cell(0, 8, "SUMMARY", ln=True)
pdf.set_font("Helvetica", "", 10)
summary_text = ("Full-Stack Developer passionate about building modern web applications, AI-powered solutions, and scalable digital "
                "products. Skilled in web development, cloud computing, and problem-solving through hands-on projects and continuous "
                "learning. Currently seeking internship and junior developer opportunities.")
pdf.multi_cell(0, 5, summary_text)
pdf.ln(3)

# Skills
pdf.set_font("Helvetica", "B", 12)
pdf.cell(0, 8, "SKILLS", ln=True)
pdf.set_font("Helvetica", "", 10)
pdf.cell(0, 4, "HTML5, CSS3, JavaScript, PHP, MySQL, Git & GitHub, Linux, Artificial Intelligence, Cloud Computing, UI/UX Design", ln=True)
pdf.ln(3)

# Projects
pdf.set_font("Helvetica", "B", 12)
pdf.cell(0, 8, "PROJECTS", ln=True)
pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 5, "Lumina Health (02/2026 - 05/2026)", ln=True)
pdf.set_font("Helvetica", "", 9)
pdf.multi_cell(0, 4, "AI-powered healthcare platform focused on health scoring, clinical interpretation, and intelligent workflows.\nTechnologies: Python, Databases, AI Concepts, Data Processing")
pdf.ln(2)

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 5, "Cafe Finder Fes (10/2025 - 01/2026)", ln=True)
pdf.set_font("Helvetica", "", 9)
pdf.multi_cell(0, 4, "Platform helping users discover and compare cafes across Fes through categorized listings.\nTechnologies: HTML, CSS, JavaScript, UI/UX Design")
pdf.ln(2)

pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 5, "Car Rental Management System (01/2025 - 02/2025)", ln=True)
pdf.set_font("Helvetica", "", 9)
pdf.multi_cell(0, 4, "Vehicle rental platform for reservations, customer management, and fleet operations.\nTechnologies: HTML, CSS, JavaScript, PHP, MySQL")
pdf.ln(3)

# Education
pdf.set_font("Helvetica", "B", 12)
pdf.cell(0, 8, "EDUCATION", ln=True)
pdf.set_font("Helvetica", "B", 10)
pdf.cell(0, 5, "Digital Development - Full-Stack Web Development (09/2025 - 09/2027)", ln=True)
pdf.set_font("Helvetica", "", 9)
pdf.multi_cell(0, 4, "Institute of Digital Technologies, Fes, Morocco\nFocused on web development, databases, software engineering, and real-world projects")
pdf.ln(3)

# Certifications
pdf.set_font("Helvetica", "B", 12)
pdf.cell(0, 8, "CERTIFICATIONS", ln=True)
pdf.set_font("Helvetica", "", 9)
certs = [
    "CS50 SQL (Harvard) - Database design, SQL, queries, joins, relationships",
    "AWS Cloud Practitioner Essentials - Cloud fundamentals, AWS services, security",
    "Front-End Developer Professional Certificate (Meta) - Responsive design, JavaScript",
    "Python for Data Science, AI & Development (IBM) - Python, AI, data analysis",
    "Google Project Management - Planning, Agile, risk management"
]
for cert in certs:
    pdf.multi_cell(0, 4, f"• {cert}")
pdf.ln(2)

# Languages
pdf.set_font("Helvetica", "B", 12)
pdf.cell(0, 8, "LANGUAGES", ln=True)
pdf.set_font("Helvetica", "", 9)
pdf.cell(0, 4, "Arabic (Native) | French (Professional) | English (Professional) | German (Basic)", ln=True)

# Save PDF
pdf.output(output_file)
print(f"✅ PDF successfully created: {output_file}")
print(f"📊 File size: {os.path.getsize(output_file) / 1024:.2f} KB")
