import http from "./http-commn";

class TutorialDataService {
  login(userName, password) {
    try {
      return http.post("/login", { userName, password });
    } catch (error) {
      console.log("error", error);
    }
  }

  getVolunteerPrograms(token) {
    try {
      return http.get("/volunteer/programs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  getVolIndividual(token) {
    try {
      return http.get("/volunteer/Individual", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }
  async addFeedback(token, data) {
    try {
      const response = await http.post("/feedbacks/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error submitting feedback:", error);
      throw error;
    }
  }
  async getFeedbacks(token, _id) {
    try {
      return http.get(`/feedbacks/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error getting feedback:", error);
      throw error;
    }
  }

  async sendToJoin(token, program_id) {
    try {
      const response = await http.post(
        "/volunteer/sendToJoinProg",
        { program_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error joining program:", error);
      throw error;
    }
  }

  async getProgressPrograms(token) {
    try {
      const response = await http.get("/volunteer/progress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error joining program:", error);
      throw error;
    }
  }
  async getUserData(token) {
    try {
      const response = await http.get("/user-data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error joining program:", error);
      throw error;
    }
  }
  async getUserImage(token,id,role) {
    try {
      const response = await http.get(`/userImage/${id}/${role}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error joining program:", error);
      throw error;
    }
  }
  async createReport(token, content, programId, createdAt) {
    try {
      const response = await http.post(
        "/addReport",
        { content, programId, createdAt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }
  async finishProgram(token, programId, reviewText) {
    try {
      const response = await http.post(
        "/volunteer/finish-Program",
        { programId, reviewText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }
  async getAdminData(token) {
    try {
      const response = await http.get("/admin/getAdminData", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }

  async getAdminPrograms(token) {
    try {
      const response = await http.get("/admin/getAdminPorgrams", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }

  async getProgramstoVolunteers(token) {
    try {
      const response = await http.get("/admin/getProgramstoVolunteers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating report:", error);
      throw error;
    }
  }

  async getVolunteerData(token, id) {
    try {
      const response = await http.get(`/admin/getVolunteerData/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching volunteer data:", error);
      throw error;
    }
  }

  async createProgram(formData, token) {
    try {
      const response = await http.post("/add-program", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating program:", error);
      throw error;
    }
  }
  async acceptVolunteer(token, programId, volunteerId) {
    try {
      const response = await http.post(
        "/accept-volunteer",
        { programId, volunteerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating program:", error);
      throw error;
    }
  }
  async rejectVolunteer(token, programId, volunteerId) {
    try {
      const response = await http.post(
        "/reject-volunteer",
        { programId, volunteerId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating program:", error);
      throw error;
    }
  }
  async registervolunteer( formData,token) {
    try {
      const response = await http.post("/volunteer/signup", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error signup volunteer:", error);
      throw error;
    }
  }

  async registerOrganizer(formData,token) {
    try {
      const response = await http.post("/admin/signup", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error signup Organizer:", error);
      throw error;
    }
  }

  async getConversations(token) {
    try {
      const response = await http.get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error signup Organizer:", error);
      throw error;
    }
  }
  async getMessages(token,id) {
    try {
      const response = await http.get(`/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error signup Organizer:", error);
      throw error;
    }
  }

  async sendMessage(token,id,message) {
    try {
      const response = await http.post(`/api/messages/send/${id}`,{message}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error signup Organizer:", error);
      throw error;
    }
  }
  
}

const tutorialDataServiceInstance = new TutorialDataService();

export default tutorialDataServiceInstance;
