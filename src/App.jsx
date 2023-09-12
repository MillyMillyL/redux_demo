import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "./features/postsSlice";
import { useQuery } from "@tanstack/react-query";

import { getPosts } from "./features/postsSlice";

function App() {
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // const { refetch, data, isSuccess } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: () =>
  //     fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
  //       res.json()
  //     ),
  //   enabled: false,
  // });
  if (posts.status === "pending") return <div>loading...</div>;
  const handleClick = async () => {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then((res) => res.json())
    //   .then((data) => dispatch(setPosts({ data })));

    dispatch(getPosts());
    //dispatch(setPosts({ data }));
    //dispatch(setPosts({ data: [{ id: 1, title: "manually" }] }));
  };

  return (
    <>
      <h1>App</h1>
      <button onClick={handleClick}>Get Data</button>
      <hr />
      {posts.data.length > 0 &&
        posts.data.map((post) => <div key={post.id}>{post.title}</div>)}
    </>
  );
}

export default App;
