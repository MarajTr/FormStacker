export const initialState = [
    {
      questionText: 'Which is your favourite color?',
      questionType: 'radio',
      options: [
        { optionText: 'Blue' },
        { optionText: 'Red' },
        { optionText: 'Green' },
      ],
      open: true,
      required: true,
      selected: false,
      answerKey: '',
      points: 0,
      answerMode: false,
    },
  ];
  
  export const questionReducer = (state, action) => {
    const { type, index, payload } = action;
  
    switch (type) {
      case 'SET_ALL_SELECTED':
        return state.map((q) => ({ ...q, selected: payload }));
  
      case 'DELETE_SELECTED':
        return state.filter((q) => !q.selected);
  
      case 'TOGGLE_EDIT':
        return state.map((q) =>
          q.selected ? { ...q, open: !q.open } : q
        );
  
      case 'CHANGE_QUESTION_TEXT':
        return state.map((q, i) =>
          i === index ? { ...q, questionText: payload } : q
        );
  
      case 'CHANGE_OPTION_TEXT':
        return state.map((q, i) =>
          i === index
            ? {
                ...q,
                options: q.options.map((opt, j) =>
                  j === payload.optionIndex
                    ? { ...opt, optionText: payload.text }
                    : opt
                ),
              }
            : q
        );
  
      case 'TOGGLE_SELECT':
        return state.map((q, i) =>
          i === index ? { ...q, selected: !q.selected } : q
        );
  
      case 'ADD_QUESTION':
        return [...state, payload];
  
      case 'REMOVE_OPTION':
        return state.map((q, i) =>
          i === index
            ? {
                ...q,
                options: q.options.filter((_, j) => j !== payload),
              }
            : q
        );
  
      case 'ADD_OPTION':
        return state.map((q, i) =>
          i === index
            ? {
                ...q,
                options: [...q.options, { optionText: payload }],
              }
            : q
        );
  
      case 'CHANGE_QUESTION_TYPE':
        return state.map((q, i) =>
          i === index ? { ...q, questionType: payload } : q
        );
  
      case 'TOGGLE_ANSWER_MODE':
        return state.map((q, i) =>
          i === index ? { ...q, answerMode: !q.answerMode } : q
        );
  
      case 'SET_ANSWER_KEY':
        return state.map((q, i) =>
          i === index ? { ...q, answerKey: payload } : q
        );
  
      case 'SET_POINTS':
        return state.map((q, i) =>
          i === index ? { ...q, points: Number(payload) } : q
        );
  
      default:
        return state;
    }
  };
  