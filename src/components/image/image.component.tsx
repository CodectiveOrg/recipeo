import type { ComponentProps, ReactNode } from "react";

type Folder = "user" | "featured" | "recipe" | "step";

const placeholders: Record<Folder, string> = {
  user: "/placeholders/user.webp",
  featured: "/placeholders/featured.webp",
  recipe: "/placeholders/recipe.webp",
  step: "/placeholders/step.webp",
};

type Props = Omit<ComponentProps<"img">, "src"> & {
  folder: Folder;
  src: string | null;
};

export default function ImageComponent({
  folder,
  src,
  ...otherProps
}: Props): ReactNode {
  const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/public/picture/${folder}`;

  const source = src ? `${baseUrl}/${src}` : placeholders[folder];

  return (
    <img
      src={source}
      onError={(e) => {
        e.currentTarget.src = placeholders[folder];
      }}
      {...otherProps}
    />
  );
}
