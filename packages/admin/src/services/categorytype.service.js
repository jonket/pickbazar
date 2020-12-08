import http from "../http-common";

class CategoryTypeDataService {
  getAll() {
    return http.get("/categorytype");
  }

  get(id) {
    return http.get(`/categorytype/${id}`);
  }

  create(data) {
    return http.post("/categorytype", data);
  }

  update(id, data) {
    return http.put(`/categorytype/${id}`, data);
  }

  delete(id) {
    return http.delete(`/categorytype/${id}`);
  }

  deleteAll() {
    return http.delete(`/categorytype`);
  }
}

export default new CategoryTypeDataService();