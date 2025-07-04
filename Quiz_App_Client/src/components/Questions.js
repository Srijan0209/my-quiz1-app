import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hook */
import { useFetchQestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, apiData, serverError }] = useFetchQestion();

  const dispatch = useDispatch();

  // Safe access to Redux store
  const questionsState = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);

  const trace = questionsState?.trace ?? 0;
  const questions = questionsState?.queue?.[trace]; // ✅ Safe access

  useEffect(() => {
    if (questionsState) {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3 className="text-light">Loading...</h3>;

  if (serverError) {
    return (
      <h3 className="text-light">
        {typeof serverError === 'string' ? serverError : 'Unknown Error'}
      </h3>
    );
  }

  if (!questions) {
    return <h3 className="text-light">No questions available.</h3>;
  }

  return (
    <div className="questions">
      <h2 className="text-light">{questions.question}</h2>

      <ul key={questions.id}>
        {questions.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
