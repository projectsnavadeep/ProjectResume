import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const formatBullets = (text) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim());
  };

  return (
    <div className="font-sans text-black" style={{ fontSize: '10.5pt', lineHeight: '1.4' }}>
      {/* Header - Corporate Style */}
      <div className="text-center mb-5 pb-4 border-b-4 border-black">
        <h1 className="text-3xl font-bold tracking-wide mb-2">{data.fullName || 'YOUR NAME'}</h1>
        <div className="text-xs uppercase tracking-wider">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="mx-2">|</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>

      {/* Objective */}
      {data.objective && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Executive Summary
          </h2>
          <p className="text-sm px-2">{data.objective}</p>
        </div>
      )}

      {/* Education */}
      {data.education.some(e => e.degree || e.institution) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Education
          </h2>
          <div className="px-2">
            {data.education.map((edu, index) => (
              edu.degree || edu.institution ? (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-sm">{edu.degree}</span>
                    <span className="text-sm">{edu.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{edu.institution}</span>
                    {edu.gpa && <span className="font-semibold">{edu.gpa}</span>}
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Core Competencies
          </h2>
          <p className="text-sm px-2">{data.skills}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.some(e => e.role || e.company) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Professional Experience
          </h2>
          <div className="px-2">
            {data.experience.map((exp, index) => (
              exp.role || exp.company ? (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-bold text-sm">{exp.role}</span>
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                  <div className="font-semibold text-sm mb-1">{exp.company}</div>
                  {exp.responsibilities && (
                    <ul className="list-disc ml-5 text-sm space-y-0.5">
                      {formatBullets(exp.responsibilities).map((bullet, i) => (
                        <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.some(p => p.title) && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Key Projects
          </h2>
          <div className="px-2">
            {data.projects.map((project, index) => (
              project.title ? (
                <div key={index} className="mb-3">
                  <div className="font-bold text-sm">{project.title}</div>
                  {project.technologies && (
                    <div className="text-sm italic mb-1">{project.technologies}</div>
                  )}
                  {project.description && (
                    <ul className="list-disc ml-5 text-sm space-y-0.5">
                      {formatBullets(project.description).map((bullet, i) => (
                        <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : null
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Certifications
          </h2>
          <ul className="list-disc ml-7 text-sm space-y-0.5 px-2">
            {formatBullets(data.certifications).map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data.achievements && (
        <div className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 bg-gray-200 px-2 py-1">
            Awards & Achievements
          </h2>
          <ul className="list-disc ml-7 text-sm space-y-0.5 px-2">
            {formatBullets(data.achievements).map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
