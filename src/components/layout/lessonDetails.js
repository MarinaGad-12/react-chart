import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getLessonById } from '../../store/actions/lessonAction';
import Spinner from './spinner';
const LessonDetails = (props) => {
  const { getLessonById, lesson } = props;
  const { id } = useParams();
  useEffect(() => {
    getLessonById(id);
  }, [getLessonById, id]);
  return (
    <>
      {/* if there isn’t lesson render spinner */}
      {lesson === null ? (
        <Spinner />
      ) : (
        // content of component of lessonDetails
        <div className="container-fluid wrapper">
          <div className="header">
            <h2 className="title pt-4">Lesson Details</h2>
          </div>
          <div className="details row">
            <div className="col-12 col-md-6">
              <div>
                <span className="title meduim">ID: </span>
                <span className="data">{lesson.id}</span>
              </div>
              <div>
                <span className="title meduim">month: </span>
                <span className="data">{lesson.month}</span>
              </div>
              <div>
                <span className="title meduim">camp: </span>
                <span className="data">{lesson.camp}</span>
              </div>
              <div>
                <span className="title meduim">country: </span>
                <span className="data">{lesson.country}</span>
              </div>
              <div>
                <span className="title meduim">school: </span>
                <span className="data">{lesson.school}</span>
              </div>
              <div>
                <span className="title meduim">lessons: </span>
                <span className="data">{lesson.lessons}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.lessonReducer.loading,
    error: state.lessonReducer.error,
    lesson: state.lessonReducer.lesson,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLessonById: (id) => dispatch(getLessonById(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LessonDetails);
