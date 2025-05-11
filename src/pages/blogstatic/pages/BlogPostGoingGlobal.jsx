import React from 'react';

const BlogPostGoingGlobal = () => {
  return (
    <div className="container my-5 px-3 px-md-5">
      <h1 className="mb-4 display-5 text-center text-md-start">
        Makhana Goes Global: From Indian Tradition to International Superfood
      </h1>

      <div className="text-center mb-4">
        <img
          src="/images/GoingGlobal.png" // Replace with your image
          alt="Makhana Goes Global"
          className="img-fluid rounded shadow"
          style={{ maxWidth: "100%", maxHeight: "500px", objectFit: "contain" }}
        />
        <small className="d-block mt-2 text-muted">
          India’s Makhana Revolution, Now Worldwide
        </small>
      </div>

      <section className="mb-4">
        <h2 className="h4 mb-2">Introduction</h2>
        <p>
          Makhana, also known as foxnuts or lotus seeds, is no longer just a traditional Indian snack—it has now emerged as a global superfood, celebrated for its exceptional nutritional profile and natural health benefits. As the world shifts toward cleaner, healthier eating, Makhana is winning hearts and shelves across countries.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-2">Government Recognition and GI Tag</h2>
        <p>
          With the Indian government’s increasing emphasis on makhana cultivation and its recent Geographical Indication (GI) tag awarded to the Mithila region, makhana is receiving the recognition it deserves. This GI tag not only highlights its regional authenticity but also supports rural farmers and boosts export potential.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-2">Why Makhana is in Global Demand</h2>
        <ul className="list-unstyled ps-3">
          <li>• Gluten-Free & Plant-Based</li>
          <li>• Non-GMO and All-Natural</li>
          <li>• Rich in Calcium & Antioxidants</li>
          <li>• Low in Calories, High in Nutrition</li>
          <li>• Protein and Fiber Packed</li>
        </ul>
        <p>
          These traits make makhana a perfect fit for modern diets—whether it’s vegan, keto, or just clean eating.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="h4 mb-2">UDDARA’s Role in Taking Makhana to the World</h2>
        <p>
          At <strong>UDDARA</strong>, we take pride in delivering premium-grade makhana to global markets. Our range of raw and flavored foxnuts is carefully processed and packaged under the brand name <strong>“Foxnut Feast”</strong> to preserve freshness, taste, and nutrition—ensuring every bite is healthy and wholesome.
        </p>
      </section>
    </div>
  );
};

export default BlogPostGoingGlobal;
