import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Resume } from "../Dashboard";
type DropResult = Parameters<Parameters<typeof DragDropContext>[0]['onDragEnd']>[0];
type Props = {
  resume: Resume;
  sectionOrder: string[];
  onDragEnd: (result: DropResult) => void;
  onResetOrder?: () => void;
  sectionVisibility?: { skills: boolean; projects: boolean };
};

const sectionContent = (resume: Resume, sectionVisibility?: { skills: boolean; projects: boolean }) => ({
  summary: (
    <div className="mb-2">
      <h4 className="font-semibold text-gray-300">Profile Summary</h4>
      <p className="text-gray-200">{resume.summary || "Add a brief summary about yourself."}</p>
    </div>
  ),
  experience: (
    <div className="mb-2">
      <h4 className="font-semibold text-gray-300">Experience</h4>
      {resume.experience.length === 0 && (
        <p className="text-gray-500">No experience added.</p>
      )}
      <div className="space-y-4">
        {resume.experience.map((exp, i) => (
          <div key={i} className="border-b border-gray-700 pb-2 mb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-semibold text-white">{exp.role || <span className='italic text-gray-500'>Role</span>}</span>
                {exp.company && <span className="ml-2 text-gray-400">@ {exp.company}</span>}
              </div>
              <div className="text-sm text-gray-400 mt-1 md:mt-0">
                {exp.from && (
                  <span>{exp.from}</span>
                )}
                {(exp.from && (exp.to || exp.current)) && <span> - </span>}
                {exp.current ? <span>Present</span> : exp.to}
              </div>
            </div>
            {exp.summary && (
              <ul className="list-disc ml-6 mt-1 text-gray-200">
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
      <h4 className="font-semibold text-gray-300">Education</h4>
      <p className="whitespace-pre-line">{resume.education || "Add your education here."}</p>
    </div>
  ),
  skills: (
    sectionVisibility?.skills ? (
      <div className="mb-2">
        <h4 className="font-semibold text-gray-300">Skills</h4>
        <p className="whitespace-pre-line">{resume.skills || "Add your skills here."}</p>
      </div>
    ) : null
  ),
  projects: (
    sectionVisibility?.projects ? (
      <div className="mb-2">
        <h4 className="font-semibold text-gray-300">Projects</h4>
        {(!resume.projects || resume.projects.length === 0) && (
          <p className="text-gray-400">No projects added.</p>
        )}
        <ul className="space-y-2">
          {resume.projects && resume.projects.map((proj, i) => (
            <li key={i} className="ml-2">
              <span className="font-semibold text-white">{proj.title || <span className='italic text-gray-400'>Project Title</span>}</span>
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

const TemplateThree = ({ resume, sectionOrder, onDragEnd, sectionVisibility }: Props) => {
  const content = sectionContent(resume, sectionVisibility);
  return (
    <div className="space-y-2 bg-gray-900 text-white p-4 rounded">
      <h2 className="text-2xl font-bold mb-1 text-white">{resume.name || "Your Name"}</h2>
      <h3 className="text-lg text-gray-300 mb-4">{resume.title || "Your Title"}</h3>
      {content.summary}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="resume-sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sectionOrder.map((section, idx) => (
                <Draggable key={section} draggableId={section} index={idx}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="transition-all p-4 mb-2 rounded bg-gray-800 shadow cursor-move hover:shadow-lg"
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

export default TemplateThree;
