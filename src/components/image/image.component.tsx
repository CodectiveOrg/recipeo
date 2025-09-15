import { type ComponentProps, type ReactNode, useRef } from "react";

type Folder = "user" | "featured" | "recipe" | "step";

const placeholders: Record<Folder, string> = {
  user: "/placeholders/user.svg",
  featured: "/placeholders/featured.webp",
  recipe: "/placeholders/recipe.webp",
  step: "/placeholders/step.webp",
};

type Props = Omit<ComponentProps<"img">, "src"> & {
  folder: Folder;
  src: string | null;
  alt: string;
};

export default function ImageComponent({
  folder,
  src,
  ...otherProps
}: Props): ReactNode {
  const hasErrorOccurred = useRef<boolean>(false);

  const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/public/picture/${folder}`;
  const source = src ? `${baseUrl}/${src}` : placeholders[folder];

  return (
    <img
      src={source}
      onError={(e) => {
        if (!hasErrorOccurred.current) {
          hasErrorOccurred.current = true;
          e.currentTarget.src = placeholders[folder];
        }
      }}
      {...otherProps}
    />
  );
}
