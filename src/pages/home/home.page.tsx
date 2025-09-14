import { type ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import RecipeCardComponent from "@/components/recipe-card/recipe-card.component";
import GreetingsSection from "@/sections/greetings/greetings.section.tsx";
import IngredientsSection from "@/sections/ingredients/ingredients.section.tsx";
import StepsSection from "@/sections/steps/steps.section.tsx";
import TagsSection from "@/sections/tags/tags.section.tsx";

import ButtonComponent from "@/components/button/button.component.tsx";
import CarouselComponent from "@/components/carousel/carousel.component.tsx";
import FeaturedRecipeCardComponent from "@/components/featured-recipe-card/featured-recipe-card.component.tsx";
import IconComponent from "@/components/icon/icon.component.tsx";
import ImageInputComponent from "@/components/image-input/image-input.component.tsx";
import PasswordInputComponent from "@/components/password-input/password-input.component.tsx";
import RangeInputComponent from "@/components/range-input/range-input.component";
import SearchInputComponent from "@/components/search-input/search-input.component";
import SuccessModalComponent from "@/components/success-modal/success-modal.component.tsx";
import TabsComponent from "@/components/tabs/tabs.component.tsx";
import TextInputComponent from "@/components/text-input/text-input.component.tsx";
import TypographyComponent from "@/components/typography/typography.component.tsx";

import { Ingredient } from "@/entities/ingredient.ts";
import type { Recipe } from "@/entities/recipe.ts";

import { richFetch } from "@/utils/fetch.utils.ts";

import styles from "./home.module.css";

export default function HomePage(): ReactNode {
  const { data } = useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
      const data = await richFetch<Recipe[]>("/recipe/recent");

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data.result;
    },
  });

  return (
    <div className={styles.home}>
      <header>Header</header>
      <main>
        <TagsSection />
        <StepsSection steps={steps} />
        <br />
        <IngredientsSection ingredients={ingredients} />
        <br />
        <ButtonComponent onClick={openModal}>Open Modal</ButtonComponent>
        <SuccessModalComponent ref={modalRef} />
        <br />
        <TabsComponent tabs={tabs} />
        <br />
        <GreetingsSection userName="James Spader" />
        <br />
        <CarouselComponent slideBlockSize="10rem" slideInlineSize="17.5rem">
          <FeaturedRecipeCardComponent
            featured={{
              id: 1,
              picture: "",
              recipe,
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
          />
          <FeaturedRecipeCardComponent
            featured={{
              id: 2,
              picture: "",
              recipe,
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
          />
          <FeaturedRecipeCardComponent
            featured={{
              id: 3,
              picture: "",
              recipe,
              createdAt: new Date(),
              updatedAt: new Date(),
            }}
          />
        </CarouselComponent>
        <br />
        <ImageInputComponent />
        <br />
        <PasswordInputComponent />
        <br />
        <SearchInputComponent />
        <br />
        <ButtonComponent onClick={() => setValue((old) => old - 10)}>
          Decrement value
        </ButtonComponent>
        <ButtonComponent onClick={() => setValue((old) => old + 10)}>
          Increment value
        </ButtonComponent>
        <br />
        <RangeInputComponent
          min={10}
          max={60}
          value={value}
          onChange={(e) => setValue(+e.currentTarget.value)}
          label={
            <>
              <TypographyComponent variant="h2" color="text">
                Cooking Duration
              </TypographyComponent>
              <TypographyComponent variant="p1" color="text-secondary">
                (in minutes)
              </TypographyComponent>
            </>
          }
        />
        <br />
        <TypographyComponent variant="h1">Heading 1</TypographyComponent>
        <TypographyComponent variant="h2">Heading 2</TypographyComponent>
        <TypographyComponent variant="h3">Heading 3</TypographyComponent>
        <TypographyComponent variant="p1">Paragraph 1</TypographyComponent>
        <TypographyComponent variant="p2">Paragraph 2</TypographyComponent>
        <TypographyComponent variant="s">Small</TypographyComponent>
        <br />
        <TypographyComponent variant="h1" color="text-secondary">
          Heading 1
        </TypographyComponent>
        <TypographyComponent variant="h2" color="text-secondary">
          Heading 2
        </TypographyComponent>
        <TypographyComponent variant="h3" color="text-secondary">
          Heading 3
        </TypographyComponent>
        <TypographyComponent variant="p1" color="text-secondary">
          Paragraph 1
        </TypographyComponent>
        <TypographyComponent variant="p2" color="text-secondary">
          Paragraph 2
        </TypographyComponent>
        <TypographyComponent variant="s" color="text-secondary">
          Small
        </TypographyComponent>
        <br />
        <div>
          <TextInputComponent
            type="text"
            startAdornment={<IconComponent name="user-linear" />}
            placeholder="Placeholder"
          />
          <br />
          <TextInputComponent
            state="success"
            type="text"
            startAdornment={<IconComponent name="user-linear" />}
            endAdornment={<IconComponent name="check-read-linear" />}
            placeholder="Placeholder"
          />
          <br />
          <TextInputComponent
            state="error"
            type="text"
            startAdornment={<IconComponent name="user-linear" />}
            endAdornment={<IconComponent name="shield-warning-linear" />}
            placeholder="Placeholder"
          />
        </div>
        <br />
        <TypographyComponent
          as="p"
          ellipsis
          variant="p1"
          style={{ maxInlineSize: "40ch" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          accusantium architecto doloremque dolorum explicabo, impedit incidunt,
          ipsa reprehenderit saepe tempore tenetur vel.
        </TypographyComponent>
        <br />
        <TypographyComponent
          as="p"
          variant="p2"
          maxLines={3}
          style={{ maxInlineSize: "40ch" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
          accusantium architecto doloremque dolorum explicabo, impedit incidunt,
          ipsa reprehenderit saepe tempore tenetur vel.
        </TypographyComponent>
        <br />
        <div style={{ fontSize: "2rem" }}>
          <IconComponent name="home-smile-angle-bold" color="primary" />
          <IconComponent name="user-linear" color="primary" />
          <IconComponent name="settings-linear" color="primary" />
          <IconComponent name="eye-closed-linear" color="text" />
          <IconComponent
            name="lock-keyhole-minimalistic-unlocked-linear"
            color="text-secondary"
          />
          <IconComponent name="trash-bin-trash-linear" color="danger" />
        </div>
        <br />
        <Link to="/hello">Call Hello API</Link>
        <br />
        <div>
          <ButtonComponent onClick={() => toast("Wow so easy !")}>
            <IconComponent name="widget-linear" />
            Button
          </ButtonComponent>
        </div>
        <br />
        <TypographyComponent
          as="p"
          variant="p2"
          style={{ maxInlineSize: "40ch" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          atque autem consectetur dolorem eaque enim ex harum hic id illo labore
          libero magni, non obcaecati quibusdam sequi similique vitae
          voluptatem. Corporis est illum, natus porro quidem quos? Accusantium
          eos fugiat maiores nobis perferendis voluptatibus? A aperiam delectus,
          ea eum fuga harum illum, iste odit optio, sint unde vel voluptas
          voluptatibus. Accusantium consequuntur delectus et nostrum, officia
          sit unde! Ab aspernatur beatae consequuntur corporis delectus dicta
          distinctio dolore dolores eligendi enim exercitationem ipsam magni
          nesciunt nisi nobis omnis, praesentium provident quasi quo quos
          repellendus saepe tempore ullam velit voluptatibus. Dolorum,
          praesentium!
        </TypographyComponent>
        {data && (
          <>
            <RecipeCardComponent recipe={data[0]} />
            <RecipeCardComponent recipe={data[1]} />
            <RecipeCardComponent recipe={data[2]} />
          </>
        )}
      </main>
    </div>
  );
}
