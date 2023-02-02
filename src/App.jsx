import { useState } from 'react';

import { Statistics } from 'components/Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Section } from './components/Section/Section';
import { Notification } from 'components/Notification/Notification';

export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leaveFeedback = feedback => {
    setFeedback(prevState => {
      const value = prevState[feedback];
      return { ...prevState, [feedback]: value + 1 };
    });
  };

  const total = feedback.good + feedback.neutral + feedback.bad;

  const countPositivePercent = () => {
    if (!total) {
      return 0;
    }
    const result = ((feedback.good / total) * 100).toFixed(2);
    return Number(result);
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={leaveFeedback}
        ></FeedbackOptions>
      </Section>

      {total !== 0 && (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={countPositivePercent()}
          />
        </Section>
      )}
      {total === 0 && <Notification message="There is no feedback" />}
    </>
  );
};
