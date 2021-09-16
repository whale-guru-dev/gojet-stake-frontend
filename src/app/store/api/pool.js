import http from '../../services/http';

export default class Pool {
  static getSkakingData() {
    return http.get('/stakings', {});
  }
}

