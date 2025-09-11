import { type ReactNode, useState } from "react";

import { Link } from "react-router";

import { useQuery } from "@tanstack/react-query";

import ButtonComponent from "@/components/button/button.component";
import CarouselComponent from "@/components/carousel/carousel.component";
import TypographyComponent from "@/components/typography/typography.component";

import styles from "./categories.module.css";

export default function CategorySection(): ReactNode {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSelectCategory = (categoryId: string): void => {
    setSelectedCategories((old) => [...old, categoryId]);
  };

  const setVariant = (categoryId: string) => {
    const index = selectedCategories.findIndex((id) => id === categoryId);
    return index >= 0 ? "solid" : "outlined";
  };

  const { data: categories } = useQuery({
    queryKey: ["categories-section"],
  });

  return (
    <div className={styles["categories-section"]}>
      <header>
        <TypographyComponent variant="h3">Category</TypographyComponent>
        <Link to="#" className="h3">
          See All
        </Link>
      </header>
      <CarouselComponent slideBlockSize="10rem" slideInlineSize="17.5rem">
        {categories.map((category) => (
          <ButtonComponent
            key={category.id}
            variant={() => setVariant(category.id)}
            onClick={() => handleSelectCategory(category.id)}
          >
            {category.title}
          </ButtonComponent>
        ))}
      </CarouselComponent>
    </div>
  );
}
