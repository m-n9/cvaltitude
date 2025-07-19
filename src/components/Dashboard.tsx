
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useReactToPrint } from "react-to-print";
import { auth, db } from "../firebase";

import TemplateOne from "./templates/TemplateOne";
import TemplateTwo from "./templates/TemplateTwo";
import TemplateThree from "./templates/TemplateThree";

import TemplateFour from "./templates/TemplateFour";
import TechStackInfo from "./TechStackInfo";

type SectionVisibility = {
  skills: boolean;
  projects: boolean;
};

export type ExperienceEntry = {
  role: string;
  company: string;
  from: string;
  to: string;
  current: boolean;
  summary: string;
};

export type ProjectEntry = {
  title: string;
  link: string;
};

export type Resume = {
  name: string;
  title: string;
  summary: string;
  experience: ExperienceEntry[];
  education: string;
  skills: string;
  projects: ProjectEntry[];
};

const initialResume: Resume = {
  name: "",
  title: "",
  summary: "",
  experience: [
    { role: "", company: "", from: "", to: "", current: false, summary: "" }
  ],
  education: "",
  skills: "",
  projects: [
    { title: "", link: "" }
  ],
};

const templateOptions = [
  { label: "Modern Blue", value: "one" },
  { label: "Classic Gray", value: "two" },
  { label: "Elegant Dark", value: "three" },
  { label: "Creative Color", value: "four" },
];

type DashboardProps = {
  user: any;
};

