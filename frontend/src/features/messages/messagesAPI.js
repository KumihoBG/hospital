const BASE_LOCAL_URL = 'http://localhost:5000';

// Get all messages
export const getAllMessages = async (userId) => {
  try {
    const response = await fetch(`${BASE_LOCAL_URL}/chat/${userId}`);
    const data = await response.json();
    console.log('data GET', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Save messages
export async function pushMessages(userId, messages) {
    try {
      const response = await fetch(`${BASE_LOCAL_URL}/chat/${userId}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(messages)
      });
  
      const data = await response.json();
      console.log('data POST', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }