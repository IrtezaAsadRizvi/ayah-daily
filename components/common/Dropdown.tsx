"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

export type DropdownItem<T extends string = string> = {
  text: string;
  value: T;
  meta?: Record<string, unknown>;
  className?: string;
};

type DropdownProps<T extends string = string> = {
  title?: React.ReactNode | (() => React.ReactNode);
  tooltip?: string | null;
  ariaLabel?: string | null;
  items?: DropdownItem<T>[]; // no default []
  loadItemsOnOpen?: () => Promise<DropdownItem<T>[]>;
  renderItem?: (item: DropdownItem<T>, index: number) => React.ReactNode;
  initialValue?: T | null;
  onSelect: (value: T) => void;
  listClassName?: string;
  itemClassName?: string;
  emptyContent?: React.ReactNode;
};

function Dropdown<T extends string = string>({
  title = null,
  tooltip = null,
  ariaLabel = null,
  items, // <-- no default
  loadItemsOnOpen,
  renderItem,
  initialValue = null,
  onSelect,
  listClassName = "",
  itemClassName = "",
  emptyContent = null,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // Initialize once from props (if any). If undefined, start empty.
  const [internalItems, setInternalItems] = useState<DropdownItem<T>[]>(() => items ?? []);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Only update internal items if parent explicitly passes `items`
  useEffect(() => {
    if (items) setInternalItems(items);
  }, [items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lazy-load items on open (doesn't loop because deps are stable)
  useEffect(() => {
    let alive = true;
    (async () => {
      if (isOpen && loadItemsOnOpen) {
        try {
          const loaded = await loadItemsOnOpen();
          if (alive && Array.isArray(loaded)) setInternalItems(loaded);
        } catch {
          // swallow errors
        }
      }
    })();
    return () => {
      alive = false;
    };
  }, [isOpen, loadItemsOnOpen]);

  const renderTitle = () =>
    title ? (typeof title === "function" ? title() : title) : (
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 13.5c.553 0 1-.448 1-1s-.447-1-1-1-1 .448-1 1 .447 1 1 1Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 13.5c.553 0 1-.448 1-1s-.447-1-1-1-1 .448-1 1 .447 1 1 1Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 13.5c.553 0 1-.448 1-1s-.447-1-1-1-1 .448-1 1 .447 1 1 1Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const options = Array.from(
      (e.currentTarget as HTMLUListElement).querySelectorAll<HTMLLIElement>('li[role="option"]')
    );
    const currentIndex = options.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (options[Math.min(options.length - 1, currentIndex + 1)] ?? options[0])?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      (options[Math.max(0, currentIndex - 1)] ?? options[options.length - 1])?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="icon-button"
        aria-label={ariaLabel ?? tooltip ?? "Open menu"}
        data-tooltip-id="dropdown-tooltip"
        data-tooltip-content={tooltip ?? undefined}
        onClick={() => setIsOpen((v) => !v)}
      >
        {renderTitle()}
      </button>

      {isOpen && (
        <ul
          role="listbox"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={`absolute top-full mt-2 right-0 z-20 w-fit whitespace-nowrap rounded-xl
                      shadow-xl bg-slate-500/5 dark:bg-white/5 backdrop-blur-md
                      divide-y divide-slate-500 dark:divide-slate-500 overflow-hidden
                      ${listClassName}`}
        >
          {internalItems.length === 0 ? (
            emptyContent ? (
              <li className="px-4 py-2 text-sm opacity-70">
                {emptyContent}
              </li>
            ) : null
          ) : (
            internalItems.map((item, index) => {
              const selected = initialValue === item.value;
              const base =
                `px-4 py-2 text-sm cursor-pointer hover:bg-[--action-hover-light] dark:hover:bg-[--action-hover-dark] ` +
                `focus:outline-none focus:bg-[--action-hover-light] dark:focus:bg-[--action-hover-dark] ` +
                `${selected ? "font-medium" : ""} ${itemClassName} ${item.className ?? ""}`;

              return (
                <li
                  key={index}
                  role="option"
                  aria-selected={selected}
                  tabIndex={0}
                  onClick={() => {
                    onSelect(item.value);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(item.value);
                      setIsOpen(false);
                    }
                  }}
                  className={base}
                >
                  {renderItem ? renderItem(item, index) : item.text}
                </li>
              );
            })
          )}
        </ul>
      )}

      <Tooltip id="dropdown-tooltip" />
    </div>
  );
}

export default Dropdown;
export type { DropdownProps };
