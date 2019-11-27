import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { recentMovieInfo } from "../../actions/movieInfo";
import DailyMovie from "./dailyMovie";
import axios from "axios";

const KEY = "918fb53581a78bbd50069905bb10fc8c";
// key1 = "430156241533f1d058c603178cc3ca0e"
// key2 = "843263a42ef422fedcc5a1abcbbfbaa7"
// key3 = "6c3bac1836c5bf83e8beef288cbd5665"
// key4 = "918fb53581a78bbd50069905bb10fc8c"
// key5 = "8332302a9428957b49381ad9224573f8"
// key6 = "a5f5309f0deede1bdb13b312643e301a"
// key7 = "0c5654e287cf22b3a90d0fb7ad2115da"
// key8 = "987f0f206c93036e23e8b225a6382d24"
// key9 = "a3639b253586ed914a06659d53a62177"

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
    const dailyMovie = await getDailyMovie();
    if (dailyMovie.length > 0) {
      dailyMovie.forEach(element => {
        function a() {
          props.recentMovieInfo(element.movieCd);
        }
        a();
      });
    }
  };

  useEffect(() => {
    boxOfficeDetail();
  }, []);

  return <DailyMovie isUnMount={props.isUnMount} parsedRank={parsedRank} />;
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { recentMovieInfo }
)(DailyBoxOffice);
