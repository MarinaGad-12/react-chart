import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setLoading, getAllLessons } from '../../store/actions/index';
import CustomChart from './chart';
import Spinner from './spinner';
const Dashboard = (props) => {
  const { getAllLessons, loading, Countries, camps, schools } = props;
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedCamp, setSelectedCamp] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  useEffect(() => {
    if (props.location.state) {
      setSelectedCountry(props.location.state.prevdata.country);
      setSelectedCamp(props.location.state.prevdata.camp);
      setSelectedSchool(props.location.state.prevdata.school);
    }
  }, [props.location.state]);
  useEffect(() => {
    getAllLessons();
  }, [getAllLessons, selectedCountry, selectedCamp, selectedSchool]);
  //functions to handle changing in country ,camp ,school
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };
  const handleCampChange = (e) => {
    setSelectedCamp(e.target.value);
  };
  const handleSchoolChange = (e) => {
    setSelectedSchool(e.target.value);
  };
  return (
    <>
      {/* spinner show while data is loading */}
      {loading === true ? (
        <Spinner />
      ) : (
        <div className="container-fluid wrapper">
          <div className="header">
            <h2 className="title mb-3 pt-4"> Analysis Chart</h2>
            <h4 className="subTitle mb-4">Number of lessons</h4>
          </div>
          {/* filter form */}
          <div className="filteration">
            <div className="row">
              <div className="col-6 col-md-4">
                <label htmlFor="country">Select Country</label>
                <select
                  id="country"
                  onChange={handleCountryChange}
                  defaultValue={'DEFAULT'}
                >
                  {Countries.map((country, index) =>
                    props.location.state !== undefined ? (
                      props.location.state.prevdata.country ===
                      country.country ? (
                        <option key={country.id} value={'DEFAULT'}>
                          {country.country}
                        </option>
                      ) : (
                        <option key={country.id}>{country.country}</option>
                      )
                    ) : (
                      <option key={country.id}>{country.country}</option>
                    )
                  )}
                </select>
              </div>
              <div className="col-6 col-md-4">
                <label htmlFor="camp">Select Camp</label>
                <select
                  id="camp"
                  onChange={handleCampChange}
                  defaultValue={'DEFAULT'}
                >
                  {camps.map((camp, index) =>
                    props.location.state !== undefined ? (
                      props.location.state.prevdata.camp === camp.camp ? (
                        <option key={camp.id} value={'DEFAULT'}>
                          {camp.camp}
                        </option>
                      ) : (
                        <option key={camp.id}>{camp.camp}</option>
                      )
                    ) : (
                      <option key={camp.id}>{camp.camp}</option>
                    )
                  )}
                </select>
              </div>
              <div className="col-6 col-md-4">
                <label htmlFor="school">select school</label>
                <select
                  id="school"
                  onChange={handleSchoolChange}
                  defaultValue={'DEFAULT'}
                >
                  <option>Show All</option>

                  {schools.map((school, index) =>
                    props.location.state !== undefined ? (
                      props.location.state.prevdata.school === school.school ? (
                        <option key={school.id} value={'DEFAULT'}>
                          {school.school}
                        </option>
                      ) : (
                        <option key={school.id}>{school.school}</option>
                      )
                    ) : (
                      <option key={school.id}>{school.school}</option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>
          {/* chart  */}
          <div className="chart">
            <CustomChart
              country={selectedCountry || Countries[0].country}
              camp={selectedCamp || Countries[0].camp}
              school={selectedSchool}
            ></CustomChart>
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
    Countries: state.lessonReducer.lessons.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.country).indexOf(obj.country) === pos;
    }),
    camps: state.lessonReducer.lessons.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.camp).indexOf(obj.camp) === pos;
    }),
    schools: state.lessonReducer.lessons.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.school).indexOf(obj.school) === pos;
    }),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: () => dispatch(setLoading()),
    getAllLessons: () => dispatch(getAllLessons()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
