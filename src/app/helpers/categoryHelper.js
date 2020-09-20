
export const mapCategoryToTreeNode = list => {

  if(!Array.isArray(list) || list.length === 0) return undefined;

  return list.map(c => ({
    id: c.id,
    title: c.title,
    code: c.code,
    children: mapCategoryToTreeNode(c.children)
  }))
}

export const findCategoryNodeById = (nodes = [], id = 0) => {
  let result = undefined;

  for(let i=0; i<nodes.length; i++) {
    const node = nodes[i];
    if(node.id === id) {
      result = node;
      break;
    }
    if(Array.isArray(node.children)) {
      result = findCategoryNodeById(node.children, id);
      if(result) break;
    }
  }

  return result;

}