import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Resume } from "../Dashboard";

type Props = {
  resume: Resume;
  sectionOrder: string[];
  onDragEnd: (result) => void;
  onResetOrder?: () => void;
  sectionVisibility?: { skills: boolean; projects: boolean };
};

const sectionContent = (resume: Resume, sectionVisibility?: { skills: boolean; projects: boolean }) => ({
  summary: (
    <div className="mb-2">
      <h4 className="font-semibold text-gray-500">Profile Summary</h4>
      <p className="text-gray-700">{resume.summary || "Add a brief summary about yourself."}</p>
    </div>
  ),
  experience: (
    <div className="mb-2">
      <h4 className="font-semibold text-gray-500">Experience</h4>
      {resume.experience.length === 0 && (
        <p className="text-gray-400">No experience added.</p>
      )}
      <div className="space-y-4">
        {resume.experience.map((exp, i) => (
          <div key={i} className="border-b pb-2 mb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-semibold text-gray-700">{exp.role || <span className='italic text-gray-400'>Role</span>}</span>
                {exp.company && <span className="ml-2 text-gray-400">@ {exp.company}</span>}
              </div>
              <div className="text-sm text-gray-500 mt-1 md:mt-0">
                {exp.from && (
                  <span>{exp.from}</span>
                )}
                {(exp.from && (exp.to || exp.current)) && <span> - </span>}
                {exp.current ? <span>Present</span> : exp.to}
              </div>
            </div>
            {exp.summary && (
              <ul className="list-disc ml-6 mt-1 text-gray-700">
                {exp.summary.split('\n').filter(Boolean).map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  ),
  education: (
    <div className="mb-2">
      <h4 className="font-semibold text-gray-500">Education</h4>
      <p className="whitespace-pre-line">{resume.education || "Add your education here."}</p>
    </div>
  ),
  skills: (
    sectionVisibility?.skills ? (
      <div className="mb-2">
        <h4 className="font-semibold text-gray-500">Skills</h4>
        <p className="whitespace-pre-line">{resume.skills || "Add your skills here."}</p>
      </div>
    ) : null
  ),
  projects: (
    sectionVisibility?.projects ? (
      <div className="mb-2">
        <h4 className="font-semibold text-gray-500">Projects</h4>
        {(!resume.projects || resume.projects.length === 0) && (
          <p className="text-gray-400">No projects added.</p>
        )}
        <ul className="space-y-2">
          {resume.projects && resume.projects.map((proj, i) => (
            <li key={i} className="ml-2">
              <span className="font-semibold text-gray-700">{proj.title || <span className='italic text-gray-400'>Project Title</span>}</span>
              {proj.link && (
                <span className="ml-2 text-blue-400">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="underline">{proj.link}</a>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    ) : null
  ),
});

const TemplateTwo = ({ resume, sectionOrder, onDragEnd, sectionVisibility }: Props) => {
  const content = sectionContent(resume, sectionVisibility);

  return (
    <div className="space-y-2 text-gray-800">
      <h2 className="text-2xl font-bold mb-1 text-gray-700">{resume.name || "Your Name"}</h2>
      <h3 className="text-lg text-gray-500 mb-4">{resume.title || "Your Title"}</h3>
      {content.summary}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="resume-droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {sectionOrder.map((section, index) => (
                <Draggable key={section} draggableId={section} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-white rounded shadow p-4 transition-all duration-200 cursor-grab ${
                        snapshot.isDragging
                          ? "ring-2 ring-blue-400 scale-105"
                          : "hover:shadow-lg"
                      }`}
                    >
                      {content[section as keyof typeof content]}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TemplateTwo;
