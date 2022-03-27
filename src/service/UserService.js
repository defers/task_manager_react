import axios from "axios";
import { getApiUrl } from "../properties/Properties.js";
import authHeader from "../authentification/authHeader.js";

const API_URL = getApiUrl();
const TASK_URL = "api/v1/users";

class UserService {
  
    getHeader() {
      return { headers: authHeader() }
    }
    getUsers() {
        let header = this.getHeader();
        
        return axios
          .get(API_URL + TASK_URL, header);
      }
    
      saveUser(user) {
        
        let header = this.getHeader();
   
        return axios.post(
          API_URL + TASK_URL + "/save",
          user,
          header
        )
      }
    
      deleteUser(id) {
    
        let header = this.getHeader();
    
        return axios.delete(
          API_URL + TASK_URL + "/delete/" + id,
          header 
        )
      }
    
      findUserById(id) {
        
        let header = this.getHeader();
    
        return axios.get(
          API_URL + TASK_URL + "/" + id,
          header
        )
    
      }

}
export default new UserService();