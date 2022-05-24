import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import { setLoading, getAllLessons } from '../../store/actions';
import { month } from './define';
const CustomChart = (props) => {
  const { lessons, country, camp, school } = props;
  const randomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return '#' + randomColor;
  };
  const history = useHistory();
  //chart setup
  const months = month;

  let dataSets = [];

  const data = {
    labels: months,
    datasets: dataSets,
  };
  // function for filtered lessons due to selecting camp and school
  const filteredLessons = lessons.filter((item) => {
    let result;
    if (school === undefined || school === 'Show All') {
      result =
        item.country.indexOf(country) >= 0 && item.camp.indexOf(camp) >= 0;
    } else {
      result =
        item.country.indexOf(country) >= 0 &&
        item.camp.indexOf(camp) >= 0 &&
        item.school.indexOf(school) >= 0;
    }
    return result;
  });
  //function for filtered the lessons depend on selecting school
  const lessonInSelectedSchool = filteredLessons
    .map((item) => item.school)
    .reduce((accumulator, value) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
    }, {});
  let allSchoolsObj = new Set(lessons.map((a) => a.school));
  const allSchoolsArr = Array.from(allSchoolsObj);
  let groupedSchools = [];
  for (let i = 0; i < allSchoolsArr.length; i++) {
    groupedSchools.push(
      filteredLessons.filter((item) => {
        return item.school.indexOf(allSchoolsArr[i]) >= 0;
      })
    );
    if (groupedSchools[i].length !== 0) {
      let arrMonths = [];
      let arrLessons = [];
      for (let j = 0; j < groupedSchools[i].length; j++) {
        arrMonths.push(groupedSchools[i][j].month);
        arrLessons.push(groupedSchools[i][j].lessons, groupedSchools[i][j].id);
      }
      dataSets.push({
        data: arrLessons,
        fill: false,
        borderColor: randomColor(),
        pointBorderWidth: 2,
        spanGaps: true,
        pointBackgroundColor: '#ffffff',
      });
    }
  }
  useEffect(() => {
    getAllLessons();
  }, []);
  // Jsx for render chart and the list
  return (
    <>
      {/* if select school doesn’t have data render h1  */}
      {filteredLessons.length === 0 ? (
        <h1>No Lessons for this School ,Please Choose another school.</h1>
      ) : (
        <div className="row customChart">
          <div className="col-12 col-md-8">
            <p className="bold small">No of lessons</p>
            <Line
              data={data}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                // when select item to go to lessonDatails
                onClick: function (evt, element) {
                  if (element.length > 0) {
                    let lineArr = data.datasets[element[0].datasetIndex].data;
                    let selectedPoint =
                      data.datasets[element[0].datasetIndex].data[
                        element[0].index
                      ];
                    let selectedId =
                      lineArr[lineArr.indexOf(selectedPoint) + 1];
                    history.push({
                      pathname: `/dashboard/${selectedId}`,
                      state: { prevdata: { country, camp, school } },
                    });
                  }
                },
              }}
            />
          </div>
          {/* render the list beside the chart */}
          <div className="col-12 col-md-4 countLessons">
            <div className="totalCount">
              <h5>
                <span className="bold">{filteredLessons.length}</span> Lessons
              </h5>
              <span className="thin smallFont">
                In {filteredLessons[0].country}
              </span>
            </div>
            {Object.entries(lessonInSelectedSchool).map(([key, val]) => (
              <div key={key} className="lessonsPerSchool">
                <div>
                  <i className="fa-solid fa-circle-dot"></i>
                </div>
                <div>
                  <p>
                    <span className="bold">{val}</span> Lessons
                  </p>
                  <span className="thin smallFont">In {key}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.lessonReducer.loading,
    lessons: state.lessonReducer.lessons,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: () => dispatch(setLoading()),
    getAllLessons: () => dispatch(getAllLessons()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomChart);
