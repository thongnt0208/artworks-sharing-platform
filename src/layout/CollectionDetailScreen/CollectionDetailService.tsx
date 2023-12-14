import axios from 'axios';

export class CollectionDetailService {
  static async fetchCollectionDetail(collectionId: string) {
    try {
      const response = await axios.get(`/api/collections/${collectionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching collection detail:', error);
      throw error;
    }
  }
}
