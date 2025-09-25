import Cookies from "js-cookie";
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  //   const token = Cookies.get("access_token");
  //   console.log("Token:", token);
  try {
    const token = localStorage.getItem("access_token");
    const res = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    if (!res.ok) throw new Error(`Upload thất bại: ${res.status}`);
    const data = JSON.parse(text);
    return data.url;
  } catch (err) {
    console.error("Upload error:", err);
    throw new Error("Lỗi upload ảnh!");
  }
}
