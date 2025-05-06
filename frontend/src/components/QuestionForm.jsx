import React, { useReducer } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  MenuItem,
  Select,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import ShortTextIcon from '@mui/icons-material/ShortText';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { questionReducer, initialState } from './questionReducer';

function QuestionForm() {
  const [questions, dispatch] = useReducer(questionReducer, initialState);

  const handleSelectAll = (e) => {
    dispatch({ type: 'SET_ALL_SELECTED', payload: e.target.checked });
  };

  const handleDeleteSelected = () => {
    dispatch({ type: 'DELETE_SELECTED' });
  };

  const handleEditSelected = () => {
    dispatch({ type: 'TOGGLE_EDIT' });
  };

  const handleQuestionTextChange = (index, value) => {
    dispatch({ type: 'CHANGE_QUESTION_TEXT', index, payload: value });
  };

  const handleOptionTextChange = (qIndex, optionIndex, value) => {
    dispatch({
      type: 'CHANGE_OPTION_TEXT',
      index: qIndex,
      payload: { optionIndex, text: value },
    });
  };

  const toggleSelect = (index) => {
    dispatch({ type: 'TOGGLE_SELECT', index });
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      questionText: 'New Question',
      questionType: 'radio',
      options: [
        { optionText: 'Option 1' },
        { optionText: 'Option 2' },
      ],
      open: true,
      required: false,
      selected: false,
      answerKey: '',
      points: 0,
      answerMode: false,
    };
    dispatch({ type: 'ADD_QUESTION', payload: newQuestion });
  };

  const toggleAnswerKeyMode = (index) => {
    dispatch({ type: 'TOGGLE_ANSWER_MODE', index });
  };

  const selectAnswerKey = (qIndex, optionText) => {
    dispatch({ type: 'SET_ANSWER_KEY', index: qIndex, payload: optionText });
  };

  const handlePointsChange = (qIndex, value) => {
    dispatch({ type: 'SET_POINTS', index: qIndex, payload: value });
  };

  const questionUI = () =>
    questions.map((question, index) => (
      <Accordion
        key={index}
        expanded={question.open}
        className={`my-3 border ${question.open ? 'border-primary' : ''}`}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id={`panel-header-${index}`}
        >
          <Checkbox
            checked={question.selected || false}
            onChange={() => toggleSelect(index)}
            onClick={(e) => e.stopPropagation()}
            className="me-2"
          />
          <Typography variant="h6" className="fw-semibold">
            {index + 1}. {question.questionText}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <div className="d-flex flex-column gap-3">
            <input
              type="text"
              className="form-control"
              placeholder="Question text"
              value={question.questionText}
              onChange={(e) => handleQuestionTextChange(index, e.target.value)}
            />

            <div className="d-flex align-items-center gap-2">
              <CropOriginalIcon style={{ fontSize: 20, color: '#673ab7' }} />
              <Select
                value={question.questionType}
                size="small"
                className="form-select"
                displayEmpty
                style={{ width: '200px' }}
                onChange={(e) => {
                  dispatch({
                    type: 'CHANGE_QUESTION_TYPE',
                    index: index,
                    payload: e.target.value,
                  });
                }}
              >
                <MenuItem value="text">
                  <ShortTextIcon style={{ fontSize: 18, marginRight: 5 }} />
                  Paragraph
                </MenuItem>
                <MenuItem value="checkbox">
                  <input
                    type="checkbox"
                    disabled
                    className="me-2"
                    style={{ marginTop: 2 }}
                  />
                  Checkbox
                </MenuItem>
                <MenuItem value="radio">
                  <input
                    type="radio"
                    disabled
                    className="me-2"
                    style={{ marginTop: 2 }}
                  />
                  Multiple Choice
                </MenuItem>
              </Select>
            </div>

            {/* Render Options */}
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="d-flex align-items-center gap-2">
                {question.questionType !== 'text' ? (
                  <input
                    type={question.questionType}
                    disabled
                    className="form-check-input mt-0"
                  />
                ) : (
                  <ShortTextIcon style={{ fontSize: 20, color: '#673ab7' }} />
                )}

                <input
                  type="text"
                  className="form-control"
                  placeholder="Option text"
                  value={option.optionText}
                  onChange={(e) =>
                    handleOptionTextChange(index, optionIndex, e.target.value)
                  }
                />

                <CropOriginalIcon style={{ fontSize: 20, color: '#673ab7' }} />
                <IconButton
                  size="small"
                  onClick={() => {
                    dispatch({
                      type: 'REMOVE_OPTION',
                      index: index,
                      payload: optionIndex,
                    });
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </div>
            ))}

            {/* Add Option Button */}
            {question.options.length < 5 && (
              <button
                className="btn btn-sm btn-outline-secondary w-auto mt-2"
                onClick={() => {
                  const newOptionText = `Option ${questions[index].options.length + 1}`;
                  dispatch({
                    type: 'ADD_OPTION',
                    index: index,
                    payload: newOptionText,
                  });
                }}
              >
                + Add Option
              </button>
            )}
          </div>

          {/* Answer Key Toggle */}
          <div className="mt-3 d-flex justify-content-end">
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => toggleAnswerKeyMode(index)}
            >
              {question.answerMode ? 'Done' : 'Answer Key'}
            </button>
          </div>

          {/* Answer Key Mode */}
          {question.answerMode && (
            <div className="mt-3 p-2 border rounded bg-light">
              <div className="mb-2">
                <label className="form-label fw-semibold">Select Correct Answer</label>
                {question.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="form-check"
                    onClick={() => selectAnswerKey(index, option.optionText)}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`answer-${index}`}
                      checked={question.answerKey === option.optionText}
                      readOnly
                    />
                    <label className="form-check-label">
                      {option.optionText}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <label className="form-label fw-semibold">Points</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Points"
                  value={question.points}
                  onChange={(e) => handlePointsChange(index, e.target.value)}
                  min="0"
                />
              </div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    ));

  return (
    <div style={{ backgroundColor: '#f0ebf8', minHeight: '100vh' }}>
      <div style={{ height: '8px', backgroundColor: '#673ab7' }}></div>

      <div className="container py-5">
        <div
          className="card shadow-sm p-4 rounded"
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            borderTop: '10px solid #673ab7',
            backgroundColor: '#ffffff',
          }}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control form-control-lg border-0 fs-3 fw-semibold"
              placeholder="Untitled form"
              style={{
                fontFamily: 'Google Sans, Roboto, Arial, sans-serif',
                color: '#202124',
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Form description"
              style={{
                fontFamily: 'Roboto, Arial, sans-serif',
                color: '#5f6368',
              }}
            />
          </div>

          {/* Selection Footer */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="selectAll"
                onChange={handleSelectAll}
                checked={questions.length > 0 && questions.every((q) => q.selected)}
              />
              <label className="form-check-label" htmlFor="selectAll">
                Select All
              </label>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleEditSelected}
              >
                Edit
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleDeleteSelected}
              >
                Delete
              </button>
            </div>
          </div>

          {questionUI()}
        </div>
        <div className="d-flex justify-content-center mt-3">
          <IconButton
            color="primary"
            onClick={handleAddQuestion}
            style={{ fontSize: 32 }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;