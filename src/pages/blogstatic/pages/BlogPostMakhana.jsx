import React from 'react';

const BlogPostMakhana = () => {
    return (
        <div className="container my-5">
            <h1 className="mb-4 display-5">Makhana – The Superfood You Need to Know About</h1>

            <div className="text-center mb-4">
                <img
                    src="/images/LotusSeeds.png"
                    alt="Foxnut Feast Makhana by UDDARA"
                    className="img-fluid rounded shadow"
                    style={{ maxWidth: "700px", height: "auto" }}
                />
                <small className="d-block mt-2 text-muted">
                    Product Image: <strong>Foxnut Feast by UDDARA</strong>
                </small>
            </div>

            <section className="mb-4">
                <h2 className="h4 mb-2">Introduction</h2>
                <p>
                    In recent years, health-conscious consumers around the world have turned their attention to traditional, nutrient-rich foods—and Makhana (foxnuts) has emerged as a standout superfood.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="h4 mb-2">What is Makhana?</h2>
                <p>
                    Makhana, also known as foxnuts or lotus seeds, is a plant-based snack derived from the <em>Euryale ferox</em> plant. For centuries, it has been a staple in Indian households and Ayurvedic diets.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="h4 mb-2">Nutritional Benefits</h2>
                <ul className="list-unstyled ps-3">
                    <li>• Rich in protein and fiber</li>
                    <li>• Low in cholesterol and saturated fats</li>
                    <li>• Contains essential minerals like magnesium, potassium, and phosphorus</li>
                    <li>• A natural source of antioxidants</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="h4 mb-2">Why Choose Makhana?</h2>
                <p>
                    Whether you’re looking for a light, crunchy snack or a wholesome addition to your diet, makhana is a guilt-free, healthy alternative to processed snacks.
                </p>
            </section>

            <section>
                <h2 className="h4 mb-2">Closing Thought</h2>
                <p>
                    At <strong>UDDARA</strong>, we bring you premium-quality raw and flavoured makhana under the Brand Name <strong>“Foxnut Feast”</strong>, sourced from trusted farmers, packed with care to retain freshness and nutrition. Experience the superfood revolution—naturally.
                </p>
            </section>
        </div>
    );
};

export default BlogPostMakhana;
