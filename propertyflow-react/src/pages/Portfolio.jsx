import { Link } from "react-router-dom";
import { Heading } from "../layout/Shared.jsx";

const work = [
  { title: "PropertyFlow", type: "Real estate platform", copy: "A property discovery and management app with saved listings, protected pages, and a dashboard." },
  { title: "React Forms", type: "Interactive UI", copy: "Reusable form fields with validation, inline errors, and clear loading feedback." },
  { title: "State Practice", type: "Application architecture", copy: "Context API and Redux Toolkit used together for shared session and property data." }
];

export default function Portfolio() {
  return <section className="page-section portfolio-page">
    <Heading eyebrow="PORTFOLIO" title={<>Selected <span>Work.</span></>}>A small portfolio demonstrating routed pages, reusable React components, and application state.</Heading>
    <section className="portfolio-intro">
      <div><span className="eyebrow">FRONTEND DEVELOPER</span><h2>Building thoughtful web experiences.</h2><p>This portfolio is part of the PropertyFlow learning project. Explore the work below or return to the property listings.</p><Link to="/properties" className="btn btn-primary">Explore PropertyFlow</Link></div>
      <div className="portfolio-mark" aria-hidden="true">PF</div>
    </section>
    <div className="portfolio-grid">{work.map((item,index)=><article className="portfolio-card" key={item.title}><span className="portfolio-number">0{index+1}</span><span className="eyebrow">{item.type}</span><h2>{item.title}</h2><p>{item.copy}</p><Link to={index===0?"/":"/dashboard"}>View project →</Link></article>)}</div>
    <section className="portfolio-contact"><div><span className="eyebrow">GET IN TOUCH</span><h2>Have a project in mind?</h2><p>Send a message through the enquiry page.</p></div><Link to="/enquiry" className="btn btn-primary">Contact me</Link></section>
  </section>;
}
