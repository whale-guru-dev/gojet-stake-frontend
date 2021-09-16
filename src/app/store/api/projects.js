import http from '../../services/http';

export default class Project {
  static fetchAllProjects(network, all) {
    return http.get('/Projects', {
      params: {
        network,
        all
      }
    });
  }

  static fetchProject(symbol) {
    return http.get(`/Projects/${symbol}`);
  }
}
