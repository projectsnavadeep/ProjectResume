import React from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

const ExportButtons = ({ resumeData, selectedTemplate }) => {
  const getFileName = () => {
    const name = resumeData.fullName || 'Resume';
    return name.replace(/\s+/g, '_');
  };

  const exportToPDF = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: [10, 10],
      filename: `${getFileName()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const exportToHTML = () => {
    const element = document.getElementById('resume-preview');
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resumeData.fullName || 'Resume'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
    @media print {
      body { margin: 0; padding: 20px; }
    }
  </style>
</head>
<body>
  ${element.innerHTML}
</body>
</html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${getFileName()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportToDOCX = async () => {
    const sections = [];
    
    // Header
    sections.push(
      new Paragraph({
        text: resumeData.fullName || 'YOUR NAME',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
      })
    );
    
    if (resumeData.email || resumeData.phone) {
      sections.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: `${resumeData.email || ''} ${resumeData.email && resumeData.phone ? '| ' : ''}${resumeData.phone || ''}`,
              size: 20,
            }),
          ],
        })
      );
    }
    
    sections.push(new Paragraph({ text: '' }));
    
    // Objective
    if (resumeData.objective) {
      sections.push(
        new Paragraph({
          text: 'OBJECTIVE',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          text: resumeData.objective,
        }),
        new Paragraph({ text: '' })
      );
    }
    
    // Education
    if (resumeData.education.some(e => e.degree || e.institution)) {
      sections.push(
        new Paragraph({
          text: 'EDUCATION',
          heading: HeadingLevel.HEADING_2,
        })
      );
      
      resumeData.education.forEach(edu => {
        if (edu.degree || edu.institution) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree || '', bold: true }),
                new TextRun({ text: edu.year ? `  |  ${edu.year}` : '' }),
              ],
            }),
            new Paragraph({
              text: `${edu.institution || ''} ${edu.gpa ? `| ${edu.gpa}` : ''}`,
            })
          );
        }
      });
      sections.push(new Paragraph({ text: '' }));
    }
    
    // Skills
    if (resumeData.skills) {
      sections.push(
        new Paragraph({
          text: 'SKILLS',
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({
          text: resumeData.skills,
        }),
        new Paragraph({ text: '' })
      );
    }
    
    // Experience
    if (resumeData.experience.some(e => e.role || e.company)) {
      sections.push(
        new Paragraph({
          text: 'EXPERIENCE',
          heading: HeadingLevel.HEADING_2,
        })
      );
      
      resumeData.experience.forEach(exp => {
        if (exp.role || exp.company) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({ text: exp.role || '', bold: true }),
                new TextRun({ text: exp.duration ? `  |  ${exp.duration}` : '' }),
              ],
            }),
            new Paragraph({
              text: exp.company || '',
            })
          );
          
          if (exp.responsibilities) {
            exp.responsibilities.split('\n').filter(line => line.trim()).forEach(bullet => {
              sections.push(
                new Paragraph({
                  text: `• ${bullet.replace(/^[-•]\s*/, '')}`,
                })
              );
            });
          }
        }
      });
      sections.push(new Paragraph({ text: '' }));
    }
    
    // Projects
    if (resumeData.projects.some(p => p.title)) {
      sections.push(
        new Paragraph({
          text: 'PROJECTS',
          heading: HeadingLevel.HEADING_2,
        })
      );
      
      resumeData.projects.forEach(project => {
        if (project.title) {
          sections.push(
            new Paragraph({
              text: project.title,
              bold: true,
            })
          );
          
          if (project.technologies) {
            sections.push(
              new Paragraph({
                text: project.technologies,
              })
            );
          }
          
          if (project.description) {
            project.description.split('\n').filter(line => line.trim()).forEach(bullet => {
              sections.push(
                new Paragraph({
                  text: `• ${bullet.replace(/^[-•]\s*/, '')}`,
                })
              );
            });
          }
        }
      });
      sections.push(new Paragraph({ text: '' }));
    }
    
    // Certifications
    if (resumeData.certifications) {
      sections.push(
        new Paragraph({
          text: 'CERTIFICATIONS',
          heading: HeadingLevel.HEADING_2,
        })
      );
      
      resumeData.certifications.split('\n').filter(line => line.trim()).forEach(cert => {
        sections.push(
          new Paragraph({
            text: `• ${cert}`,
          })
        );
      });
      sections.push(new Paragraph({ text: '' }));
    }
    
    // Achievements
    if (resumeData.achievements) {
      sections.push(
        new Paragraph({
          text: 'ACHIEVEMENTS',
          heading: HeadingLevel.HEADING_2,
        })
      );
      
      resumeData.achievements.split('\n').filter(line => line.trim()).forEach(achievement => {
        sections.push(
          new Paragraph({
            text: `• ${achievement}`,
          })
        );
      });
    }
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: sections,
      }],
    });
    
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${getFileName()}.docx`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={exportToPDF}
        className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Download PDF
      </button>
      <button
        onClick={exportToDOCX}
        className="flex-1 min-w-[120px] px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
      >
        Download DOCX
      </button>
      <button
        onClick={exportToHTML}
        className="flex-1 min-w-[120px] px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors font-medium"
      >
        Download HTML
      </button>
    </div>
  );
};

export default ExportButtons;