const Dashboard = ({ user }: DashboardProps) => {
  const [resume, setResume] = useState<Resume>(initialResume);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("one");
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    "experience",
    "education",
    "skills",
    "projects",
  ]);
  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    skills: true,
    projects: true,
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: "CV_Altitude_Resume",
  });

  // Fetch resume data and section order
  useEffect(() => {
    const fetchResume = async () => {
      const docRef = doc(db, "resumes", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        let experience: any = data.experience;
        // If experience is not an array, convert to initial structure
        if (!Array.isArray(experience)) {
          experience = [
            { role: "", company: "", from: "", to: "", current: false, summary: typeof experience === "string" ? experience : "" }
          ];
        }

        let projects: any = data.projects;
        // If projects is not an array, convert to initial structure
        if (!Array.isArray(projects)) {
          if (typeof projects === "string") {
            projects = projects.trim() ? [{ title: projects, link: "" }] : [{ title: "", link: "" }];
          } else {
            projects = [{ title: "", link: "" }];
          }
        } else {
          // If array, ensure each entry is an object with title and link
          projects = projects.map((p: any) =>
            typeof p === "string"
              ? { title: p, link: "" }
              : { title: p.title || "", link: p.link || "" }
          );
        }

        setResume({
          name: data.name || "",
          title: data.title || "",
          summary: data.summary || "",
          experience,
          education: data.education || "",
          skills: data.skills || "",
          projects,
        });

        if (data.sectionOrder) {
          setSectionOrder(data.sectionOrder);
        }
      }
    };
    fetchResume();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    await setDoc(
      doc(db, "resumes", user.uid),
      { ...resume, sectionOrder },
      { merge: true }
    );
    setLoading(false);
    alert("Resume saved!");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setResume({ ...resume, [e.target.name]: e.target.value });
  };

  const persistOrder = async (order: string[]) => {
    await setDoc(
      doc(db, "resumes", user.uid),
      { sectionOrder: order },
      { merge: true }
    );
  };

  const handleSectionDragEnd = (result: { source: any; destination: any }) => {
    if (!result.destination) return;
    const newOrder = Array.from(sectionOrder);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    setSectionOrder(newOrder);
    persistOrder(newOrder);
  };

  let TemplateComponent;
  switch (selectedTemplate) {
    case "two":
      TemplateComponent = TemplateTwo;
      break;
    case "three":
      TemplateComponent = TemplateThree;
      break;
    case "four":
      TemplateComponent = TemplateFour;
      break;
    default:
      TemplateComponent = TemplateOne;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col w-full">
      <header className="flex justify-between items-center p-4 bg-white shadow w-full">
        <h1 className="text-xl font-bold">CVAltitude</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.displayName}</span>
          {user?.photoURL && (
            <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />
          )}
          <button
            onClick={() => signOut(auth)}
            className="text-sm text-blue-600 hover:underline"
          >
            Sign Out
          </button>
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row gap-6 p-4 w-full">
        {/* Resume Form */}
        <section className="flex-1 min-w-0 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Resume Template</h2>
          <div className="flex gap-4 mb-6">
            {templateOptions.map((tpl) => (
              <button
                key={tpl.value}
                className={`px-4 py-2 rounded border font-semibold transition-all ${
                  selectedTemplate === tpl.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => setSelectedTemplate(tpl.value)}
              >
                {tpl.label}
              </button>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-4">
            You can drag and drop the sections on the right to reorder them.
          </p>

          <h2 className="text-lg font-semibold mb-4">Resume Form</h2>
          <form className="space-y-4">
            <div>
              <label className="block font-medium">Name</label>
              <input
                name="name"
                value={resume.name}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Title</label>
              <input
                name="title"
                value={resume.title}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Profile Summary</label>
              <textarea
                name="summary"
                value={resume.summary}
                onChange={handleChange}
                rows={2}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block font-medium">Experience</label>
              <div className="space-y-6">
                {resume.experience.map((exp, idx) => (
                  <div key={idx} className="border rounded p-4 bg-gray-50 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Role Name</label>
                        <input
                          type="text"
                          className="mt-1 w-full border rounded px-3 py-2"
                          value={exp.role}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].role = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Company</label>
                        <input
                          type="text"
                          className="mt-1 w-full border rounded px-3 py-2"
                          value={exp.company}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].company = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">From</label>
                        <input
                          type="date"
                          className="mt-1 w-full border rounded px-3 py-2"
                          value={exp.from}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].from = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">To</label>
                        <input
                          type="date"
                          className="mt-1 w-full border rounded px-3 py-2"
                          value={exp.to}
                          onChange={e => {
                            const updated = [...resume.experience];
                            updated[idx].to = e.target.value;
                            setResume({ ...resume, experience: updated });
                          }}
                          disabled={exp.current}
                        />
                        <label className="inline-flex items-center ml-2 text-xs">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={e => {
                              const updated = [...resume.experience];
                              updated[idx].current = e.target.checked;
                              if (e.target.checked) updated[idx].to = "";
                              setResume({ ...resume, experience: updated });
                            }}
                          />
                          <span className="ml-1">I currently work here</span>
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium">Summary (one bullet per line)</label>
                      <textarea
                        className="mt-1 w-full border rounded px-3 py-2"
                        rows={3}
                        value={exp.summary}
                        onChange={e => {
                          const updated = [...resume.experience];
                          updated[idx].summary = e.target.value;
                          setResume({ ...resume, experience: updated });
                        }}
                        placeholder={"Describe your responsibilities, achievements, etc. One per line."}
                      />
                    </div>
                    {resume.experience.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                        onClick={() => {
                          const updated = resume.experience.filter((_, i) => i !== idx);
                          setResume({ ...resume, experience: updated });
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-semibold"
                  onClick={() => {
                    setResume({
                      ...resume,
                      experience: [
                        ...resume.experience,
                        { role: "", company: "", from: "", to: "", current: false, summary: "" },
                      ],
                    });
                  }}
                >
                  + Add Experience
                </button>
              </div>
            </div>
            <div>
              <label className="block font-medium">Education</label>
              <textarea
                name="education"
                value={resume.education}
                onChange={handleChange}
                rows={2}
                className="mt-1 w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="block font-medium">Skills</label>
              <button
                type="button"
                className={`ml-2 px-2 py-1 rounded text-xs font-semibold border ${sectionVisibility.skills ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-400 border-gray-300'}`}
                onClick={() => setSectionVisibility(v => ({ ...v, skills: !v.skills }))}
                aria-pressed={sectionVisibility.skills}
                title={sectionVisibility.skills ? 'Hide Skills section' : 'Show Skills section'}
              >
                {sectionVisibility.skills ? 'Visible' : 'Hidden'}
              </button>
            </div>
            {sectionVisibility.skills && (
              <div>
                <input
                  name="skills"
                  value={resume.skills}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
            )}
            <div className="flex items-center gap-2 mt-2">
              <label className="block font-medium">Projects</label>
              <button
                type="button"
                className={`ml-2 px-2 py-1 rounded text-xs font-semibold border ${sectionVisibility.projects ? 'bg-green-100 text-green-700 border-green-300' : 'bg-gray-100 text-gray-400 border-gray-300'}`}
                onClick={() => setSectionVisibility(v => ({ ...v, projects: !v.projects }))}
                aria-pressed={sectionVisibility.projects}
                title={sectionVisibility.projects ? 'Hide Projects section' : 'Show Projects section'}
              >
                {sectionVisibility.projects ? 'Visible' : 'Hidden'}
              </button>
            </div>
            {sectionVisibility.projects && (
              <div className="space-y-6">
                {resume.projects.map((proj, idx) => (
                  <div key={idx} className="border rounded p-4 bg-gray-50 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium">Project Title</label>
                        <input
                          type="text"
                          className="mt-1 w-full border rounded px-3 py-2"
                          value={proj.title}
                          onChange={e => {
                            const updated = [...resume.projects];
                            updated[idx].title = e.target.value;
                            setResume({ ...resume, projects: updated });
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Project Link</label>
                        <input
                          type="text"
                          className="mt-1 w-full border rounded px-3 py-2"
                          value={proj.link}
                          onChange={e => {
                            const updated = [...resume.projects];
                            updated[idx].link = e.target.value;
                            setResume({ ...resume, projects: updated });
                          }}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                    {resume.projects.length > 1 && (
                      <button
                        type="button"
                        className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                        onClick={() => {
                          const updated = resume.projects.filter((_, i) => i !== idx);
                          setResume({ ...resume, projects: updated });
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="mt-2 px-4 py-2 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-semibold"
                  onClick={() => {
                    setResume({
                      ...resume,
                      projects: [
                        ...resume.projects,
                        { title: "", link: "" },
                      ],
                    });
                  }}
                >
                  + Add Project
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Export PDF
              </button>
            </div>
          </form>
        </section>

        {/* Preview Panel */}
        <section className="flex-1 min-w-0">
          <div
            ref={previewRef}
            className="bg-white p-4 md:p-8 rounded shadow min-h-[500px] w-full sticky top-4 max-h-[90vh] overflow-auto"
          >
            <TemplateComponent
              resume={resume}
              sectionOrder={sectionOrder}
              onDragEnd={handleSectionDragEnd}
              sectionVisibility={sectionVisibility}
            />
          </div>
        </section>
      </main>
      <TechStackInfo />
    </div>
  );
};

export default Dashboard;
