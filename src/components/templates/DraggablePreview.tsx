import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Resume } from "../Dashboard";

const sectionLabels: Record<string, string> = {
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
};

const defaultOrder = ["experience", "education", "skills", "projects"];

type Props = {
  resume: Resume;
  userId: string;
  template: React.ComponentType<{ resume: Resume; sectionOrder: string[]; sectionVisibility?: { skills: boolean; projects: boolean } }>;
  sectionVisibility?: { skills: boolean; projects: boolean };
};

const DraggablePreview = ({ resume, userId, template: TemplateComponent, sectionVisibility }: Props) => {
  const [sectionOrder, setSectionOrder] = useState<string[]>(defaultOrder);
  const [loadingOrder, setLoadingOrder] = useState(true);

  // Load section order from Firestore
  useEffect(() => {
    const fetchOrder = async () => {
      setLoadingOrder(true);
      try {
        const docRef = doc(db, "resumes", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().sectionOrder) {
          setSectionOrder(docSnap.data().sectionOrder);
        }
      } catch {}
      setLoadingOrder(false);
    };
    fetchOrder();
  }, [userId]);

  // Persist section order to Firestore
  const persistOrder = async (order: string[]) => {
    await setDoc(doc(db, "resumes", userId), { sectionOrder: order }, { merge: true });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newOrder = Array.from(sectionOrder);
    const [removed] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, removed);
    setSectionOrder(newOrder);
    persistOrder(newOrder);
  };

  // Section content renderers
  const sectionContent: Record<string, JSX.Element | null> = {
    experience: (
      <div className="mb-2">
        <h4 className="font-semibold">Experience</h4>
        {resume.experience.length === 0 && (
          <p className="text-gray-400">No experience added.</p>
        )}
        <div className="space-y-4">
          {resume.experience.map((exp, i) => (
            <div key={i} className="border-b pb-2 mb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-semibold text-blue-700">{exp.role ? exp.role : <span className='italic text-gray-400'>Role</span>}</span>
                  {exp.company && <span className="ml-2 text-blue-400">@ {exp.company}</span>}
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
        <h4 className="font-semibold">Education</h4>
        <p className="whitespace-pre-line text-gray-800">{resume.education || "Add your education here."}</p>
      </div>
    ),
    skills: (
      sectionVisibility?.skills ? (
        <div className="mb-2">
          <h4 className="font-semibold">Skills</h4>
          <p className="text-gray-800">{resume.skills || "Add your skills here."}</p>
        </div>
      ) : null
    ),
    projects: (
      sectionVisibility?.projects ? (
        <div className="mb-2">
          <h4 className="font-semibold">Projects</h4>
          {(!resume.projects || resume.projects.length === 0) && (
            <p className="text-gray-400">No projects added.</p>
          )}
          <ul className="space-y-2">
            {resume.projects && resume.projects.map((proj, i) => (
              <li key={i} className="ml-2">
                <span className="font-semibold text-blue-700">{proj.title || <span className='italic text-gray-400'>Project Title</span>}</span>
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
  };

  return (
    <div className="relative">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="resume-sections">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {sectionOrder.map((section, idx) => {
                const content = sectionContent[section];
                if (!content) return null;
                return (
                  <Draggable key={section} draggableId={section} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-white rounded shadow p-4 flex items-start gap-2 transition-all duration-200 ${snapshot.isDragging ? "ring-2 ring-blue-400 scale-105" : "hover:shadow-lg"}`}
                      >
                        <span
                          {...provided.dragHandleProps}
                          className="cursor-grab text-xl select-none pr-2 pt-1 text-gray-400 hover:text-blue-500"
                          title="Drag to reorder"
                        >
                          &#9776;
                        </span>
                        <div className="flex-1">{content}</div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggablePreview;
