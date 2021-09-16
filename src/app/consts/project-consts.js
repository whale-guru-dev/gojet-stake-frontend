export const PROJECT_TYPES = {
    UPCOMING: 'Upcoming',
    COMPLETED: 'Completed'
  };
  
  export const PROJECT_TYPE_LIST = [
    {name: PROJECT_TYPES.UPCOMING},
    {name: PROJECT_TYPES.COMPLETED},
  ];
  
  export const STAKING_TYPES = {
    LIVE: 'LIVE',
    COMPLETED: 'COMPLETED',
    UPCOMING: 'UPCOMING'
  };
  
  export const STAKING_INDEXES = {
    LIVE: 0,
    UPCOMING: 1,
    COMPLETED: 2
  };
  
  export const STAKING_TYPES_DATA = {
    [STAKING_TYPES.LIVE] : {
      value: STAKING_TYPES.LIVE,
      name: 'Live',
    },
    [STAKING_TYPES.COMPLETED] : {
      value: STAKING_TYPES.COMPLETED,
      name: 'Completed',
    },
    [STAKING_TYPES.UPCOMING] : {
      value: STAKING_TYPES.UPCOMING,
      name: 'Upcoming',
    }
  };
  
  export const STAKING_TYPE_LIST = [
    STAKING_TYPES_DATA[STAKING_TYPES.LIVE],
    STAKING_TYPES_DATA[STAKING_TYPES.COMPLETED]
  ];
  