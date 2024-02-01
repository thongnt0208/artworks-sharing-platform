import axios from "axios";

export async function searchAll(value: string) {
  const url = "https://es.huynhvanphu.id.vn/artworks/_search";
  const username = "elastic";
  const password = "Matkhausieumanh123";

  const body = {
    query: {
      query_string: {
        query: value,
        default_field: "*",
      },
    },
  };

  try {
    const response = await axios.post(url, body, {
      auth: { username, password },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response:", response.data);
    return response;
  } catch (error: any) {
    console.error(`Error making search ${value}: `, error);
    return error;
  }
}
