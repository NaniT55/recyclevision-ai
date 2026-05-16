export async function analyzeImage(
  image
) {
  const formData = new FormData();

  formData.append("file", image);

  const response = await fetch(
    "http://127.0.0.1:8000/analyze/single",
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