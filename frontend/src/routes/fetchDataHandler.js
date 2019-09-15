const fetchData = async (url, requestInit) => {
  try {
    const response = await fetch(url, requestInit);
    const result = await response.json();
    console.log("result :", result);
    return { result, response };
  } catch (err) {
    console.error("Error:", err);
    return {
      fetchError: true,
      result: { message: "The connection to the server is failed." }
    };
  }
};

export default fetchData;
