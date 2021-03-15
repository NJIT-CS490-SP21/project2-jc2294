import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Board from './Board';
import Leaderboard from './Leaderboard';

test('login click function', () => {
  const result = render(<App />);
  const loginBtnElement = screen.getByText('Login');
  expect(loginBtnElement).toBeInTheDocument();
  const loginElement = document.getElementById('userIn');
  fireEvent.change(loginElement, { target: { value: 'user1' } });
  fireEvent.click(loginBtnElement);
  expect(loginBtnElement).not.toBeInTheDocument();
});

test('leaderboard show and hide', () => {
  const result = render(<Leaderboard currentUser="user1" />);
  const leaderboardBtnElement = screen.getByText('Show LeaderBoard');
  expect(leaderboardBtnElement).toBeInTheDocument();
  fireEvent.click(leaderboardBtnElement);
  const newElement = screen.getByText('LeaderBoard');
  expect(newElement).toBeInTheDocument();
});

test('reset click function', () => {
  const result = render(<Board currentUser="user1" />);
  const linkElement = screen.getByText('Reset');
  expect(linkElement).toBeInTheDocument();
  const newResetElement = screen.getByText('Reset');
  expect(linkElement).toBeValid;
});
