// Test-Helfer: Mock für Vercel-Node-Response-Objekte.
export function mockRes() {
  const res = {
    code: null,
    body: null,
    headers: {},
    status(code) {
      this.code = code;
      return this;
    },
    json(data) {
      this.body = data;
      return this;
    },
    setHeader(name, value) {
      this.headers[name] = value;
      return this;
    },
    end() {
      return this;
    },
  };
  return res;
}

export function mockReq(overrides = {}) {
  const { headers: headerOverrides, ...rest } = overrides;
  return {
    method: 'POST',
    body: {},
    ...rest,
    headers: {
      'x-forwarded-for': `test-ip-${Math.random().toString(36).slice(2)}`,
      origin: 'https://ainzigartig.sejerlaenner.tech',
      ...headerOverrides,
    },
  };
}
