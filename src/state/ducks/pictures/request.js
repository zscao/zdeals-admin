import { apiFetch } from "../api/apiFetch"
import apiRoutes from "../api/apiRoutes"

export const uploadPicture = (container, file, onUploadProgress) => {
  const data = new FormData();
  data.append("file", file, file.name);

  return apiFetch({
    url: `${apiRoutes.pictures.base}/${container}`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  })
}