import PostForm from "./components/PostForm";
import PostList from "./components/PostList";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <PostForm />
      <PostList />
    </main>
  );
}
