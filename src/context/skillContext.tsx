import React, { createContext, useState, useContext, useEffect, useRef, ReactNode } from "react";

// Define the shape of the context state
interface SkillContextType {
  inputValue: string;
  filteredSuggestions: string[];
  isDropdownVisible: boolean;
  selectedSkills: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSuggestionClick: (suggestion: string) => void;
  handleInputFocus: () => void;
  handleDeletSkills: (skill: string) => void;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}

// Define the props for the SkillProvider component
interface SkillProviderProps {
  suggestions: string[];
  children: ReactNode;
}

// Create the context with a default value
const SkillContext = createContext<SkillContextType | undefined>(undefined);

// Define the provider component
export const SkillProvider: React.FC<SkillProviderProps> = ({ children, suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setInputValue(event.target.value);
    setFilteredSuggestions(
      suggestions.filter((skill) => skill.toLowerCase().includes(query))
    );
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedSkills.includes(suggestion)) {
      setInputValue("");
      setFilteredSuggestions([]);
      setSelectedSkills((prevSkills) => [...prevSkills, suggestion]);
    }
  };

  const handleInputFocus = () => {
    setFilteredSuggestions(suggestions);
    setIsDropdownVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".dropdown-container")) {
      setIsDropdownVisible(false);
    }
  };

  const handleDeletSkills = (skill: string) => {
    setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    const dragIndex = dragItem.current;
    const hoverIndex = dragOverItem.current;
    if (dragIndex !== null && hoverIndex !== null && dragIndex !== hoverIndex) {
      const updatedSkills = [...selectedSkills];
      const draggedItem = updatedSkills[dragIndex];
      updatedSkills.splice(dragIndex, 1);
      updatedSkills.splice(hoverIndex, 0, draggedItem);

      setSelectedSkills(updatedSkills);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <SkillContext.Provider
      value={{
        inputValue,
        filteredSuggestions,
        isDropdownVisible,
        selectedSkills,
        handleInputChange,
        handleSuggestionClick,
        handleInputFocus,
        handleDeletSkills,
        handleDragStart,
        handleDragEnter,
        handleDragEnd,
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

// Custom hook to use the SkillContext
export const useSkillContext = () => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error("useSkillContext must be used within a SkillProvider");
  }
  return context;
};
