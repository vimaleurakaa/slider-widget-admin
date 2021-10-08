import React from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const TestPage = () => {
  const addPost = () => {
    const imgData = "image-address-3";
    const contentData = "<h2>Submit all your 3</h2>";

    const destination = {
      agent: 1,
      insurer: 1,
      me: 1,
      partner: 0,
      plus: 0,
      portal: 1,
    };

    const sliderData = {
      id: uuid(),
      c: contentData,
      i: imgData,
      d: { ...destination },
      pd: new Date().toLocaleString(),
    };

    const url = process.env.REACT_APP_SERVER_HOST + "api/v1/data";
    axios.get(url).then(({ data }) => {
      console.log(data);
      sendData(data, sliderData);
    });
  };

  const sendData = (prevData, newData) => {
    const url = process.env.REACT_APP_SERVER_HOST + "write";
    const data = [...prevData, newData];

    axios
      .post(url, data)
      .then(({ data }) => {
        console.log("Success", data?.status);
      })
      .catch((err) => {
        console.log("Success", data?.status);
      });
  };

  return (
    <>
      <h1>Test Page</h1>
      <div>
        {/* <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} /> */}
        <br />
        {/* <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea> */}
        <br />
        <button className="btn btn--primary" onClick={addPost}>
          Send Data
        </button>
      </div>
    </>
  );
};

export default TestPage;
