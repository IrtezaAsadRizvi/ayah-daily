"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

type DropdownItem<T extends string = string> = { text: string; value: T };
type DropdownProps<T extends string = string> = {
  title?: React.ReactNode | (() => React.ReactNode);
  tooltip?: string | null;
  items?: DropdownItem<T>[];
  initialValue?: T | null;
  onSelect: (value: T) => void;
};

function Dropdown<T extends string = string>({
  title = null,
  tooltip = null,
  items = [],
  initialValue = null,
  onSelect,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderTitle = () =>
    title ? (typeof title === "function" ? title() : title) : (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 13.5c.553 0 1-.448 1-1s-.447-1-1-1-1 .448-1 1 .447 1 1 1Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 13.5c.553 0 1-.448 1-1s-.447-1-1-1-1 .448-1 1 .447 1 1 1Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 13.5c.553 0 1-.448 1-1s-.447-1-1-1-1 .448-1 1 .447 1 1 1Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="icon-button"
        aria-label={tooltip ?? undefined}
        data-tooltip-id="dropdown-tooltip"
        data-tooltip-content={tooltip ?? undefined}
        onClick={() => setIsOpen((v) => !v)}
      >
        {renderTitle()}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute top-full mt-2 right-0 z-20 w-fit whitespace-nowrap rounded-xl
                    shadow-xl bg-slate-500/5 dark:bg-white/5 backdrop-blur-md
                    divide-y divide-slate-500 dark:divide-slate-500 overflow-hidden"
        >
          {items.map((item, index) => {
            const selected = initialValue === item.value;
            return (
              <li
                key={index}
                role="option"
                aria-selected={selected}
                tabIndex={0}
                onClick={() => { onSelect(item.value); setIsOpen(false); }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(item.value);
                    setIsOpen(false);
                  }
                }}
                className={`px-4 py-2 text-sm cursor-pointer 
                            hover:bg-[--action-hover-light] dark:hover:bg-[--action-hover-dark]
                            focus:outline-none focus:bg-[--action-hover-light] dark:focus:bg-[--action-hover-dark]
                            ${selected ? "font-medium" : ""}`}
              >
                {item.text}
              </li>
            );
          })}
        </ul>
      )}

      <Tooltip id="dropdown-tooltip" />
    </div>
  );
}

export default Dropdown;
