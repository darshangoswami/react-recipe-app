import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem("veggie");

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();

      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      console.log(data);
      setVeggie(data.recipes);
    }
  };

  return (
    <Wrapper>
      <h3>Our Vegeterian Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: "5rem",
        }}
      >
        {veggie.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={"/recipe/" + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  max-height: 25rem;
  overflow: hidden;
  position: relative;
  border-radius: 2rem;

  img {
    border-radius: 2rem;
    object-fit: cover;
    position: absoulute;
    left: 0;
    width: 100%;
    height: 100%;
  }

  p {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 0.8rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
