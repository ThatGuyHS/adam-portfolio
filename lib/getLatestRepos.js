import axios from "axios";

const getLatestRepos = async (data, token) => {
  try {
    const username = data.githubUsername;
    const headers = token ? { Authorization: `token ${token}` } : {};

    const res = await axios.get(
      `https://api.github.com/search/repositories?q=user:${username}+sort:author-date-asc`,
      { headers }
    );

    return res.data.items.slice(0, 6);
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err.message);
    return [];
  }
};

export default getLatestRepos;
