import http from "../http-common";

class CategoryDataService {
  getAll() {
    return http.get("/category");
  }

  findAll(type, search) {
    return http.get(`/category?type=${type}&search=${search}`);
  }
  
  get(id) {
    return http.get(`/category/${id}`);
  }

  create(data) {
    return http.post("/category", data);
  }

  update(id, data) {
    return http.put(`/category/${id}`, data);
  }

  delete(id) {
    return http.delete(`/category/${id}`);
  }

  deleteAll() {
    return http.delete(`/category`);
  }

}

export default new CategoryDataService();