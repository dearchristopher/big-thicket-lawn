
import { Contact } from "./components/Contact";
// import { Quote } from "./components/Quote";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Hero } from "./components/Hero";
import { ContactLayout } from "./components/ContactLayout";
import { Quote } from "./components/Quote";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <ContactLayout>
        <Quote />
        <Contact />
      </ContactLayout>
    </div>
  );
}
