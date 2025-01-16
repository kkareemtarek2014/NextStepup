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

  return response;
};

export const getCommunityBySlug = async (
  lang: string,
  slug: string
): Promise<any> => {
  try {
    const response = await sendRequest(
      `single-cummunities?locale=${lang}&filters[slug][$eq]=${slug}&pLevel`
    );

    if (!response?.data?.[0]) {
      throw new Error(`Community with slug ${slug} not found`);
    }

    const jsonString = JSON.stringify(response.data[0]);
    const parsedData = JSON.parse(jsonString);

    const data = JSON.stringify(parsedData, null, 2);

    return data;
  } catch (error) {
    console.error("Error fetching community data:", error);
    throw error;
  }
};

export async function fetchAbout(lang: string) {
  try {
    const aboutData = await fetch(`${apiUrl}/about?pLevel&locale=${lang}`);
    const aboutDataJson = await aboutData.json();
    return aboutDataJson;
  } catch (error) {
    console.error("Error fetching  about-page", error);
    throw error;
  }
}
export async function fetchFaq(lang: string) {
  try {
    const faqData = await fetch(`${apiUrl}/faq?pLevel&locale=${lang}`);
    const faqDataJson = await faqData.json();
    return faqDataJson;
  } catch (error) {
    console.error("Error fetching  faq-page", error);
    throw error;
  }
}
export async function fetchCareer(lang: string) {
  try {
    const careerData = await fetch(`${apiUrl}/career?pLevel&locale=${lang}`);
    const careerDataJson = await careerData.json();
    return careerDataJson;
  } catch (error) {
    console.error("Error fetching  career page", error);
    throw error;
  }
}
export async function fetchCareerBySlug(lang: string, slug: string) {
  try {
    const response = await sendRequest(
      `single-careers?pLevel&locale=${lang}&filters[slug][$eq]=${slug}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching  career page", error);
    throw error;
  }
}
export async function fetchJobs(lang: string) {
  try {
    const response = await sendRequest(
      `single-careers?locale=${lang}&fields[0]=Title&fields[1]=slug&fields[2]=CareerType&fields[3]=PositionType`
    );
    return response;
  } catch (error) {
    console.error("Error fetching career listings", error);
    throw error;
  }
}
export async function fetchHomepage(lang: string) {
  try {
    const response = await sendRequest(`home?pLevel&locale=${lang}`);
    return response;
  } catch (error) {
    console.error("Error fetching home page", error);
    throw error;
  }
}
export async function fetchBlogList(lang: string) {
  try {
    const response = await sendRequest(
      `blogs?pLevel&locale=${lang}&fields[0]=Title&fields[1]=slug&fields[2]=Description&fields[3]=Type&fields[4]=publishedAt&populate[0]=Image`
    );
    return response;
  } catch (error) {
    console.error("Error fetching blog list", error);
    throw error;
  }
}
export async function fetchSingleBlog(lang: string, slug: string) {
  try {
    const response = await sendRequest(
      `blogs?pLevel&locale=${lang}&filters[slug][$eq]=${slug}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching blog list", error);
    throw error;
  }
}
export async function fetchMediaPage(lang: string) {
  try {
    const response = await sendRequest(`media?pLevel&locale=${lang}`);
    return response;
  } catch (error) {
    console.error("Error fetching media page", error);
    throw error;
  }
}
export async function fetchCommunityPage(lang: string) {
  try {
    const response = await sendRequest(`community-page?pLevel&locale=${lang}`);
    return response;
  } catch (error) {
    console.error("Error fetching media page", error);
    throw error;
  }
}

export const getCommunityBySlugLoader = async (
  lang: string,
  slug: string
): Promise<any> => {
  try {
    const response = await sendRequest(
      `single-cummunities?locale=${lang}&filters[slug][$eq]=${slug}&pLevel&populate[0]=ImagesLoader`
    );

    if (!response?.data?.[0]) {
      throw new Error(`Community with slug ${slug} not found`);
    }

    const imagesLoader = response.data[0].ImagesLoader;

    if (!imagesLoader) {
      throw new Error("ImagesLoader data not found");
    }

    return imagesLoader;
  } catch (error) {
    console.error("Error fetching community data:", error);
    throw error;
  }
};

interface HeaderFooterData {
  data: {
    Header?: {
      Logo?: {
        url: string;
      };
      MenuItems?: Array<{
        label: string;
        link: string;
      }>;
    };
    Footer?: {
      Logo?: {
        url: string;
      };
      Links?: Array<{
        label: string;
        url: string;
      }>;
      SocialLinks?: Array<{
        platform: string;
        url: string;
      }>;
    };
  };
}

export async function fetchHeaderAndFooter(
  lang: string
): Promise<HeaderFooterData> {
  try {
    const response = await sendRequest(
      `header-and-footer?pLevel&locale=${lang}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching header and footer data:", error);
    throw error;
  }
}
