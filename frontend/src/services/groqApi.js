const API_URL =
  import.meta.env.VITE_API_URL;

export async function analyzeImage(
  image
) {

  const formData =
    new FormData();

  formData.append(
    "file",
    image
  );

  try {

    const response =
      await fetch(

        `${API_URL}/analyze/single`,

        {
          method: "POST",

          body: formData,
        }
      );

    // HANDLE API ERRORS

    if (!response.ok) {

      let errorMessage =
        "Analysis failed";

      try {

        const error =
          await response.json();

        errorMessage =
          error.detail ||
          errorMessage;

      } catch {

        errorMessage =
          "Server error occurred";
      }

      throw new Error(
        errorMessage
      );
    }

    // RETURN RESULT

    return await response.json();

  } catch (error) {

    console.error(
      "API Error:",
      error
    );

    throw error;
  }
}