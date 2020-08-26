
export const mapCategoryToTreeNode = list => {

  if(!Array.isArray(list) || list.length === 0) return undefined;

  return list.map(c => ({
    id: c.id,
    title: c.title,
    code: c.code,
    children: mapCategoryToTreeNode(c.children)
  }))
}