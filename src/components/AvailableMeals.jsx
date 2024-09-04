import { useState } from "react";
import useHttp from "../hooks/useHttp";
import Meal from "./Meal";
import Button from "./UI/Button";

const requestConfig = {};

export default function AvailableMeals() {
  const [filter, setFilter] = useState("All");
  const {
    data: availableMeals,
    loading: isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  // console.log(availableMeals);

  function handleFilterSelection(selection) {
    console.log(selection);
    setFilter(selection);
  }

  function displayMeals() {
    if (filter !== "All") {
      const filteredMeals = availableMeals.filter(
        (meal) => meal.category === filter
      );
      return filteredMeals.map((meal) => <Meal key={meal.id} meal={meal} />);
    } else {
      return availableMeals.map((meal) => <Meal key={meal.id} meal={meal} />);
    }
  }

  if (error) {
    return (
      <p className="mt-4 text-center text-xl font-bold">
        Oops! An error occurred fetching the available meals. Please, try again
        later...
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-center text-primary">Fetching available meals...</p>
    );
  }

  return (
    <>
      <div className="hidden w-full mx-auto lg:flex lg:justify-center lg:items-center lg:space-x-4">
        <Button
          onClick={() => handleFilterSelection("All")}
          className={filter === "All" ? `btn-filter bg-primary` : `btn-filter`}
        >
          All
        </Button>
        <Button
          onClick={() => handleFilterSelection("Pasta & Pizza")}
          className={
            filter === "Pasta & Pizza" ? `btn-filter bg-primary` : `btn-filter`
          }
        >
          Pasta & Pizza
        </Button>
        <Button
          onClick={() => handleFilterSelection("Burgers & Sandwiches")}
          className={
            filter === "Burgers & Sandwiches"
              ? `btn-filter bg-primary`
              : `btn-filter`
          }
        >
          Burgers & Sandwiches
        </Button>
        <Button
          onClick={() => handleFilterSelection("Salads & Bowls")}
          className={
            filter === "Salads & Bowls" ? `btn-filter bg-primary` : `btn-filter`
          }
        >
          Salads & Bowls
        </Button>
        <Button
          onClick={() => handleFilterSelection("Meat & Seafood")}
          className={
            filter === "Meat & Seafood" ? `btn-filter bg-primary` : `btn-filter`
          }
        >
          Meat & Seafood
        </Button>
        <Button
          onClick={() => handleFilterSelection("Desserts")}
          className={
            filter === "Desserts" ? `btn-filter bg-primary` : `btn-filter`
          }
        >
          Desserts
        </Button>
      </div>
      <ul className="mt-4 mx-auto p-4 w-[90%] max-w-[70rem] list-none grid grid-cols-meals gap-4">
        {displayMeals()}
      </ul>
    </>
  );
}
