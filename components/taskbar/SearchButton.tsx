"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useTranslations } from "next-intl";
import SearchModal from "./SearchModal";

const SearchButton = () => {
  const t = useTranslations("Tools");
  const [open, setOpen] = useState(false);

  return (
    <div className="inline-flex">
      <button
        type="button"
        className="icon-button"
        aria-label={t("search")}
        data-tooltip-id="search-tooltip"
        data-tooltip-content={t("search")}
        onClick={() => setOpen(true)}
      >
        <Search />
      </button>
      <Tooltip id="search-tooltip" />
      <SearchModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SearchButton;
