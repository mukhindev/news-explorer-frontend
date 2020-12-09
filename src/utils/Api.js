export default class Api {
  constructor(url) {
    this.url = url;
  }

  defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  setAuthHeader = (token) => `Bearer ${token}`;

  setHeaders = ({ token }) => {
    const headers = this.defaultHeaders;
    if (token) headers.Authorization = this.setAuthHeader(token);
    return headers;
  }

  setParams = (params) => (typeof params === 'object'
    ? `?${Object.entries(params).join('&').replace(/,/g, '=')}`
    : ''
  );

  handleResponse = (res) => {
    if (!res.ok) return Promise.reject(res.json());
    return res.json();
  }

  get = async ({
    handle,
    token,
    params,
  }) => {
    const res = await fetch(`${this.url}${handle}${this.setParams(params)}`, {
      method: 'GET',
      headers: this.setHeaders({ token }),
    });
    return this.handleResponse(res);
  }

  post = async ({
    handle,
    body,
    token,
    params,
  }) => {
    const res = await fetch(`${this.url}${handle}${this.setParams(params)}`, {
      method: 'POST',
      headers: this.setHeaders({ token }),
      body: JSON.stringify(body),
    });
    return this.handleResponse(res);
  }

  delete = async ({
    handle,
    token,
    params,
  }) => {
    const res = await fetch(`${this.url}${handle}${this.setParams(params)}`, {
      method: 'DELETE',
      headers: this.setHeaders({ token }),
    });
    return this.handleResponse(res);
  }
}
