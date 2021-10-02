const getBoD = (time: Date) => time.setHours(0, 0, 0, 0);
const today = getBoD(new Date());

const statsMock = {
  domain_1: {
    today: {
      size: 32321123,
      lastDate: today,
    },
    month: {
      size: 2323232303,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 232323232323232,
    },
  },
  domain_2: {
    today: {
      size: 32321123,
      lastDate: today,
    },
    month: {
      size: 2323232303,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 232323232323232,
    },
  },
  domain_3: {
    today: {
      size: 32321123,
      lastDate: today,
    },
    month: {
      size: 2323232303,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 232323232323232,
    },
  },
  domain_4: {
    today: {
      size: 232777,
      lastDate: today,
    },
    month: {
      size: 424233333,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 12312312,
    },
  },
  domain_5: {
    today: {
      size: 2323999,
      lastDate: today,
    },
    month: {
      size: 422399333,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 213232323,
    },
  },
  domain_6: {
    today: {
      size: 2223232,
      lastDate: today,
    },
    month: {
      size: 323234444,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 232223,
    },
  },
  domain_7: {
    today: {
      size: 222323,
      lastDate: today,
    },
    month: {
      size: 3232344,
      lastDate: new Date(today).setDate(1),
    },
    total: {
      size: 23222344,
    },
  },
};

export default statsMock;
