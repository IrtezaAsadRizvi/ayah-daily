import Navigation from "../navigation/Navigation";

export default function SiteLayout({ children }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
    </>
  );
}