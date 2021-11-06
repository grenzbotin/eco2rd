const getBoD = (time: Date) => time.setHours(0, 0, 0, 0);
const today = getBoD(new Date());

const statsMock = {
  domain_1: {
    month: {
      size: 2323232303,
      lastDate: new Date(today).setDate(1),
      visits: 23,
      external: {
        "www.a.com": 3232,
        "www.b.com": 2312,
        "www.c.com": 2312,
        "www.d.com": 2312,
        "www.e.com": 2312,
        "www.f.com": 2312,
        "www.g.com": 2312,
        "www.h.com": 2312,
        "www.i.com": 2312,
        "www.j.com": 2312,
      },
    },
    total: {
      size: 232323232323232,
      visits: 433,
      external: {
        "www.a.com": 3232,
        "www.b.com": 2312,
        "www.c.com": 2312,
        "www.d.com": 2312,
        "www.e.com": 2312,
        "www.f.com": 2312,
        "www.g.com": 2312,
        "www.h.com": 2312,
        "www.i.com": 2312,
        "www.j.com": 2312,
      },
    },
  },
  domain_2: {
    today: {
      size: 32321123,
      lastDate: today,
      visits: 23,
      external: {
        "www.a.com": 3232,
        "www.b.com": 2312,
        "www.c.com": 2312,
        "www.d.com": 2312,
        "www.e.com": 2312,
        "www.f.com": 2312,
        "www.g.com": 2312,
        "www.h.com": 2312,
        "www.i.com": 2312,
        "www.j.com": 2312,
      },
    },
    month: {
      size: 2323232303,
      lastDate: new Date(today).setDate(1),
      visits: 23,
      external: {
        "www.a.com": 32332,
        "www.b.com": 23132,
      },
    },
    total: {
      size: 232323232323232,
      visits: 23,
      external: {
        "www.a.com": 323332,
        "www.b.com": 231332,
      },
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
