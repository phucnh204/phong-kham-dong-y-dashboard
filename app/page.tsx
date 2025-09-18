import "./globals.css";
// import Script from "next/script";
import Header from "@/components/clientLayouts/Header";
import Navbar from "@/components/clientLayouts/Navbar";
import Footer from "@/components/clientLayouts/Footer";
import Hero from "@/components/clientLayouts/Hero";
import BannerSection from "@/components/clientLayouts/BannerSection";
import About from "@/components/clientLayouts/About";
import ServiceGrid from "@/components/clientLayouts/ServiceGrid";

export const metadata = {
  title: "Phòng Khám Đông Y Cần Thơ",
  description: "Phòng khám chuyên nghiệp, đặt lịch dễ dàng, bác sĩ tận tâm.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Header */}
      <Header />
      {/*  */}
      {/* Navbar */}
      <Navbar />
      <Hero />
      <About />
      <ServiceGrid />
      {/* <BannerSection /> */}
      {/* Main content area */}
      <main>{children}</main>
      {/* Footer */}
      <Footer />
      {/* Optional: External Scripts */}
      {/* <Script src="path-to-your-script.js" strategy="lazyOnload" /> */}
    </>
  );
}
