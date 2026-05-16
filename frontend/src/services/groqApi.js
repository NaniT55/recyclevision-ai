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

  const response =
    await fetch(

      `${API_URL}/analyze/single`,

      {
        method: "POST",
        body: formData,
      }
    );

  if (!response.ok) {

    const error =
      await response.json();

    throw new Error(
      error.detail ||
      "Analysis failed"
    );
  }

  return await response.json();
}