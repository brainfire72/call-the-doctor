import axios from 'axios';

const URL = 'http://gist.githubusercontent.com/johanlunds/aad03ac7d0f0bcfb95c80584cd4cbdd7/raw/f976f105cd3ef04e7abfdd4f1da1be49e1060366/heartburn.json';
//const TOKEN = '';

export async function fetchQuestions() {
  try {
    const response = await axios.get(URL, {
      headers: {
        //Authorization: `token ${TOKEN}`,
      },
    });
    return response.data;

  } catch (error) {
    
    console.error('Error fetching questions:', error);
    return { 'message' : 'No data fetched from', 'error': error};
  }
}