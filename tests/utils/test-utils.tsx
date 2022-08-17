import type { AppStore, RootState } from '@/redux/store';
import type { PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

// As a basic setup, import your same slice reducers
import drawReducer from '@/redux/slices/drawSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: { draw: drawReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { renderWithProviders as render };
