import axios from "axios";
import { getApiUrl } from "../properties/Properties.js";
import authHeader from "../authentification/authHeader.js";
import { convertArrayOfNumberToDate } from "../utils/DateUtils";

const API_URL = getApiUrl();
const TASK_URL = "api/v1/tasks";


class TasksService {
  
  getHeader() {
    return { headers: authHeader() }
  }

  getTasks() {
    
    let header = this.getHeader();
    
    return axios
      .get(API_URL + TASK_URL, header)
      .then((response) => {

        response.data.forEach(
          (element) => {
            element.date = convertArrayOfNumberToDate(element.date);
          }
        );

        return response;
      });
  }

  saveTask(task) {
    
    let header = this.getHeader();

    return axios.post(
      API_URL + TASK_URL + "/save",
      task,
      header
    )
  }

  deleteTask(id) {

    let header = this.getHeader();

    return axios.delete(
      API_URL + TASK_URL + "/" + id,
      header 
    )
  }

  findTaskById(id) {
    
    let header = this.getHeader();

    return axios.get(
      API_URL + TASK_URL + "/" + id,
      header
    )

  }

}

export default new TasksService();
