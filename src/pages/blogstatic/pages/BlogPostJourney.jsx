import React from 'react';

const BlogPostJourney = () => {
  return (
    <div className="container my-5 px-3 px-md-5">
      <h1 className="mb-4 display-5 text-center text-md-start">
        The Journey of Makhana: From Pond to Package
      </h1>

      <div className="text-center mb-4">
        <img
          src="/images/Journey.png"
          alt="Journey of Makhana"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "100%", height: "auto", maxHeight: "500px", objectFit: "contain" }}
        />
        <small className="d-block mt-2 text-muted">
          Makhana Harvest: From Water to Wonder
        </small>
      </div>

      {[
        {
          title: 'Introduction',
          text: `Ever wondered what goes into delivering that crunchy makhana you enjoy with your evening tea? Let us take you behind the scenes of makhana production and how UDDARA brings it from the pond to your plate.`,
        },
        {
          title: 'Step 1: Harvesting the Seeds',
          text: `Makhana is harvested from the water bodies where the lotus plant grows. Skilled farmers manually collect the seeds—a process rooted in generations of traditional knowledge.`,
        },
        {
          title: 'Step 2: Processing and Grading',
          text: `Once harvested, the seeds are dried, roasted, and popped. At UDDARA, we ensure every batch is carefully sorted and graded for size, texture, and quality.`,
        },
        {
          title: 'Step 3: Flavoring and Packaging',
          text: `For flavoured variants, natural seasonings are added to create a range of tastes without compromising on health. The final product is hygienically packed to preserve freshness.`,
        },
        {
          title: 'Step 4: Exporting with Care',
          text: `Every shipment is managed with precision, meeting all global export standards so our customers get the best every time.`,
        },
        {
          title: 'Closing Thought',
          text: `It’s not just a snack—it’s a story of tradition, quality, and care. And at UDDARA, we’re proud to bring that story to the world under our flagship product “Foxnut Feast”.`,
        },
      ].map((section, idx) => (
        <section key={idx} className="mb-4">
          <h2 className="h4 mb-2">{section.title}</h2>
          <p>{section.text}</p>
        </section>
      ))}
    </div>
  );
};

export default BlogPostJourney;
