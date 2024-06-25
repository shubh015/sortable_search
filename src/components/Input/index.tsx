import React, { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSkillContext } from "../../context/skillContext";

const Input: React.FC = () => {
  // const [inputValue, setInputValue] = useState("");
  // const [filteredSuggestions, setfilteredSuggestions] = useState<string[]>([]);
  // const [isDropdownVisible, setisDropdownVisible] = useState<boolean>(false);
  // const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  // const dragItem = useRef<number | null>(null);
  // const dragOverItem = useRef<number | null>(null);
  // console.log(dragItem, 'lll')

  const {
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
  } = useSkillContext();

  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = event?.target.value.toLowerCase();
  //   setInputValue(event.target.value);
  //   setfilteredSuggestions(
  //     suggestions.filter((skill) => skill.toLocaleLowerCase().includes(query))
  //   );
  // };

  // const handleSuggestionClick = (suggestion: string) => {
  //   if (!selectedSkills.includes(suggestion)) {
  //     setInputValue(suggestion);
  //     setfilteredSuggestions([]);
  //     setSelectedSkills((prevSkills) => [...prevSkills, suggestion]);
  //   }
  // };

  // const handleInputFocus = () => {
  //   setfilteredSuggestions(suggestions);
  //   setisDropdownVisible(true);
  // };

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (!(event.target as HTMLElement).closest(".dropdown-container")) {
  //     setisDropdownVisible(false);
  //   }
  // };
  // const handleDeletSkills = (skill: string) => {
  //   setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  // };

  // const handleDragStart = (index: number) => {
  //   dragItem.current = index;
  // };
  // const handleDragEnter = (index: number) => {
  //   dragOverItem.current = index;
  // };
  // const handleDragEnd = () => {
  //   const dragIndex = dragItem.current;
  //   const hoverindex = dragOverItem.current;
  //   if (dragIndex !== null && hoverindex !== null && dragIndex !== hoverindex) {
  //     const updatedSkills = [...selectedSkills];
  //     const draggedItem = updatedSkills[dragIndex];
  //     updatedSkills.splice(dragIndex, 1);
  //     updatedSkills.splice(hoverindex, 0, draggedItem);

  //     setSelectedSkills(updatedSkills);
  //   }
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  // };
  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

  return (
    <div className="relative w-64 dropdown-container">
      <div className="flex flex-col mt-2">
        {selectedSkills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-200 rounded-md m-1 px-6 py-2"
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            style={{ cursor: "move" }}
          >
            <div>{skill}</div>
            <button className="ml-2" onClick={() => handleDeletSkills(skill)}>
              {" "}
              <MdCancel />
            </button>
          </div>
        ))}
      </div>
      {selectedSkills.length < 5 && (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Type a skill"
        />
      )}
      {isDropdownVisible && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
