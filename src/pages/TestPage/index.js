import React, { useState } from "react";
import { v5 as uuid } from "uuid";

const TestPage = () => {
  // State
  const [data, setData] = useState(Data);
  // Temp State
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const addPost = () => {
    if (title && content) {
      // create new post object
      let newPost = {
        id: uuid(),
        title: title,
        content: content,
      };
      // merge new post with copy of old state
      let posts = [...data, newPost];
      // push new object to state
      setData(posts);

      // update write to json file
      saveJson(posts);
    }
  };

  const saveJson = (posts) => {
    const url = "http://localhost:5000/write";
    fetch.post(url, posts).then((response) => {
      console.log(response);
    });
  };

  return (
    <>
      <h1>Test Page</h1>
      <div>
        <h4>Add New Post</h4>
        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button onClick={addPost}>Add Post</button>
      </div>
    </>
  );
};

export default TestPage;
