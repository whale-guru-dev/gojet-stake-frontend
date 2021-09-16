/* eslint-disable */
import React, { createContext } from 'react';

const JetDefiContext = createContext({
  lastUpdatedTime: Date.now(),
  setLastUpdatedTime: () => {},
});

export default JetDefiContext;
