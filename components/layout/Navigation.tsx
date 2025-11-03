// components/layout/Navigation.tsx
import LanguageSwitch from "../taskbar/LanguageSwitch";
import DarkModeSwitch from "../taskbar/DarkModeSwitch";
import VerseHistory from "../taskbar/VerseHistory";
import Logo from "../common/Logo";

const Navigation: React.FC = () => {
  return (
    <nav className="border-b-[1px] border-black dark:border-slate-500">
      <div className="flex items-center justify-between py-4 pl-4 pr-2 max-w-[1280px] mx-auto">
        <div>
          <Logo />
        </div>
        <div className="flex">
          <VerseHistory/>
          <LanguageSwitch />
          <DarkModeSwitch />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
