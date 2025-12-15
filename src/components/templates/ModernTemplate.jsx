import React from 'react';

const ModernTemplate = ({ data }) => {
  const formatBullets = (text) => {
    if (!text) return [];
    return text.split('\n').filter(line => line.trim());
  };

  return (
    <div className="font-sans text-black" style={{ fontSize: '10.5pt', lineHeight: '1.5' }}>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-4xl font-bold mb-2">{data.fullName || 'YOUR NAME'}</h1>
        <div className="text-sm text-gray-700">
          {data.email && <span>{data.email}</span>}
          {data.email && data.phone && <span className="mx-3">•</span>}
          {data.phone && <span>{data.phone}</span>}
        </div>
      </div>

      {/* Objective */}
      {data.objective && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-sm text-gray-800">{data.objective}</p>
        </div>
      )}

      {/* Education */}
      {data.education.some(e => e.degree || e.institution) && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            EDUCATION
          </h2>
          {data.education.map((edu, index) => (
            edu.degree || edu.institution ? (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{edu.degree}</div>
                    <div className="text-sm text-gray-700">{edu.institution}</div>
                  </div>
                  <div className="text-right text-sm">
                    {edu.year && <div>{edu.year}</div>}
                    {edu.gpa && <div className="text-gray-700">{edu.gpa}</div>}
                  </div>
                </div>
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            SKILLS
          </h2>
          <div className="text-sm text-gray-800">{data.skills}</div>
        </div>
      )}

      {/* Experience */}
      {data.experience.some(e => e.role || e.company) && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            PROFESSIONAL EXPERIENCE
          </h2>
          {data.experience.map((exp, index) => (
            exp.role || exp.company ? (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <div className="font-semibold">{exp.role}</div>
                    <div className="text-sm text-gray-700">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-700">{exp.duration}</div>
                </div>
                {exp.responsibilities && (
                  <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                    {formatBullets(exp.responsibilities).map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.some(p => p.title) && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            PROJECTS
          </h2>
          {data.projects.map((project, index) => (
            project.title ? (
              <div key={index} className="mb-4">
                <div className="font-semibold">{project.title}</div>
                {project.technologies && (
                  <div className="text-sm text-gray-700 mb-1">{project.technologies}</div>
                )}
                {project.description && (
                  <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
                    {formatBullets(project.description).map((bullet, i) => (
                      <li key={i}>{bullet.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null
          ))}
        </div>
      )}

      {/* Certifications */}
      {data.certifications && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            CERTIFICATIONS
          </h2>
          <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
            {formatBullets(data.certifications).map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Achievements */}
      {data.achievements && (
        <div className="mb-5">
          <h2 className="text-base font-bold mb-2 pb-1 border-b-2 border-gray-800">
            ACHIEVEMENTS
          </h2>
          <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
            {formatBullets(data.achievements).map((achievement, i) => (
              <li key={i}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;
