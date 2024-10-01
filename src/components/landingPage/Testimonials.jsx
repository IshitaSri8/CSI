import React from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import { loremIpsum } from "lorem-ipsum";
import Vishal from "../../assets/vishal.png";
import quotation from "../../assets/quotation-mark.png";
import "./Landing.css";
import image from "../../assets/image.png";
import Sonika from "../../assets/Sonika.png";

const text = loremIpsum({
  count: 6, // Number of sentences or paragraphs
  format: "plain", // Plain text or HTML
  units: "sentences", // Generate paragraphs, words, or sentences
});

// Dummy data for testimonials
const testimonials = [
  {
    name: "IAS Vishal Singh",
    position:
      "Municipal Commissioner and Vice Chairman of the Ayodhya Development Authority",
    testimonial:
      "I am proud to announce our strategic collaboration with Arahas Technologies. We have signed a MoU with this Gurugram-based AI and geospatial IT specialist to develop the Vedic Sustainable City Index for Ayodhya. This groundbreaking project aims to revolutionize urban sustainability and is backed by a $1 million investment from Arahas in its first phase.",
    image: Vishal,
  },
  {
    name: "Avin Jain",
    position:
      "Founder, CEO at BDB-D&A Platform with DataOps/MLOps/AI/GenAI/Viz",
    testimonial:
      "This is interesting - Never heard of such kind of initiative in the past. With the kind of attention and growth Ayodhya will see in next decade, the success of this initiative is Mandatory. Indian Tech is matured enough to give unique contribution in this project. All the best Saurabh Rai & team.",
    image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  },
  {
    name: "Manvendra Pratap Singh",
    position: "Sustainability Learner and Practitioner",
    testimonial:
      "Great news where an Indian company is taking sustainability index to it's real meaningful approach. Love to see the indicators used for indexing. Kudos to ARAHAS TECHNOLOGIES",
    image: image,
  },
  {
    name: "Sonika Seth",
    position: "Managing Director at P J Networks Pvt Ltd",
    testimonial:
      "As someone who strongly believes in the power of sustainable urban development, I am thrilled to hear about the Vedic Sustainable City Index for Ayodhya. The way you are leveraging AI algorithms and geospatial analytics to cover all aspects of sustainability - environmental, societal, economic, and governance, is commendable. Also, your goal to transform Ayodhya into a city that embodies the United Nations Sustainable Development Goals speaks volumes about your vision. I am eager to see Ayodhya setting an example for cities across the globe by demonstrating how sustainable development principles can keep pace with modern technology to create a resilient urban environment.",
    image: Sonika,
  },
];

// Template for individual testimonial cards
const testimonialTemplate = (testimonial) => {
  return (
    <Card
      className="mb-4"
      style={{ backgroundColor: "#E9F3F5", borderRadius: "1.5rem" }}
    >
      <div className=" flex h-18rem  flex-column justify-content-between align-item-center">
        {" "}
        {/* Testimonial Row */}
        <div className="flex flex-column justify-content-center align-items-center">
          <p
            className="text-base text-left font-regular"
            style={{ color: "#101828" }}
          >
            "{testimonial.testimonial}"
          </p>
        </div>
        {/* Info Row */}
        <div className="flex flex-row align-items-center justify-content-start gap-4">
          {/* Photo Column */}
          <div className="flex align-items-start justify-content-between">
            <img
              src={testimonial.image}
              alt={`${testimonial.name}-profile`}
              style={{
                borderRadius: "50%",
                width: "3.5rem",
                height: "3.5rem",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Name and Position Column */}
          <div className="flex flex-column align-items-start justify-content-start">
            <p
              className="text-base font-semibold"
              style={{ marginBottom: "-0.25rem", color: "#101828" }}
            >
              {testimonial.name}
            </p>
            <p
              className="text-sm text-left"
              style={{ marginTop: "0.4rem", color: "#101828" }}
            >
              {testimonial.position}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Testimonials = () => {
  return (
    <div className="flex w-full align-items-center justify-content-center gap-6 px-5">
      {/* Row with heading and carousel */}
      {/* Heading Column */}
      <div className="flex justify-content-start">
        <div className="flex flex-column">
          <img
            src={quotation}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <h1 className="text-4xl mb-5">Testimonials about our work</h1>
        </div>
      </div>

      {/* Carousel Column */}

      <Carousel
        value={testimonials}
        itemTemplate={testimonialTemplate}
        numVisible={1}
        numScroll={1}
        circular
        autoplayInterval={10000}
      />
    </div>
  );
};

export default Testimonials;
