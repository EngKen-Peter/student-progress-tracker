import { render, screen } from '@testing-library/react';
import StudentDashboard from '../pages/StudentDashboard';
import { AuthProvider } from '../contexts/AuthContext';

test('renders Student Dashboard headings', () => {
  render(
    <AuthProvider>
      <StudentDashboard />
    </AuthProvider>
  );
  expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/My Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/My Lessons/i)).toBeInTheDocument();
  expect(screen.getByText(/My Progress/i)).toBeInTheDocument();
}); 