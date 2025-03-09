const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

const prettyStringify = (data: any) => JSON.stringify(data, null, 2);

export const sendRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const url = `${apiUrl}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
        ...options.headers,
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error during API request to ${url}:`,
      prettyStringify(error)
    );
    return null;
  }
};
