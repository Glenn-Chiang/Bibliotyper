import { Link } from "react-router-dom";
import { Category, categories } from "../lib/constants";

export default function Home() {
  return (
    <main className="flex flex-col gap-4">
      <h1>Categories</h1>
      <ul className="flex flex-col gap-2">
        {categories.map((category) => (
          <CategoryLink key={category.id} category={category} />
        ))}
      </ul>
    </main>
  );
}

const CategoryLink = ({ category }: { category: Category }) => {
  return (
    <Link to={`/categories/${category.id}`} className="capitalize">
      {category.name}
    </Link>
  );
};
