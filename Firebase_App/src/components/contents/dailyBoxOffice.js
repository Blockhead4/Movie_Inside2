import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { recentMovieInfo } from "../../actions/movieInfo";
import DailyMovie from "./dailyMovie";

import apiKeys from "../config/apiKey";

const KEY = apiKeys.key4;

const DailyBoxOffice = props => {
  const [parsedRank, setParseRank] = useState([]);
  //어제날짜

  const dateInfo = () => {
    let nowDate = new Date();
    let yesterDate = nowDate.getTime() - 2 * 24 * 60 * 60 * 1000;
    nowDate.setTime(yesterDate);
    let dd = nowDate.getDate();
    let mm = nowDate.getMonth() + 1;
    let yyyy = nowDate.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    nowDate = yyyy.toString() + mm.toString() + dd.toString();
    return nowDate;
  };

  const getDailyMovie = async () => {
    let date = dateInfo();
    let url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${KEY}&targetDt=${date}`;
    let array = [];

    await axios
      .get(url)
      .then(response => {
        array.push(response.data.boxOfficeResult.dailyBoxOfficeList);
      })
      .catch(err => {
        console.log(err);
      });

    setParseRank(array[0]);

    return array[0];
  };

  const boxOfficeDetail = async () => {
    await getDailyMovie();
    // const dailyMovie = await getDailyMovie();
    // if (dailyMovie.length > 0) {
    //   dailyMovie.forEach(element => {
    //     function a() {
    //       props.recentMovieInfo(element.movieCd);
    //     }
    //     a();
    //   });
    // }
  };

  useEffect(() => {
    boxOfficeDetail();
  }, []);

  return <DailyMovie isUnMount={props.isUnMount} parsedRank={parsedRank} />;
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, { recentMovieInfo })(DailyBoxOffice);
