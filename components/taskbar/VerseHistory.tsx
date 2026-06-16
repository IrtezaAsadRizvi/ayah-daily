"use client";

import React, { useState } from "react";
import { BookOpenText } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import ProgressModal from "./ProgressModal";

const VerseHistory = () => {
  const tHeader = useTranslations("Header");
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-flex">
      <button
        type="button"
        className="icon-button"
        aria-label={tHeader("history")}
        data-tooltip-id="progress-tooltip"
        data-tooltip-content={tHeader("history")}
        onClick={() => setOpen(true)}
      >
        <BookOpenText />
      </button>
      <Tooltip id="progress-tooltip" />
      <ProgressModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default VerseHistory;
