import SiteNavbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavbar />
      {children}
      <Footer />
    </>
  );
}