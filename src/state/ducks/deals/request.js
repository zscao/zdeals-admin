import { apiFetch } from "../api/apiFetch"
import apiRoutes from "../api/apiRoutes"

export const checkExistenceBySource = source => {
    return apiFetch({
      url: `${apiRoutes.deals.base}/exist`,
      data: { source }
    })
  }