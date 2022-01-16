import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

//다음 검색 시험 시험삼아서.
//promise async await
const API_KEY = "ca7d10e2f335b6831a969424ddb22c1a";

function App() {
  //HTTP상태 코드
  const [result, resultChange] = useState("");
  //실제 검색 결과
  const [contents, contentsChange] = useState([]);

  useEffect(() => {
    //실제 검색API를 실행하고, 결과를 확인.
    axios
      .get("https://dapi.kakao.com/v2/search/image", {
        params: {
          query: "그해우리는",
        },
        headers: {
          Authorization: `KakaoAK ${API_KEY}`,
        },
      })
      .then((res) => {
        resultChange(res.status);
        contentsChange(res.data.documents);
      });
  });
  return (
    <div className="App">
      <h4>HTTP 상태 코드</h4>
      <div>{result}</div>
      <hr />
      {contents.map((dt) => {
        return (
          <div>
            <img src={dt.thumbnail_url}></img>
            <div>{dt.datetime}</div>
            <hr />
          </div>
        );
      })}
    </div>
    //useEffect:class -> render() 이후에 실행된다. 화면에 그려진 후 실행되는.
  );
}

export default App;
