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
      <h4 className="font-semibold text-pink-400">Profile Summary</h4>
      <p className="text-pink-700">{resume.summary || "Add a brief summary about yourself."}</p>
    </div>
  ),
  experience: (
    <div className="mb-2">
      <h4 className="font-semibold text-pink-400">Experience</h4>
      {resume.experience.length === 0 && (
        <p className="text-pink-300">No experience added.</p>
      )}
      <div className="space-y-4">
        {resume.experience.map((exp, i) => (
          <div key={i} className="border-b border-pink-200 pb-2 mb-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <span className="font-semibold text-pink-600">{exp.role || <span className='italic text-pink-300'>Role</span>}</span>
                {exp.company && <span className="ml-2 text-pink-400">@ {exp.company}</span>}
              </div>
              <div className="text-sm text-pink-400 mt-1 md:mt-0">
                {exp.from && (
                  <span>{exp.from}</span>
                )}
                {(exp.from && (exp.to || exp.current)) && <span> - </span>}
                {exp.current ? <span>Present</span> : exp.to}
              </div>
            </div>
            {exp.summary && (
              <ul className="list-disc ml-6 mt-1 text-pink-700">
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
      <h4 className="font-semibold text-pink-400">Education</h4>
      <p className="whitespace-pre-line text-gray-800">{resume.education || "Add your education here."}</p>
    </div>
  ),
  skills: (
    sectionVisibility?.skills ? (
      <div className="mb-2">
        <h4 className="font-semibold text-pink-400">Skills</h4>
        <p className="text-pink-700">{resume.skills || "Add your skills here."}</p>
      </div>
    ) : null
  ),
  projects: (
    sectionVisibility?.projects ? (
      <div className="mb-2">
        <h4 className="font-semibold text-pink-400">Projects</h4>
        {(!resume.projects || resume.projects.length === 0) && (
          <p className="text-pink-300">No projects added.</p>
        )}
        <ul className="space-y-2">
          {resume.projects && resume.projects.map((proj, i) => (
            <li key={i} className="ml-2">
              <span className="font-semibold text-pink-700">{proj.title || <span className='italic text-pink-300'>Project Title</span>}</span>
              {proj.link && (
                <span className="ml-2 text-pink-400">
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

const TemplateFour = ({ resume, sectionOrder, onDragEnd, sectionVisibility }: Props) => {
  const content = sectionContent(resume, sectionVisibility);
  return (
    <div className="space-y-2 border-l-4 border-pink-500 pl-4">
      <h2 className="text-2xl font-bold mb-1 text-pink-600">{resume.name || "Your Name"}</h2>
      <h3 className="text-lg text-pink-400 mb-4">{resume.title || "Your Title"}</h3>
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
                      className="transition-all p-4 mb-2 rounded bg-white shadow cursor-move hover:shadow-lg"
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

export default TemplateFour;
