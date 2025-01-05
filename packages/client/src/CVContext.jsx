import { createContext, useState, useContext, useMemo, useEffect } from "react";

import alignArraysById from "./utils/alignArraysById";
import useUpdate from "./hooks/useUpdate";

// Create the context
const CVContext = createContext();

// Create a provider component
export const CVProvider = ({ children, editable, data }) => {
  const [stack, setStack] = useState([data]);
  const [future, setFuture] = useState([]);
  const [modal, setModal] = useState(null);
  const closeModal = () => setModal(null);
  const [addingBlock, setAddingBlock] = useState(null);

  const cv = useMemo(() => stack[stack.length - 1], [stack]);
  const settings = useMemo(() => cv.settings, [cv]);

  useUpdate(cv);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--resume-scale-factor",
      settings?.resume_scale_factor ?? 1
    );
    document.documentElement.style.setProperty(
      "--resume-title-scale-factor",
      settings?.resume_title_scale_factor ?? 1
    );
  }, [settings.resume_scale_factor, settings.resume_title_scale_factor]);

  const update = (newData) => {
    if (!editable) return;
    // Compare current CV data with the new data
    if (JSON.stringify(cv) === JSON.stringify(newData)) {
      return;
    }

    localStorage.setItem("cv", JSON.stringify(newData));
    setStack([...stack, newData]);
    setFuture([]); // Clear future states after a new update
  };

  const updatePartial = (partial) => {
    const updatedCV = { ...cv, ...partial };
    update(updatedCV);
  };

  const updateSettings = (newSettings) => {
    const updatedCV = { ...cv, settings: { ...settings, ...newSettings } };
    update(updatedCV);
  };

  const undo = () => {
    if (stack.length > 1) {
      const previousState = stack[stack.length - 2]; // The state before the most recent one
      setFuture([stack[stack.length - 1], ...future]);
      setStack(stack.slice(0, stack.length - 1));

      // Update localStorage after the state change
      localStorage.setItem("cv", JSON.stringify(previousState));
    }
  };

  const redo = () => {
    if (future.length > 0) {
      const nextState = future[0]; // The next state in the redo stack
      setStack([...stack, nextState]);
      setFuture(future.slice(1));

      // Update localStorage after the state change
      localStorage.setItem("cv", JSON.stringify(nextState));
    }
  };

  const removeFromMainGroup = (id, groupId) => {
    const updatedCV = {
      ...cv,
      main: cv.main.map((el) =>
        el.id === groupId
          ? { ...el, data: el.data.filter((exp) => exp.id !== id) }
          : el
      ),
    };
    update(updatedCV);
  };

  const addItemToMainGroup = (item, groupId) => {
    const updatedCV = {
      ...cv,
      main: cv.main.map((el) =>
        el.id === groupId ? { ...el, data: [...el.data, item] } : el
      ),
    };
    update(updatedCV);
  };

  const updateMain = (data) => {
    const aligned = alignArraysById(data, cv.main);
    if (aligned) {
      update({ ...cv, main: aligned });
    }
  };

  const updateMainGroupTitle = (title, groupId) => {
    const group = cv.main.find((el) => el.id === groupId);

    const changed = group.title !== title;

    if (!changed) return;

    const updatedCV = {
      ...cv,
      main: cv.main.map((el) => (el.id === groupId ? { ...el, title } : el)),
    };
    update(updatedCV);
  };

  const updateMainGroup = (blocks, groupId) => {
    const group = cv.main.find((el) => el.id === groupId).data;

    // Align the blocks with the current group data
    const aligned = alignArraysById(blocks, group);

    // If data is not aligned, do the update
    if (aligned) {
      const currentGroupData = group.map((exp) => exp.id);
      const newGroupData = aligned.map((exp) => exp.id);

      // If there is no change in the group data, do not update
      if (JSON.stringify(currentGroupData) === JSON.stringify(newGroupData))
        return;

      const updatedCV = {
        ...cv,
        main: cv.main.map(
          (el) =>
            el.id === groupId
              ? { ...el, data: aligned } // Update the group with aligned data
              : el // Leave other groups unchanged
        ),
      };
      update(updatedCV);
    }
  };

  const addBlock = (group) => {
    setAddingBlock(null);
    const { type } = addingBlock;

    const item = {
      id: `${type}_${Date.now()}`,
      type,
      data: mocksData[type],
      title: `New ${type} block`,
    };

    const selectedGroup = cv[group];
    update({ ...cv, [group]: [...selectedGroup, item] });
  };

  const removeMainGroup = (groupId) => {
    const updatedCV = {
      ...cv,
      main: cv.main.filter((el) => el.id !== groupId),
    };

    update(updatedCV);
  };

  return (
    <CVContext.Provider
      value={{
        cv,
        update,
        undo,
        redo,
        removeFromMainGroup,
        addItemToMainGroup,
        updateMainGroup,
        updateMainGroupTitle,
        updateMain,
        removeMainGroup,
        settings,
        updateSettings,
        updatePartial,
        setModal,
        closeModal,
        modal,
        canRedo: future.length > 0,
        canUndo: stack.length > 1,
        addingBlock,
        setAddingBlock,
        addBlock,
        editable,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

// Create a custom hook for using the CVContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCV = () => {
  return useContext(CVContext);
};

const mockExperienceData = [
  {
    id: "exp1",
    title: "Experience 1",
    company: "ABC Company",
    location: "New York, NY",
    from: "2024-12-15T23:00:00+00:00",
    to: "2023-11-16T23:00:00+00:00",
    description:
      "<p>Elaborer et piloter la mise en place du Système intégré SIRH (Paie, Talent, Recrutement, Succession, Mobilité, Revue de salaire, Formation) Constituer et être le garant du budget. Réaliser les appels d?offres Piloter les équipes d?intégrations</p>",
  },
  {
    id: "exp2",
    title: "Experience 2",
    company: "XYZ Company",
    location: "Los Angeles, CA",
    from: "2024-12-15T23:00:00+00:00",
    to: "2023-11-16T23:00:00+00:00",
    description:
      "<p>Elaborer et piloter la mise en place du Système intégré SIRH (Paie, Talent, Recrutement, Succession, Mobilité, Revue de salaire, Formation) Constituer et être le garant du budget. Réaliser les appels d?offres Piloter les équipes d?intégrations</p>",
  },
];
const mockEducationData = [
  {
    id: "ed1",
    title: "Edcuation 1",
    institution: "XYZ Institution",
    location: "Los Angeles, CA",
    from: "2024-12-15T23:00:00+00:00",
    to: "2023-11-16T23:00:00+00:00",
    description:
      "<p>Elaborer et piloter la mise en place du Système intégré SIRH (Paie, Talent, Recrutement, Succession, Mobilité, Revue de salaire, Formation) Constituer et être le garant du budget. Réaliser les appels d?offres Piloter les équipes d?intégrations</p>",
  },
  {
    id: "ed2",
    title: "Education 2",
    institution: "123 Institution",
    location: "San Francisco, CA",
    from: "2024-12-15T23:00:00+00:00",
    to: "2023-11-16T23:00:00+00:00",
    description:
      "<p>Elaborer et piloter la mise en place du Système intégré SIRH (Paie, Talent, Recrutement, Succession, Mobilité, Revue de salaire, Formation) Constituer et être le garant du budget. Réaliser les appels d?offres Piloter les équipes d?intégrations</p>",
  },
];
const mockSkillsData = [
  {
    id: "sk_1",
    label: "Communication",
    skills: ["Listening", "Speaking"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.",
  },
  {
    id: "sk_2",
    label: "Teamwork",
    skills: ["Collaboration", "Leadership"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.",
  },
];

const mocksData = {
  experiences: mockExperienceData,
  education: mockEducationData,
  skills: mockSkillsData,
};
