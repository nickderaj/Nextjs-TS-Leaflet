import createMockRouter from '@/tests/utils/mockRouter';
import { render } from '@/tests/utils/test-utils';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context';

describe('Next Router Test', () => {
  // Clean up after each test
  afterEach(cleanup);

  // Run Tests
  it('is redirected when the user clicks button', async () => {
    let router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <button onClick={() => router.push('/dummyUrl')}>Test Click</button>
      </RouterContext.Provider>
    );
    const dummyButton = screen.getByText(/Test Click/i);
    expect(dummyButton).toBeVisible();

    fireEvent.click(dummyButton);
    expect(router.push).toHaveBeenCalledWith('/dummyUrl');
  });
});
