const BASE_LOCAL_URL = 'http://localhost:5000';

// // Get single medical
// export const getAppointments = async () => {
//     try {
//       const response = await fetch(`${BASE_LOCAL_URL}/request-appointment`);
//       const data = await response.json();
//       console.log('appointments', data);
//       return data;
//     } catch (error) {
//       console.error(error);
//     }
//   }
  
  export const getMyAppointment = async (id) => {
    try {
      const response = await fetch(`${BASE_LOCAL_URL}/medicals/appointments/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  