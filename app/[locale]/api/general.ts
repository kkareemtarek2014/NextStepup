const apiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

// Helper function to stringify data with proper formatting
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
    console.log("API Response:", prettyStringify(data)); // Log formatted data
    return data;
  } catch (error) {
    console.error(
      `Error during API request to ${url}:`,
      prettyStringify(error)
    );
    return null;
  }
};

// Define the type for the community data
interface CommunityData {
  slug: string;
  Location: string;
  statusType: string;
  UnitType: string;
  Type: string;
  HeroSection: {
    MainImage: {
      url: string;
      formats: {
        small: {
          url: string;
        };
      };
    };
  };
  HighlightSection: {
    Title: string;
  };
}

export const CummunityList = async (
  lang: string
): Promise<{ data: CommunityData[] }> => {
  const response = await sendRequest(
    `single-cummunities?locale=${lang}&populate[HeroSection][populate][MainImage][fields][0]=url&populate[HeroSection][populate][MainImage][fields][1]=formats&populate[HighlightSection][fields][0]=Title&fields[0]=slug&fields[1]=Location&fields[2]=statusType&fields[3]=UnitType&fields[4]=Type`
  );

  // Log the formatted response
  //   console.log("CummunityList Response:", prettyStringify(response));

  return response;
};
