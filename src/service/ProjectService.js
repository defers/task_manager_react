
import axios from "axios";
import { getApiUrl } from "../properties/Properties.js";
import authHeader from "../authentification/authHeader.js";

const API_URL = getApiUrl();
const TASK_URL = "api/v1/projects";

class ProjectService {
  
    getHeader() {
      return { headers: authHeader() }
    }
    getProjects() {
        let header = this.getHeader();
        
        return axios
          .get(API_URL + TASK_URL, header);
      }
    
      saveProject(project) {
        
        let header = this.getHeader();
    
        return axios.post(
          API_URL + TASK_URL + "/save",
          project,
          header
        )
      }
    
      deleteProject(id) {
    
        let header = this.getHeader();
    
        return axios.delete(
          API_URL + TASK_URL + "/" + id,
          header 
        )
      }
    
      findProjectById(id) {
        
        let header = this.getHeader();
    
        return axios.get(
          API_URL + TASK_URL + "/" + id,
          header
        )
    
      }
}
export default new ProjectService();