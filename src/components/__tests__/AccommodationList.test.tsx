import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccommodationList from '../AccommodationList';

describe('AccommodationList', () => {
  test('renders CPT hotels by default', () => {
    render(<AccommodationList />);
    expect(screen.getByText(/BROADWAY TYGERVALLEY/i) || screen.getByText(/Broadway Tygervalley/)).toBeDefined();
  });

  test('switches to SP and shows São Paulo hotels', async () => {
    render(<AccommodationList />);
    const user = userEvent.setup();
    const spButton = screen.getByText(/SÃO PAULO/i);
    await user.click(spButton);
    expect(screen.getByText(/Bristol International Airport/i) || screen.getByText(/Bristol/)).toBeDefined();
  });

  test('expands and collapses details', async () => {
    render(<AccommodationList />);
    const user = userEvent.setup();
    // find first "LER TUDO SOBRE" button
    const readButtons = screen.getAllByRole('button', { name: /LER TUDO SOBRE|FECHAR DETALHES/i });
    expect(readButtons.length).toBeGreaterThan(0);
    await user.click(readButtons[0]);
    // After clicking, there should be a region with role=region for the expanded hotel
    const region = await screen.findByRole('region');
    expect(region).toBeDefined();
    // Close
    await user.click(readButtons[0]);
    // region should be hidden (aria-expanded false on button)
    expect(readButtons[0]).toHaveAttribute('aria-expanded', 'false');
  });
});
